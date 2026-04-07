'use strict';
/*
 * app.js — 이벤트 캘린더 메인 스크립트
 * ========================================
 * 역할:
 *   - 서버(server.py)의 REST API를 통해 events.json에서 이벤트를 로드/저장합니다.
 *   - 월별·주별·목록 세 가지 뷰를 동적으로 렌더링합니다.
 *   - 이벤트의 추가·수정·삭제를 처리하는 모달과 상세 팝업을 제어합니다.
 *
 * 주요 흐름:
 *   1. 페이지 로드 → fetchEvents()로 events.json 읽기
 *   2. 캘린더 렌더링 (renderAll)
 *   3. 사용자 인터랙션 → 모달/팝업 열기
 *   4. 저장/삭제 → saveEvents()로 events.json 갱신 → 재렌더링
 */

/* ============================================================
   1. 상수 정의
   - 화면에 표시되는 텍스트와 카테고리 색상을 한 곳에서 관리합니다.
============================================================ */

/** 요일 이름 배열 (0=일요일) */
const DAY_NAMES   = ['일', '월', '화', '수', '목', '금', '토'];

/** 월 이름 배열 (0=1월, index와 표시 월을 맞추기 위해 1월부터 시작) */
const MONTH_NAMES = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

/** 카테고리 ID → 한국어 레이블 매핑 (현재 목록 뷰 등에서 참조 가능) */
const CATEGORY_LABEL = { blue: '개인 일정', green: '업무', orange: '가족', purple: '공휴일' };

/**
 * 카테고리 ID → 색상 정보 매핑
 * - bg  : 이벤트 칩 배경색 (파스텔)
 * - text: 이벤트 칩 텍스트 색
 * - bar : 목록 뷰 세로 막대 / 팝업 색상 박스 / 소형 모바일 dot 색
 */
const CATEGORY_COLOR = {
  blue:   { bg: '#d2e3fc', text: '#1a56c4', bar: '#1a73e8' },
  green:  { bg: '#ceead6', text: '#137333', bar: '#34a853' },
  orange: { bg: '#fce8b2', text: '#b06000', bar: '#fa7b17' },
  purple: { bg: '#e6d0fb', text: '#6a1d9a', bar: '#9334e6' },
};

/** 이벤트 데이터를 읽고 쓰는 API 엔드포인트 */
const API = '/api/events';


/* ============================================================
   2. 애플리케이션 상태 (state)
   - 단일 객체로 전체 상태를 관리합니다.
   - 상태가 변경될 때마다 renderAll()을 호출해 UI를 갱신합니다.
============================================================ */

/** 오늘 날짜 (Date 객체) — 초기 연/월과 "오늘" 강조에 사용 */
const today = new Date();

const state = {
  year:         today.getFullYear(), // 현재 보고 있는 연도 (0-indexed 아님)
  month:        today.getMonth(),    // 현재 보고 있는 월 (0-indexed: 0=1월)
  view:         'month',             // 활성 뷰: 'month' | 'week' | 'list'
  events:       [],                  // events.json에서 로드한 이벤트 배열
  editingId:    null,                // 수정 중인 이벤트의 id (추가 시 null)
  hiddenCats:   new Set(),           // 필터 해제된 카테고리 id Set
  popupEventId: null,                // 현재 열려있는 팝업의 이벤트 id
};


/* ============================================================
   3. API 통신 함수
   - fetchEvents : GET  /api/events → events.json 배열 반환
   - saveEvents  : POST /api/events → state.events 전체를 파일에 덮어씀
============================================================ */

/**
 * 서버에서 events.json 전체를 읽어 배열로 반환합니다.
 * @returns {Promise<Array>} 이벤트 객체 배열
 * @throws {Error} HTTP 오류 시
 */
async function fetchEvents() {
  const res = await fetch(API);
  if (!res.ok) throw new Error(`서버 응답 오류: ${res.status}`);
  return res.json();
}

/**
 * 현재 state.events 배열 전체를 POST 요청으로 서버에 전송해
 * events.json 파일을 덮어씁니다.
 * @throws {Error} HTTP 오류 시
 */
async function saveEvents() {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state.events, null, 2), // indent=2 로 가독성 있게 직렬화
  });
  if (!res.ok) throw new Error(`저장 실패: ${res.status}`);
}

/**
 * 중복되지 않는 고유 ID를 생성합니다.
 * 형식: "e" + 타임스탬프 + 무작위 4자 영숫자
 * @returns {string}
 */
function genId() {
  return 'e' + Date.now() + Math.random().toString(36).slice(2, 6);
}


/* ============================================================
   4. DOM 참조
   - 자주 접근하는 요소를 미리 캐싱해 매번 탐색하는 비용을 줄입니다.
   - $ : document.getElementById 축약 헬퍼
============================================================ */
const $ = id => document.getElementById(id);

