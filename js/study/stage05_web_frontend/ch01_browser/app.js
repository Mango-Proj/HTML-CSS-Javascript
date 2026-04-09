/**
 * example.js — ch01_browser 학습 예제 스크립트
 * ================================================
 * index.html의 <script defer src="example.js"> 로 로드됩니다.
 * defer 덕분에 HTML 파싱이 완료된 후 실행되므로,
 * DOMContentLoaded 없이도 모든 DOM 요소에 안전하게 접근할 수 있습니다.
 *
 * 섹션별 담당 코드:
 *   섹션 1 — DocumentFragment & 이벤트 위임  (원본 코드 + 초기화 버튼 추가)
 *   섹션 2 — 리플로우 / 리페인트 / 컴포지트  (추가 코드)
 *   섹션 3 — 이벤트 전파 시각화              (추가 코드)
 *   섹션 4 — 이벤트 위임 심화 (할 일 목록)   (추가 코드)
 *   섹션 5 — async vs defer 안내 메시지      (추가 코드)
 */

'use strict';

/* ============================================================
   [원본 코드] 섹션 1: DocumentFragment & 이벤트 위임
   ─────────────────────────────────────────────────────────
   - DOMContentLoaded 이벤트를 사용합니다.
     defer 스크립트는 DOMContentLoaded 직전에 실행되므로
     이 리스너는 즉시 동작합니다.
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('myList');
  const btn  = document.getElementById('addBtn');

  // [원본 코드] 이벤트 위임: 부모인 list에서 자식 li 클릭을 감지합니다.
  // 나중에 동적으로 추가된 li에도 별도 리스너 없이 작동합니다.
  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      // [원본 코드] classList.toggle로 클래스 하나만 변경 → 리페인트(색상)만 유발
      e.target.classList.toggle('active');
    }
  });

  // [원본 코드] DocumentFragment로 리플로우를 1회로 줄이는 패턴
  btn.addEventListener('click', () => {
    // [원본 코드] 메모리 상의 임시 컨테이너 생성 (실제 DOM과 연결되지 않음)
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 5; i++) {
      const li = document.createElement('li');
      li.textContent = `새로운 항목 ${i + 1}`;
      // [원본 코드] fragment에 추가 — 아직 DOM에 없으므로 리플로우 없음
      fragment.appendChild(li);
    }

    // [원본 코드] 실제 DOM 반영은 단 1회! → 리플로우 1번만 발생
    list.appendChild(fragment);
  });
});

/* ============================================================
   [추가 코드] 섹션 1 보조: 초기화 버튼
   ─────────────────────────────────────────────────────────
   추가된 항목을 지우고 초기 상태(A, B, C)로 되돌립니다.
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const list     = document.getElementById('myList');
  const resetBtn = document.getElementById('resetBtn');

  // 초기 항목 텍스트를 고정값으로 기억
  const INITIAL_ITEMS = ['항목 A', '항목 B', '항목 C'];

  resetBtn.addEventListener('click', () => {
    // 기존 내용 제거 후 초기 항목으로 재구성 (Fragment 활용)
    list.innerHTML = '';
    const frag = document.createDocumentFragment();
    INITIAL_ITEMS.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      frag.appendChild(li);
    });
    list.appendChild(frag);
  });
});


/* ============================================================
   [추가 코드] 섹션 2: 리플로우 vs 리페인트 vs 컴포지트
   ─────────────────────────────────────────────────────────
   각 버튼을 클릭하면 서로 다른 렌더링 단계가 유발됩니다.
   - btnReflow    : width 변경 → Layout(리플로우) → Paint → Composite
   - btnRepaint   : 배경색 변경(classList) → Paint → Composite
   - btnComposite : transform 이동 → Composite 만 (GPU 레이어)
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const boxReflow    = document.getElementById('boxReflow');
  const boxRepaint   = document.getElementById('boxRepaint');
  const boxComposite = document.getElementById('boxComposite');
  const btnReflow    = document.getElementById('btnReflow');
  const btnRepaint   = document.getElementById('btnRepaint');
  const btnComposite = document.getElementById('btnComposite');
  const logList      = document.getElementById('reflowLogList');

  /**
   * 로그 박스에 메시지를 추가하는 헬퍼입니다.
   * @param {string} msg       — 표시할 텍스트
   * @param {string} cssClass  — 색상 클래스 (log-reflow 등)
   */
  function addLog(msg, cssClass) {
    const li = document.createElement('li');
    li.textContent = msg;
    li.className   = cssClass;
    // 최신 로그를 맨 위로 (unshift 방식으로 prepend)
    logList.prepend(li);
    // 로그가 8개를 넘으면 오래된 항목 제거
    if (logList.children.length > 8) {
      logList.removeChild(logList.lastChild);
    }
  }

  // ── 리플로우 버튼 ──
  btnReflow.addEventListener('click', () => {
    /*
     * [추가 코드] width를 변경하면 주변 요소의 위치·크기도 다시 계산해야 합니다.
     * 브라우저는 Layout(리플로우) → Paint → Composite 순으로 모두 재실행합니다.
     * (비용이 가장 큽니다)
     */
    boxReflow.classList.toggle('reflow-active');
    const expanded = boxReflow.classList.contains('reflow-active');
    addLog(
      `🔴 리플로우: width ${expanded ? '70px → 140px' : '140px → 70px'} (Layout + Paint + Composite)`,
      'log-reflow'
    );
  });

  // ── 리페인트 버튼 ──
  btnRepaint.addEventListener('click', () => {
    /*
     * [추가 코드] classList 토글로 배경색만 변경합니다.
     * 크기·위치가 바뀌지 않으므로 Layout(리플로우)은 건너뜁니다.
     * Paint → Composite 만 재실행됩니다.
     */
    boxRepaint.classList.toggle('repaint-active');
    const isActive = boxRepaint.classList.contains('repaint-active');
    addLog(
      `🟡 리페인트: background-color 변경 (Paint + Composite, Layout 생략)`,
      'log-repaint'
    );
  });

  // ── 컴포지트 버튼 ──
  btnComposite.addEventListener('click', () => {
    /*
     * [추가 코드] transform은 GPU 컴포지트 레이어에서만 처리됩니다.
     * Layout(리플로우)도, Paint(리페인트)도 발생하지 않습니다.
     * 가장 비용이 낮은 애니메이션 방법입니다.
     */
    boxComposite.classList.toggle('composite-active');
    addLog(
      `🟢 컴포지트: transform 이동 (Composite 만, Layout·Paint 생략)`,
      'log-composite'
    );
  });
});


