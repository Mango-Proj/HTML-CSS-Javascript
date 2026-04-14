# Ch02. 자바스크립트 변수와 상수

## 학습 목표

- 변수가 무엇인지, 메모리와의 관계를 이해한다
- `var` / `let` / `const` 의 차이와 각각의 문제점·특성을 설명할 수 있다
- 기본 데이터 타입 7가지(number, string, boolean, undefined, null, bigint, symbol)를 구분한다
- `typeof` 연산자로 값의 타입을 확인할 수 있다
- 템플릿 리터럴로 문자열을 간결하게 조합할 수 있다
- 상황에 맞게 `let` 과 `const` 를 선택할 수 있다

---

## 1. 변수란?

**변수(Variable)**: 데이터를 저장하는 이름 붙은 메모리 공간입니다.

```
메모리
┌───────────┐
│  '홍길동'  │  ← 실제 값이 저장된 공간
└───────────┘
      ↑
  userName       ← 변수명(이름표): 메모리 주소 대신 이름으로 접근
```

직접 메모리 주소를 다루는 대신 **의미 있는 이름**을 붙여 값을 관리합니다.  
변수명이 명확할수록 코드를 읽기 쉬워집니다.

---

## 2. 선언 키워드 3가지

| 키워드 | 스코프 | 재선언 | 재할당 | 초기화 생략 | 호이스팅 |
|--------|--------|--------|--------|------------|---------|
| `var` | 함수 스코프 | ✅ 가능 | ✅ 가능 | ✅ (undefined) | 선언부만 |
| `let` | 블록 스코프 | ❌ 불가 | ✅ 가능 | ✅ (undefined) | TDZ 발생 |
| `const` | 블록 스코프 | ❌ 불가 | ❌ 불가 | ❌ 반드시 초기화 | TDZ 발생 |

---

## 3. var — 구식 선언 (비권장)

ES6(2015) 이전에 사용하던 방식입니다. 아래 문제로 `let` / `const` 를 대신 사용합니다.

### 문제 1: 재선언 허용

```js
var city = '서울';
var city = '부산'; // 에러 없이 덮어씀 → 버그 원인
```

### 문제 2: 함수 스코프 — 블록을 무시

```js
{
    var blockVar = '블록 안';
}
console.log(blockVar); // '블록 안' — 블록 밖에서도 접근됨 (의도치 않은 누출)
```

### 문제 3: 호이스팅 — 선언 전 접근해도 에러 없음

```js
console.log(x); // undefined (에러가 아님 — 예측 불가 동작)
var x = 10;
```

---

## 4. let — 재할당 가능한 변수

```js
// ① 선언만 (undefined 자동 할당)
let userName;
console.log(userName); // undefined

// ② 초기화 (처음 값 할당)
userName = '홍길동';

// ③ 재할당 (값 변경)
userName = '고길동';

// ④ 선언과 동시에 초기화
let userAge = 28;

// ⑤ 재선언 불가
let score = 100;
// let score = 200; // ❌ SyntaxError

// ⑥ 블록 스코프 — 블록 밖에서 접근 불가
{
    let inner = '블록 안';
    console.log(inner); // '블록 안'
}
// console.log(inner); // ❌ ReferenceError
```

---

## 5. const — 상수 (재할당 불가)

```js
// ① 선언과 동시에 초기화 (필수)
const MAX_SCORE = 100;
const PI = 3.14159265358979;

// ② 재할당 시 TypeError
// MAX_SCORE = 200; // ❌ TypeError: Assignment to constant variable.

// ③ 선언만 하면 SyntaxError
// const rate; // ❌ SyntaxError: Missing initializer in const declaration

// ④ 객체/배열의 내부 값은 변경 가능 (참조가 고정되는 것)
const user = { name: '김철수', age: 25 };
user.name = '이영희'; // ✅ 내부 속성 수정은 가능
// user = {};         // ❌ 참조 자체를 바꾸는 것은 불가
```

> **const + 객체/배열**: 변수가 가리키는 주소(참조)가 고정됩니다.  
> 객체 내부 속성을 바꾸는 것은 주소를 바꾸는 게 아니므로 허용됩니다.

---

## 6. 변수 명명 규칙

### 필수 규칙

```js
✅ 영문자, 숫자, _, $ 사용 가능
✅ 대소문자 구분 (userName ≠ username)
❌ 숫자로 시작 불가   (let 1abc → 에러)
❌ 하이픈 사용 불가   (let my-name → 에러)
❌ 예약어 사용 불가   (let let, let if → 에러)
```

### 네이밍 스타일 관례

| 스타일 | 형태 | 사용처 |
|--------|------|--------|
| **camelCase** | `userName`, `totalCount` | 변수, 함수 (기본) |
| **PascalCase** | `UserProfile`, `MyClass` | 클래스, 생성자 함수 |
| **SCREAMING_SNAKE_CASE** | `MAX_RETRY`, `API_URL` | 전역 상수 |

```js
// camelCase — 변수/함수
let firstName = '길동';
let totalItemCount = 5;
function getUserInfo() {}

// PascalCase — 클래스
class UserProfile {}

// SCREAMING_SNAKE_CASE — 불변 상수
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';

// boolean 변수 — is / has / can 접두사 관례
let isLoggedIn = true;
let hasPermission = false;
let canEdit = true;
```

