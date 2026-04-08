'use strict';
/**
 * app.js — 메모보드 메인 스크립트
 * =================================
 * ch01 · ch02 · ch03 학습 내용을 하나의 앱에서 사용합니다.
 *
 * [ch01] DocumentFragment  → render() 함수의 DOM 일괄 삽입
 * [ch01] 이벤트 위임        → memo-list의 삭제 버튼 처리
 * [ch02] async / await     → fetchSuggestion() 함수
 * [ch02] fetch + response.ok → HTTP 오류 감지
 * [ch02] try / catch / finally → 에러 처리 흐름
 * [ch03] localStorage      → 메모 저장, 테마 저장
 * [ch03] 불변성 (spread)    → addMemo / deleteMemo 상태 업데이트
 */


// ─────────────────────────────────────────────────────
// 상태 초기화 — ch03 localStorage
// ─────────────────────────────────────────────────────

// localStorage.getItem은 값이 없으면 null을 반환합니다.
// JSON.parse(null)는 null이므로 || [] 로 기본값을 설정합니다.
let memos = JSON.parse(localStorage.getItem('memos') || '[]');


// ─────────────────────────────────────────────────────
// DOM 요소 참조
// ─────────────────────────────────────────────────────
const memoInput  = document.getElementById('memo-input');
const btnAdd     = document.getElementById('btn-add');
const memoList   = document.getElementById('memo-list');
const memoCount  = document.getElementById('memo-count');
const suggestion = document.getElementById('suggestion');
const btnTheme   = document.getElementById('btn-theme');


// ─────────────────────────────────────────────────────
// localStorage 저장 — ch03
// ─────────────────────────────────────────────────────

/**
 * 현재 memos 배열을 localStorage에 저장합니다.
 * 객체는 문자열로만 저장되므로 JSON.stringify로 직렬화합니다.
 */
function saveMemos() {
  localStorage.setItem('memos', JSON.stringify(memos));
}


// ─────────────────────────────────────────────────────
// 메모 추가 — ch03 불변성
// ─────────────────────────────────────────────────────

/**
 * 새 메모를 상태에 추가합니다.
 * push()로 원본을 수정하는 대신 spread 연산자로 새 배열을 생성합니다.
 * 이 패턴이 "불변성(Immutability)"입니다.
 */
function addMemo(text) {
  const newMemo = {
    id:   Date.now(),                                   // 고유 ID (타임스탬프 사용)
    text: text,
    date: new Date().toLocaleDateString('ko-KR'),       // 예: 2026. 4. 8.
  };

  // ch03 불변성: [...기존배열, 새항목] → memos 원본을 수정하지 않고 새 배열로 교체
  memos = [...memos, newMemo];

  saveMemos();
  render();
}


// ─────────────────────────────────────────────────────
// 메모 삭제 — ch03 불변성
// ─────────────────────────────────────────────────────

/**
 * 지정한 id의 메모를 상태에서 제거합니다.
 * filter()는 조건을 만족하는 요소만 모아 새 배열을 반환합니다.
 * → 원본 배열은 건드리지 않습니다.
 */
function deleteMemo(id) {
  // ch03 불변성: filter()로 원본 수정 없이 새 배열 생성
  memos = memos.filter(memo => memo.id !== id);

  saveMemos();
  render();
}


// ─────────────────────────────────────────────────────
// DOM 렌더링 — ch01 DocumentFragment
// ─────────────────────────────────────────────────────

/**
 * memos 배열을 화면에 렌더링합니다.
 *
 * DocumentFragment를 사용하는 이유 (ch01):
 *   - 메모리 안의 임시 컨테이너에 모든 요소를 먼저 조립합니다.
 *   - 마지막에 appendChild(fragment)로 한 번만 실제 DOM에 삽입합니다.
 *   - 개별 appendChild를 반복하면 요소마다 리플로우가 발생하지만,
 *     Fragment를 쓰면 삽입이 1회로 줄어 렌더링 성능이 좋아집니다.
 */
function render() {
  // 메모가 없을 때 안내 메시지 표시
  if (memos.length === 0) {
    memoList.innerHTML = '<p class="empty-msg">아직 메모가 없습니다.</p>';
    memoCount.textContent = '총 0개';
    return;
  }

  // Fragment: 실제 DOM에 붙어 있지 않은 가벼운 임시 컨테이너
  const fragment = document.createDocumentFragment();

  memos.forEach(memo => {
    const item = document.createElement('div');
    item.className  = 'memo-item';
    item.dataset.id = memo.id; // 삭제 시 id를 꺼내 쓰기 위해 data-id로 저장

    // textContent를 사용하면 HTML 태그가 문자 그대로 출력됩니다.
    // innerHTML을 쓰면 사용자 입력이 스크립트로 실행될 수 있는 XSS 위험이 있습니다.
    const textEl = document.createElement('p');
    textEl.className   = 'memo-text';
    textEl.textContent = memo.text; // XSS 방지: innerHTML 대신 textContent 사용

    const dateEl = document.createElement('span');
    dateEl.className   = 'memo-date';
    dateEl.textContent = memo.date;

    const delBtn = document.createElement('button');
    delBtn.className   = 'btn-delete';
    delBtn.textContent = '삭제';

    // Fragment에 요소들을 조립합니다 (아직 실제 DOM에는 없음)
    item.append(textEl, dateEl, delBtn);
    fragment.appendChild(item);
  });

  // 기존 내용을 지우고, Fragment를 한 번에 삽입합니다 (리플로우 1회)
  memoList.innerHTML = '';
  memoList.appendChild(fragment);

  memoCount.textContent = `총 ${memos.length}개`;
}