/* ============================================================
   [추가 코드] 섹션 3: 이벤트 전파 시각화
   ─────────────────────────────────────────────────────────
   세 개의 중첩 박스(outer > middle > inner)에 리스너를 달고,
   캡처링/버블링 모드를 토글하며 전파 순서를 로그로 확인합니다.

   핵심 개념:
     addEventListener(type, handler, { capture: true })
       → 캡처링 단계(위에서 아래)에서 실행
     addEventListener(type, handler)  // 기본값 capture: false
       → 버블링 단계(아래에서 위)에서 실행
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const propOuter    = document.getElementById('propOuter');
  const propMiddle   = document.getElementById('propMiddle');
  const propInner    = document.getElementById('propInner');
  const captureToggle = document.getElementById('captureToggle');
  const stopToggle   = document.getElementById('stopToggle');
  const clearBtn     = document.getElementById('clearPropLog');
  const propLogList  = document.getElementById('propLogList');

  // 등록된 리스너를 재등록하기 위해 참조를 보관합니다.
  let currentListeners = [];

  /**
   * 전파 로그에 메시지를 추가합니다.
   * @param {string} msg      — 표시할 텍스트
   * @param {string} phase    — 'capture' | 'bubble' | 'target'
   */
  function addPropLog(msg, phase) {
    const classMap = { capture: 'log-capture', bubble: 'log-bubble', target: 'log-target' };
    const li = document.createElement('li');
    li.textContent = msg;
    li.className   = classMap[phase] || '';
    propLogList.prepend(li);
    if (propLogList.children.length > 10) {
      propLogList.removeChild(propLogList.lastChild);
    }
  }

  /**
   * 박스 클릭 시 시각적 깜빡임 효과를 줍니다.
   * 전파 경로를 눈으로 확인하기 쉽도록 합니다.
   * @param {HTMLElement} el
   */
  function flash(el) {
    el.classList.remove('prop-flash');
    // [추가 코드] reflow를 강제로 발생시켜 animation을 재시작합니다.
    // (animation을 제거 후 추가만 하면 브라우저가 변경을 무시할 수 있음)
    void el.offsetWidth;
    el.classList.add('prop-flash');
  }

  /**
   * 리스너를 해제하고 현재 토글 설정에 맞게 재등록합니다.
   * capture 체크박스 변경 시 호출됩니다.
   */
  function rebindListeners() {
    // 기존 리스너 해제
    currentListeners.forEach(({ el, fn, opts }) => {
      el.removeEventListener('click', fn, opts);
    });
    currentListeners = [];

    const useCapture = captureToggle.checked;
    const useStop    = stopToggle.checked;

    /**
     * 각 박스용 클릭 핸들러를 생성합니다.
     * @param {string} name    — 박스 이름 (outer / middle / inner)
     * @param {HTMLElement} el — 박스 DOM 요소
     */
    function makeHandler(name, el) {
      return function (e) {
        // 어느 단계인지 판단
        let phase;
        if (e.target === el) {
          phase = 'target';         // 이벤트가 발생한 바로 그 요소
        } else if (useCapture) {
          phase = 'capture';        // 부모에서 자식으로 내려가는 중
        } else {
          phase = 'bubble';         // 자식에서 부모로 올라오는 중
        }

        const phaseLabel = { target: '🎯 타깃', capture: '🔽 캡처링', bubble: '🔼 버블링' };
        addPropLog(`${phaseLabel[phase]} → ${name}`, phase);
        flash(el);

        // stopPropagation 옵션이 켜져 있으면 전파를 여기서 중단합니다.
        if (useStop) {
          e.stopPropagation();
          addPropLog(`  ⛔ stopPropagation() 호출 — 전파 중단`, phase);
        }
      };
    }

    const items = [
      { el: propOuter,  name: 'outer (빨강)' },
      { el: propMiddle, name: 'middle (초록)' },
      { el: propInner,  name: 'inner (파랑)' },
    ];

    items.forEach(({ el, name }) => {
      const fn   = makeHandler(name, el);
      const opts = { capture: useCapture };
      el.addEventListener('click', fn, opts);
      // 나중에 해제하기 위해 참조 저장
      currentListeners.push({ el, fn, opts });
    });
  }

  // 초기 바인딩
  rebindListeners();

  // 캡처링/stopPropagation 토글 변경 시 리스너 재등록
  captureToggle.addEventListener('change', rebindListeners);
  stopToggle.addEventListener('change', rebindListeners);

  // 로그 초기화 버튼
  clearBtn.addEventListener('click', () => {
    propLogList.innerHTML = '';
  });
});


