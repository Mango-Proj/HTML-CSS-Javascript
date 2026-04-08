// =============================================================
// app.js — ch02_exception_async 인터랙티브 예제
// =============================================================
// [원본 코드] fetchTodo() 와 관련 상수는 그대로 보존됩니다.
// [추가 코드] 섹션 1~5 의 인터랙티브 데모 로직이 추가됩니다.
// =============================================================

// -------------------------------------------------------
// [원본 코드] 기본 상수 & fetchTodo 함수
// -------------------------------------------------------
const url = 'https://jsonplaceholder.typicode.com/todos/1';
const ul  = document.querySelector('#todo-list');

/**
 * [원본 코드] fetchTodo
 * async/await + try/catch/finally 를 사용해
 * jsonplaceholder 에서 todo #1 을 가져와 #todo-list 에 추가합니다.
 */
async function fetchTodo() {
  try {
    console.log("데이터 요청 중...");

    // 1. 서버에 데이터 요청 (네트워크 통신)
    const response = await fetch(url);

    // 응답 상태 확인 (예외 처리 응용)
    if (!response.ok) {
      throw new Error('네트워크 응답이 정상이지 않습니다.');
    }

    // 2. 응답 본문을 JSON 객체로 변환
    const result = await response.json();

    // 3. 구조 분해 할당으로 데이터 추출
    const { userId, id, title, completed } = result;

    // 4. DOM 요소 생성 및 추가
    const li = document.createElement('li');
    li.innerText = `[사용자:${userId}] 번호:${id} - 제목:${title} (완료여부: ${completed})`;
    ul.appendChild(li);

    console.log("데이터 추가 완료!");

  } catch (error) {
    // 비동기 작업 중 발생한 모든 에러를 여기서 처리
    console.error("에러 발생:", error.message);
    const errorMsg = document.createElement('li');
    errorMsg.style.color = 'red';
    errorMsg.innerText = '데이터를 불러오는 데 실패했습니다.';
    ul.appendChild(errorMsg);
  } finally {
    console.log("작업 종료.");
  }
}

// [원본 코드] 페이지 로드 시 자동 실행 → 섹션 4 UI 와 연동
// (index.html 의 #btnFetchOne 버튼 클릭으로도 실행됩니다)
// fetchTodo();   ← 버튼 클릭 방식으로 변경하여 주석 처리


// =============================================================
// [추가 코드] 공통 유틸리티
// =============================================================

/**
 * [추가 코드] 로그 항목을 지정한 <ul> 에 추가합니다.
 * @param {string} listId  - 대상 <ul> 의 id
 * @param {string} text    - 표시할 메시지
 * @param {'info'|'success'|'error'|'warn'} type - 색상 클래스
 */
function appendLog(listId, text, type = 'info') {
  const list = document.getElementById(listId);
  if (!list) return;
  const li = document.createElement('li');
  li.className = `log-${type}`;
  li.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
  list.appendChild(li);
  // 스크롤을 항상 최신 항목으로 이동
  list.scrollTop = list.scrollHeight;
}

/**
 * [추가 코드] XSS 방지용 HTML 이스케이프
 */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


// =============================================================
// [추가 코드] 섹션 1: try / catch / finally & throw
// =============================================================

/**
 * [추가 코드] safeDivide
 * a ÷ b 를 계산합니다.
 * b === 0 이면 throw 로 에러를 발생시켜 catch 가 처리하도록 합니다.
 */
