/* ============================================================
   DOM 마스터 가이드 — app.js
   5가지 핵심 DOM 조작 개념을 인터랙티브 예제로 구현합니다.

   1. 요소 선택       — getElementById, querySelector, querySelectorAll
   2. 콘텐츠 조작     — textContent, innerHTML, innerText
   3. classList 조작  — add, remove, toggle, contains
   4. 속성 & 스타일   — getAttribute, setAttribute, dataset, element.style
   5. 노드 생성 & 삭제 — createElement, appendChild, removeChild
============================================================ */


/* ── 공통 유틸리티 ──────────────────────────────────────────
   appendLog: 각 섹션의 로그 영역에 메시지를 출력하는 헬퍼 함수
   - logId  : 로그를 표시할 <div> 요소의 id
   - message: 출력할 메시지 문자열
   - type   : 'info' | 'success' | 'warn' | 'error' (색상 결정)
──────────────────────────────────────────────────────────── */
function appendLog(logId, message, type = 'info') {
  const logEl = document.getElementById(logId);

  // 새 줄 요소 생성
  const line = document.createElement('div');
  line.className = `log-line log-${type}`;
  line.textContent = message;

  logEl.appendChild(line);

  // 로그가 너무 많아지면 가장 오래된 줄 자동 제거 (최대 5줄 유지)
  while (logEl.children.length > 5) {
    logEl.removeChild(logEl.firstChild);
  }
}

/* 로그 영역 초기화 헬퍼 */
function clearLog(logId) {
  document.getElementById(logId).innerHTML = '';
}


/* ============================================================
   Section 1. 요소 선택 (Selection)
   DOM에서 원하는 HTML 요소를 찾아오는 세 가지 방법
============================================================ */

/**
 * getElementById — id로 요소 하나를 선택
 *
 * 가장 빠른 선택 방법. id는 페이지 전체에서 유일해야 하므로
 * 항상 단 하나의 요소를 반환합니다 (없으면 null).
 */
function selectById() {
  // 이전 선택 상태 초기화
  resetSelect();

  // id가 "box-target"인 요소를 찾아 highlighted 스타일 추가
  const el = document.getElementById('box-target');
  el.classList.add('selected');

  appendLog('select-log', `getElementById('box-target') → 요소 1개 선택됨`, 'success');
  appendLog('select-log', `tagName: ${el.tagName}, id: ${el.id}`, 'info');
}

/**
 * querySelector — CSS 선택자로 첫 번째 일치 요소 하나를 선택
 *
 * CSS에서 쓰는 .클래스, #아이디, 태그명 등 모든 선택자를 그대로 사용합니다.
 * 여러 개가 있어도 첫 번째만 반환합니다.
 */
function selectByQuery() {
  resetSelect();

  // CSS 선택자 '.highlight-me' → 클래스가 highlight-me인 요소 중 첫 번째만 선택
  const el = document.querySelector('.highlight-me');
  el.classList.add('selected');

  appendLog('select-log', `querySelector('.highlight-me') → 첫 번째 요소만 선택`, 'success');
  appendLog('select-log', `querySelector는 여러 개 중 첫 번째만 반환합니다`, 'warn');
}

/**
 * querySelectorAll — CSS 선택자로 일치하는 모든 요소를 NodeList로 반환
 *
 * 반환값은 NodeList(유사 배열)이므로 forEach로 순회할 수 있습니다.
 * 하지만 일반 배열의 map, filter 등은 직접 사용 불가.
 * → Array.from(nodeList)으로 배열로 변환 후 사용 가능
 */
function selectAllByQuery() {
  resetSelect();

  // CSS 선택자 '.highlight-me' → 클래스가 highlight-me인 요소 전부를 NodeList로 반환
  const elements = document.querySelectorAll('.highlight-me');

  // NodeList는 forEach 지원 → 각 요소에 selected 클래스 추가
  elements.forEach(el => el.classList.add('selected'));

  appendLog('select-log', `querySelectorAll('.highlight-me') → ${elements.length}개 모두 선택`, 'success');
  appendLog('select-log', `반환값은 NodeList (유사 배열), forEach로 순회 가능`, 'info');
}

/* 선택 초기화: 모든 .selected 클래스 제거 */
function resetSelect() {
  document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
  clearLog('select-log');
}


