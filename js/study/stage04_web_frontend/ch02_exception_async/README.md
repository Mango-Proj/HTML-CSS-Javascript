# ch02 · 예외 처리 & 비동기 통신

자바스크립트의 예외 처리와 비동기 프로그래밍 핵심 패턴을 인터랙티브 데모로 학습합니다.

---

## 실행 방법

별도 서버 없이 브라우저에서 직접 열 수 있습니다.

```bash
# 현재 폴더에서 바로 열기
open index.html

# 또는 로컬 서버 사용
python3 -m http.server 8080
# → http://localhost:8080 접속
```

> **참고**: Fetch API 데모는 외부 API(`jsonplaceholder.typicode.com`)에 요청을 보내므로 인터넷 연결이 필요합니다.

---

## 파일 구성

| 파일 | 설명 |
|------|------|
| `index.html` | 5개 섹션으로 구성된 인터랙티브 데모 페이지 |
| `style.css`  | 데모 페이지 전용 스타일 |
| `app.js`     | 원본 `fetchTodo()` + 5개 섹션 인터랙티브 로직 |
| `README.md`  | 이 문서 |

---

## 학습 내용

### 1. try / catch / finally & throw

프로그램 실행 중 발생하는 에러를 제어 흐름으로 처리하는 기법입니다.

```js
function safeDivide(a, b) {
  try {
    if (b === 0) throw new Error('0으로 나눌 수 없습니다!'); // 의도적 에러 발생
    return a / b;
  } catch (error) {
    console.error('catch 실행:', error.message);   // throw 된 에러를 받아 처리
  } finally {
    console.log('finally 실행 (항상)');            // 성공·실패 무관하게 항상 실행
  }
}
```

| 블록 | 실행 조건 |
|------|-----------|
| `try` | 항상 실행 시도 |
| `catch` | 에러 발생(또는 `throw`) 시에만 실행 |
| `finally` | 성공·실패 여부와 무관하게 **항상** 실행 |

**데모**: 두 수를 입력하고 나누기를 실행하면 try → catch → finally 흐름이 블록으로 시각화됩니다. 제수를 0으로 입력하면 `throw` → `catch` 경로를 확인할 수 있습니다.

---

### 2. 동기(Sync) vs 비동기(Async) 실행 순서

```js
// 동기: A → B → C 순서 보장
taskA();
taskB();   // A가 끝나야 실행
taskC();   // B가 끝나야 실행

// 비동기: B는 나중에, C는 먼저 실행됨
taskA();
setTimeout(() => taskB(), 1000);  // 1초 후 이벤트 루프에서 실행
taskC();                          // setTimeout을 기다리지 않고 즉시 실행
// 실행 순서: A → C → B
```

**이벤트 루프 핵심 개념**

- **콜 스택(Call Stack)**: 현재 실행 중인 함수를 쌓는 구조
- **태스크 큐(Task Queue)**: `setTimeout`, `setInterval` 콜백 대기 공간
- **마이크로태스크 큐**: `Promise.then`, `async/await` 콜백 대기 공간 (태스크 큐보다 우선)
- **이벤트 루프**: 콜 스택이 비었을 때 큐에서 꺼내 실행

**데모**: 동기 / setTimeout 비동기 / Promise 체이닝 버튼으로 각 실행 순서를 타임라인과 로그로 비교합니다.

---

### 3. Promise 상태 & .then / .catch / .finally

비동기 작업의 최종 결과를 나타내는 객체입니다.

```js
const p = new Promise((resolve, reject) => {
  // 성공 시: resolve(값)
  // 실패 시: reject(이유)
});

p.then(value  => console.log('성공:', value))   // Fulfilled 시 실행
 .catch(reason => console.error('실패:', reason)) // Rejected  시 실행
 .finally(()  => console.log('항상 실행'));       // 항상 실행
```

**3가지 상태**

| 상태 | 설명 | 전환 방법 |
|------|------|-----------|
| `Pending` (대기) | 초기 상태, 결과 미확정 | — |
| `Fulfilled` (이행) | 작업 성공 | `resolve()` 호출 |
| `Rejected` (거부) | 작업 실패 | `reject()` 호출 |