function safeDivide(a, b) {
  // try 블록: 정상 실행을 시도하는 코드
  try {
    appendLog('trycatchLog', `try 블록 진입 → ${a} ÷ ${b} 계산 시도`, 'info');
    highlightBlock('blockTry', true);

    if (b === 0) {
      // 직접 에러를 던져 catch 블록으로 제어를 넘깁니다
      throw new Error('0으로 나눌 수 없습니다! (ZeroDivisionError)');
    }

    const result = a / b;
    appendLog('trycatchLog', `✅ 결과: ${a} ÷ ${b} = ${result}`, 'success');
    highlightBlock('blockTry', false, true);   // 성공 표시
    return result;

  } catch (error) {
    // catch 블록: throw 로 던져진 에러를 받아 처리합니다
    appendLog('trycatchLog', `🔴 catch 블록 실행 → ${error.message}`, 'error');
    highlightBlock('blockTry',   false);
    highlightBlock('blockCatch', true);
    setTimeout(() => highlightBlock('blockCatch', false), 1200);

  } finally {
    // finally 블록: 성공 · 실패와 무관하게 항상 실행됩니다
    appendLog('trycatchLog', '🟢 finally 블록 실행 (항상 실행)', 'warn');
    highlightBlock('blockFinally', true);
    setTimeout(() => highlightBlock('blockFinally', false), 1200);
  }
}

/**
 * [추가 코드] flow-block 의 시각적 활성화/비활성화를 토글합니다.
 */
function highlightBlock(id, on, success = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('active',  on);
  el.classList.toggle('success', success);
}

// [추가 코드] 섹션 1 버튼 이벤트 연결
document.getElementById('btnDivide').addEventListener('click', () => {
  // 모든 블록 초기화
  ['blockTry', 'blockCatch', 'blockFinally'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active', 'success');
  });

  const a = Number(document.getElementById('numA').value);
  const b = Number(document.getElementById('numB').value);
  safeDivide(a, b);
});


// =============================================================
// [추가 코드] 섹션 2: 동기(Sync) vs 비동기(Async) 실행 순서
// =============================================================

/**
 * [추가 코드] 타임라인 블록을 #syncTimeline 에 시각적으로 추가합니다.
 */
function addTimelineBlock(label, colorClass, delayMs = 0) {
  const container = document.getElementById('syncTimeline');
  if (!container) return;
  setTimeout(() => {
    const block = document.createElement('div');
    block.className = `tl-block ${colorClass}`;
    block.textContent = label;
    container.appendChild(block);
  }, delayMs);
}

// [추가 코드] 동기 실행 데모
document.getElementById('btnSync').addEventListener('click', () => {
  document.getElementById('syncTimeline').innerHTML = '';
  document.getElementById('syncLog').innerHTML     = '';

  appendLog('syncLog', '▶ 동기 실행 시작', 'info');

  // 동기: A → B → C 가 순서대로 실행됩니다 (각 작업이 끝나야 다음으로 넘어감)
  appendLog('syncLog', '[1] 작업 A 시작 & 완료', 'success');
  addTimelineBlock('A 완료', 'tl-sync');

  appendLog('syncLog', '[2] 작업 B 시작 & 완료 (A가 끝난 후)', 'success');
  addTimelineBlock('B 완료', 'tl-sync');

  appendLog('syncLog', '[3] 작업 C 시작 & 완료 (B가 끝난 후)', 'success');
  addTimelineBlock('C 완료', 'tl-sync');

  appendLog('syncLog', '✅ 순서 보장: A → B → C', 'info');
});

// [추가 코드] 비동기 실행 데모 (setTimeout)
document.getElementById('btnAsync').addEventListener('click', () => {
  document.getElementById('syncTimeline').innerHTML = '';
  document.getElementById('syncLog').innerHTML     = '';

  appendLog('syncLog', '▶ 비동기 실행 시작 (setTimeout)', 'info');

  // 비동기: setTimeout(B, 1000) 을 만나면 기다리지 않고 C 를 먼저 실행합니다
  appendLog('syncLog', '[1] 작업 A 시작 & 완료', 'success');
  addTimelineBlock('A 완료', 'tl-sync');

  appendLog('syncLog', '[2] 작업 B → setTimeout 1초 예약 (비동기, 기다리지 않음)', 'warn');
  addTimelineBlock('B 예약됨…', 'tl-async');

  // setTimeout 은 콜 스택이 비워진 후 이벤트 루프가 실행합니다
  setTimeout(() => {
    appendLog('syncLog', '[4] 작업 B 완료 (1초 후, C보다 늦게)', 'success');
    addTimelineBlock('B 완료 (1초 후)', 'tl-async-done');
  }, 1000);

  appendLog('syncLog', '[3] 작업 C — B를 기다리지 않고 즉시 실행', 'success');
  addTimelineBlock('C 완료 (B보다 먼저)', 'tl-sync');

  appendLog('syncLog', '⚠️ 실행 순서: A → C → B (비동기로 인해 순서 역전)', 'warn');
});