/* ============================================================
   Section 2. 콘텐츠 조작
   textContent / innerHTML / innerText — 세 가지의 차이
============================================================ */

// 원본 HTML을 기억해둔다 → 초기화 시 복원에 사용
const ORIGINAL_CONTENT_HTML = document.getElementById('content-target')?.innerHTML || '';

/**
 * textContent — 요소의 모든 텍스트를 순수 문자열로 읽고 씁니다.
 *
 * 특징:
 * - HTML 태그를 무시하고 텍스트만 읽습니다.
 * - 숨겨진 요소(display:none)의 텍스트도 읽습니다.
 * - 쓸 때 HTML 태그를 그대로 문자열로 표시합니다 (태그가 렌더링되지 않음).
 * - XSS(크로스 사이트 스크립팅) 공격에 안전합니다.
 */
function changeTextContent() {
  const el = document.getElementById('content-target');

  // textContent로 쓰면 HTML 태그가 문자 그대로 표시됨 (<b>는 굵게 되지 않음)
  el.textContent = 'textContent로 변경했습니다. <b>이 태그는 문자로 표시됩니다.</b>';

  appendLog('content-log', 'textContent 변경: HTML 태그를 텍스트로 표시', 'info');
  appendLog('content-log', '→ <b> 태그가 렌더링되지 않고 문자 그대로 보임', 'warn');
}

/**
 * innerHTML — 요소 내부의 HTML 전체를 읽고 씁니다.
 *
 * 특징:
 * - HTML 태그가 실제로 렌더링됩니다.
 * - 사용자 입력값을 그대로 넣으면 XSS 공격에 취약합니다.
 *   → 사용자 입력은 반드시 검증 후 사용해야 합니다.
 */
function changeInnerHTML() {
  const el = document.getElementById('content-target');

  // innerHTML로 쓰면 HTML 태그가 실제 요소로 렌더링됨
  el.innerHTML = 'innerHTML로 변경: <strong style="color:#6366f1">굵은 텍스트</strong>와 <em>기울임</em>이 실제로 렌더링됩니다.';

  appendLog('content-log', 'innerHTML 변경: HTML 태그가 실제로 렌더링됨', 'success');
  appendLog('content-log', '⚠️ 사용자 입력값 삽입 시 XSS 공격 위험 주의', 'warn');
}

/**
 * innerText — 화면에 실제로 보이는 텍스트만 읽습니다.
 *
 * textContent와의 차이:
 * - innerText: display:none인 요소는 읽지 않습니다. (사람 눈에 보이는 것만)
 * - textContent: 숨겨진 요소도 전부 읽습니다. (DOM에 있는 모든 텍스트)
 */
function readInnerText() {
  // 먼저 원본으로 복원
  document.getElementById('content-target').innerHTML = ORIGINAL_CONTENT_HTML;

  const el = document.getElementById('content-target');
  const text = el.innerText.trim();

  appendLog('content-log', `innerText 읽기 결과: "${text}"`, 'success');
  appendLog('content-log', '→ display:none 텍스트는 읽히지 않음', 'info');
}

/**
 * textContent로 읽기 — innerText와 비교용
 */
function readTextContent() {
  document.getElementById('content-target').innerHTML = ORIGINAL_CONTENT_HTML;

  const el = document.getElementById('content-target');
  const text = el.textContent.trim();

  appendLog('content-log', `textContent 읽기 결과: "${text}"`, 'success');
  appendLog('content-log', '→ 숨겨진 텍스트(display:none)까지 모두 포함', 'warn');
}

/* 콘텐츠 초기화 */
function resetContent() {
  document.getElementById('content-target').innerHTML = ORIGINAL_CONTENT_HTML;
  clearLog('content-log');
}


/* ============================================================
   Section 3. classList 조작
   add / remove / toggle / contains
============================================================ */

/* 현재 클래스 목록을 화면에 표시하는 헬퍼 */
function updateClassDisplay() {
  const el = document.getElementById('class-target');
  // classList는 DOMTokenList 객체 → Array.from으로 배열 변환 후 join
  const classes = Array.from(el.classList).join(', ');
  document.getElementById('class-display').textContent = classes;
}

/**
 * classList.add() — 클래스 추가
 * 이미 해당 클래스가 있어도 중복 추가되지 않습니다.
 */
