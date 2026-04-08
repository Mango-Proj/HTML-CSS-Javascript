// =============================================================
// main.js — ch03_data_management 인터랙티브 예제
// =============================================================
// [원본 코드] theme.js를 import 하여 테마를 localStorage에 저장·로드합니다.
// [추가 코드] 섹션 1~5 의 인터랙티브 데모 로직이 추가됩니다.
// =============================================================

// -------------------------------------------------------
// [원본 코드] ES 모듈 import — theme.js에서 내보낸 항목을 가져옵니다
// -------------------------------------------------------
import { saveTheme, loadTheme, THEME_KEY } from './theme.js';

// [원본 코드] body 요소와 테마 버튼 선택
const body     = document.body;
const themeBtn = document.querySelector('#theme-btn');

// [원본 코드] 1. 페이지 로드 시 저장된 테마 적용
//   loadTheme()은 localStorage에서 값을 읽어 반환합니다.
//   값이 없으면 'light'를 기본값으로 반환합니다.
const currentTheme = loadTheme();
body.className = currentTheme;

// [원본 코드] 2. 테마 변경 이벤트
themeBtn.addEventListener('click', () => {
  // 불변성 유지: 기존 테마를 직접 바꾸는 대신 새로운 상태를 결정합니다
  const newTheme = body.className === 'light' ? 'dark' : 'light';

  body.className = newTheme;  // 화면 변경
  saveTheme(newTheme);        // localStorage 저장

  // [추가 코드] 테마 변경 시 섹션 2 UI 업데이트
  updateThemeStatus(newTheme);
  appendLog('moduleLog', `테마 변경 → "${newTheme}" 저장됨 (key: "${THEME_KEY}")`, 'success');
});


// =============================================================
// [추가 코드] 공통 유틸리티
// =============================================================

/**
 * [추가 코드] 로그 항목을 지정한 <ul>에 추가합니다.
 */
