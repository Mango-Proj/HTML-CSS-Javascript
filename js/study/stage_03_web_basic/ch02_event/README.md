# ⚡ 이벤트 (Event) 완벽 가이드

---

## 실행 방법

`index.html` 파일을 브라우저에서 바로 열면 됩니다. (별도 서버 불필요)

```bash
open index.html
```

---

## 이벤트란 무엇인가?

### 비유: 버튼을 누르면 반응하는 자판기

> 자판기 앞에 서 있다고 상상해보세요.  
> 아무것도 하지 않으면 자판기는 그냥 서 있습니다.  
> 하지만 **콜라 버튼을 누르는 순간**, 자판기는 "버튼이 눌렸다!"는 신호를 받고 콜라를 내보냅니다.
>
> 웹에서도 마찬가지입니다:
> - **이벤트(Event)** = 버튼 클릭, 키보드 입력 등 사용자의 행동
> - **이벤트 핸들러(Handler)** = "그 행동이 발생했을 때 실행할 함수" (자판기의 내부 동작)
> - **addEventListener** = "이 버튼에 이런 반응을 연결해줘"

공식 정의: **이벤트(Event)** 는 웹 페이지에서 발생하는 모든 사용자 동작이나 브라우저 상태 변화를 말합니다.

---

## 목차

