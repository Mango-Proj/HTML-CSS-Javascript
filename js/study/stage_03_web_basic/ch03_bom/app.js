/* ============================================================
   BOM & Window 완벽 가이드 — app.js
   5가지 핵심 BOM 개념을 인터랙티브 예제로 구현합니다.

   1. Window & BOM 정보   — navigator / screen / window 크기
   2. 대화 상자           — alert / confirm / prompt
   3. Location & 스크롤  — location 속성 / scrollTo / scrollBy / history
   4. 타이머             — setTimeout / clearTimeout / setInterval / clearInterval
   5. 점심 메뉴 뽑기     — 원본 코드 (setTimeout + confirm + window.open)
============================================================ */


/* ── 공통 유틸리티 ──────────────────────────────────────────── */
function appendLog(logId, message, type = 'info') {
  const logEl = document.getElementById(logId);
  const line  = document.createElement('div');
  line.className   = `log-line log-${type}`;
  line.textContent = message;
  logEl.appendChild(line);

  // 최대 6줄 유지
  while (logEl.children.length > 6) {
    logEl.removeChild(logEl.firstChild);
  }
}

function clearLog(logId) {
  document.getElementById(logId).innerHTML = '';
}


/* ============================================================
   Section 1. Window & BOM 기본 정보

   BOM(Browser Object Model)의 주요 객체:
   - window   : 브라우저 창 전체. 모든 전역 변수·함수는 사실 window의 속성
   - navigator: 브라우저·운영체제·언어 등 환경 정보
   - screen   : 사용자 모니터의 물리적 해상도 정보
   - location : 현재 URL 정보 (Section 3에서 별도 다룸)
   - history  : 방문 기록 (앞/뒤 이동)
============================================================ */

/**
 * BOM 정보를 읽어 화면의 info-grid에 카드 형태로 표시합니다.
 * 페이지 로드 시 자동 실행되고 "정보 새로고침" 버튼으로도 실행됩니다.
 */
function renderBomInfo() {
  const grid = document.getElementById('bom-info-grid');
  grid.innerHTML = ''; // 기존 카드 초기화

  // 표시할 BOM 정보 목록 (label: 화면 표시 이름, value: 실제 값)
  const items = [
    // navigator 객체 — 브라우저·환경 정보
    {
      label: 'navigator.language',
      value: navigator.language,
      desc: '브라우저의 현재 언어 설정',
    },
    {
      label: 'navigator.onLine',
      value: String(navigator.onLine),  // boolean → 문자열 변환
      desc: '인터넷 연결 여부 (true/false)',
    },
    {
      label: 'navigator.platform',
      value: navigator.platform || '확인 불가',
      desc: '운영체제 플랫폼 (deprecated)',
    },

    // screen 객체 — 물리적 모니터 해상도
    {
      label: 'screen.width × height',
      value: `${screen.width} × ${screen.height}px`,
      desc: '모니터의 물리적 해상도',
    },
    {
      label: 'screen.availWidth',
      value: `${screen.availWidth}px`,
      desc: '작업표시줄 제외 사용 가능한 너비',
    },

    // window 객체 — 브라우저 뷰포트 크기
    {
      label: 'window.innerWidth × Height',
      value: `${window.innerWidth} × ${window.innerHeight}px`,
      desc: '스크롤바 포함 브라우저 창 크기',
    },
    {
      label: 'window.devicePixelRatio',
      value: String(window.devicePixelRatio),
      desc: '물리 픽셀 / CSS 픽셀 비율 (레티나: 2)',
    },
    {
      label: 'window.scrollY',
      value: `${Math.round(window.scrollY)}px`,
      desc: '현재 세로 스크롤 위치',
    },
  ];

  // 각 항목을 카드로 만들어 그리드에 추가
  items.forEach(({ label, value, desc }) => {
    const card = document.createElement('div');
    card.className = 'info-item';
    card.innerHTML = `
      <span class="info-label">${label}</span>
      <span class="info-value mono">${value}</span>
      <span style="font-size:0.72rem;color:#94a3b8;">${desc}</span>
    `;
    grid.appendChild(card);
  });

  appendLog('info-log', `BOM 정보 읽기 완료 (${items.length}개 항목)`, 'success');
  appendLog('info-log', `window.scrollY: ${Math.round(window.scrollY)}px`, 'info');
}

