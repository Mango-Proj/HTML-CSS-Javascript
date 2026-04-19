# stage05 · 웹 프론트엔드 심화

자바스크립트가 브라우저와 어떻게 상호작용하는지, 그리고 실무에서 반드시 알아야 할 **성능 최적화**, **비동기 처리**, **데이터 관리** 패턴을 학습합니다.

---

## 이 단계에서 무엇을 배우는가?

stage03(브라우저 기초)과 stage04(자바스크립트 심화)를 마쳤다면, 이제는 그 지식들을 엮어 **실제 웹 앱처럼 동작하는 코드**를 작성할 수 있습니다.

- 브라우저가 화면을 그리는 원리를 이해하여 **느린 코드의 원인**을 파악합니다
- 서버 통신, 사용자 입력 대기 등 **기다림이 있는 코드**를 올바르게 작성합니다
- 데이터를 안전하게 다루고 **브라우저에 적절히 저장**하는 방법을 익힙니다

> 취업 준비 중이라면 이 단계의 내용은 면접에서 자주 묻는 주제들입니다.  
> (이벤트 루프, Promise, async/await, 불변성, localStorage vs Cookie 등)

---

## 학습 순서

```
ch01_browser          →   ch02_exception_async   →   ch03_data_management
(브라우저 렌더링·이벤트)       (에러처리·비동기·Fetch)         (불변성·모듈화·스토리지)
  ↓ 왜 느린지 이해           ↓ 기다리는 코드 작성           ↓ 데이터 안전하게 관리
  성능 최적화 기초             Promise·async/await           localStorage·Cookie
```

세 챕터가 독립적이지 않고 서로 연결됩니다.  
- ch01에서 배운 **렌더링 원리**가 ch02의 DOM 조작 성능에 영향을 줍니다  
- ch02의 **비동기 패턴**으로 ch03의 스토리지 데이터를 서버와 주고받습니다  
- ch03의 **불변성 원칙**은 ch02에서 다루는 상태 관리와 긴밀히 연결됩니다

---

## 챕터별 소개

### ch01 · 브라우저 렌더링과 이벤트

**이것을 배우면 할 수 있는 것:**
- "왜 스크롤할 때 버벅이는지" 설명하고 해결할 수 있습니다
- `top/left` 대신 `transform`을 써야 하는 이유를 알게 됩니다
- 버튼 100개에 이벤트 100개 달지 않고 1개로 처리합니다
- `<script>` 위치와 `async`/`defer`의 차이를 이해합니다

**핵심 개념:**

| 개념 | 한 줄 요약 |
|------|-----------|
| 렌더링 6단계 | HTML→DOM→CSSOM→Render Tree→Layout→Paint→Composite |
| Reflow | 위치·크기 변경 시 전체 레이아웃 재계산 (비싸다) |
| Repaint | 색상·배경 변경 시 다시 칠하기 (중간 비용) |
| Composite | transform·opacity 변경 시 GPU만 사용 (저렴하다) |
| DocumentFragment | 여러 요소를 묶어 한 번에 DOM에 삽입 |
| 이벤트 버블링 | 자식 이벤트가 부모로 전파됨 |
| 이벤트 위임 | 부모 하나에 이벤트 달아 자식 모두 처리 |
| `defer` | HTML 파싱 후 JS 실행 (권장) |

---

### ch02 · 예외 처리와 비동기

**이것을 배우면 할 수 있는 것:**
- 서버 통신 중 오류가 나도 앱이 죽지 않게 할 수 있습니다
- `then().catch()` 대신 `async/await`으로 깔끔하게 작성합니다
- `fetch()`로 API를 호출하고 응답 데이터를 화면에 표시합니다
- 이벤트 루프가 어떻게 동작하는지 설명할 수 있습니다

**핵심 개념:**

| 개념 | 한 줄 요약 |
|------|-----------|
| try/catch/finally | 에러가 나도 안전하게 처리, 항상 실행할 코드 분리 |
| 동기 vs 비동기 | 기다리냐 vs 등록만 하고 다음 코드 실행 |
| 이벤트 루프 | 콜 스택 → 마이크로태스크 → 태스크 큐 순서로 처리 |
| Promise | 비동기 작업의 미래 결과값 (대기/완료/실패) |
| Promise.all | 여러 비동기 작업 동시 실행, 모두 완료될 때 이어서 실행 |
| async/await | Promise를 동기 코드처럼 읽기 쉽게 작성 |
| fetch | 브라우저 내장 HTTP 요청 API |
| response.ok | 404/500도 catch 안 됨 → 반드시 직접 확인 |

---

### ch03 · 데이터 관리

**이것을 배우면 할 수 있는 것:**
- 다크모드 설정, 최근 검색어를 브라우저에 저장하고 불러옵니다
- 코드를 파일 단위로 나눠 깔끔하게 관리합니다
- `const`를 써도 배열이 바뀌는 이유를 설명합니다
- localStorage / sessionStorage / Cookie의 차이를 알고 올바르게 선택합니다

**핵심 개념:**