function addClass() {
  const el = document.getElementById('class-target');

  el.classList.add('active'); // active 클래스 추가
  updateClassDisplay();

  appendLog('class-log', `classList.add('active') 실행`, 'success');
  appendLog('class-log', `현재 클래스: ${Array.from(el.classList).join(', ')}`, 'info');
}

/**
 * classList.remove() — 클래스 제거
 * 없는 클래스를 제거해도 오류가 나지 않습니다.
 */
function removeClass() {
  const el = document.getElementById('class-target');

  el.classList.remove('active'); // active 클래스 제거
  updateClassDisplay();

  appendLog('class-log', `classList.remove('active') 실행`, 'warn');
  appendLog('class-log', `현재 클래스: ${Array.from(el.classList).join(', ')}`, 'info');
}

/**
 * classList.toggle() — 클래스 토글 (있으면 제거, 없으면 추가)
 * 다크 모드 스위치, 메뉴 열기/닫기처럼 on/off 전환에 매우 유용합니다.
 */
function toggleClass() {
  const el = document.getElementById('class-target');

  // toggle: active가 없으면 추가(true 반환), 있으면 제거(false 반환)
  const added = el.classList.toggle('active');
  updateClassDisplay();

  if (added) {
    appendLog('class-log', `classList.toggle('active') → 추가됨 (toggle 반환값: true)`, 'success');
  } else {
    appendLog('class-log', `classList.toggle('active') → 제거됨 (toggle 반환값: false)`, 'warn');
  }
}

/**
 * classList.contains() — 클래스 포함 여부 확인
 * 조건부 처리에 사용합니다. (if문과 함께 자주 사용)
 */
function checkContains() {
  const el = document.getElementById('class-target');

  // contains: 해당 클래스가 있으면 true, 없으면 false 반환
  const hasActive = el.classList.contains('active');

  if (hasActive) {
    appendLog('class-log', `classList.contains('active') → true (클래스 있음)`, 'success');
  } else {
    appendLog('class-log', `classList.contains('active') → false (클래스 없음)`, 'warn');
  }
}

/* classList 초기화 */
function resetClass() {
  const el = document.getElementById('class-target');
  el.classList.remove('active');
  updateClassDisplay();
  clearLog('class-log');
}


/* ============================================================
   Section 4. 속성 & 스타일 조작
   getAttribute / setAttribute / dataset / element.style
============================================================ */

/**
 * setAttribute() — HTML 속성값을 변경합니다.
 * setAttribute('속성명', '값') 으로 어떤 속성이든 변경 가능합니다.
 */
function setAttr() {
  const link = document.getElementById('demo-link');

  // href 속성을 변경
  link.setAttribute('href', 'https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model');
  link.textContent = '변경된 링크 (MDN 문서)';

  appendLog('attr-log', `setAttribute('href', 'https://mdn...') 실행`, 'success');
  appendLog('attr-log', `링크 텍스트와 href가 변경됨`, 'info');
}

/**
 * getAttribute() — HTML 속성값을 읽어옵니다.
 * setAttribute로 설정한 값이나 HTML에 직접 작성한 속성을 읽을 수 있습니다.
 */
function getAttr() {
  const link = document.getElementById('demo-link');

  // href 속성 읽기
  const href = link.getAttribute('href');

  appendLog('attr-log', `getAttribute('href') → "${href}"`, 'success');
}

/**
 * dataset — data-* 커스텀 속성을 읽습니다.
 *
 * HTML에서 data-author="김개발" 처럼 data- 로 시작하는 속성을 붙여두면
 * JavaScript에서 element.dataset.author로 읽을 수 있습니다.
 * (data-author → dataset.author, data-my-key → dataset.myKey 처럼 카멜케이스로 변환)
 */
function readDataset() {
  const card = document.getElementById('attr-card');

  // data-author → dataset.author
  // data-category → dataset.category
  const author   = card.dataset.author;
  const category = card.dataset.category;

  appendLog('attr-log', `dataset.author → "${author}"`, 'success');
  appendLog('attr-log', `dataset.category → "${category}"`, 'success');
  appendLog('attr-log', `HTML의 data-author, data-category 속성에서 읽어옴`, 'info');
}

