# 🌐 BOM & Window 완벽 가이드

---

## 실행 방법

`index.html` 파일을 브라우저에서 바로 열면 됩니다. (별도 서버 불필요)

```bash
open index.html
```

---

## BOM이란 무엇인가?

### 비유: 자동차 계기판과 핸들

> 자동차를 운전할 때 **엔진(JavaScript 코드)** 만 있으면 될까요?  
> 아니죠. 속도계, 내비게이션, 경적, 창문 버튼처럼 **차의 각 기능에 접근하는 수단**이 필요합니다.
>
> 웹 브라우저도 마찬가지입니다:
> - **JavaScript 코드** = 엔진 (실제 동작)
> - **BOM (Browser Object Model)** = 계기판과 각종 버튼 (브라우저 기능에 접근하는 수단)
>
> BOM을 통해 현재 URL을 읽고, 새 창을 열고, 타이머를 설정하고, 브라우저 정보를 가져올 수 있습니다.

공식 정의: **BOM(Browser Object Model)** 은 브라우저 창과 소통하기 위한 JavaScript 객체들의 집합입니다.

---

### DOM과 BOM의 차이

이전 챕터에서 배운 DOM과 BOM은 다른 개념입니다.

| | DOM | BOM |
|---|---|---|
| **대상** | HTML 문서의 내용 | 브라우저 창 자체 |
| **예시** | 버튼 텍스트 바꾸기, 요소 추가/삭제 | 주소창 이동, 타이머 설정, 팝업 창 |
| **주요 객체** | `document` | `window`, `location`, `navigator`, `history` |

> **비유:**  
> - DOM = 아파트 내부 인테리어 (가구 옮기기, 벽지 바꾸기)  
> - BOM = 아파트 건물 관리 (엘리베이터 호출, 현관문 제어, 경비실 연락)

---

## BOM 전체 구조

```
window (최상위 전역 객체 — 모든 것의 부모)
├── document     — DOM (HTML 문서 조작, ch01에서 학습)
├── navigator    — 브라우저·OS·언어 환경 정보
├── screen       — 사용자 모니터 해상도 정보
├── location     — 현재 URL 정보 및 페이지 이동
├── history      — 브라우저 방문 기록
└── (메서드들)
    ├── alert / confirm / prompt  — 대화 상자
    ├── setTimeout / setInterval  — 타이머
    ├── scrollTo / scrollBy       — 스크롤 제어
    └── open / close              — 창 열기/닫기
```

### window는 생략 가능합니다

`window`는 브라우저의 전역 객체이므로 앞에 `window.`를 붙이지 않아도 됩니다.  
코드를 작성할 때 `console.log()`나 `alert()`가 원래는 `window.console.log()`, `window.alert()`인 셈입니다.

```js
window.alert('안녕')  ===  alert('안녕')     // 같은 코드
window.setTimeout(fn, 1000)  ===  setTimeout(fn, 1000)
window.location.href  ===  location.href
```

---

## 목차