// [추가 코드] Promise 체이닝 데모
document.getElementById('btnPromiseChain').addEventListener('click', () => {
  document.getElementById('syncTimeline').innerHTML = '';
  document.getElementById('syncLog').innerHTML     = '';

  appendLog('syncLog', '▶ Promise 체이닝 실행', 'info');

  addTimelineBlock('Promise 생성', 'tl-sync');

  // Promise 체이닝: .then() 은 이전 Promise 가 처리된 후에 순서대로 실행됩니다
  Promise.resolve('Step 1')
    .then(val => {
      appendLog('syncLog', `[1] .then() 첫 번째: ${val}`, 'success');
      addTimelineBlock('.then #1', 'tl-sync');
      return 'Step 2';                  // 다음 .then 으로 값을 전달
    })
    .then(val => {
      appendLog('syncLog', `[2] .then() 두 번째: ${val}`, 'success');
      addTimelineBlock('.then #2', 'tl-sync');
      return 'Step 3';
    })
    .then(val => {
      appendLog('syncLog', `[3] .then() 세 번째: ${val}`, 'success');
      addTimelineBlock('.then #3', 'tl-sync');
    })
    .finally(() => {
      appendLog('syncLog', '✅ .finally() — 체이닝 완료', 'info');
      addTimelineBlock('.finally', 'tl-async-done');
    });

  appendLog('syncLog', '← 이 로그는 .then() 보다 먼저 출력됩니다 (마이크로태스크 큐)', 'warn');
});


// =============================================================
// [추가 코드] 섹션 3: Promise 상태 시각화
// =============================================================

// [추가 코드] 현재 열려 있는 Promise 의 resolve / reject 함수를 저장합니다
let _resolve = null;
let _reject  = null;

/**
 * [추가 코드] Promise 상태 카드 UI 를 업데이트합니다.
 */
function setPromiseUI(state) {
  const card   = document.getElementById('promiseCard');
  const stateEl = document.getElementById('promiseState');
  const statusEl = document.getElementById('promiseStatus');

  // 이전 클래스 초기화
  card.classList.remove('pending', 'fulfilled', 'rejected');
  statusEl.className = 'promise-status';

  if (state === 'pending') {
    stateEl.textContent  = '대기 중';
    statusEl.textContent = 'Pending';
    statusEl.classList.add('pending');
    card.classList.add('pending');
  } else if (state === 'fulfilled') {
    stateEl.textContent  = '이행됨';
    statusEl.textContent = 'Fulfilled';
    statusEl.classList.add('fulfilled');
    card.classList.add('fulfilled');
  } else if (state === 'rejected') {
    stateEl.textContent  = '거부됨';
    statusEl.textContent = 'Rejected';
    statusEl.classList.add('rejected');
    card.classList.add('rejected');
  } else {
    stateEl.textContent  = '생성 전';
    statusEl.textContent = '—';
  }
}

/**
 * [추가 코드] .then / .catch / .finally 체인 박스를 강조합니다.
 */
function highlightChain(id, active) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('active', active);
}

