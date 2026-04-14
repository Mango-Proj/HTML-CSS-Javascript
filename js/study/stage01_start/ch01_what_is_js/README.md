# Ch01. 자바스크립트(JavaScript)란?

## 학습 목표

- 자바스크립트의 정의와 역할을 설명할 수 있다
- HTML / CSS / JavaScript 의 역할 분담을 이해한다
- 브라우저 내장 함수(`alert` / `confirm` / `prompt` / `console`)를 사용할 수 있다
- HTML 에 자바스크립트를 연결하는 3가지 방법과 차이를 안다
- `async` / `defer` 속성의 차이와 권장 사용법을 이해한다
- DOM 이 무엇인지, JS 가 HTML 을 어떻게 조작하는지 이해한다

---

## 1. 자바스크립트란?

자바스크립트(JavaScript)는 **동적 웹 페이지**를 만드는 데 사용하는 프로그래밍 언어입니다.

> **동적 요소**: 사용자의 동작(클릭, 입력 등)에 따라 화면이 변화하는 것을 의미합니다.

### 웹 개발의 3대 핵심 언어

| 언어 | 역할 | 비유 |
|------|------|------|
| HTML | 구조 (뼈대) | 건물의 기둥과 벽 |
| CSS | 디자인 (외형) | 도색과 인테리어 |
| JavaScript | 동작 (기능) | 전기·수도·엘리베이터 |

```
사용자 ──클릭/입력──▶ JavaScript ──변경──▶ HTML/CSS ──업데이트──▶ 화면
```

---

## 2. 자바스크립트의 역사

| 연도 | 사건 |
|------|------|
| 1995 | Brendan Eich가 넷스케이프에서 10일 만에 개발 |
| 1995 | 이름 변천: `Mocha` → `LiveScript` → `JavaScript` |
| 1997 | ECMAScript(ECMA-262) 표준 1판 발표 |
| 2009 | ES5 — `forEach`, `map`, `JSON` 지원 추가 |
| 2009 | **Node.js** 등장 — 서버에서도 JS 실행 가능 |
| 2015 | **ES6(ES2015)** — `let/const`, 화살표 함수, 클래스 등 대규모 업데이트 |
| 매년 | ES2016 ~ ES2024 — 매년 새 표준 발표 |

> **Java 와 JavaScript 는 전혀 다른 언어입니다.**  
> 당시 인기 있던 Java 의 이름을 마케팅 목적으로 빌린 것일 뿐입니다.

---

## 3. 자바스크립트의 실행 방식

```
소스 코드(.js)
    ↓
인터프리터(Interpreter)
  - 한 줄씩 읽고 즉시 실행
  - 에러 발생 시 즉각 파악
    ↓
JIT 컴파일러(Just-In-Time Compiler)
  - 자주 실행되는 코드를 기계어로 컴파일
  - 반복 실행 구간의 성능을 향상
    ↓
실행 결과
```

### 주요 JS 엔진

| 엔진 | 사용처 |
|------|--------|
| **V8** | Google Chrome, Node.js |
| **SpiderMonkey** | Mozilla Firefox |
| **JavaScriptCore** | Safari |
| **Chakra** | 구 Microsoft Edge |

현대 JS 엔진(V8 등)은 인터프리터 + JIT 컴파일러를 함께 사용해  
**빠른 응답성과 고성능을 동시에** 제공합니다.

---

## 4. 자바스크립트의 사용 영역

```
[프론트엔드]               [백엔드]              [기타]
React                     Node.js              React Native (모바일)
Vue.js        ──JS──      Express.js           Electron (데스크톱)
Angular                   NestJS               Three.js (3D/게임)
Next.js                   Deno                 TensorFlow.js (AI)
```

---

## 5. 브라우저 내장 함수

브라우저에는 JS 엔진이 내장되어 있어 개발자 도구(F12 → Console)에서 바로 실습할 수 있습니다.

### console 메서드

```js
console.log('일반 메시지');          // 흰색/검은색
console.warn('경고 메시지');         // 노란색 + 경고 아이콘
console.error('에러 메시지');        // 빨간색 + 에러 아이콘
console.info('정보 메시지');         // 파란색 아이콘
console.table([{ name: 'Alice' }]);  // 표 형태로 출력
```

### 대화창 함수

| 함수 | 설명 | 반환값 |
|------|------|--------|
| `alert(msg)` | 메시지 경고창 | `undefined` |
| `confirm(msg)` | 확인/취소 선택창 | `true` / `false` |
| `prompt(msg, 기본값)` | 텍스트 입력창 | 입력 문자열 / `null` |

```js
// alert — 사용자에게 알림 표시
alert('안녕하세요!');

// confirm — 사용자의 선택을 받음
const answer = confirm('계속 하시겠습니까?');
if (answer) {
    console.log('확인 선택 → 계속 진행');
} else {
    console.log('취소 선택 → 중단');
}

// prompt — 사용자가 텍스트를 직접 입력
const name = prompt('이름을 입력하세요', '홍길동');
if (name !== null) {
    console.log(`안녕하세요, ${name}님!`);
}
```

