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

컴퓨터에는 데이터를 잠깐 기억해 두는 공간인 메모리(RAM)가 있습니다.  
프로그램이 "홍길동"이라는 이름을 기억해야 한다면 메모리 어딘가에 저장해야 하는데,  
실제 메모리 주소(예: `0x7ffd234a`)는 사람이 기억하기 너무 어렵습니다.  
그래서 **의미 있는 이름표(변수명)** 를 붙여서 쉽게 접근할 수 있도록 합니다.

마치 회사 창고에 "A-7 선반, 3번째 칸"이라고 외우는 대신 **"홍길동 서류"** 라는 이름표를 붙이는 것과 같습니다.

```
메모리
┌───────────┐
│  '홍길동'  │  ← 실제 값이 저장된 공간
└───────────┘
      ↑
  userName       ← 변수명(이름표): 메모리 주소 대신 이름으로 접근
```

변수명이 명확할수록 코드를 읽기 쉬워집니다. `a = 20` 보다 `userAge = 20` 이 훨씬 이해하기 쉽습니다.

---

## 2. 선언 키워드 3가지

자바스크립트에서 변수를 만들 때는 `var`, `let`, `const` 중 하나를 씁니다.  
ES6(2015년) 이전에는 `var` 만 있었지만 여러 문제가 발견되어, 현재는 `let` 과 `const` 를 사용합니다.

| 키워드 | 스코프 | 재선언 | 재할당 | 초기화 생략 | 호이스팅 |
|--------|--------|--------|--------|------------|---------|
| `var` | 함수 스코프 | ✅ 가능 | ✅ 가능 | ✅ (undefined) | 선언부만 |
| `let` | 블록 스코프 | ❌ 불가 | ✅ 가능 | ✅ (undefined) | TDZ 발생 |
| `const` | 블록 스코프 | ❌ 불가 | ❌ 불가 | ❌ 반드시 초기화 | TDZ 발생 |

**실무 원칙**: `const` 를 기본으로 쓰고, 값이 바뀌어야 할 때만 `let` 으로 변경하세요.  
`var` 는 현대 코드에서 사용하지 않습니다.

---

## 3. var — 구식 선언 (비권장)

ES6(2015) 이전에 사용하던 방식입니다. 아래 세 가지 문제로 인해 더 이상 사용하지 않습니다.

### 문제 1: 재선언 허용

같은 이름의 변수를 다시 선언해도 에러가 나지 않습니다.  
코드가 길어지면 "이 변수 이미 만들었나?"를 잊고 같은 이름을 또 쓰게 되는데, 그게 조용히 기존 값을 덮어버립니다.

```js
var city = '서울';
var city = '부산'; // 에러 없이 덮어씀 → 버그 원인
```

### 문제 2: 함수 스코프 — 블록을 무시

`if`, `for` 등의 `{}` 블록 안에서 선언한 `var` 변수가 블록 밖에서도 접근됩니다.  
마치 방 안에 넣어둔 물건이 복도에서도 보이는 것처럼, 의도치 않은 변수 누출이 발생합니다.

```js
{
    var blockVar = '블록 안';
}
console.log(blockVar); // '블록 안' — 블록 밖에서도 접근됨 (의도치 않은 누출)
```

### 문제 3: 호이스팅 — 선언 전 접근해도 에러 없음

`var` 로 선언한 변수는 코드가 실행되기 전에 "선언만" 미리 처리됩니다.  
그래서 선언보다 위에서 사용해도 에러가 나지 않고 `undefined` 가 나옵니다.  
이 동작은 예측하기 어렵고 버그를 숨기기 쉽습니다.

```js
console.log(x); // undefined (에러가 아님 — 예측 불가 동작)
var x = 10;
```

---

## 4. let — 재할당 가능한 변수

`let` 은 `var` 의 문제를 해결한 현대적인 변수 선언입니다.  
값이 나중에 바뀌어야 하는 상황(카운터, 누적 합계, 반복 중 변하는 값 등)에 사용합니다.

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

// ⑤ 재선언 불가 — 실수로 같은 이름 변수를 또 만드는 것을 방지
let score = 100;
// let score = 200; // ❌ SyntaxError

// ⑥ 블록 스코프 — 블록 밖에서 접근 불가 (의도치 않은 누출 방지)
{
    let inner = '블록 안';
    console.log(inner); // '블록 안'
}
// console.log(inner); // ❌ ReferenceError
```

---

## 5. const — 상수 (재할당 불가)

`const` 는 한 번 값을 할당하면 다시 바꿀 수 없는 변수(상수)입니다.  
"이 값은 앞으로 안 바뀐다"는 의도를 코드에 명확하게 담을 수 있어, 실수로 값을 덮어쓰는 버그를 예방합니다.

**중요**: 값이 바뀔 필요가 없다면 기본적으로 `const` 를 쓰는 것이 좋습니다.

```js
// ① 선언과 동시에 초기화 (필수 — 나중에 값을 넣을 수 없음)
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

> **const + 객체/배열**: `const` 는 변수가 가리키는 **주소(참조)** 를 고정합니다.  
> 비유하자면, "이 서랍은 절대 다른 서랍으로 바꿀 수 없지만, 서랍 안 물건을 꺼내거나 바꾸는 건 가능"한 것과 같습니다.

---

## 6. 변수 명명 규칙

변수 이름을 잘 짓는 것은 생각보다 중요합니다. 좋은 이름은 코드를 주석 없이도 이해할 수 있게 만듭니다.