/**
 * element.style — CSS 속성을 JavaScript에서 직접 변경합니다.
 *
 * CSS 속성명은 카멜케이스로 작성합니다.
 * (CSS: background-color → JS: backgroundColor)
 * 특정 요소에 임시로 스타일을 적용할 때 사용합니다.
 * 여러 스타일을 한 번에 바꿀 때는 classList 방식이 더 권장됩니다.
 */
function changeStyle() {
  const el = document.getElementById('style-target');

  // CSS 속성명을 카멜케이스로: background-color → backgroundColor
  el.style.backgroundColor = '#fef3c7';  // 노란빛 배경
  el.style.borderColor     = '#f59e0b';  // 노란빛 테두리
  el.style.color           = '#92400e';  // 진한 갈색 글씨
  el.style.fontWeight      = '700';

  appendLog('attr-log', `style.backgroundColor = '#fef3c7' 적용`, 'success');
  appendLog('attr-log', `CSS 속성명은 카멜케이스 사용: background-color → backgroundColor`, 'info');
}

/* 속성 초기화 */
function resetAttr() {
  const link = document.getElementById('demo-link');
  link.setAttribute('href', '#');
  link.textContent = '원래 링크 텍스트';

  const el = document.getElementById('style-target');
  el.style.backgroundColor = '';
  el.style.borderColor     = '';
  el.style.color           = '';
  el.style.fontWeight      = '';

  clearLog('attr-log');
}


/* ============================================================
   Section 5. 노드 생성 & 삭제 (신호등)
   createElement / appendChild / removeChild
============================================================ */

/**
 * createElement() + appendChild() — 새 요소를 만들어 DOM에 추가합니다.
 *
 * 요소를 만드는 3단계:
 * 1. createElement('태그명')  — 메모리에서 새 요소 생성
 * 2. 내용 및 속성 설정         — textContent, className 등 설정
 * 3. appendChild(요소)         — 부모 요소에 자식으로 연결 (이때 화면에 보임)
 */
function addGreenLight() {
  const parent = document.getElementById('traffic-light');

  // Step 1: 새 <li> 요소를 메모리에 생성 (아직 화면에 없음)
  const listItem = document.createElement('li');

  // Step 2: 텍스트 내용 설정 + 클래스 추가
  listItem.textContent = '🟢 초록불';
  listItem.classList.add('light', 'green'); // 'light'와 'green' 클래스 동시 추가

  // Step 3: 부모 요소에 자식으로 연결 → 이 시점에 화면에 나타남
  parent.appendChild(listItem);

  appendLog('node-log', `createElement('li') + appendChild → 초록불 추가됨`, 'success');
  appendLog('node-log', `현재 신호등 수: ${parent.children.length}개`, 'info');
}

/**
 * querySelector() + removeChild() — 요소를 찾아 DOM에서 제거합니다.
 *
 * removeChild(자식노드): 부모 노드에서 특정 자식 노드를 제거합니다.
 * 제거된 노드는 메모리에서 사라지지 않고 반환됩니다 (재사용 가능).
 */
function removeYellowLight() {
  const parent = document.getElementById('traffic-light');

  // .yellow 클래스를 가진 첫 번째 요소 찾기
  const yellow = parent.querySelector('.yellow');

  if (yellow) {
    // parent.removeChild(yellow): 부모에서 해당 자식 요소 제거
    parent.removeChild(yellow);
    appendLog('node-log', `querySelector('.yellow') + removeChild → 노란불 제거됨`, 'warn');
    appendLog('node-log', `현재 신호등 수: ${parent.children.length}개`, 'info');
  } else {
    // 요소가 없을 때는 오류 대신 사용자에게 안내
    appendLog('node-log', `제거할 노란불이 없습니다!`, 'error');
  }
}

/* 신호등 초기화: 기존 항목 모두 제거 후 원래 상태로 복원 */
function resetTraffic() {
  const parent = document.getElementById('traffic-light');

  // 모든 자식 제거
  parent.innerHTML = '';

  // 원래 항목 다시 생성
  const items = [
    { text: '🔴 빨간불', cls: 'red' },
    { text: '🟡 노란불', cls: 'yellow' },
  ];

  items.forEach(({ text, cls }) => {
    const li = document.createElement('li');
    li.textContent = text;
    li.classList.add('light', cls);
    parent.appendChild(li);
  });

  clearLog('node-log');
  appendLog('node-log', `신호등이 초기 상태(빨간불, 노란불)로 복원됨`, 'info');
}
