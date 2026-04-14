# Ch03. 자바스크립트 코딩 컨벤션

## 학습 목표

- 주석의 3가지 종류(`//`, `/* */`, `/** */`)와 올바른 작성법을 안다
- 변수 명명 규칙(사용 가능 문자, 예약어, 네이밍 스타일)을 적용할 수 있다
- 세미콜론(`;`)의 역할과 ASI 함정 사례를 이해한다
- 들여쓰기·공백·빈 줄 등 코드 포맷팅 규칙을 실천할 수 있다
- 매직 넘버를 상수로 교체해 코드 가독성을 높일 수 있다

---

## 1. 코딩 컨벤션이란?

**코딩 컨벤션(Coding Convention)**: 코드를 작성할 때 팀 내에서 약속한 규칙과 스타일입니다.

```
기능적으로 맞는 코드 ≠ 좋은 코드

좋은 코드 = 동작 + 읽기 쉬움 + 유지보수 용이 + 협업 가능
```

> 코드는 기계가 실행하지만, **사람이 읽는다**는 사실을 항상 기억하세요.

---

## 2. 주석 (Comment)

주석은 코드 실행에 영향을 주지 않는 설명문입니다.  
코드를 처음 보는 사람도 이해할 수 있도록 목적·이유·주의사항을 기록합니다.

### 한 줄 주석 (`//`)

```js
let retryCount = 0; // API 호출 실패 시 최대 3회까지 재시도

// console.log('디버깅 로그'); ← 임시 비활성화
```

### 여러 줄 주석 (`/* */`)

```js
/*
 * 할인율 계산 기준:
 *   - 1만 원 미만: 0%
 *   - 1만 원 이상: 5%
 *   - 10만 원 이상: 10%
 *   - 100만 원 이상: 15%
 */
function getDiscountRate(price) { ... }
```

### JSDoc 주석 (`/** */`) — 함수·클래스 문서화

VS Code 등 편집기에서 타입 정보와 설명을 자동 완성에 활용합니다.

```js
/**
 * 두 수를 더하는 함수
 *
 * @param {number} a - 첫 번째 피연산자
 * @param {number} b - 두 번째 피연산자
 * @returns {number} 두 수의 합
 *
 * @example
 * add(3, 5); // 8
 */
function add(a, b) {
    return a + b;
}
```

### 좋은 주석 vs 나쁜 주석

| | 나쁜 주석 ❌ | 좋은 주석 ✅ |
|-|------------|------------|
| **코드 반복** | `let count = 0; // count를 0으로 설정` | 제거 — 코드가 스스로 말함 |
| **이유 설명** | 없음 | `// 음수 입력 방지 — 서버가 양수만 허용` |
| **할 일 표시** | 없음 | `// TODO: 1만 명 이상 시 성능 개선 필요` |

```js
// TODO  — 나중에 구현해야 할 것
// FIXME — 알려진 버그, 수정 필요
// NOTE  — 특별히 주의할 사항
// HACK  — 임시방편 코드, 개선 필요
```

---

## 3. 변수 명명 규칙

### 필수 규칙

```
✅ 사용 가능: 영문자, 숫자, $, _
✅ 대소문자 구분: userName ≠ username
❌ 숫자로 시작 불가:   let 1abc  → SyntaxError
❌ 하이픈(-) 사용 불가: let my-name → 빼기 연산으로 인식
❌ 공백 사용 불가:      let my name → SyntaxError
❌ 예약어 사용 불가:    let if, let for, let class → SyntaxError
```

### 예약어 목록 (주요)

```
break    case      catch     class     const     continue
debugger default   delete    do        else      export
extends  false     finally   for       function  if
import   in        instanceof let      new       null
return   static    super     switch    this      throw
true     try       typeof    var       void      while
with     yield
```

### 명확한 이름 짓기

```js
// ❌ 무슨 값인지 알 수 없음
let a = 20;
let x = 'kim';
let temp = true;

// ✅ 값의 목적이 명확
let userAge = 20;
let userName = 'kim';
let isActive = true;
```

### 네이밍 스타일 4가지

| 스타일 | 형태 | 사용 규칙 |
|--------|------|---------|
| **camelCase** | `userName`, `totalCount` | 변수, 함수 (JS 기본) |
| **PascalCase** | `UserProfile`, `MyClass` | 클래스, 생성자 함수 |
| **SCREAMING_SNAKE_CASE** | `MAX_RETRY`, `API_URL` | 전역 상수 |
| ~~snake_case~~ | ~~`user_name`~~ | JS에서는 비권장 |

```js
// camelCase — 변수, 함수
let firstName = '길동';
let totalItemCount = 10;
function getUserById(id) {}

// PascalCase — 클래스
class UserProfile {}

// SCREAMING_SNAKE_CASE — 상수
const MAX_CONNECTIONS = 100;
const API_BASE_URL = 'https://api.example.com';
```

### 용도별 접두사 관례

```js
// boolean — is / has / can / should 접두사
let isVisible = true;
let hasError = false;
let canDelete = true;
let shouldRetry = false;

// 배열 — 복수형(s) 또는 List / Array 접미사
const userNames = ['Alice', 'Bob'];
const scoreList = [92, 78, 85];

// 이벤트 핸들러 — on / handle 접두사
const onClick = () => {};
const handleSubmit = () => {};
```

---

## 4. 세미콜론 (`;`)

세미콜론은 하나의 **문장(statement)** 이 끝났음을 나타내는 기호입니다.

### ASI (Automatic Semicolon Insertion)