function appendLog(listId, text, type = 'info') {
  const list = document.getElementById(listId);
  if (!list) return;
  const li = document.createElement('li');
  li.className = `log-${type}`;
  li.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
  list.prepend(li);   // 최신 항목을 위에 표시
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
// [추가 코드] 섹션 2: 모듈화 — 테마 상태 표시
// =============================================================

/**
 * [추가 코드] 섹션 2의 "현재 테마 / localStorage 저장값" UI를 업데이트합니다.
 */
function updateThemeStatus(theme) {
  const labelEl   = document.getElementById('theme-current-label');
  const storageEl = document.getElementById('theme-storage-value');
  const iconEl    = document.getElementById('theme-icon');
  const textEl    = document.getElementById('theme-label');

  if (labelEl)   labelEl.textContent   = theme;
  if (storageEl) storageEl.textContent = localStorage.getItem(THEME_KEY) ?? '(없음)';

  // 헤더 버튼 아이콘·텍스트도 함께 업데이트
  if (iconEl) iconEl.textContent = theme === 'dark' ? '☀️' : '🌙';
  if (textEl) textEl.textContent = theme === 'dark' ? '라이트 모드' : '다크 모드';
}

// [추가 코드] 페이지 로드 시 초기 상태 반영
updateThemeStatus(currentTheme);
appendLog('moduleLog', `페이지 로드 → loadTheme() = "${currentTheme}" (from localStorage)`, 'info');


// =============================================================
// [추가 코드] 섹션 1: 불변성 (Immutability) 데모
// =============================================================

// [추가 코드] 배열 데모 초기 상태 — reset 시 이 값으로 복원합니다
const INIT_ARR = [1, 2, 3];
let demoArr = [...INIT_ARR];  // 현재 작업용 배열 (초기화 가능하도록 복사본 사용)

// [추가 코드] 객체 데모 초기 상태
const INIT_OBJ = { name: 'Alice', score: 100 };
let demoObj = { ...INIT_OBJ };  // 현재 작업용 객체

/**
 * [추가 코드] 배열 상태 표시 UI 업데이트
 */
function renderArrState(mutated = false, newArr = null) {
  const origEl    = document.getElementById('arr-original');
  const origBox   = document.getElementById('arr-original-box');
  const newBox    = document.getElementById('arr-new-box');
  const newEl     = document.getElementById('arr-new');
  const snippetEl = document.getElementById('arr-snippet');

  if (origEl) origEl.textContent = JSON.stringify(demoArr);

  // 가변 방식: 원본이 바뀌었음을 빨간 테두리로 표시
  if (origBox) {
    origBox.classList.toggle('mutated',   mutated);
    origBox.classList.toggle('preserved', !mutated && newArr !== null);
  }

  if (newArr !== null) {
    // 불변 방식: 새로 생성된 배열 박스 표시
    if (newBox) newBox.classList.remove('hidden');
    if (newEl)  newEl.textContent = JSON.stringify(newArr);
  } else {
    if (newBox) newBox.classList.add('hidden');
  }

  if (snippetEl) snippetEl.classList.toggle('hidden', !mutated && newArr === null);
}

/**
 * [추가 코드] 객체 상태 표시 UI 업데이트
 */
function renderObjState(mutated = false, newObj = null) {
  const origEl  = document.getElementById('obj-original');
  const origBox = document.getElementById('obj-original-box');
  const newBox  = document.getElementById('obj-new-box');
  const newEl   = document.getElementById('obj-new');

  if (origEl) origEl.textContent = JSON.stringify(demoObj);

  if (origBox) {
    origBox.classList.toggle('mutated',   mutated);
    origBox.classList.toggle('preserved', !mutated && newObj !== null);
  }

  if (newObj !== null) {
    if (newBox) newBox.classList.remove('hidden');
    if (newEl)  newEl.textContent = JSON.stringify(newObj);
  } else {
    if (newBox) newBox.classList.add('hidden');
  }
}

// [추가 코드] 배열 가변 방식 버튼
document.getElementById('btn-arr-mutable')?.addEventListener('click', () => {
  const before = JSON.stringify(demoArr);

  // ⚠️ 가변 방식: push()는 원본 배열을 직접 수정합니다
  demoArr.push(demoArr.length + 1);

  const snippetEl = document.getElementById('arr-snippet');
  if (snippetEl) {
    snippetEl.textContent = `demoArr.push(${demoArr.at(-1)});  // 원본 배열이 변경됨!`;
    snippetEl.classList.remove('hidden');
  }

  renderArrState(true, null);
  appendLog('immutableLog',
    `⚠️ 가변(push): ${before} → ${JSON.stringify(demoArr)} (원본 변경됨!)`, 'error');
});

// [추가 코드] 배열 불변 방식 버튼
document.getElementById('btn-arr-immutable')?.addEventListener('click', () => {
  const original = JSON.stringify(demoArr);

  // ✅ 불변 방식: spread 연산자로 새 배열을 생성 — 원본은 그대로 유지됩니다
  const newArr = [...demoArr, demoArr.length + 1];

  const snippetEl = document.getElementById('arr-snippet');
  if (snippetEl) {
    snippetEl.textContent =
      `const newArr = [...demoArr, ${newArr.at(-1)}];  // 새 배열 생성, 원본 보존`;
    snippetEl.classList.remove('hidden');
  }

  renderArrState(false, newArr);
  appendLog('immutableLog',
    `✅ 불변(spread): 원본 ${original} 보존 → 새 배열 ${JSON.stringify(newArr)}`, 'success');
});

// [추가 코드] 배열 초기화 버튼
document.getElementById('btn-arr-reset')?.addEventListener('click', () => {
  demoArr = [...INIT_ARR];
  const snippetEl = document.getElementById('arr-snippet');
  if (snippetEl) snippetEl.classList.add('hidden');
  renderArrState(false, null);
  appendLog('immutableLog', `↩ 배열 초기화 → ${JSON.stringify(INIT_ARR)}`, 'info');
});

// [추가 코드] 객체 가변 방식 버튼
document.getElementById('btn-obj-mutable')?.addEventListener('click', () => {
  const before = JSON.stringify(demoObj);

  // ⚠️ 가변 방식: 프로퍼티 직접 수정 — 원본 객체가 변경됩니다
  demoObj.score = demoObj.score + 50;

  renderObjState(true, null);
  appendLog('immutableLog',
    `⚠️ 가변(직접 수정): ${before} → ${JSON.stringify(demoObj)} (원본 변경됨!)`, 'error');
});

// [추가 코드] 객체 불변 방식 버튼
document.getElementById('btn-obj-immutable')?.addEventListener('click', () => {
  const original = JSON.stringify(demoObj);

  // ✅ 불변 방식: spread로 기존 프로퍼티를 복사하고, 변경할 값만 덮어씁니다
  const newObj = { ...demoObj, score: demoObj.score + 50 };

  renderObjState(false, newObj);
  appendLog('immutableLog',
    `✅ 불변(spread): 원본 ${original} 보존 → 새 객체 ${JSON.stringify(newObj)}`, 'success');
});

// [추가 코드] 객체 초기화 버튼
document.getElementById('btn-obj-reset')?.addEventListener('click', () => {
  demoObj = { ...INIT_OBJ };
  renderObjState(false, null);
  appendLog('immutableLog', `↩ 객체 초기화 → ${JSON.stringify(INIT_OBJ)}`, 'info');
});

// [추가 코드] 초기 상태 렌더링
renderArrState(false, null);
renderObjState(false, null);


// =============================================================
// [추가 코드] 스토리지 공통 유틸리티 (localStorage / sessionStorage 공용)
// =============================================================

/**
 * [추가 코드] 스토리지의 모든 항목을 테이블로 렌더링합니다.
 * @param {Storage} storage    - localStorage 또는 sessionStorage
 * @param {string}  wrapperId  - 테이블을 삽입할 컨테이너 id
 */
function renderStorageTable(storage, wrapperId) {
  const wrap = document.getElementById(wrapperId);
  if (!wrap) return;

  if (storage.length === 0) {
    wrap.innerHTML = '<p class="empty-msg">저장된 항목이 없습니다.</p>';
    return;
  }

  // storage.key(i)로 모든 키 수집
  const keys = Array.from({ length: storage.length }, (_, i) => storage.key(i));

  const rows = keys.map(key => `
    <tr>
      <td>${escHtml(key)}</td>
      <td>${escHtml(storage.getItem(key) ?? '')}</td>
      <td>
        <button class="btn btn-sm btn-danger"
                data-storage-remove="${escHtml(key)}">삭제</button>
      </td>
    </tr>
  `).join('');

  wrap.innerHTML = `
    <table class="storage-table">
      <thead>
        <tr><th>키 (Key)</th><th>값 (Value)</th><th>액션</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;

  // 각 행의 삭제 버튼에 이벤트 등록 (이벤트 위임 패턴)
  wrap.querySelectorAll('[data-storage-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.storageRemove;
      storage.removeItem(key);
      renderStorageTable(storage, wrapperId);
    });
  });
}

/**
 * [추가 코드] 스토리지 CRUD 버튼 이벤트를 일괄 등록합니다.
 * localStorage와 sessionStorage가 동일한 API를 사용하므로 공통 함수로 처리합니다.
 *
 * @param {Storage} storage   - 대상 스토리지 객체
 * @param {string}  prefix    - DOM id 접두사 ('ls' 또는 'ss')
 * @param {string}  logId     - 로그 <ul> id
 */
function bindStorageEvents(storage, prefix, logId) {
  const keyInput   = document.getElementById(`${prefix}-key`);
  const valInput   = document.getElementById(`${prefix}-value`);
  const tableId    = `${prefix}-table`;
  const resultId   = `${prefix}-get-result`;

  // --- setItem ---
  document.getElementById(`btn-${prefix}-set`)?.addEventListener('click', () => {
    const key = keyInput?.value.trim();
    const val = valInput?.value.trim();
    if (!key) { appendLog(logId, '키를 입력하세요.', 'warn'); return; }

    storage.setItem(key, val);
    appendLog(logId, `setItem("${key}", "${val}") → 저장 완료`, 'success');
    renderStorageTable(storage, tableId);

    // 테마 변경 시 섹션 2 상태도 갱신
    if (key === THEME_KEY) updateThemeStatus(val);
    if (keyInput)  keyInput.value  = '';
    if (valInput)  valInput.value  = '';
  });

  // --- getItem ---
  document.getElementById(`btn-${prefix}-get`)?.addEventListener('click', () => {
    const key = keyInput?.value.trim();
    if (!key) { appendLog(logId, '키를 입력하세요.', 'warn'); return; }

    const val    = storage.getItem(key);
    const result = document.getElementById(resultId);

    if (val === null) {
      appendLog(logId, `getItem("${key}") → null (키 없음)`, 'warn');
      if (result) {
        result.textContent = `"${key}" → null (존재하지 않는 키)`;
        result.classList.remove('hidden');
      }
    } else {
      appendLog(logId, `getItem("${key}") → "${val}"`, 'success');
      if (result) {
        result.textContent = `"${key}" → "${val}"`;
        result.classList.remove('hidden');
      }
    }
  });

  // --- removeItem ---
  document.getElementById(`btn-${prefix}-remove`)?.addEventListener('click', () => {
    const key = keyInput?.value.trim();
    if (!key) { appendLog(logId, '키를 입력하세요.', 'warn'); return; }

    storage.removeItem(key);
    appendLog(logId, `removeItem("${key}") → 삭제 완료`, 'warn');
    renderStorageTable(storage, tableId);

    const result = document.getElementById(resultId);
    if (result) result.classList.add('hidden');
    if (keyInput) keyInput.value = '';
  });

  // --- clear ---
  document.getElementById(`btn-${prefix}-clear`)?.addEventListener('click', () => {
    if (!confirm('모든 항목을 삭제합니다. 계속할까요?')) return;
    storage.clear();
    appendLog(logId, 'clear() → 모든 항목 삭제', 'error');
    renderStorageTable(storage, tableId);

    const result = document.getElementById(resultId);
    if (result) result.classList.add('hidden');
  });

  // 초기 렌더링
  renderStorageTable(storage, tableId);
}


// =============================================================
// [추가 코드] 섹션 3: localStorage CRUD 이벤트 등록
// =============================================================
bindStorageEvents(localStorage, 'ls', 'lsLog');


// =============================================================
// [추가 코드] 섹션 4: sessionStorage CRUD 이벤트 등록
// =============================================================
bindStorageEvents(sessionStorage, 'ss', 'ssLog');


// =============================================================
// [추가 코드] 섹션 5: Cookie 데모
// =============================================================

/**
 * [추가 코드] setCookie
 * 이름·값·유효 일수로 쿠키를 저장합니다.
 * cookie_example.js의 기본 예시를 함수로 추상화한 버전입니다.
 *
 * @param {string} name  - 쿠키 이름
 * @param {string} value - 쿠키 값
 * @param {number} days  - 유효 일수 (0 이면 세션 쿠키)
 */
function setCookie(name, value, days) {
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/`;

  if (days > 0) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    cookieStr += `; expires=${expires.toUTCString()}`;
  }

  // document.cookie는 덮어쓰는 게 아니라 해당 이름의 쿠키를 추가·수정합니다
  document.cookie = cookieStr;
}

