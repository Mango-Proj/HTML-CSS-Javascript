# 🌐 Stage 03 — 웹 기초 (Web Basic)

> JavaScript로 브라우저를 직접 조종하는 방법을 배웁니다.  
> HTML을 동적으로 바꾸고, 사용자 행동에 반응하고, 브라우저 기능을 활용하는 세 가지 핵심 주제를 다룹니다.

---

## 이 폴더에서 배우는 것

JavaScript는 크게 두 가지 환경에서 실행됩니다:

- **Node.js 환경** (stage01에서 배운 것): 서버, 파일 처리, 터미널 스크립트
- **브라우저 환경** (이 폴더에서 배우는 것): 웹페이지 조작, 사용자 인터랙션

브라우저 환경에서는 `document`, `window`, `location` 같은 **브라우저 전용 API**를 사용할 수 있습니다.  
이 폴더는 바로 그 **브라우저 전용 API** 사용법을 배우는 과정입니다.

---

## 학습 순서

```
ch01_dom  →  ch02_event  →  ch03_bom
   │               │              │
HTML 조작    사용자 반응    브라우저 기능
```

세 챕터는 서로 연결되어 있습니다:
- **DOM**을 알아야 "무엇을 바꿀지" 알고
- **이벤트**를 알아야 "언제 바꿀지" 알고
- **BOM**을 알아야 "브라우저 차원의 기능"을 쓸 수 있습니다

---

## 챕터별 안내

### ch01 — DOM (Document Object Model)

**한 줄 요약:** JavaScript로 HTML 요소를 선택하고 내용·스타일·구조를 바꾸는 방법

**이것을 배우면 할 수 있는 것:**
- 버튼 클릭 시 텍스트를 즉시 바꾼다
- 조건에 따라 요소를 보이거나 숨긴다
- 댓글, 상품 카드 등 새 요소를 동적으로 추가한다

| 핵심 개념 | 설명 |
|-----------|------|
| `querySelector` / `querySelectorAll` | CSS 선택자로 요소 찾기 |
| `textContent` / `innerHTML` | 요소 안의 글자/HTML 바꾸기 |
| `classList.add/remove/toggle` | CSS 클래스 추가·제거·토글 |
| `getAttribute` / `setAttribute` | HTML 속성 읽고 쓰기 |
| `dataset` | `data-*` 커스텀 속성 활용 |
| `createElement` / `appendChild` | 새 요소 만들어 추가하기 |
| `remove` / `removeChild` | 요소 삭제하기 |
| `DocumentFragment` | 여러 요소를 한 번에 추가 (성능 최적화) |

```bash
# 실행: 브라우저에서 index.html 열기
open ch01_dom/index.html
```

---

### ch02 — 이벤트 (Event)

**한 줄 요약:** 클릭, 키 입력, 폼 제출 등 사용자 행동에 JavaScript가 반응하도록 연결하는 방법

**이것을 배우면 할 수 있는 것:**
- 버튼을 클릭하면 특정 동작이 실행된다
- 키보드 단축키(Ctrl+S 등)를 만든다
- 폼 제출 전에 유효성 검사를 한다
- 마우스 위치를 추적하는 인터랙션을 만든다

| 핵심 개념 | 설명 |
|-----------|------|
| `addEventListener` | 이벤트와 핸들러 함수 연결 (권장 방식) |
| `removeEventListener` | 등록한 이벤트 제거 |
| `{ once: true }` | 딱 1번만 실행되는 이벤트 |
| `e.target` / `e.currentTarget` | 이벤트 발생 요소 vs 리스너 등록 요소 |
| `e.preventDefault()` | 브라우저 기본 동작(링크 이동, 폼 전송 등) 막기 |
| `click` / `mousemove` / `mouseenter` | 마우스 이벤트 |
| `keydown` / `keyup`, `e.key` / `e.code` | 키보드 이벤트 |
| `submit` / `focus` / `blur` / `input` / `change` | 폼 이벤트 |

```bash
# 실행: 브라우저에서 index.html 열기
open ch02_event/index.html
```

---

### ch03 — BOM (Browser Object Model)

**한 줄 요약:** URL 이동, 팝업 창, 타이머, 브라우저 환경 정보 등 브라우저 자체 기능을 다루는 방법

**이것을 배우면 할 수 있는 것:**
- 로그인 후 다른 페이지로 이동시킨다
- 5초 후 팝업 배너를 띄운다
- 실시간 시계나 카운트다운 타이머를 만든다
- 사용자가 사용하는 언어에 따라 다른 화면을 보여준다

| 핵심 개념 | 설명 |
|-----------|------|
| `window` | 브라우저의 전역 객체. 모든 것의 최상위 |
| `navigator.language` / `onLine` | 브라우저 언어, 인터넷 연결 여부 확인 |
| `window.innerWidth` / `innerHeight` | 현재 브라우저 창 크기 |
| `alert` / `confirm` / `prompt` | 내장 팝업 창 (안내/선택/입력) |
| `location.href` / `pathname` / `search` | URL 정보 파싱 및 페이지 이동 |
| `history.back()` / `forward()` | 브라우저 방문 기록 이동 |
| `scrollTo` / `scrollBy` | 절대/상대 스크롤 제어 |
| `setTimeout` + `clearTimeout` | 일정 시간 후 1회 실행 |
| `setInterval` + `clearInterval` | 일정 간격 반복 실행 |
| `window.open` | 새 탭에서 URL 열기 |