자바스크립트 엔진은 세미콜론을 자동으로 삽입하는 ASI 기능이 있어  
생략해도 대부분 정상 동작합니다. 그러나 **함정이 있습니다**.

```js
// ⚠️ ASI 함정 — () 로 시작하는 줄
const value = 10
(function () {   // 엔진은 이것을 value(function...) 호출로 해석!
    console.log('IIFE');
})();
// TypeError: value is not a function

// ✅ 방어: ; 를 줄 앞에 붙이거나 이전 문장에 붙이기
const value2 = 10;
;(function () {  // 앞에 ; 방어 코드
    console.log('안전한 IIFE');
})();
```

### 세미콜론을 붙이는 곳 vs 붙이지 않는 곳

```js
// ✅ 붙이는 곳 — 문장(statement) 끝
let name = '홍길동';
const PI = 3.14;
console.log(name);

// ❌ 붙이지 않는 곳 — 블록({})으로 끝나는 구문
if (true) {
    // ...
}          // ← 세미콜론 없음

function greet() {
    // ...
}          // ← 세미콜론 없음

class User {
    // ...
}          // ← 세미콜론 없음

// ✅ 함수 표현식은 변수 선언이므로 세미콜론 있음
const fn = function () {};  // ← 세미콜론 있음
const arrow = () => {};     // ← 세미콜론 있음
```

---

## 5. 들여쓰기와 코드 포맷팅

### 들여쓰기 스타일

```js
// 스페이스 2칸 (Google, Airbnb 스타일)
function example2() {
  if (true) {
    console.log('2칸');
  }
}

// 스페이스 4칸 (Microsoft 스타일)
function example4() {
    if (true) {
        console.log('4칸');
    }
}

// ❌ 들여쓰기 없음 — 구조 파악 불가
function bad() {
if (true) {
console.log('가독성 최악');
}
}
```

> 스페이스 2칸 vs 4칸보다 **팀 내에서 통일**하는 것이 중요합니다.  
> 탭(Tab)과 스페이스를 혼용하지 마세요.

### 연산자·쉼표 공백

```js
// ❌
const x=10+20*3;
const arr=[1,2,3];

// ✅
const x = 10 + 20 * 3;
const arr = [1, 2, 3];
```

### 빈 줄로 논리 단위 구분

```js
function processOrder(orderId, userId) {
    // [1단계] 입력값 검증
    if (!orderId || !userId) return;

    // [2단계] 재고 확인
    const hasStock = checkStock(orderId);
    if (!hasStock) return;

    // [3단계] 주문 처리
    console.log(`주문 완료: ${orderId}`);
}
```

---

## 6. 매직 넘버 — 상수로 의미 부여하기

**매직 넘버(Magic Number)**: 코드에 설명 없이 그냥 등장하는 숫자·문자열

```js
// ❌ 매직 넘버 — 0.1, 86400, 7 이 무엇인지 알 수 없음
function processRental(price, days) {
    const fee = price * 0.1;
    const seconds = days * 86400;
    if (days > 7) console.log('장기 대여');
}

// ✅ 상수 — 코드 자체가 문서가 됨
const TAX_RATE = 0.1;               // 부가세율 10%
const SECONDS_PER_DAY = 86400;     // 60초 × 60분 × 24시간
const LONG_TERM_RENTAL_DAYS = 7;   // 장기 대여 기준일

function processRental2(price, days) {
    const fee = price * TAX_RATE;
    const seconds = days * SECONDS_PER_DAY;
    if (days > LONG_TERM_RENTAL_DAYS) console.log('장기 대여');
}
```

---

## 7. 코드 스타일 자동화 도구

현업에서는 사람이 직접 스타일을 지키기보다 도구를 사용해 자동화합니다.

| 도구 | 역할 | 설정 파일 |
|------|------|---------|
| **Prettier** | 코드 포매터 (들여쓰기·공백·따옴표·세미콜론 자동 정렬) | `.prettierrc` |
| **ESLint** | 린터 (오류 가능성·스타일 규칙 검사) | `.eslintrc.json` |
| **EditorConfig** | 편집기 들여쓰기·줄바꿈·인코딩 통일 | `.editorconfig` |

### 대표 스타일 가이드

- **Airbnb JavaScript Style Guide** — 가장 널리 사용
- **Google JavaScript Style Guide** — 구글 내부 표준
- **StandardJS** — 세미콜론 없음 스타일

---

## 파일 구조

```
ch03_rules/
├── conventions.js  ← 주석, 명명 규칙, 세미콜론, 포맷팅, 매직 넘버
└── README.md       ← 이 문서
```

## 실행 방법

```bash
node conventions.js
```

---

## 핵심 요약

```
주석:
  //       → 한 줄 설명
  /* */    → 여러 줄 설명
  /** */   → JSDoc, 함수·클래스 문서화 (편집기 자동 완성 지원)

명명 규칙:
  camelCase          → 변수, 함수 (기본)
  PascalCase         → 클래스, 생성자 함수
  SCREAMING_SNAKE    → 전역 상수
  is/has/can 접두사  → boolean 변수

세미콜론:
  문장 끝에 명시적으로 붙이기 권장
  블록({})으로 끝나는 if/for/function 뒤에는 붙이지 않음
  ( [ ` 로 시작하는 줄 앞에는 ; 방어 코드 필요 (ASI 함정)

들여쓰기:
  2칸 또는 4칸 — 팀 내에서 통일 (혼용 금지)
  연산자 양쪽·쉼표 뒤에 공백
  논리 단위 사이에 빈 줄

매직 넘버:
  숫자·문자열에 const 상수로 의미를 부여해 코드 = 문서가 되게
```