// [추가 코드] 새 Promise 생성 버튼
document.getElementById('btnNewPromise').addEventListener('click', () => {
  // 이전 resolve/reject 무효화
  _resolve = null;
  _reject  = null;

  // resolve / reject 버튼 활성화
  document.getElementById('btnResolve').disabled = false;
  document.getElementById('btnReject').disabled  = false;

  // 체인 박스 초기화
  ['chainThen', 'chainCatch', 'chainFinally'].forEach(id => highlightChain(id, false));

  // 새 Promise 생성 — executor 에서 resolve/reject 를 외부 변수에 저장합니다
  const p = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject  = reject;
  });

  setPromiseUI('pending');
  appendLog('promiseLog', '🔵 새 Promise 생성 → 상태: Pending', 'info');

  // .then / .catch / .finally 체이닝 등록
  p.then(value => {
    appendLog('promiseLog', `✅ .then() 실행 → 값: "${value}"`, 'success');
    highlightChain('chainThen', true);
  })
  .catch(reason => {
    appendLog('promiseLog', `🔴 .catch() 실행 → 이유: "${reason}"`, 'error');
    highlightChain('chainCatch', true);
  })
  .finally(() => {
    appendLog('promiseLog', '🟢 .finally() 실행 (항상)', 'warn');
    highlightChain('chainFinally', true);
    // 버튼 다시 비활성화
    document.getElementById('btnResolve').disabled = true;
    document.getElementById('btnReject').disabled  = true;
  });
});

// [추가 코드] resolve 버튼
document.getElementById('btnResolve').addEventListener('click', () => {
  if (!_resolve) return;
  setPromiseUI('fulfilled');
  _resolve('성공 데이터');
  appendLog('promiseLog', 'resolve() 호출 → 상태: Fulfilled', 'success');
});

// [추가 코드] reject 버튼
document.getElementById('btnReject').addEventListener('click', () => {
  if (!_reject) return;
  setPromiseUI('rejected');
  _reject('에러 원인');
  appendLog('promiseLog', 'reject() 호출 → 상태: Rejected', 'error');
});

// [추가 코드] Promise.all 데모
document.getElementById('btnPromiseAll').addEventListener('click', () => {
  appendLog('promiseLog', '▶ Promise.all 시작 (3개 병렬 실행)', 'info');

  // 3개의 Promise 를 동시에 실행합니다
  const p1 = new Promise(res => setTimeout(() => res('결과 A (0.5초)'), 500));
  const p2 = new Promise(res => setTimeout(() => res('결과 B (1초)'),   1000));
  const p3 = new Promise(res => setTimeout(() => res('결과 C (1.5초)'), 1500));

  // Promise.all: 모든 Promise 가 fulfilled 될 때 한 번에 결과를 반환합니다
  // 하나라도 reject 되면 전체가 rejected 됩니다
  Promise.all([p1, p2, p3])
    .then(results => {
      appendLog('promiseLog', `✅ Promise.all 완료 → [${results.join(', ')}]`, 'success');
    })
    .catch(err => {
      appendLog('promiseLog', `🔴 Promise.all 실패 → ${err}`, 'error');
    });
});

// [추가 코드] Promise.race 데모
document.getElementById('btnPromiseRace').addEventListener('click', () => {
  appendLog('promiseLog', '▶ Promise.race 시작 (가장 빠른 것 1개)', 'info');

  const r1 = new Promise(res => setTimeout(() => res('🥇 A (0.8초)'), 800));
  const r2 = new Promise(res => setTimeout(() => res('🥇 B (0.3초)'), 300));   // 가장 빠름
  const r3 = new Promise(res => setTimeout(() => res('🥇 C (1.2초)'), 1200));

  // Promise.race: 가장 먼저 settled(fulfilled 또는 rejected) 된 결과를 반환합니다
  Promise.race([r1, r2, r3])
    .then(winner => {
      appendLog('promiseLog', `✅ Promise.race 승자 → ${winner}`, 'success');
    });
});