---

## 7. 기본 데이터 타입 7가지

자바스크립트는 **동적 타입 언어**입니다. 변수 선언 시 타입을 지정하지 않으며,  
같은 변수에 다른 타입의 값을 나중에 할당할 수 있습니다.

### 원시 타입 (Primitive Type)

| 타입 | 예시 | 설명 |
|------|------|------|
| `number` | `42`, `3.14`, `NaN`, `Infinity` | 정수·실수 모두 포함 |
| `string` | `'hello'`, `"world"`, `` `template` `` | 문자열 |
| `boolean` | `true`, `false` | 참/거짓 |
| `undefined` | `undefined` | 선언 후 값 없음 (자동) |
| `null` | `null` | 값 없음을 의도적으로 표현 |
| `bigint` | `9007199254740991n` | 매우 큰 정수 (ES2020) |
| `symbol` | `Symbol('id')` | 유일한 식별자 |

```js
let n = 42;           // number
let s = 'hello';      // string
let b = true;         // boolean
let u;                // undefined (자동)
let empty = null;     // null (의도적)
let big = 100n;       // bigint
let sym = Symbol();   // symbol
```

### undefined vs null

```
undefined  →  JS 엔진이 자동으로 할당 — "아직 값이 없다"
null       →  개발자가 의도적으로 할당 — "값이 없음을 명시"
```

```js
let a;          // undefined — 아직 초기화 안 됨
let b = null;   // null      — 나중에 값을 넣을 자리임을 명시
```

### number 의 특수값

```js
let x = 10 / 0;     // Infinity  (양의 무한대)
let y = -10 / 0;    // -Infinity (음의 무한대)
let z = 'abc' * 2;  // NaN       (숫자가 아님, Not a Number)

// NaN 은 number 타입이지만 어떤 수와도 같지 않습니다
console.log(NaN === NaN); // false
console.log(isNaN(NaN));  // true — NaN 확인은 isNaN() 사용
```

---

## 8. typeof — 타입 확인

```js
typeof 42;           // 'number'
typeof 'hello';      // 'string'
typeof true;         // 'boolean'
typeof undefined;    // 'undefined'
typeof null;         // 'object'  ← JS 역사적 버그 (null 이 아님에 주의)
typeof {};           // 'object'
typeof [];           // 'object'  ← 배열도 object
typeof function(){}; // 'function'
typeof Symbol();     // 'symbol'
typeof 1n;           // 'bigint'
```

> `null` 의 typeof 가 `'object'` 인 것은 JS 초기의 버그입니다.  
> 현재도 하위 호환성을 위해 유지되고 있습니다.

---

## 9. 템플릿 리터럴

백틱(`` ` ``)으로 감싸며 `${}` 안에 변수나 표현식을 직접 삽입합니다.

```js
const name = '홍길동';
const age = 28;
const price = 1200000;

// 기존 방식 — 가독성 낮음
const old = '이름: ' + name + ', 나이: ' + age + '세';

// 템플릿 리터럴 — 가독성 높음
const modern = `이름: ${name}, 나이: ${age}세`;

// ${} 안에 표현식 삽입
console.log(`가격: ${price.toLocaleString()}원`);  // 1,200,000원
console.log(`합계: ${price * 2}원`);               // 연산 가능
console.log(`할인: ${price > 1000000 ? '가능' : '불가'}`); // 삼항 연산자도 가능

// 여러 줄 문자열 (줄바꿈 그대로 유지)
const card = `
  이름: ${name}
  나이: ${age}세
`;
```

---

## 10. let vs const 선택 기준

```
기본 원칙: const 를 먼저 쓰고, 재할당이 필요할 때만 let 으로 바꾸세요.
```

```js
// ✅ const — 값이 바뀌지 않는 경우 (대부분)
const TAX_RATE = 0.1;
const API_URL = 'https://api.example.com';
const userName = '홍길동'; // 이 스코프에서 안 바뀐다면 const

// ✅ let — 반드시 재할당이 필요한 경우
let count = 0;
for (let i = 0; i < 3; i++) { count++; } // 카운터

let total = 0;
[1000, 2000, 3000].forEach((n) => { total += n; }); // 누적 계산
```

| 상황 | 선택 |
|------|------|
| 설정값, 상수, 고정된 참조 | `const` |
| 카운터, 누적 계산, 조건부 재할당 | `let` |
| ES6 이상에서의 모든 경우 | `var` 사용 금지 |

---

## 파일 구조

```
ch02_variables/
├── variables.js  ← var/let/const, 명명 규칙, 타입, typeof, 템플릿 리터럴
└── README.md     ← 이 문서
```

## 실행 방법

```bash
node variables.js
```

---

## 핵심 요약

```
선언 키워드:
  var   — 재선언/재할당 가능, 함수 스코프, 호이스팅 (사용 금지)
  let   — 재선언 불가, 재할당 가능, 블록 스코프
  const — 재선언·재할당 모두 불가, 블록 스코프 (기본값으로 사용)

기본 타입 7가지:
  number · string · boolean · undefined · null · bigint · symbol

typeof:
  null → 'object' (버그), 배열 → 'object' 주의

템플릿 리터럴:
  `${변수}` — 문자열 + 연산자보다 가독성 높음

선택 기준:
  const 우선 → 재할당 필요할 때만 let
```