1. [이벤트 핸들러 등록 방식](#1-이벤트-핸들러-등록-방식)
2. [이벤트 객체 (event)](#2-이벤트-객체-event)
3. [마우스 이벤트](#3-마우스-이벤트)
4. [키보드 이벤트](#4-키보드-이벤트)
5. [폼 이벤트](#5-폼-이벤트)

---

## 1. 이벤트 핸들러 등록 방식

이벤트를 등록하는 방법은 3가지입니다. 현업에서는 `addEventListener`를 사용합니다.

### 방법 1 — 인라인 방식 (권장하지 않음)

HTML 태그 안에 직접 작성합니다.

```html
<button onclick="myFunction()">클릭</button>
```

| 단점 |
|------|
| HTML(구조)과 JS(동작)가 뒤섞여 코드가 지저분해집니다 |
| 같은 이벤트에 여러 함수를 연결하기 어렵습니다 |
| 유지보수가 어렵습니다 |

---

### 방법 2 — 프로퍼티 방식

JavaScript에서 요소의 `onclick` 속성에 함수를 할당합니다.

```js
const btn = document.getElementById('my-btn');
btn.onclick = function () {
  console.log('클릭!');
};
```

**주의: 핸들러를 1개밖에 등록할 수 없습니다. 두 번 할당하면 두 번째가 첫 번째를 덮어씁니다.**

```js
btn.onclick = function () { console.log('첫 번째'); }; // 이건 사라짐
btn.onclick = function () { console.log('두 번째'); }; // 이것만 실행됨
```

---

### 방법 3 — addEventListener (권장)

```js
const btn = document.getElementById('my-btn');
btn.addEventListener('이벤트명', 핸들러함수);
```

가장 권장되는 방식입니다. 같은 요소에 **여러 핸들러를 모두 등록**할 수 있습니다.

```js
btn.addEventListener('click', function () { console.log('핸들러 A'); });
btn.addEventListener('click', function () { console.log('핸들러 B'); });
// 버튼 클릭 시 A, B 둘 다 실행됨
```

---

### 3가지 방식 비교

| 방식 | 코드 분리 | 여러 핸들러 | 제거 가능 | 권장 여부 |
|------|:---------:|:-----------:|:---------:|:---------:|
| 인라인 `onclick="..."` | ❌ | ❌ | ❌ | ❌ |
| 프로퍼티 `btn.onclick` | ✅ | ❌ (덮어씀) | ✅ | △ |
| `addEventListener` | ✅ | ✅ | ✅ | ✅ |

---

### removeEventListener — 등록한 이벤트 제거

등록한 이벤트를 제거할 때 사용합니다.
**반드시 이름 있는 함수(named function)를 사용해야 합니다.**

```js
// ❌ 익명 함수는 제거 불가 — 매번 새로운 함수 객체가 생성됨
btn.addEventListener('click', function () { ... });
btn.removeEventListener('click', function () { ... }); // 이건 다른 함수!

// ✅ 이름 있는 함수로 선언 → 같은 참조로 정확히 제거 가능
function myHandler() { ... }
btn.addEventListener('click', myHandler);
btn.removeEventListener('click', myHandler); // 정확히 제거됨
```

---

### `{ once: true }` 옵션 — 1번만 실행하고 자동 제거

```js
btn.addEventListener('click', function () {
  console.log('딱 1번만 실행됩니다');
}, { once: true }); // 실행 후 자동으로 removeEventListener 처리됨
```

---

## 2. 이벤트 객체 (event)

이벤트가 발생하면 브라우저가 자동으로 **이벤트 객체(e)** 를 만들어 핸들러 함수에 넘겨줍니다.
이 객체에는 "어떤 이벤트가", "어디서", "어떻게" 발생했는지 정보가 담겨 있습니다.

```js
btn.addEventListener('click', function (e) {
  // e가 바로 이벤트 객체입니다
  console.log(e.type);    // 'click'
  console.log(e.target);  // 클릭된 요소
});
```

### 주요 속성

| 속성 | 설명 | 예시 |
|------|------|------|
| `e.type` | 이벤트 종류 | `'click'`, `'keydown'` |
| `e.target` | 실제로 이벤트가 발생한 요소 | 클릭된 `<button>` |
| `e.currentTarget` | 리스너가 등록된 요소 | 리스너를 단 `<ul>` |
| `e.clientX / Y` | 브라우저 창 기준 마우스 좌표 | `{ clientX: 240, clientY: 380 }` |
| `e.offsetX / Y` | 이벤트 발생 요소 기준 좌표 | 요소 내부 상대 좌표 |

---

### e.target vs e.currentTarget

이것이 헷갈리는 가장 중요한 개념입니다.

```html
<ul id="list">        ← 리스너는 여기에 등록
  <li>항목 1</li>     ← 여기를 클릭
  <li>항목 2</li>
</ul>
```

```js
document.getElementById('list').addEventListener('click', function (e) {
  console.log(e.target);        // <li>항목 1</li>  ← 실제로 클릭된 요소
  console.log(e.currentTarget); // <ul id="list">  ← 리스너가 등록된 요소
});
```

> **비유:** 건물 안내 데스크(currentTarget)에 모든 방문객 응대를 맡겼을 때,  
> 실제로 찾아온 방문객(target)이 누구인지 확인하는 것과 같습니다.

이 원리를 이용해 부모 요소 하나에 리스너를 달고 자식 요소들을 한꺼번에 처리하는 것을  
**이벤트 위임(Event Delegation)** 이라고 합니다.

---

### `this`와 이벤트 객체의 관계

```js
// 일반 function: this = 리스너가 등록된 요소 (e.currentTarget과 동일)
btn.addEventListener('click', function (e) {
  console.log(this === e.currentTarget); // true
});

// 화살표 함수: this = 바깥 스코프 (요소가 아님!) → 주의 필요
btn.addEventListener('click', (e) => {
  console.log(this); // Window 또는 undefined (요소가 아님!)
});
```

---

## 3. 마우스 이벤트

### 주요 이벤트 목록

| 이벤트 | 발생 시점 | 특징 |
|--------|-----------|------|
| `click` | 마우스 왼쪽 버튼 클릭 시 | 가장 자주 사용 |
| `dblclick` | 빠르게 두 번 클릭 시 | click 이벤트도 2번 함께 발생 |
| `mousemove` | 마우스가 움직이는 매 순간 | 매우 자주 발생 → 성능 주의 |
| `mouseenter` | 마우스가 요소 안으로 들어올 때 | 자식 요소 이동 시 재발생 안 함 |
| `mouseleave` | 마우스가 요소 밖으로 나갈 때 | 자식 요소 이동 시 재발생 안 함 |
| `mouseover` | 마우스가 요소나 자식으로 들어올 때 | 버블링 발생 |
| `mouseout` | 마우스가 요소나 자식에서 나갈 때 | 버블링 발생 |

### mouseenter vs mouseover 차이

```
┌── 부모 영역 ────────────────────────┐
│    ┌── 자식 영역 ───────────────┐   │
│    │                           │   │
│    └───────────────────────────┘   │
└────────────────────────────────────┘
```

| 이동 경로 | mouseenter/mouseleave | mouseover/mouseout |
|-----------|:---------------------:|:------------------:|
| 밖 → 부모 진입 | ✅ 1번 발생 | ✅ 1번 발생 |
| 부모 → 자식 이동 | ❌ 발생 안 함 | ✅ 발생 (재발생) |

> 호버 메뉴처럼 자식 영역 이동 시 메뉴가 닫히면 안 되는 경우 → `mouseenter/mouseleave` 사용

### 마우스 좌표 속성

```js
element.addEventListener('mousemove', function (e) {
  console.log(e.clientX, e.clientY); // 브라우저 창 기준 좌표
  console.log(e.offsetX, e.offsetY); // 이벤트 발생 요소 기준 좌표 (요소 내부 좌표)
  console.log(e.pageX,   e.pageY);   // 페이지 전체 기준 좌표 (스크롤 포함)
});
```

---

## 4. 키보드 이벤트

### 주요 이벤트

| 이벤트 | 발생 시점 | 사용 권장 |
|--------|-----------|:---------:|
| `keydown` | 키를 누르는 순간 (모든 키 감지) | ✅ 권장 |
| `keyup` | 키를 떼는 순간 | ✅ 권장 |
| `keypress` | 문자 키 입력 시 | ❌ 사용 중단됨 |

### e.key vs e.code

| 속성 | 의미 | 예시 | 특징 |
|------|------|------|------|
| `e.key` | 입력된 실제 문자 | `'a'`, `'A'`, `'Enter'`, `' '` | 언어/대소문자에 따라 다름 |
| `e.code` | 물리적 키 위치 코드 | `'KeyA'`, `'Enter'`, `'Space'` | 언어 무관, 항상 동일 |

```js
// Shift + a를 누르면?
e.key  → 'A'       (대문자 A)
e.code → 'KeyA'    (물리적으로 A 키 위치, 항상 동일)

// 특정 키를 식별할 때는 e.code가 더 안정적
if (e.code === 'Space') { /* 스페이스바 */ }
if (e.code === 'Enter') { /* 엔터키 */ }
```

### 수식키 (Modifier Keys)

```js
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey  && e.key === 's') { /* Ctrl + S → 저장 */ }
  if (e.shiftKey && e.key === 'Enter') { /* Shift + Enter → 줄바꿈 */ }
  if (e.altKey)  { /* Alt 키 눌림 */ }
});
```

### 실시간 글자 수 카운터

글자 수는 `keyup` 시점에 읽어야 정확합니다.
(`keydown` 시점에는 아직 글자가 입력되기 전입니다.)

```js
const textarea = document.getElementById('content');

textarea.addEventListener('keyup', function () {
  const len = this.value.length;
  document.getElementById('count').textContent = len + '자';
});
```

---

## 5. 폼 이벤트

### 주요 이벤트

| 이벤트 | 발생 시점 | 주로 사용하는 경우 |
|--------|-----------|-------------------|
| `focus` | 요소에 커서가 들어올 때 | 입력창 강조 효과 |
| `blur` | 요소에서 커서가 나갈 때 | 입력 완료 후 유효성 검사 |
| `input` | 값이 바뀌는 매 순간 (키 입력마다) | 실시간 검색, 실시간 카운터 |
| `change` | 값이 확정되고 포커스가 빠져나갈 때 | 드롭다운 선택, 체크박스 |
| `submit` | 폼 제출 버튼 클릭 시 | 유효성 검사, 서버 전송 |

### submit + preventDefault

```js
const form = document.getElementById('my-form');

form.addEventListener('submit', function (e) {
  /*
    preventDefault()를 호출하지 않으면:
    → 브라우저가 폼을 서버에 전송하고 페이지를 새로고침합니다.
    → 유효성 검사 결과를 볼 새도 없이 화면이 바뀝니다.

    preventDefault()를 호출하면:
    → 서버 전송과 새로고침이 막힙니다.
    → JS로 직접 유효성을 검사하고 결과를 화면에 표시할 수 있습니다.
  */
  e.preventDefault();

  const pw = document.getElementById('password').value;
  if (pw.length < 4) {
    // 유효성 실패 → 에러 메시지 표시
    document.getElementById('error-msg').textContent = '비밀번호는 최소 4자 이상이어야 합니다.';
    return;
  }

  // 유효성 통과 → 실제로 서버에 보내는 처리 (fetch, axios 등)
  console.log('서버로 데이터 전송!');
});
```

### focus / blur 입력창 시각 피드백

```js
const input = document.getElementById('username');

// focus: 커서가 들어올 때 — 테두리 강조
input.addEventListener('focus', function () {
  this.classList.add('focused'); // CSS에서 테두리 색상 변경
});

// blur: 커서가 나갈 때 — 테두리 원래대로
input.addEventListener('blur', function () {
  this.classList.remove('focused');
  // blur 시점에 값을 읽으면 최종 입력값 확인 가능
  console.log('최종 입력값:', this.value);
});
```

### input vs change 차이

```
사용자가 입력창에 "hello"를 입력하고 다른 곳을 클릭할 때

keydown(h) → input('h') → keydown(e) → input('he') → ... → keydown(o) → input('hello')
(입력할 때마다 발생)

포커스를 잃는 순간
→ change('hello') (딱 1번, 값이 확정된 후)
```

```js
// input: 실시간으로 반응해야 할 때 (검색어 자동완성, 글자 수 카운터)
input.addEventListener('input', () => console.log(input.value)); // 키마다 실행

// change: 최종 값이 확정된 후 1번만 처리할 때 (드롭다운, 체크박스)
select.addEventListener('change', () => console.log(select.value)); // 선택 완료 후 1번
```

---

## 파일 구성

```
ch02_event/
  index.html  — 5개 섹션으로 구성된 인터랙티브 데모 페이지
  style.css   — 카드 레이아웃 + 마우스 추적 패드 + 키 표시 스타일
  app.js      — 각 섹션의 이벤트 핸들러 (원본 코드 + 상세 주석)
  README.md   — 이 문서
```

---

## 학습 포인트 요약

| 개념 | 핵심 메서드 / 속성 | 한 줄 설명 |
|------|-------------------|-----------|
| 핸들러 등록 | `addEventListener('이벤트', 함수)` | 이벤트와 함수를 연결한다 |
| 핸들러 제거 | `removeEventListener('이벤트', 함수)` | 이름 있는 함수만 제거 가능 |
| 1회 등록 | `{ once: true }` 옵션 | 실행 후 자동으로 제거됨 |
| 이벤트 객체 | `e.target`, `e.type`, `e.clientX/Y` | 이벤트 발생 정보를 담은 객체 |
| target vs currentTarget | `e.target` ≠ `e.currentTarget` | target=클릭된 요소, currentTarget=리스너가 달린 요소 |
| 기본 동작 방지 | `e.preventDefault()` | 링크 이동, 폼 제출 등 브라우저 기본 동작을 막음 |
| 마우스 이벤트 | `click`, `mousemove`, `mouseenter` | 마우스 위치, 클릭, 호버에 반응 |
| 키보드 이벤트 | `keydown`, `keyup`, `e.key`, `e.code` | 키 입력과 수식키 조합 감지 |
| 폼 이벤트 | `submit`, `focus`, `blur`, `change` | 입력창과 폼 제출에 반응 |

---

> **핵심 원칙:** 이벤트는 "어떤 요소에서", "어떤 행동이 일어날 때", "무엇을 실행할지"의 3가지 조합입니다.  
> `addEventListener('이벤트명', 핸들러함수)`를 기본으로 사용하고,  
> 이벤트 객체(e)를 통해 상황에 맞는 정보를 꺼내 쓰세요.