### 필수 규칙

```js
✅ 영문자, 숫자, _, $ 사용 가능
✅ 대소문자 구분 (userName ≠ username)
❌ 숫자로 시작 불가   (let 1abc → 에러)
❌ 하이픈 사용 불가   (let my-name → 에러, 빼기 연산으로 해석)
❌ 예약어 사용 불가   (let let, let if → 에러)
```

### 네이밍 스타일 관례

언어마다, 팀마다 이름 짓는 스타일이 다릅니다. 자바스크립트 커뮤니티의 표준 스타일은 다음과 같습니다.

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

// boolean 변수 — is / has / can 접두사로 "예/아니오" 의미 전달
let isLoggedIn = true;    // 로그인 상태인가?
let hasPermission = false; // 권한이 있는가?
let canEdit = true;        // 수정할 수 있는가?
```

---

## 7. 기본 데이터 타입 7가지

자바스크립트에서 다룰 수 있는 값의 종류를 **데이터 타입(자료형)** 이라고 합니다.  
자바스크립트는 **동적 타입 언어**라서 변수를 선언할 때 타입을 명시하지 않아도 됩니다.  
값을 할당하는 순간 자동으로 타입이 결정됩니다.

### 원시 타입 (Primitive Type)

| 타입 | 예시 | 설명 |
|------|------|------|
| `number` | `42`, `3.14`, `NaN`, `Infinity` | 정수·실수 모두 포함. 계산에 쓰이는 모든 숫자 |
| `string` | `'hello'`, `"world"`, `` `template` `` | 글자, 문장, 텍스트 |
| `boolean` | `true`, `false` | 참/거짓 두 가지만 표현 |
| `undefined` | `undefined` | 아직 값이 없음 (JS 엔진이 자동 할당) |
| `null` | `null` | 값이 없음을 개발자가 의도적으로 표현 |
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

두 값 모두 "아무것도 없음"을 나타내지만, **누가** 그 상태를 만들었느냐가 다릅니다.

```
undefined  →  JS 엔진이 자동으로 할당 — "아직 값이 없다"
null       →  개발자가 의도적으로 할당 — "값이 없음을 명시"
```

```js
let a;          // undefined — 아직 초기화 안 됨 (JS가 자동으로 undefined 넣음)
let b = null;   // null      — "여기는 나중에 값이 들어올 자리"임을 명시
```

> 비유: `undefined` 는 아직 배달이 안 온 택배(기다리는 중), `null` 은 의도적으로 비워 놓은 자리(나중에 쓸 예정)입니다.

### number 의 특수값

```js
let x = 10 / 0;     // Infinity  (0으로 나누면 무한대)
let y = -10 / 0;    // -Infinity (음수)
let z = 'abc' * 2;  // NaN       (숫자가 아닌 것에 연산 → 숫자가 아님)

// NaN 은 number 타입이지만 어떤 수와도 같지 않습니다
// "계산 결과가 숫자가 아님"을 나타내는 특수 표식입니다
console.log(NaN === NaN); // false ← NaN은 자기 자신과도 다름!
console.log(isNaN(NaN));  // true  ← NaN 확인은 isNaN() 함수를 사용
```

---

## 8. typeof — 타입 확인

`typeof` 는 값의 타입을 문자열로 알려주는 연산자입니다.  
어떤 변수에 어떤 타입의 값이 들어있는지 모를 때 확인하는 용도로 씁니다.

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
> 배열을 확인할 때는 `typeof` 가 아닌 `Array.isArray()` 를 사용하세요.

---

## 9. 템플릿 리터럴

백틱(`` ` ``)으로 감싸며 `${}` 안에 변수나 표현식을 직접 삽입합니다.  
여러 변수를 조합해 문장을 만들 때, 기존 `+` 연산자 방식보다 훨씬 읽기 쉽습니다.

```js
const name = '홍길동';
const age = 28;
const price = 1200000;

// 기존 방식 — + 연산자로 이어붙이기, 가독성 낮음
const old = '이름: ' + name + ', 나이: ' + age + '세';

// 템플릿 리터럴 — 가독성 높음, 실수 줄어듦
const modern = `이름: ${name}, 나이: ${age}세`;

// ${} 안에는 변수뿐 아니라 어떤 표현식도 삽입 가능
console.log(`가격: ${price.toLocaleString()}원`);  // 1,200,000원
console.log(`합계: ${price * 2}원`);               // 연산 결과 삽입
console.log(`할인: ${price > 1000000 ? '가능' : '불가'}`); // 조건도 가능

// 여러 줄 문자열 — 줄바꿈을 \n 없이 그대로 표현
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

`const` 를 기본으로 쓰면 "이 값은 안 바뀐다"는 의도가 코드에 드러나고, 실수로 값을 덮어쓰는 버그를 예방할 수 있습니다. 나중에 값을 바꿔야 한다는 걸 알게 됐을 때 `let` 으로 바꾸면 됩니다.

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

undefined vs null:
  undefined → JS 엔진이 자동 할당 ("아직 값 없음")
  null      → 개발자가 의도적으로 할당 ("값 없음을 명시")

typeof:
  null → 'object' (버그), 배열 → 'object' 주의
  배열 확인은 Array.isArray() 사용

템플릿 리터럴:
  `${변수}` — 문자열 + 연산자보다 가독성 높음

선택 기준:
  const 우선 → 재할당 필요할 때만 let
```