const els = {
  /* 사이드바 관련 */
  sidebar:          $('sidebar'),
  sidebarOverlay:   $('sidebarOverlay'),   // 모바일 드로어 오버레이
  sidebarClose:     $('sidebarClose'),     // 사이드바 닫기 버튼 (모바일)
  hamburger:        $('hamburger'),        // 사이드바 열기 버튼 (모바일)

  /* 미니 캘린더 */
  miniCalGrid:      $('miniCalGrid'),      // 날짜 셀이 동적 삽입되는 컨테이너
  miniMonthLabel:   $('miniMonthLabel'),   // "2026년 4월" 텍스트
  miniPrev:         $('miniPrev'),         // 이전 달 버튼
  miniNext:         $('miniNext'),         // 다음 달 버튼

  /* 메인 툴바 */
  currentMonthLbl:  $('currentMonthLabel'), // 툴바의 큰 연월 제목
  btnToday:         $('btnToday'),          // "오늘" 버튼
  prevMonth:        $('prevMonth'),         // 이전 달 버튼
  nextMonth:        $('nextMonth'),         // 다음 달 버튼

  /* 뷰 컨테이너 */
  calendarWrap:     $('calendarWrap'),     // 월별 그리드 컨테이너
  listWrap:         $('listWrap'),         // 목록 뷰 컨테이너
  weekWrap:         $('weekWrap'),         // 주별 뷰 컨테이너
  btnAdd:           $('btnAdd'),           // "+ 새 이벤트" 버튼

  /* 이벤트 추가/수정 모달 */
  modalBackdrop:    $('modalBackdrop'),    // 반투명 배경
  modalTitle:       $('modalTitle'),       // "새 이벤트" / "이벤트 수정"
  modalClose:       $('modalClose'),       // 모달 닫기 버튼
  eventTitle:       $('eventTitle'),       // 제목 입력
  titleError:       $('titleError'),       // 제목 미입력 에러 메시지
  eventDate:        $('eventDate'),        // 날짜 입력
  eventTime:        $('eventTime'),        // 시간 입력
  eventNote:        $('eventNote'),        // 메모 입력
  btnSave:          $('btnSave'),          // 저장 버튼
  btnCancel:        $('btnCancel'),        // 취소 버튼
  btnDelete:        $('btnDelete'),        // 삭제 버튼 (수정 모드만 표시)

  /* 이벤트 상세 팝업 */
  eventPopup:       $('eventPopup'),       // 팝업 카드 루트
  popupColorBar:    $('popupColorBar'),    // 카테고리 색상 박스
  popupTitle:       $('popupTitle'),       // 이벤트 제목
  popupDate:        $('popupDate'),        // 날짜·시간 텍스트
  popupNote:        $('popupNote'),        // 메모 텍스트
  popupEdit:        $('popupEdit'),        // 수정 버튼 (✏)
  popupDelete:      $('popupDelete'),      // 삭제 버튼 (🗑)
  popupClose:       $('popupClose'),       // 팝업 닫기 버튼
};


/* ============================================================
   5. 헬퍼 함수
============================================================ */

/**
 * 날짜 문자열(YYYY-MM-DD)과 시간 문자열(HH:MM)을
 * 한국어 형식으로 변환합니다.
 * 예) "2026-04-07", "14:00" → "2026년 4월 7일 (화) 14:00"
 *
 * @param {string} dateStr - "YYYY-MM-DD"
 * @param {string} timeStr - "HH:MM" (없으면 빈 문자열)
 * @returns {string}
 */
function formatDateKo(dateStr, timeStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);              // 월은 0-indexed
  const dayName = DAY_NAMES[dt.getDay()];         // 요일 이름
  let str = `${y}년 ${m}월 ${d}일 (${dayName})`;
  if (timeStr) str += ` ${timeStr}`;
  return str;
}

/**
 * Date 객체를 "YYYY-MM-DD" 문자열로 변환합니다.
 * 이벤트의 date 필드 및 날짜 셀의 data-date 속성과 형식을 맞춥니다.
 *
 * @param {Date} date
 * @returns {string} "YYYY-MM-DD"
 */
function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * 현재 숨김 처리된 카테고리를 제외한 표시 가능한 이벤트 배열을 반환합니다.
 * state.hiddenCats Set에 포함된 카테고리의 이벤트는 걸러냅니다.
 *
 * @returns {Array} 표시 가능한 이벤트 배열
 */
function visibleEvents() {
  return state.events.filter(e => !state.hiddenCats.has(e.category));
}

/**
 * XSS(Cross-Site Scripting) 방지를 위한 HTML 이스케이프 함수.
 * 사용자 입력값을 innerHTML에 삽입하기 전에 반드시 적용합니다.
 *
 * @param {string} str - 원본 문자열
 * @returns {string} HTML 특수문자가 엔티티로 치환된 문자열
 */
function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


/* ============================================================
   6. 렌더링 함수
============================================================ */

/**
 * 툴바의 연월 제목을 현재 state.year·state.month 기준으로 갱신합니다.
 * 예) state.year=2026, state.month=3 → "2026년 4월"
 */