// 페이지 로드 시 즉시 실행
renderBomInfo();

// "정보 새로고침" 버튼 — 스크롤 위치 등 변화된 값 다시 읽기
document.getElementById('btn-refresh-info').addEventListener('click', function () {
  renderBomInfo();
});


/* ============================================================
   Section 2. 대화 상자 (Dialog)

   세 가지 내장 팝업 창:
   - alert(메시지)        : 확인 버튼만 있는 안내 창. 반환값 없음(undefined).
   - confirm(메시지)      : 확인(true) / 취소(false)를 선택하는 창.
   - prompt(메시지, 기본) : 텍스트를 입력받는 창. 입력값(string) 또는 null 반환.

   공통 특징: 실행되는 동안 JavaScript 실행이 일시 정지됩니다. (동기/블로킹)
   현업에서는 디자인 커스터마이즈가 불가능해 잘 쓰이지 않고,
   대신 모달(Modal) 컴포넌트를 직접 만들어 사용합니다.
============================================================ */
const dialogResult = document.getElementById('dialog-result');

/* alert — 단순 안내 메시지 */
document.getElementById('btn-alert').addEventListener('click', function () {
  // alert()는 반환값이 없음. 사용자가 확인을 눌러야 다음 줄이 실행됨.
  window.alert('안녕하세요!\nalert() 창입니다.\n확인을 눌러야 이 창이 닫힙니다.');

  // alert() 이후 코드: 사용자가 확인을 누른 뒤에야 실행됨
  appendLog('dialog-log', 'alert → 확인 클릭 후 이 줄이 실행됨 (동기 블로킹)', 'info');
});

/* confirm — 확인(true) / 취소(false) 선택 */
document.getElementById('btn-confirm').addEventListener('click', function () {
  // confirm()은 사용자가 확인을 누르면 true, 취소·닫기를 누르면 false 반환
  const result = window.confirm('confirm() 창입니다.\n확인을 누르면 true, 취소는 false 반환');

  // 결과를 화면에 표시
  dialogResult.style.display = 'block';
  dialogResult.textContent   = `confirm() 반환값: ${result} (${result ? '확인 클릭' : '취소 클릭'})`;

  appendLog('dialog-log', `confirm → ${result} (${result ? '확인' : '취소'})`, result ? 'success' : 'warn');
});

/* prompt — 사용자 텍스트 입력 받기 */
document.getElementById('btn-prompt').addEventListener('click', function () {
  // prompt(안내 메시지, 기본값)
  // 확인 클릭 → 입력한 문자열 반환 (빈 채로 확인해도 "" 빈 문자열 반환)
  // 취소·닫기 → null 반환
  const name = window.prompt('이름을 입력하세요:', '홍길동');

  if (name === null) {
    // 취소 또는 창 닫기
    dialogResult.style.display = 'block';
    dialogResult.textContent   = 'prompt() → null (취소 클릭)';
    appendLog('dialog-log', 'prompt → null (취소 또는 창 닫기)', 'warn');
  } else {
    dialogResult.style.display = 'block';
    dialogResult.textContent   = `prompt() 반환값: "${name}" (${name.length}자)`;
    appendLog('dialog-log', `prompt → "${name || '(빈 문자열)'}" 입력됨`, 'success');
  }
});


/* ============================================================
   Section 3. Location & 스크롤

   location 객체 — 현재 URL 정보를 담고 있는 객체
   예시 URL: https://example.com:8080/path/page?query=hello#section

   location.href     → "https://example.com:8080/path/page?query=hello#section"  전체 URL
   location.protocol → "https:"                 통신 프로토콜
   location.hostname → "example.com"            도메인명
   location.port     → "8080"                   포트 (기본 포트면 빈 문자열)
   location.pathname → "/path/page"             경로
   location.search   → "?query=hello"           쿼리스트링
   location.hash     → "#section"               해시(앵커)

   주요 메서드:
   location.reload()         → 현재 페이지 새로고침
   location.href = 'url'     → 다른 URL로 이동 (뒤로가기 기록 남음)
   location.replace('url')   → 다른 URL로 이동 (뒤로가기 기록 안 남음)

   window 스크롤 메서드:
   window.scrollTo(x, y)     → 절대 좌표로 이동
   window.scrollBy(x, y)     → 현재 위치에서 상대적으로 이동
============================================================ */