// ─────────────────────────────────────────────────────
// 추가 이벤트
// ─────────────────────────────────────────────────────

btnAdd.addEventListener('click', () => {
  const text = memoInput.value.trim();
  if (!text) return;           // 빈 입력 무시
  addMemo(text);
  memoInput.value = '';        // 입력창 초기화
  memoInput.focus();           // 포커스 유지
});

// Enter 키로도 추가할 수 있도록 합니다
memoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') btnAdd.click();
});


// ─────────────────────────────────────────────────────
// 이벤트 위임 — ch01
// ─────────────────────────────────────────────────────

/**
 * memo-list(부모)에 리스너를 1개만 달아 자식 삭제 버튼 클릭을 처리합니다.
 *
 * 이벤트 위임이 필요한 이유:
 *   - 메모는 동적으로 추가되므로 처음부터 각 버튼에 리스너를 달 수 없습니다.
 *   - 버블링 덕분에 자식에서 발생한 이벤트가 부모까지 전파됩니다.
 *   - closest()로 클릭된 요소가 삭제 버튼인지 확인합니다.
 */
memoList.addEventListener('click', e => {
  // e.target이 .btn-delete 이거나, 그 안에 있는 요소인지 확인
  const delBtn = e.target.closest('.btn-delete');
  if (!delBtn) return; // 삭제 버튼이 아니면 무시

  // 삭제 버튼의 부모인 .memo-item에서 data-id를 꺼냅니다
  const item = delBtn.closest('.memo-item');
  deleteMemo(Number(item.dataset.id));
});


// ─────────────────────────────────────────────────────
// 추천 할 일 불러오기 — ch02 async/await, fetch, try/catch
// ─────────────────────────────────────────────────────

/**
 * jsonplaceholder에서 랜덤 todo를 가져와 화면에 표시합니다.
 *
 * async 함수는 항상 Promise를 반환합니다.
 * await는 Promise가 처리될 때까지 이 함수의 실행을 일시 중지합니다.
 * try / catch / finally로 에러를 안전하게 처리합니다.
 */
async function fetchSuggestion() {
  suggestion.textContent = '불러오는 중…';

  try {
    // 1~20 사이 랜덤 ID 선택
    const id  = Math.ceil(Math.random() * 20);
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

    // fetch는 HTTP 404·500 에서도 reject하지 않습니다.
    // response.ok(status 200~299)를 직접 확인해야 합니다.
    if (!res.ok) throw new Error(`HTTP 오류: ${res.status}`);

    // 응답 본문을 JSON으로 변환 (이것도 Promise입니다)
    const { title } = await res.json();
    suggestion.textContent = `"${title}"`;

  } catch (err) {
    // 네트워크 오류 또는 !res.ok 후 throw 된 에러가 여기에서 잡힙니다
    suggestion.textContent = '불러오기 실패. 인터넷 연결을 확인하세요.';
    console.error('fetchSuggestion 오류:', err.message);

  } finally {
    // 성공·실패와 무관하게 항상 실행됩니다 (로딩 상태 해제 등에 활용)
    console.log('fetchSuggestion 완료');
  }
}

document.getElementById('btn-refresh').addEventListener('click', fetchSuggestion);


// ─────────────────────────────────────────────────────
// 다크 / 라이트 모드 — ch03 localStorage 테마 저장
// ─────────────────────────────────────────────────────

/**
 * 테마를 적용하고 localStorage에 저장합니다.
 * body.className을 바꾸면 style.css의 CSS 변수가 자동으로 교체됩니다.
 */
function applyTheme(theme) {
  document.body.className = theme;
  // 현재 테마에 맞게 버튼 텍스트를 업데이트합니다
  btnTheme.textContent = theme === 'dark' ? '☀️ 라이트' : '🌙 다크';
  // ch03 localStorage: 선택한 테마를 저장해 새로고침 후에도 유지합니다
  localStorage.setItem('theme', theme);
}

btnTheme.addEventListener('click', () => {
  // ch03 불변성: 현재 값을 바꾸지 않고 새 상태값을 결정합니다
  const next = document.body.className === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});


// ─────────────────────────────────────────────────────
// 초기화 — 페이지 로드 시 실행
// ─────────────────────────────────────────────────────

// 저장된 테마를 불러옵니다. 없으면 'light'를 기본값으로 사용합니다.
applyTheme(localStorage.getItem('theme') || 'light');

// 저장된 메모를 화면에 렌더링합니다.
render();

// 추천 할 일을 API에서 비동기로 불러옵니다.
fetchSuggestion();