> **주의**: `alert`, `confirm`, `prompt` 는 실행 중 스크립트를 차단(블로킹)하므로  
> 실무에서는 모달(modal) UI 컴포넌트를 대신 사용하는 것이 일반적입니다.

---

## 6. DOM — 자바스크립트가 HTML을 다루는 방법

**DOM(Document Object Model)**: 브라우저가 HTML 문서를 읽어 만든 트리 구조의 객체 모델입니다.  
자바스크립트는 DOM 을 통해 HTML 요소를 찾고, 내용·스타일·속성을 동적으로 바꿉니다.

```
HTML 문서
└── document
    └── html
        ├── head
        └── body
            ├── h1
            ├── p
            └── button
```

```js
// 요소 선택
const el   = document.getElementById('my-id');      // id 로 하나 선택
const el2  = document.querySelector('.my-class');   // CSS 선택자로 첫 번째
const list = document.querySelectorAll('li');       // CSS 선택자로 전체

// 내용 변경
el.textContent = '새 텍스트';    // 텍스트만 변경
el.innerHTML   = '<b>굵게</b>'; // HTML 포함 변경

// 스타일 변경
el.style.color      = 'red';
el.style.fontSize   = '24px';

// 이벤트 등록
el.addEventListener('click', function () {
    console.log('클릭 이벤트 발생!');
});
```

---

## 7. HTML에 자바스크립트 연결하기

### 방법 1. 인라인 (비권장)

```html
<button onclick="console.log('클릭!')">버튼</button>
```
HTML 과 JS 가 섞여 유지보수가 어렵습니다.

### 방법 2. 내부 스크립트

```html
<body>
    <span>내용</span>

    <!-- body 하단에 script 태그 작성 -->
    <script>
        console.log('내부 스크립트 실행');
    </script>
</body>
```

### 방법 3. 외부 파일 연결 (권장) ✅

```html
<body>
    <span>내용</span>

    <!-- HTML 요소가 모두 로드된 후 실행되도록 body 맨 아래에 위치 -->
    <script src="script.js"></script>
</body>
```

| 방식 | 장점 | 단점 |
|------|------|------|
| 인라인 | 빠른 테스트 | HTML/JS 혼재, 유지보수 어려움 |
| 내부 스크립트 | 별도 파일 불필요 | 파일이 길어지면 가독성 저하 |
| **외부 파일** | 재사용, 캐싱, 분리 명확 | 별도 파일 관리 필요 |

### `<script>` 위치의 중요성

```
브라우저 HTML 파싱 순서:
<head> 읽기 → ... → <body> 내용 → <script> → 완료

⚠️ head 에 script 배치 시:
  HTML 요소가 아직 없는 상태에서 JS 가 실행 →
  getElementById 등이 null 반환 → 오류 발생

✅ body 하단에 script 배치 시:
  모든 HTML 요소가 생성된 후 실행 → 안전
```

---

## 8. async / defer — 스크립트 로딩 최적화

외부 스크립트를 `<head>` 에 배치할 때 사용합니다.

```html
<!-- defer: HTML 파싱과 병렬로 다운로드, 파싱 완료 후 순서대로 실행 -->
<script src="app.js" defer></script>

<!-- async: HTML 파싱과 병렬로 다운로드, 완료 즉시 실행 (순서 보장 안 됨) -->
<script src="analytics.js" async></script>
```

| 속성 | 다운로드 | 실행 시점 | 실행 순서 | 사용 권장 |
|------|---------|---------|---------|---------|
| 없음 | 순차 | 즉시 (HTML 차단) | 순서 보장 | body 하단 배치 |
| `defer` | 병렬 | HTML 파싱 완료 후 | 순서 보장 ✅ | 일반 스크립트 |
| `async` | 병렬 | 다운로드 완료 즉시 | 보장 안 됨 | 독립적 스크립트 (광고, 통계) |

```
일반 script:  HTML ─██(차단)─── 실행 ──▶ HTML 재개
defer:        HTML ──────────────────────▶ 파싱 완료 후 실행
async:        HTML ────────────────────▶
              다운로드 완료 ──즉시 실행──▶
```

---

## 파일 구조

```
ch01_what_is_js/
├── index.html  ← HTML 구조 + JS 연결 방식 데모
├── script.js   ← console / alert·confirm·prompt / DOM 조작 / 이벤트
└── README.md   ← 이 문서
```

## 실행 방법

`index.html` 파일을 브라우저에서 엽니다.

```bash
# VS Code Live Server 확장 사용 권장
# 또는 파일 탐색기에서 index.html 더블클릭
open index.html   # macOS
start index.html  # Windows
```

---

## 핵심 요약

```
JS 역할:    HTML(구조) + CSS(디자인) + JS(동작) 중 동작 담당
실행 방식:  인터프리터 + JIT 컴파일러 혼합 (V8 엔진)
연결 방법:  외부 파일(<script src="...">)을 body 하단에 배치 권장
DOM:        JS 가 HTML 요소를 읽고 변경할 수 있게 해주는 객체 모델

내장 함수:
  console.log()  → 개발자 도구 콘솔에 출력
  alert()        → 경고 팝업 (확인만)
  confirm()      → 확인/취소 팝업 → boolean 반환
  prompt()       → 텍스트 입력 팝업 → 문자열 반환
```