function renderHeader() {
  els.currentMonthLbl.textContent = `${state.year}년 ${MONTH_NAMES[state.month]}`;
}

/* ----------------------------------------------------------
   미니 캘린더 렌더링 (사이드바)
   - state.year·state.month 기준으로 7×N 날짜 그리드를 생성합니다.
   - 첫째 날의 요일(firstDay)만큼 빈 셀을 앞에 추가합니다.
   - 날짜 클릭 시 해당 날짜로 이벤트 추가 모달을 엽니다.
---------------------------------------------------------- */
function renderMiniCal() {
  const { year, month } = state;
  els.miniMonthLabel.textContent = `${year}년 ${MONTH_NAMES[month]}`;

  const firstDay    = new Date(year, month, 1).getDay();     // 1일의 요일 (0=일)
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 총 일수
  const todayKey    = toDateKey(today);

  /* 요일 헤더 (일~토) */
  let html = DAY_NAMES.map(d => `<span class="day-label">${d}</span>`).join('');

  /* 1일 전에 빈 셀 삽입 (이전 달 날짜는 표시하지 않음) */
  for (let i = 0; i < firstDay; i++) {
    html += `<span class="mini-day other"></span>`;
  }

  /* 1일부터 말일까지 날짜 셀 생성 */
  for (let d = 1; d <= daysInMonth; d++) {
    const key     = `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = key === todayKey;
    html += `<span class="mini-day${isToday ? ' today' : ''}" data-date="${key}">${d}</span>`;
  }

  els.miniCalGrid.innerHTML = html;

  /* 날짜 클릭 → 해당 날짜로 이벤트 추가 모달 열기 */
  els.miniCalGrid.querySelectorAll('.mini-day[data-date]').forEach(el => {
    el.addEventListener('click', () => openModal(el.dataset.date));
  });
}

/* ----------------------------------------------------------
   월별 뷰 렌더링
   - 7열 × N행 CSS Grid를 동적으로 생성합니다.
   - 이전·다음 달의 날짜도 그리드를 채우기 위해 표시합니다.
   - 각 날짜 셀에 해당 날짜의 이벤트 칩을 삽입합니다.
   - 3개 초과 이벤트는 "+N개 더" 텍스트로 처리합니다.
   - 소형 모바일(≤380px)에서 칩 대신 색상 점(dot) 행을 삽입합니다.
---------------------------------------------------------- */
function renderMonthView() {
  const { year, month } = state;

  const firstDay      = new Date(year, month, 1).getDay();       // 이번 달 1일의 요일
  const daysInMonth   = new Date(year, month + 1, 0).getDate();  // 이번 달 총 일수
  const prevMonthDays = new Date(year, month, 0).getDate();      // 이전 달 총 일수
  const todayKey      = toDateKey(today);

  /* 총 셀 수: 7의 배수로 올림 (그리드를 완전한 주 단위로 채우기 위함) */
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const weeks      = totalCells / 7;  // 행 수 (보통 5~6)

  /*
   * 이벤트 맵 생성: { "2026-04-07": [event, ...], ... }
   * 날짜 셀 렌더링 시 O(1)로 이벤트를 조회하기 위해 맵으로 변환합니다.
   */
  const evMap = {};
  visibleEvents().forEach(e => {
    if (!evMap[e.date]) evMap[e.date] = [];
    evMap[e.date].push(e);
  });

  /* 같은 날짜의 이벤트를 시간 순으로 정렬 (시간 없는 이벤트는 후순위) */
  Object.values(evMap).forEach(arr =>
    arr.sort((a, b) => (a.time || '99') < (b.time || '99') ? -1 : 1)
  );

  let gridHTML = '';

  /* 요일 헤더 행 (일~토) */
  DAY_NAMES.forEach((d, i) => {
    const cls = i === 0 ? ' sun' : i === 6 ? ' sat' : '';
    gridHTML += `<div class="cal-header-cell${cls}">${d}</div>`;
  });

  /* 날짜 셀 생성 (totalCells개) */
  for (let i = 0; i < totalCells; i++) {
    const col   = i % 7;
    const isSun = col === 0;
    const isSat = col === 6;

    let day, dateKey, isOther = false;

    if (i < firstDay) {
      /* 이전 달 날짜 */
      day = prevMonthDays - firstDay + 1 + i;
      const pm = month === 0 ? 12 : month;           // 1월이면 이전 달은 12월
      const py = month === 0 ? year - 1 : year;
      dateKey  = `${py}-${String(pm).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      isOther  = true;

    } else if (i >= firstDay + daysInMonth) {
      /* 다음 달 날짜 */
      day = i - firstDay - daysInMonth + 1;
      const nm = month === 11 ? 1 : month + 2;       // 12월이면 다음 달은 1월
      const ny = month === 11 ? year + 1 : year;
      dateKey  = `${ny}-${String(nm).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      isOther  = true;

    } else {
      /* 이번 달 날짜 */
      day     = i - firstDay + 1;
      dateKey = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    }

    /* 날짜 셀 CSS 클래스 조합 */
    const isToday = dateKey === todayKey;
    let cls = 'cal-cell';
    if (isOther) cls += ' other-month';
    if (isToday) cls += ' today';
    if (isSat)   cls += ' sat';
    if (isSun)   cls += ' sun';

    const eventsForDay = evMap[dateKey] || [];
    const MAX_VISIBLE  = 3;  // 셀에 직접 표시하는 최대 이벤트 수
    const shown        = eventsForDay.slice(0, MAX_VISIBLE);
    const rest         = eventsForDay.length - MAX_VISIBLE; // 초과 이벤트 수

    /*
     * 소형 모바일(≤380px)용 색상 점 행
     * CSS에서 .event { display:none } 이 되므로 대신 dot을 표시합니다.
     * data-date 속성으로 각 이벤트를 식별합니다.
     */
    const dotRow = eventsForDay.length
      ? `<div class="event-dot-row">${
          eventsForDay.slice(0, 4).map(e =>
            `<span class="event-dot" style="background:${CATEGORY_COLOR[e.category].bar}"></span>`
          ).join('')
        }</div>`
      : '';

    /* 이벤트 칩 HTML */
    const evHTML = shown.map(e =>
      `<div class="event event-${e.category}" data-id="${e.id}">${
        e.time ? e.time + ' ' : ''
      }${escHtml(e.title)}</div>`
    ).join('') + (rest > 0 ? `<span class="event-more">+${rest}개 더</span>` : '');

    gridHTML += `
      <div class="${cls}" data-date="${dateKey}">
        <span class="date-num">${day}</span>
        ${evHTML}
        ${dotRow}
      </div>`;
  }

  /*
   * grid-template-rows를 동적으로 지정합니다.
   * - 첫 행(36px): 요일 헤더
   * - 나머지 행(1fr): 날짜 셀 (주 수만큼 균등 분배)
   */
  els.calendarWrap.innerHTML =
    `<div class="calendar-grid" style="grid-template-rows: 36px repeat(${weeks}, 1fr)">${gridHTML}</div>`;

  /* 날짜 셀 클릭 → 이벤트 추가 모달 열기 (이벤트 칩/more 클릭은 제외) */
  els.calendarWrap.querySelectorAll('.cal-cell').forEach(cell => {
    cell.addEventListener('click', e => {
      if (e.target.closest('.event') || e.target.closest('.event-more')) return;
      openModal(cell.dataset.date);
    });
  });

  /* 이벤트 칩 클릭 → 상세 팝업 표시 (이벤트 버블링 차단) */
  els.calendarWrap.querySelectorAll('.event[data-id]').forEach(chip => {
    chip.addEventListener('click', e => {
      e.stopPropagation(); // 날짜 셀의 클릭 이벤트로 전파되지 않도록
      showEventPopup(chip.dataset.id, chip);
    });
  });

  /* "+N개 더" 클릭 → 목록 뷰로 전환 */
  els.calendarWrap.querySelectorAll('.event-more').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      switchView('list');
    });
  });
}

/* ----------------------------------------------------------
   목록 뷰 렌더링
   - 전체 이벤트를 날짜·시간 순으로 정렬합니다.
   - 월별로 그룹화하여 섹션 헤더와 함께 표시합니다.
   - 각 이벤트 행에 카테고리 색상 바를 표시합니다.
---------------------------------------------------------- */
function renderListView() {
  /* 카테고리 필터 적용 후 날짜·시간 오름차순 정렬 */
  const events = visibleEvents().slice().sort((a, b) => {
    const da = a.date + (a.time || '');   // 시간 없으면 날짜만으로 정렬
    const db = b.date + (b.time || '');
    return da < db ? -1 : 1;
  });

  /* 이벤트가 하나도 없는 경우 */
  if (!events.length) {
    els.listWrap.innerHTML = `<p class="list-empty">등록된 이벤트가 없습니다.</p>`;
    return;
  }

  /*
   * 월별 그룹화: { "2026-04": [event, ...], "2026-05": [...] }
   * Object.entries 순서는 삽입 순서를 따르므로, 이미 정렬된 배열을
   * 순차적으로 넣으면 월 오름차순이 유지됩니다.
   */
  const groups = {};
  events.forEach(e => {
    const [y, m] = e.date.split('-');
    const key    = `${y}-${m}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(e);
  });

  let html = '';
  Object.entries(groups).forEach(([key, evs]) => {
    const [y, m] = key.split('-');

    /* 월 그룹 헤더 */
    html += `<div class="list-month-group">
      <div class="list-month-title">${y}년 ${Number(m)}월</div>`;

    /* 각 이벤트 행 */
    evs.forEach(e => {
      const [,, d] = e.date.split('-').map(Number);
      const dt     = new Date(e.date);
      const dayName = DAY_NAMES[dt.getDay()];
      const col    = CATEGORY_COLOR[e.category];

      html += `
        <div class="list-event-row" data-id="${e.id}">
          <div class="list-event-date">
            <div class="list-event-day-num">${d}</div>
            <div class="list-event-day-name">${dayName}</div>
          </div>
          <!-- 카테고리 색상 세로 막대: JS에서 인라인 스타일로 색상 지정 -->
          <div class="list-event-bar" style="background:${col.bar}"></div>
          <div class="list-event-info">
            <div class="list-event-title">${escHtml(e.title)}</div>
            ${e.time ? `<div class="list-event-time">${e.time}</div>` : ''}
            ${e.note ? `<div class="list-event-note">${escHtml(e.note)}</div>` : ''}
          </div>
        </div>`;
    });

    html += '</div>'; // /list-month-group
  });

  els.listWrap.innerHTML = html;

  /* 이벤트 행 클릭 → 상세 팝업 표시 */
  els.listWrap.querySelectorAll('.list-event-row').forEach(row => {
    row.addEventListener('click', () => showEventPopup(row.dataset.id, row));
  });
}

