# 🌳 DOM (Document Object Model) 마스터 가이드

---

## 실행 방법

`index.html` 파일을 브라우저에서 바로 열면 됩니다. (별도 서버 불필요)

```bash
open index.html
```

---

## DOM이란 무엇인가?

### 비유: 건물 설계도와 리모컨

> 건물을 짓고 나면 **설계도(HTML)** 가 있습니다.  
> 하지만 설계도는 종이일 뿐, 직접 조명을 켜거나 문을 열 수는 없습니다.  
>
> **DOM**은 그 설계도를 기반으로 만들어진 **실제 건물의 디지털 모델**입니다.  
> JavaScript는 이 모델을 통해 "3층 조명을 켜라", "2층 문을 추가해라" 같은 명령을 내릴 수 있습니다.

공식 정의: **DOM(Document Object Model)** 은 HTML 문서를 트리 구조의 객체로 변환하여 JavaScript가 읽고 수정할 수 있게 만드는 인터페이스입니다.

---

### 왜 DOM이 필요한가?

HTML만으로 만든 웹페이지는 **정적(Static)** 입니다. 한번 화면에 그려지면 변하지 않습니다.

하지만 우리가 매일 사용하는 웹서비스들은 전혀 다르게 동작합니다:

- **쿠팡**: 상품 옵션을 선택하면 가격과 재고가 즉시 바뀝니다 → DOM의 텍스트 변경
- **유튜브**: 좋아요를 누르면 숫자가 올라가고 아이콘 색이 바뀝니다 → DOM의 클래스 변경
- **카카오톡 웹**: 메시지를 보내면 새 말풍선이 화면 아래에 추가됩니다 → DOM에 요소 추가
- **구글 검색**: 검색어를 지우면 결과 목록이 사라집니다 → DOM에서 요소 제거

이 모든 것이 JavaScript가 **DOM을 조작**해서 만들어내는 동작입니다.  
즉, DOM을 이해하는 것이 **"살아있는 웹페이지"** 를 만드는 첫 번째 관문입니다.

---

### DOM 트리 구조

HTML 문서는 아래처럼 나무 모양의 계층 구조로 변환됩니다.

```
document (문서 전체)
└── <html>
    ├── <head>
    │     └── <title> "페이지 제목"
    └── <body>
          ├── <h1> "제목 텍스트"
          └── <ul id="list">
                ├── <li class="item"> "항목 1"
                └── <li class="item"> "항목 2"
```

이 구조를 **"트리(Tree)"** 라고 부르는 이유는 뿌리(root)에서 시작해 나뭇가지처럼 퍼져나가는 모양이기 때문입니다.  
- `document`가 뿌리(root)
- 각 HTML 태그(`<html>`, `<body>`, `<div>` 등)가 가지(branch)
- 태그 안의 텍스트가 잎사귀(leaf)

각 네모 하나를 **노드(Node)** 라고 하며, 4가지 유형이 있습니다:

| 노드 유형 | 설명 | 예시 |
|-----------|------|------|
| **문서 노드** | 트리의 최상단, 진입점 | `document` |
| **요소 노드** | HTML 태그 하나하나 | `<div>`, `<li>`, `<button>` |
| **속성 노드** | 태그의 속성 | `id="list"`, `class="item"` |
| **텍스트 노드** | 태그 안의 글자 | `"항목 1"` |

---

## 목차