/**
 * 현재 URL 정보를 파싱해 url-grid에 표시합니다.
 */
function renderLocationInfo() {
  const grid = document.getElementById('url-grid');
  grid.innerHTML = '';

  // location 객체의 각 속성을 읽어서 카드로 표시
  const urlParts = [
    { key: 'location.href',     val: location.href },
    { key: 'location.protocol', val: location.protocol },
    { key: 'location.hostname', val: location.hostname || '(file:// 환경)' },
    { key: 'location.pathname', val: location.pathname },
    { key: 'location.search',   val: location.search   || '(없음)' },
    { key: 'location.hash',     val: location.hash     || '(없음)' },
  ];

  urlParts.forEach(({ key, val }) => {
    const item = document.createElement('div');
    item.className = 'url-item';
    const isEmpty = val === '(없음)' || val === '(file:// 환경)';
    item.innerHTML = `
      <div class="url-key">${key}</div>
      <div class="url-val ${isEmpty ? 'empty' : ''}">${val}</div>
    `;
    grid.appendChild(item);
  });
}

// 페이지 로드 시 URL 정보 표시
renderLocationInfo();

// history.length 표시
document.getElementById('history-length').textContent =
  `history.length: ${history.length}페이지`;

/* 스크롤 — scrollTo: 절대 좌표로 이동 */
document.getElementById('btn-scroll-top').addEventListener('click', function () {
  // scrollTo(x좌표, y좌표) — (0, 0)은 페이지 맨 위
  window.scrollTo({ top: 0, behavior: 'smooth' }); // smooth: 부드럽게 이동
  appendLog('location-log', 'window.scrollTo({ top: 0, behavior: "smooth" }) — 맨 위로 이동', 'success');
});

/* 스크롤 — scrollBy: 현재 위치에서 상대적으로 이동 */
document.getElementById('btn-scroll-down').addEventListener('click', function () {
  // scrollBy(x이동량, y이동량) — 현재 위치 기준 상대 이동
  window.scrollBy({ top: 300, behavior: 'smooth' });
  appendLog('location-log', 'window.scrollBy({ top: 300, behavior: "smooth" }) — 300px 아래로', 'info');
});

/* location.reload — 페이지 새로고침 */
document.getElementById('btn-reload').addEventListener('click', function () {
  // confirm으로 실수 방지 (새로고침 시 이 데모 상태가 초기화됨)
  const ok = confirm('페이지를 새로고침합니다. 입력한 데이터가 초기화됩니다. 계속할까요?');
  if (ok) {
    appendLog('location-log', 'location.reload() 실행 — 페이지 새로고침', 'warn');
    location.reload(); // 현재 페이지를 다시 로드
  } else {
    appendLog('location-log', '새로고침 취소됨', 'info');
  }
});

/* history.back / forward */
document.getElementById('btn-history-back').addEventListener('click', function () {
  // history.back(): 브라우저 뒤로 가기 버튼과 동일
  history.back();
  appendLog('location-log', 'history.back() 실행 — 이전 페이지로 이동', 'warn');
});

document.getElementById('btn-history-forward').addEventListener('click', function () {
  // history.forward(): 브라우저 앞으로 가기 버튼과 동일
  history.forward();
  appendLog('location-log', 'history.forward() 실행 — 다음 페이지로 이동', 'info');
});


/* ============================================================
   Section 4. 타이머 (Timer)

   setTimeout(콜백, 지연ms)
   - 지정한 시간(ms) 후 콜백 함수를 딱 한 번 실행합니다.
   - 반환값(ID)을 clearTimeout(ID)에 전달하면 실행 전에 취소할 수 있습니다.
   - 비동기로 동작: 타이머를 등록해두고 다른 코드가 계속 실행됩니다.

   setInterval(콜백, 간격ms)
   - 지정한 간격마다 콜백 함수를 계속 반복 실행합니다.
   - 반환값(ID)을 clearInterval(ID)에 전달하면 반복을 중단할 수 있습니다.
============================================================ */

