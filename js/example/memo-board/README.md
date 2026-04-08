# 메모보드 (Memo Board)

ch01 · ch02 · ch03 학습 내용을 하나의 앱으로 조합한 미니 프로젝트입니다.

---

## 실행 방법

`index.html` 파일을 브라우저에서 바로 열면 됩니다.  
(ES 모듈을 사용하지 않으므로 별도 서버가 필요 없습니다.)

```bash
open index.html
```

> **인터넷 연결 필요**: "오늘의 추천 할 일" 기능은 `jsonplaceholder.typicode.com` API를 사용합니다.

---

## 기능

| 기능 | 설명 |
|------|------|
| 메모 추가 | 텍스트 입력 후 추가 버튼 또는 Enter |
| 메모 삭제 | 각 메모의 삭제 버튼 클릭 |
| 데이터 유지 | 새로고침해도 메모가 사라지지 않음 (localStorage) |
| 추천 할 일 | API에서 랜덤 할 일 항목 불러오기 |
| 다크 모드 | 헤더 버튼으로 전환, 설정이 저장됨 |

---

## 파일 구성

```
memo-board/
  index.html  — 페이지 구조 (HTML)
  style.css   — CSS 변수 기반 라이트/다크 모드 스타일
  app.js      — 앱 로직 (학습 개념 적용)
  README.md   — 이 문서
```

---

## 적용 학습 개념

### ch01 · DocumentFragment (DOM 성능)

메모 목록을 렌더링할 때 요소를 하나씩 DOM에 추가하면 추가할 때마다 리플로우가 발생합니다.  
`DocumentFragment`에 모든 요소를 먼저 조립한 뒤 단 1회만 DOM에 삽입하여 리플로우를 최소화합니다.

```js
const fragment = document.createDocumentFragment();
memos.forEach(memo => {
  const item = document.createElement('div');
  // ... 요소 조립 ...
  fragment.appendChild(item);      // 메모리에서만 조립
});
memoList.appendChild(fragment);    // 한 번에 DOM 삽입 → 리플로우 1회
```

### ch01 · 이벤트 위임 (Event Delegation)

메모는 동적으로 추가되므로 각 삭제 버튼에 개별 리스너를 달 수 없습니다.  
버블링을 이용해 부모 `memo-list`에 리스너 하나만 등록하여 모든 삭제 버튼을 처리합니다.

```js
// 부모 요소 하나에만 리스너 등록
memoList.addEventListener('click', e => {
  const delBtn = e.target.closest('.btn-delete'); // 삭제 버튼인지 확인
  if (!delBtn) return;

  const item = delBtn.closest('.memo-item');
  deleteMemo(Number(item.dataset.id));            // 동적 요소도 처리됨
});
```

### ch02 · async / await + try / catch / finally

API 요청 결과를 기다리는 동안 다른 코드 실행을 막지 않습니다.  
`response.ok`를 직접 확인해 HTTP 오류(404 등)를 감지합니다.

```js
async function fetchSuggestion() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');

    if (!res.ok) throw new Error(`HTTP 오류: ${res.status}`); // 404도 직접 처리

    const { title } = await res.json();
    suggestion.textContent = title;

  } catch (err) {
    suggestion.textContent = '불러오기 실패';  // 네트워크 오류 또는 !res.ok
  } finally {
    console.log('요청 완료');                  // 항상 실행
  }
}
```

### ch03 · 불변성 (Immutability)

메모 배열을 직접 수정하지 않고 항상 새 배열로 교체합니다.  
`push()` / `splice()` 대신 `spread` / `filter()`를 사용합니다.

```js
// 추가: push() 대신 spread로 새 배열 생성
memos = [...memos, newMemo];

// 삭제: splice() 대신 filter()로 새 배열 생성
memos = memos.filter(memo => memo.id !== id);
```

### ch03 · localStorage (데이터 영속화)

앱 상태(메모 목록, 테마)를 localStorage에 저장해 새로고침해도 데이터가 유지됩니다.

```js
// 저장: 객체/배열은 JSON.stringify로 직렬화
localStorage.setItem('memos', JSON.stringify(memos));

// 불러오기: JSON.parse로 역직렬화, 없으면 기본값
const memos = JSON.parse(localStorage.getItem('memos') || '[]');
```

---

## 학습 개념 흐름도

```
사용자 액션
    │
    ├─ 메모 추가 클릭
    │     ├─ addMemo()  → spread로 새 배열 생성 (불변성)
    │     ├─ saveMemos() → localStorage 저장
    │     └─ render()   → DocumentFragment로 DOM 업데이트
    │
    ├─ 삭제 버튼 클릭
    │     ├─ 이벤트 위임 → closest()로 대상 확인
    │     ├─ deleteMemo() → filter()로 새 배열 생성 (불변성)
    │     └─ render()
    │
    └─ 다시 불러오기 클릭
          └─ fetchSuggestion()
                ├─ await fetch() → API 요청
                ├─ response.ok 확인
                ├─ catch → 에러 처리
                └─ finally → 완료 처리
```