1. [navigator & screen & window 크기](#1-navigator--screen--window-크기)
2. [대화 상자 (alert / confirm / prompt)](#2-대화-상자)
3. [location & history & 스크롤](#3-location--history--스크롤)
4. [타이머 (setTimeout / setInterval)](#4-타이머)
5. [점심 메뉴 뽑기 (원본 예제)](#5-점심-메뉴-뽑기-원본-예제)

---

## 1. navigator & screen & window 크기

### navigator — 브라우저·환경 정보

`navigator`는 현재 사용자가 어떤 환경에서 접속했는지 알려주는 객체입니다.

**활용 예:**
- 사용자가 사용하는 언어를 감지해서 자동으로 한국어/영어 페이지를 보여준다
- 인터넷 연결이 끊겼을 때 "오프라인 모드" 안내를 표시한다
- 모바일/데스크탑을 구분해서 다른 레이아웃을 적용한다

| 속성 | 반환값 예시 | 설명 |
|------|-------------|------|
| `navigator.language` | `"ko-KR"` | 브라우저 언어 설정 |
| `navigator.onLine` | `true` / `false` | 인터넷 연결 여부 |
| `navigator.userAgent` | `"Mozilla/5.0..."` | 브라우저 전체 식별 문자열 |
| `navigator.platform` | `"MacIntel"` | 운영체제 플랫폼 |

```js
// 인터넷 연결 상태 확인
if (navigator.onLine) {
  console.log('온라인 상태입니다.');
} else {
  console.log('오프라인 상태입니다. 인터넷을 확인하세요.');
}
```

---

### screen — 모니터 해상도 정보

`screen`은 사용자의 **물리적 모니터** 크기 정보입니다.

| 속성 | 설명 |
|------|------|
| `screen.width` | 모니터 전체 너비 (px) |
| `screen.height` | 모니터 전체 높이 (px) |
| `screen.availWidth` | 작업표시줄 제외 사용 가능한 너비 |
| `screen.availHeight` | 작업표시줄 제외 사용 가능한 높이 |

---

### window — 브라우저 창(뷰포트) 크기

`screen`이 모니터의 물리적 크기라면, `window`는 현재 브라우저 창의 크기입니다.

> **비유:**  
> - `screen.width` = 방(모니터)의 실제 크기  
> - `window.innerWidth` = 방 안에 놓인 창문(브라우저 창)의 크기  
> 사용자가 브라우저 창을 줄이면 `window.innerWidth`는 달라지지만 `screen.width`는 변하지 않습니다.

| 속성 | 설명 |
|------|------|
| `window.innerWidth` | 스크롤바 포함 브라우저 창 너비 |
| `window.innerHeight` | 스크롤바 포함 브라우저 창 높이 |
| `window.scrollX` | 현재 가로 스크롤 위치 |
| `window.scrollY` | 현재 세로 스크롤 위치 |
| `window.devicePixelRatio` | 물리 픽셀 / CSS 픽셀 비율 (레티나 디스플레이: 2) |

```js
// 브라우저 창 크기가 바뀔 때마다 실행
window.addEventListener('resize', function () {
  console.log(`창 크기: ${window.innerWidth} × ${window.innerHeight}`);
});
```

> **활용 예:** 반응형 레이아웃에서 창 크기에 따라 JavaScript 동작을 다르게 처리할 때 사용합니다.

---

## 2. 대화 상자

브라우저가 제공하는 세 가지 내장 팝업 창입니다.  
HTML/CSS로 디자인할 수 없는 **브라우저 기본 팝업**입니다.

> **주의:** 대화 상자가 실행되는 동안 JavaScript 코드 실행이 **일시 정지(블로킹)** 됩니다.  
> 사용자가 버튼을 누를 때까지 이후 코드가 실행되지 않습니다.  
> 이 때문에 실제 서비스에서는 직접 만든 모달 컴포넌트를 사용합니다.

### alert() — 안내 메시지

```js
alert('안내 메시지');
// 반환값: undefined (없음)
// 확인 버튼만 있음
```

> 활용: 중요한 공지사항, 오류 메시지, 디버깅용 값 확인

### confirm() — 예/아니오 선택

```js
const result = confirm('계속하시겠습니까?');
// 확인 클릭 → true
// 취소 클릭 → false

if (result) {
  console.log('확인을 눌렀습니다');
} else {
  console.log('취소를 눌렀습니다');
}
```

> 활용: "정말 삭제하시겠습니까?", "페이지를 떠나시겠습니까?"

### prompt() — 텍스트 입력받기

```js
const name = prompt('이름을 입력하세요:', '홍길동');
// 입력 후 확인 → 입력한 문자열 반환
// 취소 또는 창 닫기 → null 반환

if (name !== null) {
  console.log(`입력값: ${name}`);
}
```

> 두 번째 인자는 기본값입니다. 사용자가 아무것도 입력하지 않고 확인을 누르면 이 값이 반환됩니다.

### 세 가지 비교

| | `alert` | `confirm` | `prompt` |
|---|---|---|---|
| **반환값** | 없음 | `true`/`false` | 문자열 또는 `null` |
| **버튼** | 확인 | 확인 / 취소 | 확인 / 취소 |
| **용도** | 안내 | 선택 | 입력 받기 |

> **현업 팁:** 세 함수는 디자인 커스터마이즈가 불가능합니다.  
> 실제 서비스에서는 직접 만든 **모달(Modal) 컴포넌트**를 사용합니다.  
> 하지만 빠른 테스트나 간단한 확인 용도로는 여전히 유용합니다.

---

## 3. location & history & 스크롤

### location 객체 — URL 파싱

`location`은 현재 브라우저 주소창의 URL을 다루는 객체입니다.

URL 하나를 여러 조각으로 나눠 각 속성에 저장합니다.

```
https://example.com:8080/shop/detail?id=42#review
│       │           │    │            │    │
│       hostname    port pathname     search hash
protocol
```

```js
// 예시 URL: https://example.com:8080/shop/detail?id=42#review

location.href      // "https://example.com:8080/shop/detail?id=42#review" (전체 URL)
location.protocol  // "https:"
location.hostname  // "example.com"
location.port      // "8080"  (기본 포트면 빈 문자열)
location.pathname  // "/shop/detail"
location.search    // "?id=42"
location.hash      // "#review"
```

> **활용 예:** URL의 `?id=42` 부분을 읽어 해당 상품 정보를 서버에서 불러오는 기능에 사용합니다.  
> `location.search`로 쿼리 파라미터를 추출해 원하는 데이터를 필터링할 수 있습니다.

### 페이지 이동

```js
// href 방식: 이동 기록이 남아 뒤로가기 가능
location.href = 'https://example.com';

// replace 방식: 이동 기록이 남지 않아 뒤로가기 불가능
location.replace('https://example.com');
// 활용: 로그인 후 메인 페이지로 이동할 때 (로그인 페이지로 뒤로가기 방지)

// 현재 페이지 새로고침
location.reload();
```

---

### history 객체 — 방문 기록

`history`는 브라우저의 뒤로가기/앞으로가기 기능과 연결된 객체입니다.

```js
history.length    // 현재 탭의 방문 페이지 수

history.back()    // 뒤로 가기 (브라우저 ← 버튼과 동일)
history.forward() // 앞으로 가기 (브라우저 → 버튼과 동일)
history.go(-2)    // 2페이지 뒤로 이동
history.go(1)     // 1페이지 앞으로 이동
```

> **활용 예:** 커스텀 뒤로가기 버튼, 멀티스텝 회원가입 폼에서 "이전 단계" 버튼

---

### 스크롤 제어

```js
// scrollTo: 절대 좌표로 이동
window.scrollTo(0, 0);                          // 맨 위로 (x:0, y:0)
window.scrollTo({ top: 500, behavior: 'smooth' }); // 부드럽게 500px 지점으로

// scrollBy: 현재 위치 기준 상대 이동
window.scrollBy(0, 300);                         // 아래로 300px
window.scrollBy({ top: -200, behavior: 'smooth' }); // 부드럽게 위로 200px
```

| | `scrollTo` | `scrollBy` |
|---|---|---|
| **이동 기준** | 페이지 절대 좌표 | 현재 위치에서 상대적으로 |
| **사용 예** | "맨 위로" 버튼 | "아래로 스크롤" 버튼 |

> `behavior: 'smooth'` 옵션을 추가하면 **부드러운 애니메이션** 효과가 적용됩니다.  
> 랜딩 페이지의 "더 알아보기" 버튼 클릭 시 자연스럽게 스크롤되는 효과가 대표적인 활용 사례입니다.

---

## 4. 타이머

JavaScript의 타이머 기능은 **"N초 후에 이것을 해줘"** 또는 **"매 N초마다 이것을 반복해줘"** 를 구현합니다.

실생활 예:
- 배너 광고가 5초마다 자동으로 바뀐다 → `setInterval`
- 쇼핑몰 깜짝 세일이 3초 후에 팝업으로 뜬다 → `setTimeout`
- 스톱워치가 10ms 단위로 시간을 업데이트한다 → `setInterval`
- SNS에서 3초 동안 "저장됨" 메시지가 나타났다 사라진다 → `setTimeout`

### setTimeout — 일정 시간 후 한 번 실행

```
등록 시점          실행 시점
    │                 │
────●─────────────────●──────▶ 시간
    ↑                 ↑
 setTimeout()     3000ms 후 콜백 실행
```

```js
// 기본 사용법
const id = setTimeout(function () {
  console.log('3초 후 실행됩니다!');
}, 3000); // 단위: 밀리초 (1초 = 1000ms)

// 취소: 아직 실행 전에만 가능
clearTimeout(id);
```

> **비동기 동작:** `setTimeout`을 등록한 뒤 JavaScript는 멈추지 않고 다음 코드를 계속 실행합니다.  
> 3초가 지나면 등록해둔 콜백이 실행됩니다. (자세한 내용 → 비동기 학습)

---

### setInterval — 일정 간격으로 반복 실행

```
시작               1초    2초    3초    4초   clearInterval 호출
  │                 │      │      │      │         │
──●─────────────────●──────●──────●──────●─────────✕──────▶
                  실행   실행   실행   실행        중단
```

```js
let count = 0;

const id = setInterval(function () {
  count++;
  console.log(`${count}초 경과`);

  if (count >= 5) {
    clearInterval(id); // 5회 후 중단
  }
}, 1000); // 1초(1000ms)마다 반복
```

> ⚠️ **반드시 중단 조건을 만들어두세요.**  
> `clearInterval`을 호출하지 않으면 페이지를 닫을 때까지 계속 실행됩니다.  
> 메모리 낭비와 예기치 않은 동작의 원인이 됩니다.

---

### setTimeout vs setInterval 비교

| | `setTimeout` | `setInterval` |
|---|---|---|
| **실행 횟수** | 딱 1번 | 계속 반복 |
| **취소 방법** | `clearTimeout(id)` | `clearInterval(id)` |
| **주요 용도** | 지연 후 한 번 실행 | 주기적 갱신 (시계, 폴링) |
| **주의사항** | ID 없이는 취소 불가 | 반드시 clearInterval로 중단 |

---

### 타이머 ID를 저장해야 하는 이유

타이머를 등록하면 **고유한 숫자 ID**가 반환됩니다.  
이 ID가 있어야 나중에 취소할 수 있습니다.

```js
// ❌ ID를 저장하지 않으면 취소 불가능
setTimeout(function () { ... }, 3000);  // ID를 버림

// ✅ 변수에 저장해야 취소 가능
const timerId = setTimeout(function () { ... }, 3000);
clearTimeout(timerId); // 취소 가능
```

> **비유:** 배달 주문을 하면 주문 번호가 생깁니다. 주문 번호를 기억해야 취소할 수 있습니다.  
> 주문 번호를 잊어버리면(ID를 저장하지 않으면) 취소가 불가능합니다.

---

## 5. 점심 메뉴 뽑기 (원본 예제)

`setTimeout`, `confirm`, `window.open`을 조합한 원본 예제입니다.

```js
const lunches = ['짜장면', '짬뽕', '샐러드', ...];

function pickMenu() {
  // Math.random(): 0 이상 1 미만의 난수 생성
  // Math.floor(): 소수점 아래 버림
  const idx  = Math.floor(Math.random() * lunches.length);
  const menu = lunches[idx];

  document.getElementById('container').innerText = `오늘의 추천: ${menu}`;

  // 5초 후 지도 검색 여부 확인
  setTimeout(() => {
    const ok = confirm(`${menu} 맛집을 검색할까요?`);
    if (ok) {
      // _blank: 새 탭에서 열기
      window.open('https://map.naver.com/v5/search/' + menu, '_blank');
    }
  }, 5000);
}
```

> 이 예제에서 배운 개념들이 함께 사용됩니다:
> - `Math.random()` + `Math.floor()` → 무작위 메뉴 선택
> - DOM 조작 (`innerText`) → 선택된 메뉴를 화면에 표시
> - `setTimeout` → 5초 후에 맛집 검색 여부 묻기
> - `confirm` → 사용자에게 예/아니오 선택
> - `window.open` → 새 탭에서 네이버 지도 열기

### window.open() — 새 창/탭 열기

```js
// 두 번째 인자: 창 이름 또는 특수값
window.open(url, '_blank');  // 새 탭에서 열기
window.open(url, '_self');   // 현재 탭에서 열기
window.open(url, '_parent'); // 부모 프레임에서 열기
```

> 팝업 차단 설정이 되어 있는 브라우저에서는 `window.open`이 차단될 수 있습니다.  
> 사용자가 직접 클릭하는 이벤트 핸들러 안에서 호출해야 차단되지 않습니다.

---

## 파일 구성

```
ch03_bom/
  index.html  — 5개 섹션으로 구성된 인터랙티브 데모 페이지
  style.css   — 하늘색(Sky) 포인트 컬러 + 스톱워치·타이머 스타일
  app.js      — BOM 조작 함수 전체 (원본 코드 + 상세 주석)
  README.md   — 이 문서
```

---

## 학습 포인트 요약

| 개념 | 핵심 API | 한 줄 설명 |
|------|----------|-----------|
| 전역 객체 | `window` | 모든 전역 변수·함수의 부모. 생략 가능 |
| 브라우저 정보 | `navigator.language`, `navigator.onLine` | 브라우저·언어·연결 상태 확인 |
| 화면 정보 | `screen.width/height` | 모니터 물리적 해상도 |
| 창 크기 | `window.innerWidth/Height` | 현재 브라우저 뷰포트 크기 |
| 안내 팝업 | `alert()` | 확인 버튼만 있는 안내 창 |
| 선택 팝업 | `confirm()` | 확인=true / 취소=false 반환 |
| 입력 팝업 | `prompt()` | 텍스트 입력받기. 취소=null |
| URL 정보 | `location.href/pathname/search` | URL을 부위별로 파싱 |
| 페이지 이동 | `location.href = url`, `location.reload()` | URL 이동 및 새로고침 |
| 방문 기록 | `history.back()`, `history.forward()` | 앞/뒤 페이지 이동 |
| 스크롤 | `scrollTo()`, `scrollBy()` | 절대/상대 스크롤 이동 |
| 지연 실행 | `setTimeout(fn, ms)` + `clearTimeout` | N ms 후 딱 1번 실행 |
| 반복 실행 | `setInterval(fn, ms)` + `clearInterval` | N ms 간격으로 계속 반복 |
| 새 창 열기 | `window.open(url, '_blank')` | 새 탭에서 URL 열기 |

---

> **핵심 원칙:** BOM은 브라우저 창과 대화하는 수단입니다.  
> `window`는 모든 것의 출발점이고, `location`으로 URL을 다루고, 타이머로 시간을 제어합니다.  
> `setTimeout`/`setInterval`은 ID를 저장해 두어야 취소·중단이 가능합니다.