/* ============================================================
   [추가 코드] 섹션 4: 이벤트 위임 심화 — 할 일 목록
   ─────────────────────────────────────────────────────────
   리스너는 #taskList 하나에만 등록합니다.
   버블링 덕분에 동적으로 추가된 항목의 버튼 클릭도 처리됩니다.

   data-action 속성으로 어떤 버튼인지 분기합니다.
     data-action="done"   → 완료 처리 (line-through)
     data-action="delete" → 항목 DOM에서 제거
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const taskList  = document.getElementById('taskList');
  const taskInput = document.getElementById('taskInput');
  const taskAddBtn = document.getElementById('taskAddBtn');
  let   nextId    = 100; // 새 항목의 data-id 시작값

  /**
   * 할 일 항목 <li> HTML 문자열을 생성합니다.
   * innerHTML 대신 DOM API를 사용하여 XSS를 방지합니다.
   * @param {number} id   — 항목 고유 id
   * @param {string} text — 할 일 내용
   * @returns {HTMLElement}
   */
  function createTaskItem(id, text) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = id;

    const span = document.createElement('span');
    span.className   = 'task-text';
    span.textContent = text;  // textContent: HTML 이스케이프 자동 처리

    const btnWrap  = document.createElement('div');
    btnWrap.className = 'task-btns';

    const doneBtn = document.createElement('button');
    doneBtn.className   = 'btn btn-sm btn-success';
    doneBtn.dataset.action = 'done';
    doneBtn.textContent = '완료';

    const delBtn = document.createElement('button');
    delBtn.className    = 'btn btn-sm btn-danger';
    delBtn.dataset.action = 'delete';
    delBtn.textContent  = '삭제';

    btnWrap.appendChild(doneBtn);
    btnWrap.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(btnWrap);
    return li;
  }

  // ── 이벤트 위임 핵심 리스너 ──
  // #taskList 부모 하나에만 등록 → 동적 추가 항목도 모두 처리
  taskList.addEventListener('click', (e) => {
    // data-action 속성을 가진 버튼을 찾아 올라갑니다. (closest 활용)
    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return; // 버튼 이외 영역 클릭 시 무시

    const action = actionBtn.dataset.action;
    // 버튼의 부모 <li> 항목 탐색
    const item = actionBtn.closest('.task-item');
    if (!item) return;

    if (action === 'done') {
      // 완료 토글: .done 클래스를 추가/제거
      item.classList.toggle('done');
      actionBtn.textContent = item.classList.contains('done') ? '취소' : '완료';
    }

    if (action === 'delete') {
      // 부드럽게 사라지는 효과 후 DOM에서 제거
      item.style.transition = 'opacity 0.25s';
      item.style.opacity    = '0';
      setTimeout(() => item.remove(), 250);
    }
  });

  // ── 항목 추가 로직 ──
  function addTask() {
    const text = taskInput.value.trim();
    if (!text) {
      taskInput.focus();
      return;
    }
    const item = createTaskItem(nextId++, text);
    taskList.appendChild(item);
    taskInput.value = '';
    taskInput.focus();
  }

  taskAddBtn.addEventListener('click', addTask);

  // Enter 키로도 추가 가능
  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
  });
});


/* ============================================================
   [추가 코드] 섹션 5: async vs defer 안내 메시지
   ─────────────────────────────────────────────────────────
   이 스크립트 자체가 defer로 로드됩니다.
   performance.timing을 이용해 로드 시점 정보를 표시합니다.
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const msgEl = document.getElementById('scriptLoadMsg');
  if (!msgEl) return;

  /*
   * Navigation Timing Level 2 API (performance.timing은 deprecated)
   * getEntriesByType('navigation')[0]으로 페이지 로드 타이밍을 가져옵니다.
   */
  const navEntry = performance.getEntriesByType('navigation')[0];
  const elapsed  = navEntry
    ? Math.round(navEntry.domContentLoadedEventEnd)
    : '?';

  msgEl.innerHTML =
    `✅ 이 페이지는 <code>&lt;script <strong>defer</strong> src="example.js"&gt;</code>로 로드됩니다.<br>
     DOM 파싱 완료까지 <strong>${elapsed}ms</strong> 소요 — HTML 파싱 차단 없이 스크립트가 실행됐습니다.`;
});