// =============================================================
// [추가 코드] 섹션 4: async / await — 향상된 fetchTodo UI
// =============================================================

/**
 * [추가 코드] 로딩 스피너 표시 / 숨김
 */
function setLoading(visible) {
  const el = document.getElementById('loadingIndicator');
  if (!el) return;
  el.classList.toggle('hidden', !visible);
}

/**
 * [추가 코드] fetchTodoById
 * 지정한 ID 의 todo 를 가져와 #todo-list 에 배지 형태로 추가합니다.
 * 원본 fetchTodo() 의 향상된 버전입니다.
 */
async function fetchTodoById(id) {
  const todoUrl = `https://jsonplaceholder.typicode.com/todos/${id}`;
  try {
    setLoading(true);

    const response = await fetch(todoUrl);

    // response.ok 체크 — fetch 는 404 에서도 reject 되지 않으므로 직접 확인합니다
    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }

    const { userId, id: todoId, title, completed } = await response.json();

    // [추가 코드] DOM 요소에 배지 스타일 적용
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
      <span class="todo-badge ${completed ? 'done' : 'todo'}">
        ${completed ? '완료' : '미완료'}
      </span>
      <span class="todo-text">${escHtml(title)}</span>
      <span class="todo-meta">#${todoId} · 사용자 ${userId}</span>
    `;
    ul.appendChild(li);

  } catch (error) {
    const li = document.createElement('li');
    li.className = 'todo-item error';
    li.textContent = `❌ ID ${id} 로드 실패: ${error.message}`;
    ul.appendChild(li);
  } finally {
    setLoading(false);
  }
}

// [추가 코드] 단일 항목 불러오기 버튼 → 원본 fetchTodo 연동 (ID 입력 지원)
document.getElementById('btnFetchOne').addEventListener('click', () => {
  const id = Number(document.getElementById('todoId').value) || 1;
  fetchTodoById(id);
});

// [추가 코드] 범위 병렬 불러오기 버튼
document.getElementById('btnFetchRange').addEventListener('click', async () => {
  const from   = Number(document.getElementById('rangeFrom').value) || 1;
  const to     = Number(document.getElementById('rangeTo').value)   || 5;
  const rangeResult = document.getElementById('rangeResult');

  if (from > to) {
    rangeResult.textContent = '❌ 시작 ID 가 끝 ID 보다 큽니다.';
    rangeResult.classList.remove('hidden');
    return;
  }

  setLoading(true);
  rangeResult.classList.add('hidden');

  try {
    // ID 배열 생성: [from, from+1, ..., to]
    const ids = Array.from({ length: to - from + 1 }, (_, i) => from + i);

    // Promise.all 로 모든 요청을 병렬 실행합니다
    const promises = ids.map(id =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(r => r.ok ? r.json() : Promise.reject(`HTTP ${r.status}`))
    );

    const todos = await Promise.all(promises);

    // 결과를 카드 형태로 표시합니다
    rangeResult.innerHTML = todos.map(t => `
      <div class="range-item ${t.completed ? 'done' : ''}">
        <span class="todo-badge ${t.completed ? 'done' : 'todo'}">${t.completed ? '완료' : '미완료'}</span>
        <span class="todo-text">${escHtml(t.title)}</span>
        <span class="todo-meta">#${t.id}</span>
      </div>
    `).join('');

    rangeResult.classList.remove('hidden');
  } catch (err) {
    rangeResult.textContent = `❌ 에러: ${err}`;
    rangeResult.classList.remove('hidden');
  } finally {
    setLoading(false);
  }
});

// [추가 코드] 목록 초기화 버튼
document.getElementById('btnClearTodo').addEventListener('click', () => {
  ul.innerHTML = '';
  const rangeResult = document.getElementById('rangeResult');
  rangeResult.innerHTML = '';
  rangeResult.classList.add('hidden');
});

// [추가 코드] 페이지 로드 시 원본 fetchTodo 자동 실행 (원본 동작 보존)
fetchTodo();


// =============================================================
// [추가 코드] 섹션 5: Fetch 에러 처리 패턴
// =============================================================

/**
 * [추가 코드] 케이스 결과 박스에 메시지를 표시합니다.
 */
function showCaseResult(id, html, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = html;
  el.className = `case-result case-${type}`;
}

/**
 * [추가 코드] 에러 케이스별 fetch 핸들러 맵
 * - ok      : 정상 요청 → HTTP 200
 * - 404     : 존재하지 않는 리소스 → HTTP 404
 *             fetch 는 reject 하지 않으므로 response.ok 로 확인해야 합니다
 * - network : 잘못된 도메인 → 네트워크 수준에서 실패 → Promise reject
 */
const caseHandlers = {
  ok: async () => {
    const caseUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    appendLog('fetchLog', `▶ 정상 요청: ${caseUrl}`, 'info');
    try {
      const res = await fetch(caseUrl);
      if (!res.ok) throw new Error(`HTTP 오류: ${res.status}`);
      const data = await res.json();
      showCaseResult('caseOk',
        `✅ HTTP ${res.status} OK<br><code>${escHtml(JSON.stringify(data, null, 2))}</code>`,
        'success');
      appendLog('fetchLog', `✅ 정상 응답 HTTP ${res.status}`, 'success');
    } catch (err) {
      showCaseResult('caseOk', `❌ ${escHtml(err.message)}`, 'error');
      appendLog('fetchLog', `🔴 오류: ${err.message}`, 'error');
    }
  },

  '404': async () => {
    // HTTP 404 → fetch 는 reject 하지 않습니다 (response.ok === false)
    const caseUrl = 'https://jsonplaceholder.typicode.com/todos/99999';
    appendLog('fetchLog', `▶ 404 요청: ${caseUrl}`, 'warn');
    try {
      const res = await fetch(caseUrl);

      // ★ 핵심: fetch 는 404 에서도 resolve 됩니다 → response.ok 로 수동 확인
      appendLog('fetchLog', `  response.ok = ${res.ok}, status = ${res.status}`, 'warn');

      if (!res.ok) {
        // response.ok 가 false 이면 명시적으로 throw 해야 catch 로 넘어갑니다
        throw new Error(`HTTP 오류: ${res.status}`);
      }

      const data = await res.json();
      showCaseResult('case404', `✅ ${escHtml(JSON.stringify(data))}`, 'success');
    } catch (err) {
      showCaseResult('case404',
        `⚠️ response.ok 체크로 잡힌 에러<br><code>${escHtml(err.message)}</code>`,
        'warn');
      appendLog('fetchLog', `⚠️ response.ok 로 잡힘: ${err.message}`, 'warn');
    }
  },

  network: async () => {
    // 네트워크 에러 → DNS 실패 등 → fetch 가 직접 reject 합니다
    const caseUrl = 'https://invalid.domain.xyz/api';
    appendLog('fetchLog', `▶ 네트워크 에러 요청: ${caseUrl}`, 'error');
    showCaseResult('caseNetwork', '⏳ 요청 중… (잠시 후 에러 표시)', 'info');
    try {
      await fetch(caseUrl);
    } catch (err) {
      // 네트워크 수준 실패 → fetch 가 자동으로 reject → catch 로 도달합니다
      showCaseResult('caseNetwork',
        `🔴 네트워크 에러 (fetch reject)<br><code>${escHtml(err.message)}</code>`,
        'error');
      appendLog('fetchLog', `🔴 네트워크 에러 (fetch reject): ${err.message}`, 'error');
    }
  }
};

// [추가 코드] 섹션 5 버튼들에 이벤트 위임 적용
document.querySelectorAll('[data-case]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.case;
    if (caseHandlers[key]) caseHandlers[key]();
  });
});