/* ----------------------------------------------------------
   주별 뷰 렌더링
   - 오늘(또는 현재 달 1일)이 속한 주를 일~토 7컬럼으로 표시합니다.
   - 24시간(0~23시) × 7일 = 168개 슬롯으로 구성됩니다.
   - 시간이 지정된 이벤트는 해당 시간대 슬롯에, 시간 없는 이벤트는 00시 슬롯에 배치합니다.
---------------------------------------------------------- */
function renderWeekView() {
  /*
   * 기준 날짜 결정:
   * - 현재 달이 오늘이 속한 달이면 오늘을 기준으로
   * - 그렇지 않으면 해당 달의 1일을 기준으로
   */
  const refDate = (today.getFullYear() === state.year && today.getMonth() === state.month)
    ? new Date(today)
    : new Date(state.year, state.month, 1);

  /* 기준 날짜가 속한 주의 일요일로 이동 */
  const dayOfWeek = refDate.getDay();
  const weekStart = new Date(refDate);
  weekStart.setDate(refDate.getDate() - dayOfWeek);

  /* 7일(일~토) Date 배열 */
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const todayKey = toDateKey(today);

  /* ── 헤더 생성 (요일 + 날짜 숫자) ── */
  /* 좌측 시간 레이블 열의 헤더 자리(빈 셀) */
  let headerHTML = '<div class="week-time-col" style="background:#fff;border-bottom:1px solid #e0e0e0"></div>';

  days.forEach((d, i) => {
    const key    = toDateKey(d);
    const isSun  = i === 0, isSat = i === 6;
    const isToday = key === todayKey;

    let cls = 'week-header-cell';
    if (isSun)   cls += ' sun-col';
    if (isSat)   cls += ' sat-col';
    if (isToday) cls += ' today-col'; // 파란 원 강조

    headerHTML += `<div class="${cls}">
      ${DAY_NAMES[i]}<span class="wk-date">${d.getDate()}</span>
    </div>`;
  });

  /* ── 이벤트 맵 생성 ── */
  const evMap = {};
  visibleEvents().forEach(e => {
    if (!evMap[e.date]) evMap[e.date] = [];
    evMap[e.date].push(e);
  });

  /* ── 바디 생성 (시간대 × 요일) ── */
  let timeColHTML = '';              // 좌측 시간 레이블 열
  const dayCols = days.map(() => ''); // 각 요일 컬럼의 HTML 누적

  for (let h = 0; h < 24; h++) {
    /* 시간 레이블 (00시는 비움으로 처리하여 헤더와 겹치지 않게) */
    const label = h === 0 ? '' : `${String(h).padStart(2,'0')}:00`;
    timeColHTML += `<div class="week-time-slot">${label}</div>`;

    /* 해당 시간대의 이벤트를 각 요일 컬럼에 추가 */
    days.forEach((d, i) => {
      const key = toDateKey(d);
      const evs = (evMap[key] || []).filter(e => {
        if (!e.time) return h === 0;  // 시간 없는 이벤트 → 00시 슬롯
        return parseInt(e.time.split(':')[0]) === h;
      });

      const slotHTML = evs.map(e =>
        `<div class="week-event event-${e.category}" data-id="${e.id}">${
          e.time ? e.time + ' ' : ''
        }${escHtml(e.title)}</div>`
      ).join('');

      dayCols[i] += `<div class="week-hour-slot" data-date="${key}">${slotHTML}</div>`;
    });
  }

  /* 시간 열 + 7개 요일 열을 합쳐 바디 HTML 구성 */
  let bodyHTML = `<div class="week-time-col">${timeColHTML}</div>`;
  days.forEach((d, i) => {
    const key = toDateKey(d);
    bodyHTML += `<div class="week-day-col" data-date="${key}">${dayCols[i]}</div>`;
  });

  els.weekWrap.innerHTML = `
    <div class="week-header">${headerHTML}</div>
    <div class="week-body">${bodyHTML}</div>`;

  /* 요일 컬럼 클릭 → 이벤트 추가 모달 (이벤트 칩 클릭은 제외) */
  els.weekWrap.querySelectorAll('.week-day-col').forEach(col => {
    col.addEventListener('click', e => {
      if (e.target.closest('.week-event')) return;
      openModal(col.dataset.date);
    });
  });

  /* 이벤트 칩 클릭 → 상세 팝업 */
  els.weekWrap.querySelectorAll('.week-event[data-id]').forEach(chip => {
    chip.addEventListener('click', e => {
      e.stopPropagation();
      showEventPopup(chip.dataset.id, chip);
    });
  });
}