/* ── setTimeout 데모 ──────────────────────────────────────── */
let timeoutId       = null;  // setTimeout이 반환하는 ID (취소에 필요)
let countdownTimer  = null;  // 화면 카운트다운용 setInterval ID
let remainingSeconds = 0;

const countdownDisplay = document.getElementById('countdown-display');
const btnStartTimeout  = document.getElementById('btn-start-timeout');
const btnCancelTimeout = document.getElementById('btn-cancel-timeout');

btnStartTimeout.addEventListener('click', function () {
  // 이미 실행 중이면 중복 시작 방지
  if (timeoutId !== null) return;

  const DELAY = 3000; // 3초 (단위: 밀리초 = 1/1000초)
  remainingSeconds = DELAY / 1000;

  // 버튼 상태 변경
  btnStartTimeout.disabled  = true;
  btnCancelTimeout.disabled = false;
  countdownDisplay.classList.add('running');

  // --- 카운트다운 표시용 setInterval (1초마다 화면 업데이트) ---
  countdownTimer = setInterval(function () {
    remainingSeconds--;
    countdownDisplay.textContent = `${remainingSeconds}초 후 실행...`;
    if (remainingSeconds <= 0) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  }, 1000);

  // --- 실제 setTimeout: 3초 후 딱 한 번 실행 ---
  timeoutId = setTimeout(function () {
    // 타이머 완료 후 상태 복원
    clearInterval(countdownTimer);
    countdownTimer = null;
    timeoutId      = null;

    countdownDisplay.textContent = '✅ 실행됨!';
    countdownDisplay.classList.remove('running');
    countdownDisplay.classList.add('done');

    btnStartTimeout.disabled  = false;
    btnCancelTimeout.disabled = true;

    appendLog('timer-log', 'setTimeout 콜백 실행 완료! (3000ms 경과)', 'success');

    // 2초 후 디스플레이 초기화
    setTimeout(() => {
      countdownDisplay.textContent = '대기 중';
      countdownDisplay.classList.remove('done');
    }, 2000);

  }, DELAY);

  appendLog('timer-log', `setTimeout(fn, ${DELAY}) 등록됨 — ID: ${timeoutId}`, 'info');
});

btnCancelTimeout.addEventListener('click', function () {
  if (timeoutId === null) return;

  // clearTimeout: 아직 실행되지 않은 setTimeout을 취소
  clearTimeout(timeoutId);
  clearInterval(countdownTimer);

  timeoutId      = null;
  countdownTimer = null;

  countdownDisplay.textContent = '취소됨';
  countdownDisplay.classList.remove('running');

  btnStartTimeout.disabled  = false;
  btnCancelTimeout.disabled = true;

  appendLog('timer-log', 'clearTimeout() → setTimeout 취소됨 (콜백 실행 안 됨)', 'warn');

  // 1.5초 후 복원
  setTimeout(() => { countdownDisplay.textContent = '대기 중'; }, 1500);
});

/* ── setInterval 스톱워치 데모 ──────────────────────────── */
let intervalId = null; // setInterval이 반환하는 ID
let swSeconds  = 0;    // 경과 초수

const stopwatchDisplay = document.getElementById('stopwatch');
const btnStartSw       = document.getElementById('btn-start-sw');
const btnStopSw        = document.getElementById('btn-stop-sw');
const btnResetSw       = document.getElementById('btn-reset-sw');

/**
 * 초(seconds)를 "MM:SS" 형식 문자열로 변환합니다.
 * padStart(2, '0'): 한 자리 숫자 앞에 '0' 채우기 (예: 5 → '05')
 */
function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

btnStartSw.addEventListener('click', function () {
  // 이미 실행 중이면 중복 시작 방지
  if (intervalId !== null) return;

  // setInterval: 1000ms(1초)마다 콜백 반복 실행
  intervalId = setInterval(function () {
    swSeconds++;
    stopwatchDisplay.textContent = formatTime(swSeconds);
  }, 1000);

  stopwatchDisplay.classList.add('running');
  btnStartSw.disabled = true;
  btnStopSw.disabled  = false;

  appendLog('timer-log', `setInterval(fn, 1000) 등록됨 — ID: ${intervalId}`, 'info');
});