> 한 번 Fulfilled 또는 Rejected 가 되면 상태는 **변경되지 않습니다 (불변)**.

**병렬 Promise 패턴**

```js
// Promise.all: 모두 성공해야 결과 반환, 하나라도 실패 시 전체 실패
const results = await Promise.all([fetch(url1), fetch(url2), fetch(url3)]);

// Promise.race: 가장 먼저 settled 된 결과 하나만 반환
const fastest = await Promise.race([slow(), medium(), fast()]);
```

**데모**: "새 Promise 생성" → resolve / reject 버튼으로 상태 전환과 체인 실행 흐름을 실시간 확인합니다.

---

### 4. async / await

Promise 기반 비동기 코드를 동기 코드처럼 읽히게 작성하는 문법입니다.

```js
// async: 이 함수는 항상 Promise를 반환합니다
async function fetchTodo() {
  try {
    // await: Promise가 settled 될 때까지 이 줄에서 기다립니다
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }

    const data = await response.json();
    const { userId, id, title, completed } = data;  // 구조 분해 할당
    return { userId, id, title, completed };

  } catch (error) {
    console.error('에러:', error.message);
  } finally {
    console.log('작업 종료');
  }
}
```

**핵심 규칙**

- `await`는 `async` 함수 내부에서만 사용 가능합니다
- `await`는 Promise 가 처리될 때까지 해당 `async` 함수의 실행을 일시 중지합니다 (다른 코드 실행을 막지 않음)
- `async` 함수는 항상 Promise 를 반환합니다

**데모**: ID 입력 후 단일 항목 불러오기, ID 범위 지정 후 `Promise.all` 병렬 불러오기를 실행합니다.

---

### 5. Fetch API 에러 처리 패턴

`fetch()`는 네트워크 에러에서만 reject 되고, HTTP 에러(404, 500)에서는 resolve 됩니다.

```js
async function safeFetch(url) {
  try {
    const res = await fetch(url);

    // ❌ 잘못된 패턴: HTTP 404/500 에서도 여기까지 도달합니다
    // ✅ 올바른 패턴: response.ok 를 반드시 직접 확인해야 합니다
    if (!res.ok) {
      throw new Error(`HTTP 오류: ${res.status}`);
    }

    return await res.json();

  } catch (error) {
    // catch 가 처리하는 두 가지 경우:
    // 1. 네트워크 에러 (DNS 실패, 연결 거부 등) → fetch 자동 reject
    // 2. response.ok 체크 후 명시적 throw
    console.error('요청 실패:', error.message);
  }
}
```

**에러 유형 비교**

| 상황 | fetch 동작 | 처리 방법 |
|------|-----------|-----------|
| HTTP 200 OK | resolve | `response.json()` 으로 데이터 추출 |
| HTTP 404 Not Found | **resolve** (주의!) | `response.ok` 확인 후 `throw` |
| HTTP 500 Server Error | **resolve** (주의!) | `response.ok` 확인 후 `throw` |
| 네트워크 에러 (DNS 실패 등) | **reject** | `catch` 에서 자동 처리 |

**데모**: 정상 요청 / 404 요청 / 네트워크 에러 3가지 케이스를 직접 실행하며 동작 차이를 확인합니다.

---

## 데모 섹션 요약

| # | 섹션 | 주요 인터랙션 |
|---|------|---------------|
| 01 | try / catch / finally | 숫자 입력 → 나누기 실행 → 흐름 블록 시각화 |
| 02 | 동기 vs 비동기 | 동기 / setTimeout / Promise 체이닝 실행 순서 비교 |
| 03 | Promise 상태 | 직접 resolve / reject 호출 → 상태 전환 확인, Promise.all/race |
| 04 | async / await | ID 지정 단일 fetch, 범위 병렬 fetch |
| 05 | Fetch 에러 처리 | OK / 404 / 네트워크 에러 케이스 직접 실행 |

---

## 코드 구분

`app.js` 의 코드는 두 가지로 구분됩니다.

- `[원본 코드]` — 학습 자료의 원본 `fetchTodo()` 함수 (수정 없음)
- `[추가 코드]` — 인터랙티브 데모를 위해 추가된 코드 (섹션 1~5 핸들러, 유틸리티 등)