/* ============================================================
   7. 뷰 전환
   - state.view를 변경하고 해당 컨테이너만 표시합니다.
   - 탭 버튼의 .active 클래스도 함께 갱신합니다.
============================================================ */

/**
 * 지정한 뷰로 전환하고 해당 뷰를 렌더링합니다.
 * @param {'month'|'week'|'list'} view - 전환할 뷰 이름
 */
function switchView(view) {
  state.view = view;

  /* 탭 active 표시: data-view 속성이 일치하는 탭만 active 클래스 부여 */
  document.querySelectorAll('.view-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });

  /* 각 컨테이너의 가시성 제어 */
  els.calendarWrap.classList.toggle('hidden', view !== 'month');
  els.listWrap.classList.toggle('hidden', view !== 'list');
  els.weekWrap.classList.toggle('hidden', view !== 'week');

  /* 활성 뷰 렌더링 */
  if (view === 'month')     renderMonthView();
  else if (view === 'list') renderListView();
  else if (view === 'week') renderWeekView();
}


/* ============================================================
   8. 이벤트 상세 팝업
============================================================ */

/**
 * 이벤트 칩(또는 목록 행) 옆에 상세 팝업을 표시합니다.
 * 팝업 위치는 앵커 요소의 BoundingRect를 기반으로 계산하며,
 * 화면 밖으로 벗어나면 반대 방향으로 보정합니다.
 *
 * @param {string} id       - 표시할 이벤트의 id
 * @param {HTMLElement} anchorEl - 팝업이 붙을 기준 DOM 요소
 */
function showEventPopup(id, anchorEl) {
  const ev = state.events.find(e => e.id === id);
  if (!ev) return;

  state.popupEventId = id;
  const col = CATEGORY_COLOR[ev.category];

  /* 팝업 내용 채우기 */
  els.popupColorBar.style.background = col.bar;
  els.popupTitle.textContent = ev.title;
  els.popupDate.textContent  = formatDateKo(ev.date, ev.time);
  els.popupNote.textContent  = ev.note || '';
  els.popupNote.classList.toggle('hidden', !ev.note); // 메모 없으면 숨김

  /* 팝업 표시 후 실제 크기 측정을 위해 먼저 보이게 함 */
  const popup = els.eventPopup;
  popup.classList.remove('hidden');

  /* 위치 계산: 앵커 요소 오른쪽에 배치, 화면 밖이면 왼쪽으로 */
  const rect = anchorEl.getBoundingClientRect();
  const pw   = popup.offsetWidth  || 260;
  const ph   = popup.offsetHeight || 120;
  const vw   = window.innerWidth;
  const vh   = window.innerHeight;

  let left = rect.right + 8;    // 기본: 앵커 오른쪽에 8px 여백
  let top  = rect.top;

  if (left + pw > vw - 8) left = rect.left - pw - 8; // 오른쪽 초과 → 왼쪽
  if (left < 8)            left = 8;                   // 왼쪽 초과 → 최소 여백
  if (top + ph > vh - 8)  top  = vh - ph - 8;         // 하단 초과 → 위로 올림
  if (top  < 8)            top  = 8;                   // 상단 초과 → 최소 여백

  popup.style.left      = `${left}px`;
  popup.style.top       = `${top}px`;
  popup.style.transform = ''; // 모바일 CSS의 translate 덮어쓰기 방지를 위해 초기화
}

/** 팝업을 닫고 popupEventId를 초기화합니다. */
function closePopup() {
  els.eventPopup.classList.add('hidden');
  state.popupEventId = null;
}


/* ============================================================
   9. 모달 열기 / 닫기
============================================================ */

/**
 * 이벤트 추가 또는 수정 모달을 열어 폼을 초기화합니다.
 *
 * @param {string} dateStr - 기본 날짜 ("YYYY-MM-DD", 추가 시 사용)
 * @param {string|null} editId - 수정할 이벤트 id (추가 시 null)
 */
function openModal(dateStr = '', editId = null) {
  state.editingId = editId;
  closePopup(); // 열려있는 팝업이 있으면 먼저 닫기

  const isEdit = !!editId;
  els.modalTitle.textContent = isEdit ? '이벤트 수정' : '새 이벤트';

  /* 삭제 버튼: 수정 모드에서만 표시 */
  els.btnDelete.classList.toggle('hidden', !isEdit);

  if (isEdit) {
    /* 수정 모드: 기존 이벤트 데이터로 폼 채우기 */
    const ev = state.events.find(e => e.id === editId);
    if (!ev) return;
    els.eventTitle.value = ev.title;
    els.eventDate.value  = ev.date;
    els.eventTime.value  = ev.time || '';
    els.eventNote.value  = ev.note || '';
    /* 해당 카테고리 라디오 버튼 선택 */
    document.querySelector(`input[name="eventCategory"][value="${ev.category}"]`).checked = true;

  } else {
    /* 추가 모드: 폼 초기화 (날짜는 클릭한 날짜 또는 오늘) */
    els.eventTitle.value = '';
    els.eventDate.value  = dateStr || toDateKey(today);
    els.eventTime.value  = '';
    els.eventNote.value  = '';
    document.querySelector('input[name="eventCategory"][value="blue"]').checked = true;
  }

  /* 유효성 에러 표시 초기화 */
  els.eventTitle.classList.remove('error');
  els.titleError.classList.add('hidden');

  /* 모달 표시 후 제목 입력창에 포커스 */
  els.modalBackdrop.classList.remove('hidden');
  els.eventTitle.focus();
}

/** 모달을 닫고 editingId를 초기화합니다. */
function closeModal() {
  els.modalBackdrop.classList.add('hidden');
  state.editingId = null;
}


/* ============================================================
   10. 이벤트 CRUD
============================================================ */

/**
 * 모달 폼의 입력값을 검증하고 이벤트를 추가하거나 수정합니다.
 * 성공 시 events.json에 저장하고 캘린더를 재렌더링합니다.
 *
 * @returns {Promise<void>}
 */
async function saveEvent() {
  /* 제목 유효성 검사 */
  const title = els.eventTitle.value.trim();
  if (!title) {
    els.eventTitle.classList.add('error');
    els.titleError.classList.remove('hidden');
    els.eventTitle.focus();
    return;
  }
  els.eventTitle.classList.remove('error');
  els.titleError.classList.add('hidden');

  /* 선택된 카테고리 라디오 값 읽기 (미선택 시 기본 'blue') */
  const category = document.querySelector('input[name="eventCategory"]:checked')?.value || 'blue';

  /* 저장할 이벤트 객체 구성 */
  const ev = {
    id:       state.editingId || genId(), // 수정이면 기존 id 유지
    title,
    date:     els.eventDate.value,
    time:     els.eventTime.value,
    category,
    note:     els.eventNote.value.trim(),
  };

  if (state.editingId) {
    /* 수정: 기존 이벤트를 찾아 교체 */
    const idx = state.events.findIndex(e => e.id === state.editingId);
    if (idx !== -1) state.events[idx] = ev;
  } else {
    /* 추가: 배열 끝에 삽입 */
    state.events.push(ev);
  }

  try {
    await saveEvents(); // events.json에 덮어쓰기
  } catch (err) {
    alert('저장 중 오류가 발생했습니다.\n' + err.message);
    return; // 저장 실패 시 UI 갱신 중단
  }

  closeModal();
  renderAll(); // 캘린더 전체 재렌더링
}

/**
 * 지정한 id의 이벤트를 삭제하고 events.json을 갱신합니다.
 * 사용자 확인 다이얼로그를 먼저 표시합니다.
 *
 * @param {string} id - 삭제할 이벤트의 id
 * @returns {Promise<void>}
 */
async function deleteEvent(id) {
  /* 실수 삭제 방지를 위한 브라우저 확인 다이얼로그 */
  if (!confirm('이 이벤트를 삭제하시겠습니까?')) return;

  /* 해당 id를 제외한 배열로 교체 */
  state.events = state.events.filter(e => e.id !== id);

  try {
    await saveEvents(); // events.json에 덮어쓰기
  } catch (err) {
    alert('삭제 중 오류가 발생했습니다.\n' + err.message);
    return;
  }

  closeModal();
  closePopup();
  renderAll();
}


/* ============================================================
   11. 전체 렌더링 진입점
   - 헤더, 미니 캘린더, 현재 활성 뷰 세 가지를 순서대로 갱신합니다.
   - 상태가 변경되는 모든 시점(월 이동, 저장, 삭제, 필터 변경)에 호출합니다.
============================================================ */
function renderAll() {
  renderHeader();      // 툴바 연월 텍스트 갱신
  renderMiniCal();     // 사이드바 미니 캘린더 갱신
  switchView(state.view); // 현재 활성 뷰 재렌더링
}


/* ============================================================
   12. 이벤트 리스너 등록
   - DOM 조작 없이 순수하게 이벤트만 바인딩합니다.
============================================================ */

/* ── 툴바: 이전/다음 달 이동 ── */
els.prevMonth.addEventListener('click', () => {
  /* 1월에서 이전으로 이동하면 연도를 감소시키고 12월로 이동 */
  if (state.month === 0) { state.year--; state.month = 11; }
  else state.month--;
  renderAll();
});

els.nextMonth.addEventListener('click', () => {
  /* 12월에서 다음으로 이동하면 연도를 증가시키고 1월로 이동 */
  if (state.month === 11) { state.year++; state.month = 0; }
  else state.month++;
  renderAll();
});

/* ── 미니 캘린더: 이전/다음 달 이동 (툴바와 동기화) ── */
els.miniPrev.addEventListener('click', () => {
  if (state.month === 0) { state.year--; state.month = 11; }
  else state.month--;
  renderAll();
});

els.miniNext.addEventListener('click', () => {
  if (state.month === 11) { state.year++; state.month = 0; }
  else state.month++;
  renderAll();
});

/* ── "오늘" 버튼: 오늘 날짜의 연/월로 복귀 ── */
els.btnToday.addEventListener('click', () => {
  state.year  = today.getFullYear();
  state.month = today.getMonth();
  renderAll();
});

/* ── "+ 새 이벤트" 버튼: 날짜 미선택 상태로 모달 열기 ── */
els.btnAdd.addEventListener('click', () => openModal());

/* ── 보기 전환 탭 ── */
document.querySelectorAll('.view-tab').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});