| 개념 | 한 줄 요약 |
|------|-----------|
| const 오해 | 재할당 금지지, 배열·객체 내부 변경은 가능 |
| 불변 패턴 | `[...arr, item]`, `{ ...obj, key: val }` 로 새 데이터 생성 |
| export/import | 기능을 파일 밖으로 내보내고 가져옴 |
| 모듈 스코프 | 모듈 안 변수는 전역 오염 없이 독립됨 |
| localStorage | 영구 저장, ~5MB, 탭 공유, 서버 전송 없음 |
| sessionStorage | 탭 닫으면 삭제, 탭 독립, 서버 전송 없음 |
| Cookie | ~4KB, 서버 자동 전송, 보안 속성 (HttpOnly/SameSite) |
| JSON.stringify | 객체 → 문자열 변환 (스토리지 저장 전) |
| JSON.parse | 문자열 → 객체 복원 (스토리지 읽은 후) |

---

## 디렉토리 구조

```
stage05_web_frontend/
├── README.md                          ← 이 문서
│
├── ch01_browser/
│   ├── index.html                     ← 렌더링·이벤트 데모 페이지
│   ├── style.css
│   ├── app.js                         ← 렌더링 최적화, 이벤트 위임 예제
│   └── README.md
│
├── ch02_exception_async/
│   ├── index.html                     ← 예외처리·비동기 데모 페이지
│   ├── style.css
│   ├── app.js                         ← try/catch, Promise, async/await, fetch 예제
│   └── README.md
│
└── ch03_data_management/
    ├── index.html                     ← 데이터 관리 인터랙티브 데모 페이지
    ├── style.css
    ├── main.js                        ← ES 모듈, 스토리지 데모 로직
    ├── theme.js                       ← saveTheme/loadTheme export 모듈
    ├── cookie_example.js              ← 쿠키 독립 예제 (참고용)
    └── README.md
```

---

## 실행 방법

### ch01, ch02

`file://`로 직접 열어도 동작합니다.

```
index.html 파일을 더블클릭 또는 Live Server로 열기
```

### ch03 (ES 모듈 사용)

반드시 HTTP 서버를 통해 열어야 합니다.

```bash
# 방법 1: Python 내장 서버
cd stage05_web_frontend
python3 -m http.server 8080
# → http://localhost:8080/ch03_data_management/ 접속

# 방법 2: VS Code Live Server 확장 프로그램
# ch03_data_management/index.html 우클릭 → Open with Live Server
```

> `file://`로 직접 열면 `import` 구문에서 CORS 오류가 발생합니다.

---

## stage03·04와의 비교

| | stage03_web_basic | stage04_jump_js | stage05_web_frontend |
|---|---|---|---|
| 핵심 질문 | 브라우저를 어떻게 다루나? | 자바스크립트를 어떻게 잘 쓰나? | 실무 앱을 어떻게 만드나? |
| 주요 내용 | DOM, 이벤트, BOM | 타입, 함수, 배열 메서드 | 렌더링 원리, 비동기, 스토리지 |
| 난이도 | ★★☆☆☆ | ★★★☆☆ | ★★★★☆ |
| 실무 연관성 | 기초 DOM 조작 | 코드 품질·패턴 | 성능·에러처리·아키텍처 |

---

## 빠른 키워드 참조

| 키워드 | 챕터 | 의미 |
|--------|------|------|
| Reflow | ch01 | 위치·크기 변경으로 전체 레이아웃 재계산 |
| Repaint | ch01 | 색상 변경으로 다시 그리기 |
| Composite | ch01 | GPU 처리, 성능 최적화의 목표 |
| transform | ch01 | Composite만 유발, 애니메이션에 사용 |
| DocumentFragment | ch01 | 다수 요소 묶음 삽입으로 Reflow 최소화 |
| 이벤트 버블링 | ch01 | 자식 → 부모로 이벤트 전파 |
| 이벤트 위임 | ch01 | 부모 하나에서 자식 이벤트 모두 처리 |
| defer | ch01 | HTML 파싱 완료 후 JS 실행 |
| try/catch | ch02 | 에러를 잡아 안전하게 처리 |
| finally | ch02 | 성공·실패 관계없이 항상 실행 |
| 이벤트 루프 | ch02 | JS가 비동기를 처리하는 메커니즘 |
| 마이크로태스크 | ch02 | Promise 콜백, 태스크보다 먼저 실행 |
| Promise | ch02 | 비동기 작업의 결과를 담는 객체 |
| Promise.all | ch02 | 여러 비동기 작업 병렬 실행 |
| async/await | ch02 | Promise를 동기처럼 읽기 쉽게 작성 |
| fetch | ch02 | HTTP 요청 내장 API |
| response.ok | ch02 | 404/500 감지 — 반드시 확인 |
| 불변성 | ch03 | 원본 대신 새 데이터 생성 |
| spread | ch03 | `...` 펼쳐서 새 배열·객체 생성 |
| export | ch03 | 모듈 기능 공개 |
| import | ch03 | 다른 모듈 기능 가져오기 |
| localStorage | ch03 | 영구 저장, 탭 공유 |
| sessionStorage | ch03 | 탭 닫으면 삭제 |
| Cookie | ch03 | 서버 자동 전송, 4KB |
| HttpOnly | ch03 | JS 쿠키 접근 차단, XSS 방어 |
| SameSite | ch03 | 크로스 사이트 쿠키 제어, CSRF 방어 |