```bash
# 실행: 브라우저에서 index.html 열기
open ch03_bom/index.html
```

---

## 폴더 구조

```
stage03_web_basic/
│
├── README.md                 ← 이 문서 (전체 안내)
│
├── ch01_dom/
│   ├── index.html            ← 5개 섹션 인터랙티브 데모 페이지
│   ├── style.css             ← 카드 레이아웃 + 선택/활성화 시각 피드백
│   ├── app.js                ← DOM 조작 함수 (상세 주석)
│   └── README.md             ← DOM 개념 가이드
│
├── ch02_event/
│   ├── index.html            ← 5개 섹션 인터랙티브 데모 페이지
│   ├── style.css             ← 마우스 추적 패드 + 키 표시 스타일
│   ├── app.js                ← 이벤트 핸들러 전체 (상세 주석)
│   └── README.md             ← 이벤트 개념 가이드
│
└── ch03_bom/
    ├── index.html            ← 5개 섹션 인터랙티브 데모 페이지
    ├── style.css             ← 스톱워치·타이머 스타일
    ├── app.js                ← BOM 조작 함수 전체 (상세 주석)
    └── README.md             ← BOM 개념 가이드
```

---

## 실행 환경

이 폴더의 모든 예제는 **Node.js 없이** 브라우저에서 바로 실행됩니다.

```bash
# macOS/Linux
open ch01_dom/index.html
open ch02_event/index.html
open ch03_bom/index.html

# Windows
start ch01_dom/index.html
```

VS Code를 사용한다면 **Live Server** 확장 프로그램을 설치하면 더 편리합니다.  
파일을 저장할 때마다 브라우저가 자동으로 새로고침됩니다.

---

## stage01과의 차이점

| | stage01_start | stage03_web_basic |
|---|---|---|
| **실행 환경** | Node.js (터미널) | 브라우저 |
| **다루는 것** | 언어 문법 (변수, 함수, 객체 등) | 브라우저 API (DOM, 이벤트, BOM) |
| **결과 확인** | 터미널 출력 | 브라우저 화면 변화 |
| **파일 형태** | `.js` 단독 파일 | `index.html` + `style.css` + `app.js` 세트 |

> stage01에서 배운 JavaScript 문법(변수, 조건문, 반복문, 함수, 배열, 객체)이  
> 이 폴더에서는 **브라우저 조작**에 그대로 사용됩니다.  
> 문법이 익숙하지 않다면 stage01을 먼저 복습하고 오세요.

---

## 학습 팁

1. **직접 열어보세요** — 각 챕터의 `index.html`을 브라우저에서 열고, 버튼을 클릭하며 동작을 먼저 확인하세요.
2. **개발자 도구를 활용하세요** — 브라우저에서 `F12` 또는 `Cmd+Option+I`를 누르면 콘솔 로그를 확인할 수 있습니다.
3. **app.js를 직접 수정해보세요** — 숫자를 바꾸거나 텍스트를 바꿔서 어떻게 달라지는지 실험해보세요.
4. **오류 메시지를 읽으세요** — 콘솔에 빨간 오류 메시지가 나오면 당황하지 말고 내용을 읽어보세요. 어디서 문제가 생겼는지 알려줍니다.

---

## 개념 키워드 빠른 참조

| 키워드 | 챕터 | 설명 |
|--------|------|------|
| DOM | ch01 | HTML 문서를 JavaScript가 조작할 수 있는 객체 트리 |
| querySelector | ch01 | CSS 선택자로 요소 찾기 |
| classList | ch01 | 클래스 추가/제거/토글 |
| innerHTML | ch01 | HTML 태그 포함 내용 읽기/쓰기 (XSS 주의) |
| textContent | ch01 | 텍스트 내용 읽기/쓰기 (안전) |
| createElement | ch01 | 새 HTML 요소 생성 |
| dataset | ch01 | data-* 커스텀 속성 |
| addEventListener | ch02 | 이벤트와 핸들러 연결 |
| e.target | ch02 | 실제로 이벤트가 발생한 요소 |
| preventDefault | ch02 | 브라우저 기본 동작 방지 |
| keydown / keyup | ch02 | 키보드 누름/뗌 이벤트 |
| e.key / e.code | ch02 | 입력된 문자 / 물리적 키 위치 |
| submit | ch02 | 폼 제출 이벤트 |
| focus / blur | ch02 | 입력창 포커스 이벤트 |
| BOM | ch03 | 브라우저 창과 소통하는 객체들의 집합 |
| window | ch03 | 브라우저의 전역 최상위 객체 |
| location | ch03 | 현재 URL 정보 및 페이지 이동 |
| history | ch03 | 브라우저 방문 기록 |
| navigator | ch03 | 브라우저/OS/언어 환경 정보 |
| setTimeout | ch03 | 일정 시간 후 1회 실행 |
| setInterval | ch03 | 일정 간격으로 반복 실행 |
| alert / confirm / prompt | ch03 | 브라우저 내장 팝업 창 |