btnStopSw.addEventListener('click', function () {
  if (intervalId === null) return;

  // clearInterval: 반복 실행 중단 (ID 전달 필수)
  clearInterval(intervalId);
  intervalId = null;

  stopwatchDisplay.classList.remove('running');
  btnStartSw.disabled = false;
  btnStopSw.disabled  = true;

  appendLog('timer-log', `clearInterval() → 스톱워치 정지 (${formatTime(swSeconds)} 경과)`, 'warn');
});

btnResetSw.addEventListener('click', function () {
  // 실행 중이면 먼저 정지
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }

  swSeconds = 0;
  stopwatchDisplay.textContent = '00:00';
  stopwatchDisplay.classList.remove('running');
  btnStartSw.disabled = false;
  btnStopSw.disabled  = true;

  appendLog('timer-log', '스톱워치 초기화 (00:00)', 'info');
});


/* ============================================================
   Section 5. 점심 메뉴 뽑기

   [원본 코드] — 기존 app.js의 pickMenu()를 보존하고
   timer-badge로 5초 카운트다운 시각화를 추가합니다.
============================================================ */

// [원본 코드] 점심 메뉴 배열
const lunches = [
  '짜장면', '짬뽕', '샐러드', '포케', '순대국밥',
  '김밥', '치킨', '피자', '파스타', '초밥', '샌드위치'
];

let lunchTimerId   = null; // 진행 중인 타이머 ID (중복 방지용)
let badgeCountdown = null; // 배지 카운트다운용 interval ID

function pickMenu() {
  // 이미 타이머가 진행 중이면 무시 (중복 방지)
  if (lunchTimerId !== null) {
    appendLog('lunch-log', '이미 타이머가 실행 중입니다!', 'warn');
    return;
  }

  const box = document.getElementById('container');

  // [원본 코드] 랜덤 인덱스 생성 및 메뉴 선택
  const randomIndex  = Math.floor(Math.random() * lunches.length); // [원본 코드]
  const selectedMenu = lunches[randomIndex];                        // [원본 코드]

  // [원본 코드] 화면에 선택된 메뉴 표시
  box.innerText = `오늘의 추천 메뉴는: ${selectedMenu} 🍽`;        // [원본 코드]
  box.classList.add('picked');

  appendLog('lunch-log', `메뉴 선택됨: "${selectedMenu}"`, 'success');
  appendLog('lunch-log', '5초 후 지도 검색 여부를 묻습니다...', 'info');

  // [원본 코드] 네이버 지도 검색 URL 생성
  const searchUrl = 'https://map.naver.com/v5/search/' + selectedMenu; // [원본 코드]

  // 배지에 5초 카운트다운 표시 (추가 코드)
  const badge = document.getElementById('timer-badge');
  let countdown = 5;
  badge.textContent = `⏱ ${countdown}초 후 지도 검색 여부를 묻습니다`;
  badge.style.display = 'block';

  badgeCountdown = setInterval(function () {
    countdown--;
    if (countdown > 0) {
      badge.textContent = `⏱ ${countdown}초 후 지도 검색 여부를 묻습니다`;
    } else {
      clearInterval(badgeCountdown);
      badgeCountdown = null;
      badge.style.display = 'none';
    }
  }, 1000);

  // [원본 코드] 5초 후에 새 창으로 지도 열기 (비동기 처리)
  lunchTimerId = setTimeout(() => {                                   // [원본 코드]
    lunchTimerId = null;

    // [원본 코드] confirm으로 지도 이동 여부 확인
    const isConfirm = confirm(`${selectedMenu} 맛집을 검색할까요?`); // [원본 코드]
    if (isConfirm) {
      window.open(searchUrl, '_blank');                               // [원본 코드]
      appendLog('lunch-log', `window.open() → 네이버 지도에서 "${selectedMenu}" 검색`, 'success');
    } else {
      appendLog('lunch-log', '지도 검색을 취소했습니다.', 'warn');
    }

    box.classList.remove('picked');
  }, 5000);                                                           // [원본 코드]
}