/* ── 카테고리 필터 체크박스 ── */
document.querySelectorAll('.calendar-item input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', () => {
    const cat = cb.dataset.category;
    /* 체크 해제 → hiddenCats에 추가, 체크 → 제거 */
    if (cb.checked) state.hiddenCats.delete(cat);
    else            state.hiddenCats.add(cat);
    renderAll();
  });
});

/* ── 모달 닫기 ── */
els.modalClose.addEventListener('click', closeModal);
els.btnCancel.addEventListener('click', closeModal);
/* 배경(backdrop)만 클릭했을 때 닫기 (모달 카드 클릭은 제외) */
els.modalBackdrop.addEventListener('click', e => {
  if (e.target === els.modalBackdrop) closeModal();
});

/* ── 모달 저장 ── */
els.btnSave.addEventListener('click', () => saveEvent());

/* ── 모달 삭제 (수정 모드에서만 버튼이 표시됨) ── */
els.btnDelete.addEventListener('click', () => deleteEvent(state.editingId));

/* ── 제목 입력 시 에러 상태 즉시 해제 ── */
els.eventTitle.addEventListener('input', () => {
  if (els.eventTitle.value.trim()) {
    els.eventTitle.classList.remove('error');
    els.titleError.classList.add('hidden');
  }
});