1. [요소 선택 (Selection)](#1-요소-선택-selection)
2. [콘텐츠 조작 (textContent / innerHTML)](#2-콘텐츠-조작)
3. [classList 조작](#3-classlist-조작)
4. [속성 & 스타일 조작](#4-속성--스타일-조작)
5. [노드 생성 & 삭제](#5-노드-생성--삭제)

---

## 1. 요소 선택 (Selection)

JavaScript가 HTML 요소를 조작하려면 먼저 그 요소를 **선택(Selection)** 해야 합니다.

마치 포토샵에서 수정할 레이어를 클릭해서 선택하는 것과 같습니다.  
또는 엑셀에서 내용을 바꾸고 싶은 셀을 먼저 클릭하는 것과 같습니다.  
**아무리 좋은 명령도, 대상을 먼저 선택하지 않으면 실행할 수 없습니다.**

### 선택 메서드 비교

| 메서드 | 선택 기준 | 반환 | 특징 |
|--------|-----------|------|------|
| `getElementById('id')` | id 속성 | 요소 1개 | 가장 빠름. id는 페이지에 1개여야 함 |
| `querySelector('선택자')` | CSS 선택자 | 첫 번째 요소 1개 | CSS처럼 `.클래스`, `#아이디`, `태그명` 사용 |
| `querySelectorAll('선택자')` | CSS 선택자 | NodeList (유사 배열) | 조건에 맞는 모든 요소 반환 |
| `getElementsByClassName('class')` | class 속성 | HTMLCollection | 실시간으로 DOM 변경 반영 |

> 💡 **실무 팁:** 특별한 이유가 없다면 `querySelector` / `querySelectorAll` 2가지만 사용합니다.  
> CSS를 배웠다면 이미 선택자 문법을 알고 있으므로 새로 익힐 것이 없습니다.

### 코드 예시

```js
// id로 단일 요소 선택
const box = document.getElementById('box-target');

// CSS 선택자로 첫 번째 요소 선택 (.클래스, #아이디, 태그명 모두 가능)
const first = document.querySelector('.highlight-me');

// CSS 선택자로 모든 일치 요소 선택 → NodeList 반환
const all = document.querySelectorAll('.highlight-me');

// NodeList는 forEach로 순회 가능
all.forEach(el => {
  el.style.background = 'yellow'; // 각 요소에 접근
});
```

### NodeList vs 배열

`querySelectorAll()`은 **NodeList**를 반환합니다.  
NodeList는 배열과 비슷하게 생겼지만 완전한 배열은 아닙니다.  
`forEach`는 쓸 수 있지만 `map`, `filter` 같은 배열 메서드는 쓸 수 없습니다.

```js
const nodeList = document.querySelectorAll('.item'); // NodeList 반환

// ✅ forEach는 NodeList에서도 사용 가능
nodeList.forEach(el => console.log(el));

// ❌ map, filter 등은 NodeList에 없음
// nodeList.map(...)  → 오류!

// ✅ 배열로 변환 후 모든 배열 메서드 사용 가능
const arr = Array.from(nodeList);
arr.map(el => el.textContent);
```

---

## 2. 콘텐츠 조작

요소 안의 텍스트나 HTML 구조를 읽고 바꾸는 세 가지 속성입니다.

웹 페이지에서 "좋아요 1,024개" 숫자가 클릭할 때마다 바뀌거나,  
뉴스 기사 내용이 언어에 따라 바뀌는 것이 이 기능을 통해 이루어집니다.

### textContent vs innerHTML vs innerText

| 속성 | 읽을 때 | 쓸 때 | 특징 |
|------|---------|-------|------|
| `textContent` | HTML 태그 제외, 숨겨진 텍스트 포함 | HTML 태그가 문자로 표시됨 | 가장 안전, 성능 우수 |
| `innerHTML` | HTML 태그 포함, 마크업 그대로 | HTML 태그가 실제로 렌더링됨 | XSS 공격 위험 주의 |
| `innerText` | 화면에 보이는 텍스트만 | HTML 태그가 문자로 표시됨 | display:none 제외, 느림 |

### 코드 예시

```html
<!-- 예시 HTML -->
<div id="box">
  안녕하세요
  <span style="display:none">숨겨진 텍스트</span>
</div>
```

```js
const box = document.getElementById('box');

// textContent: 숨겨진 텍스트까지 모두 읽음
console.log(box.textContent); // "안녕하세요 숨겨진 텍스트"

// innerText: 화면에 보이는 것만 읽음 (display:none 제외)
console.log(box.innerText);   // "안녕하세요"

// innerHTML: HTML 태그를 포함해서 씀 → 실제로 렌더링됨
box.innerHTML = '<strong>굵은 텍스트</strong>'; // 굵게 보임

// textContent: HTML 태그를 그냥 문자로 씀 → 태그가 화면에 그대로 보임
box.textContent = '<strong>굵은 텍스트</strong>'; // <strong>이 글자로 보임
```

### ⚠️ innerHTML과 XSS 보안 주의

**XSS(Cross-Site Scripting)** 는 악성 스크립트를 웹 페이지에 삽입하는 공격 방법입니다.  
예를 들어 게시판에 글을 쓸 때, 텍스트 대신 악성 JavaScript 코드를 입력하는 것입니다.  
그 코드가 `innerHTML`로 페이지에 그대로 삽입되면 다른 사용자의 브라우저에서 실행될 수 있습니다.

```js
// ❌ 사용자 입력을 검증 없이 innerHTML에 넣으면 위험합니다
const userInput = '<script>악성코드()</script>';
el.innerHTML = userInput;  // 스크립트가 실행될 수 있음

// ✅ 사용자 입력은 textContent를 사용하거나 이스케이프 처리 후 사용하세요
el.textContent = userInput; // 태그가 문자 그대로 표시되어 안전
```

> **규칙:** 사용자가 직접 입력한 내용(댓글, 검색어, 채팅 등)은 **절대 innerHTML에 바로 넣지 마세요.**  
> 신뢰할 수 있는 내부 데이터에만 innerHTML을 사용합니다.

---

## 3. classList 조작

요소의 CSS 클래스를 추가·제거·토글하는 방법입니다.

**CSS 클래스**는 요소에 스타일을 적용하기 위한 이름표입니다.  
예를 들어 `.active` 클래스가 있으면 파란색, 없으면 회색인 버튼을 만들 수 있습니다.  
JavaScript에서 이 클래스를 붙였다 뗐다 하면 **한 요소가 여러 모양으로 변하도록** 만들 수 있습니다.

- 다크 모드 토글: `.dark-mode` 클래스 추가/제거
- 메뉴 열기/닫기: `.open` 클래스 추가/제거
- 선택된 탭 표시: `.selected` 클래스 추가/제거

`element.className = '...'` 방식보다 훨씬 안전하고 편리합니다.

### 메서드 목록

| 메서드 | 동작 | 반환값 |
|--------|------|--------|
| `classList.add('클래스')` | 클래스 추가 (중복 방지) | — |
| `classList.remove('클래스')` | 클래스 제거 (없어도 오류 없음) | — |
| `classList.toggle('클래스')` | 있으면 제거, 없으면 추가 | `true` (추가됨) / `false` (제거됨) |
| `classList.contains('클래스')` | 클래스 포함 여부 확인 | `true` / `false` |

### 코드 예시

```js
const el = document.getElementById('box');

// 클래스 추가
el.classList.add('active');           // active 클래스 추가
el.classList.add('visible', 'large'); // 여러 클래스 동시 추가

// 클래스 제거
el.classList.remove('active');        // active 클래스 제거

// 클래스 토글 — 다크 모드 스위치, 메뉴 열기/닫기에 주로 사용
el.classList.toggle('dark-mode');
// 처음 클릭: dark-mode 클래스가 없으므로 추가됨 → 어두운 테마
// 다시 클릭: dark-mode 클래스가 있으므로 제거됨 → 밝은 테마

// 클래스 포함 여부 확인 — 조건문에 주로 사용
if (el.classList.contains('active')) {
  console.log('active 상태입니다');
}
```

### className과의 차이

```js
// ❌ className 방식: 기존 클래스를 덮어씀
// 이미 'card large' 클래스가 있을 때
el.className = 'active'; // 'card large'가 모두 사라지고 'active'만 남음

// ✅ classList 방식: 기존 클래스를 유지하면서 추가
el.classList.add('active'); // 'card large active' — 기존 클래스는 그대로
```

---

## 4. 속성 & 스타일 조작

### getAttribute / setAttribute

HTML 태그의 모든 속성을 읽고 씁니다.

**속성(Attribute)**이란 HTML 태그의 옵션 설정값입니다.  
`<a href="...">`, `<img src="..." alt="...">`, `<input type="text" disabled>` 등에서  
`href`, `src`, `alt`, `type`, `disabled`가 모두 속성입니다.

```js
const link = document.querySelector('a');

// 속성 읽기
const href = link.getAttribute('href');     // href 값 읽기
const alt  = img.getAttribute('alt');       // alt 값 읽기

// 속성 변경
link.setAttribute('href', 'https://...');   // href 변경
link.setAttribute('target', '_blank');      // 새 탭 열기

// 속성 제거
link.removeAttribute('disabled');
```

---

### dataset — data-* 커스텀 속성

HTML 요소에 개발자가 직접 데이터를 저장하는 방법입니다.  
화면에 보이지 않지만 JavaScript에서 읽어 사용합니다.

**비유:** 음식점 테이블마다 **테이블 번호 스티커**를 붙여두는 것과 같습니다.  
손님(사용자)에게는 보이지 않지만, 직원(JavaScript)은 이 번호를 보고 어느 테이블인지 파악합니다.

실무 활용 예:
- 쇼핑몰 상품 카드에 `data-product-id="123"` 를 저장해두고, 클릭 시 해당 상품 ID를 읽어 서버에 요청
- 목록의 각 항목에 `data-category="전자제품"` 를 저장해두고, 필터 기능 구현

```html
<!-- HTML: data- 접두사를 붙여 커스텀 속성 선언 -->
<div
  id="card"
  data-user-id="42"
  data-category="frontend"
>
  ...
</div>
```

```js
const card = document.getElementById('card');

// JS: dataset 객체로 접근 (data- 제거, 카멜케이스 변환)
// data-user-id   → dataset.userId
// data-category  → dataset.category
console.log(card.dataset.userId);    // "42"
console.log(card.dataset.category);  // "frontend"

// 값 변경도 가능
card.dataset.category = 'backend';
```

---

### element.style — 스타일 직접 변경

JavaScript에서 CSS 속성을 직접 변경하는 방법입니다.  
CSS 속성명을 **카멜케이스(camelCase)** 로 작성합니다.

> CSS에서는 단어 사이에 하이픈(`-`)을 씁니다: `background-color`, `font-size`  
> JS에서는 하이픈 없이 두 번째 단어 첫 글자를 대문자로 씁니다: `backgroundColor`, `fontSize`

```js
const el = document.getElementById('box');

// CSS: background-color → JS: backgroundColor
el.style.backgroundColor = '#fef3c7';
el.style.fontSize        = '20px';
el.style.borderRadius    = '8px';
el.style.display         = 'none';   // 요소 숨기기

// 스타일 초기화: 빈 문자열 할당
el.style.backgroundColor = '';       // CSS 기본값으로 돌아감
```

> **권장 방식:** 여러 스타일을 한 번에 적용할 때는 `classList`로 클래스를 토글하고, CSS에 스타일을 미리 정의하는 방식이 유지보수에 더 좋습니다.  
> `element.style`은 단 하나의 값을 빠르게 변경할 때 사용합니다.

---

## 5. 노드 생성 & 삭제

JavaScript로 새로운 HTML 요소를 만들어 DOM에 추가하거나 삭제합니다.

이 기능이 없다면 화면에 표시할 내용을 HTML에 모두 미리 작성해야 합니다.  
예를 들어 댓글 목록은 몇 개가 달릴지 모르므로 HTML에 미리 쓸 수 없습니다.  
사용자가 댓글을 달면 **JavaScript가 새 댓글 요소를 만들어 목록에 추가**하는 것입니다.

### 생성 → 조립 → 연결 3단계

```js
// Step 1: 요소 생성 (아직 화면에 없음, 메모리에만 존재)
const li = document.createElement('li');
// 이 시점엔 아직 화면에 아무것도 안 보입니다. 메모리 안에만 있는 상태.

// Step 2: 내용 및 속성 설정
li.textContent = '새 항목';
li.classList.add('item');

// Step 3: 부모에 연결 → 이 순간 화면에 나타남
const ul = document.getElementById('list');
ul.appendChild(li);  // ul의 마지막 자식으로 추가
```

### 삭제

```js
const parent = document.getElementById('list');
const target = parent.querySelector('.item'); // 삭제할 요소 찾기

if (target) {
  parent.removeChild(target); // 부모에서 자식 제거
}

// 현대적인 방식: remove() 직접 호출 (부모 불필요)
target.remove(); // 더 간단
```

### insertBefore — 특정 위치에 삽입

`appendChild`는 항상 **맨 마지막**에 추가합니다.  
원하는 위치에 삽입하려면 `insertBefore`를 사용합니다.

```js
const ul     = document.getElementById('list');
const newLi  = document.createElement('li');
const firstLi = ul.querySelector('li'); // 기준 요소

newLi.textContent = '맨 앞에 추가';

// firstLi 앞에 newLi 삽입
ul.insertBefore(newLi, firstLi);
```

### DocumentFragment — 성능 최적화

여러 요소를 하나씩 `appendChild`하면 브라우저가 매번 화면을 다시 계산합니다 (**리플로우**).  
이것은 마치 택배를 한 박스씩 10번 배달하는 것과 같습니다.

`DocumentFragment`는 **가상의 임시 상자**입니다.  
요소들을 이 상자에 먼저 담은 다음, 상자 통째로 한 번에 DOM에 넣으면  
리플로우가 1번만 발생해서 성능이 훨씬 좋아집니다.

```js
const ul = document.getElementById('list');

// Fragment에 먼저 조립 (메모리에서 작업 → 리플로우 없음)
const fragment = document.createDocumentFragment();

['항목1', '항목2', '항목3'].forEach(text => {
  const li = document.createElement('li');
  li.textContent = text;
  fragment.appendChild(li); // Fragment에 추가
});

// 한 번만 DOM에 삽입 → 리플로우 1회
ul.appendChild(fragment);
```

---

## 파일 구성

```
ch01_dom/
  index.html  — 5개 섹션으로 구성된 인터랙티브 데모 페이지
  style.css   — 카드 레이아웃 + 선택/활성화 시각 피드백 스타일
  app.js      — 각 섹션의 DOM 조작 함수 (상세 주석 포함)
  README.md   — 이 문서
```

---

## 학습 포인트 요약

| 개념 | 핵심 메서드 / 속성 | 한줄 설명 |
|------|-------------------|-----------|
| 요소 선택 | `getElementById`, `querySelector`, `querySelectorAll` | DOM에서 원하는 요소를 찾아온다 |
| 콘텐츠 조작 | `textContent`, `innerHTML`, `innerText` | 요소 안의 내용을 읽거나 바꾼다 |
| 클래스 조작 | `classList.add/remove/toggle/contains` | 클래스를 안전하게 추가·제거·확인한다 |
| 속성 조작 | `getAttribute`, `setAttribute`, `dataset` | HTML 속성과 커스텀 데이터를 읽고 쓴다 |
| 스타일 조작 | `element.style.속성명` | 카멜케이스로 CSS를 직접 변경한다 |
| 노드 생성 | `createElement`, `appendChild` | 새 요소를 만들어 DOM에 붙인다 |
| 노드 삭제 | `removeChild`, `remove` | DOM에서 요소를 제거한다 |
| 성능 최적화 | `DocumentFragment` | 여러 요소를 한 번에 삽입해 리플로우를 줄인다 |

---

> **핵심 원칙:** DOM 조작은 `요소 선택 → 내용/스타일/구조 변경`의 흐름입니다.  
> 요소를 정확히 선택하지 못하면 아무것도 바꿀 수 없으므로, 선택 메서드를 정확히 이해하는 것이 가장 중요합니다.