/**
 * [추가 코드] getAllCookies
 * document.cookie 문자열을 파싱해 { name: value } 객체로 반환합니다.
 * document.cookie는 "name1=val1; name2=val2" 형태의 문자열을 반환합니다.
 */
function getAllCookies() {
  const cookies = {};
  if (!document.cookie) return cookies;

  document.cookie.split(';').forEach(pair => {
    const [rawName, ...rest] = pair.split('=');
    const name  = decodeURIComponent(rawName.trim());
    const value = decodeURIComponent(rest.join('=').trim());
    if (name) cookies[name] = value;
  });

  return cookies;
}

/**
 * [추가 코드] deleteCookie
 * expires를 과거 시간으로 설정하면 브라우저가 해당 쿠키를 즉시 삭제합니다.
 * path를 setCookie와 동일하게 맞춰야 삭제가 정상 동작합니다.
 */
function deleteCookie(name) {
  document.cookie =
    `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

/**
 * [추가 코드] 쿠키 목록을 UI에 렌더링합니다.
 */
function renderCookieList() {
  const wrap    = document.getElementById('cookie-list');
  if (!wrap) return;

  const cookies = getAllCookies();
  const entries = Object.entries(cookies);

  if (entries.length === 0) {
    wrap.innerHTML = '<p class="empty-msg">저장된 쿠키가 없습니다.</p>';
    return;
  }

  wrap.innerHTML = entries.map(([name, value]) => `
    <div class="cookie-item">
      <span class="cookie-name">${escHtml(name)}</span>
      <span class="cookie-eq">=</span>
      <span class="cookie-val">${escHtml(value)}</span>
      <button class="btn btn-sm btn-danger"
              data-cookie-delete="${escHtml(name)}">삭제</button>
    </div>
  `).join('');

  // 쿠키 항목별 삭제 버튼 이벤트
  wrap.querySelectorAll('[data-cookie-delete]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.cookieDelete;
      deleteCookie(name);
      appendLog('cookieLog', `쿠키 삭제: "${name}"`, 'warn');
      renderCookieList();
    });
  });
}

// [추가 코드] 쿠키 저장 버튼
document.getElementById('btn-cookie-set')?.addEventListener('click', () => {
  const name  = document.getElementById('cookie-name')?.value.trim();
  const value = document.getElementById('cookie-value')?.value.trim();
  const days  = Number(document.getElementById('cookie-days')?.value) || 7;

  if (!name) { appendLog('cookieLog', '쿠키 이름을 입력하세요.', 'warn'); return; }

  setCookie(name, value, days);
  appendLog('cookieLog',
    `setCookie("${name}", "${value}", ${days}일) → document.cookie 에 추가`, 'success');
  renderCookieList();

  // 입력 초기화
  const nameInput  = document.getElementById('cookie-name');
  const valueInput = document.getElementById('cookie-value');
  if (nameInput)  nameInput.value  = '';
  if (valueInput) valueInput.value = '';
});

// [추가 코드] 쿠키 삭제 버튼 (이름 직접 입력)
document.getElementById('btn-cookie-delete')?.addEventListener('click', () => {
  const name = document.getElementById('cookie-delete-name')?.value.trim();
  if (!name) { appendLog('cookieLog', '삭제할 쿠키 이름을 입력하세요.', 'warn'); return; }

  deleteCookie(name);
  appendLog('cookieLog', `deleteCookie("${name}") → expires를 과거로 설정하여 삭제`, 'warn');
  renderCookieList();

  const input = document.getElementById('cookie-delete-name');
  if (input) input.value = '';
});

// [추가 코드] 쿠키 목록 새로고침 버튼
document.getElementById('btn-cookie-refresh')?.addEventListener('click', () => {
  renderCookieList();
  appendLog('cookieLog', '목록 새로고침 → document.cookie 재파싱', 'info');
});

// [추가 코드] 초기 쿠키 목록 렌더링
renderCookieList();