/* ── 제목 입력창에서 Enter 키 → 저장 ── */
els.eventTitle.addEventListener('keydown', e => {
  if (e.key === 'Enter') saveEvent(); // async 함수이나 반환값은 사용하지 않음
});

/* ── 팝업 수정 버튼 → 해당 이벤트 수정 모달 열기 ── */
els.popupEdit.addEventListener('click', () => {
  if (state.popupEventId) openModal('', state.popupEventId);
});

/* ── 팝업 삭제 버튼 → 해당 이벤트 삭제 ── */
els.popupDelete.addEventListener('click', () => {
  if (state.popupEventId) deleteEvent(state.popupEventId);
});

/* ── 팝업 닫기 버튼 ── */
els.popupClose.addEventListener('click', closePopup);

/*
 * ── 팝업 외부 클릭 닫기 ──
 * 이벤트 칩, 목록 행, 주 보기 칩, 팝업 자체를 클릭하면 닫히지 않습니다.
 */
document.addEventListener('click', e => {
  if (!els.eventPopup.classList.contains('hidden') &&
      !els.eventPopup.contains(e.target) &&
      !e.target.closest('.event') &&
      !e.target.closest('.list-event-row') &&
      !e.target.closest('.week-event')) {
    closePopup();
  }
});

/* ── 사이드바 드로어 열기 (모바일 햄버거 버튼) ── */
els.hamburger.addEventListener('click', () => {
  els.sidebar.classList.add('open');
  els.sidebarOverlay.classList.add('open');
});

/* ── 사이드바 닫기 버튼 (모바일) ── */
els.sidebarClose.addEventListener('click', () => {
  els.sidebar.classList.remove('open');
  els.sidebarOverlay.classList.remove('open');
});

/* ── 사이드바 외부(오버레이) 클릭 → 사이드바 닫기 ── */
els.sidebarOverlay.addEventListener('click', () => {
  els.sidebar.classList.remove('open');
  els.sidebarOverlay.classList.remove('open');
});

/* ── ESC 키: 열려있는 모달/팝업 닫기 ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closePopup();
  }
});


/* ============================================================
   13. 초기 실행 (IIFE)
   - 즉시 실행 비동기 함수로 events.json을 로드한 후 첫 렌더링을 수행합니다.
   - fetchEvents()가 실패할 경우 알림 후 빈 캘린더를 표시합니다.
============================================================ */
(async () => {
  try {
    state.events = await fetchEvents();
  } catch (err) {
    console.error('이벤트 로드 실패:', err);
    alert('events.json을 불러오지 못했습니다.\nserver.py가 실행 중인지 확인해주세요.');
    /* 실패해도 빈 캘린더는 표시 (state.events = [] 상태) */
  }
  renderAll();
})();
