# Ch08. 자바스크립트 함수 (Functions)

## 학습 목표

- 함수 선언식으로 재사용 가능한 함수를 작성할 수 있다
- 매개변수(Parameter)와 인수(Argument)의 차이를 설명할 수 있다
- `return` 문의 두 가지 역할(값 반환, 실행 종료)을 이해한다
- 기본값 매개변수와 나머지 매개변수(`...rest`)를 활용할 수 있다
- 함수 표현식과 화살표 함수를 상황에 맞게 선택할 수 있다
- 호이스팅이 함수 선언식과 표현식에서 어떻게 다른지 설명할 수 있다
- 전역·지역·블록 스코프를 이해하고 변수 충돌을 방지할 수 있다
- 콜백 함수의 개념을 이해하고 배열 메서드에 활용할 수 있다

---

## 함수란?

함수는 특정 작업을 수행하는 **재사용 가능한 코드 블록**입니다.

```
입력(매개변수) → [함수 본문: 처리] → 출력(반환값)
```

---

## 1. 함수 선언식

```js
function 함수명(매개변수1, 매개변수2) {
    // 처리 로직
    return 결과값;
}
```

```js
// 매개변수 없는 함수
function printGreeting() {
    console.log('안녕하세요!');
}
printGreeting(); // 호출: 함수명 + ()

// 매개변수 + 반환값 있는 함수
function add(a, b) {
    return a + b;
}
const result = add(5, 7); // 12 — 반환값을 변수에 저장
```

### 매개변수 vs 인수

| 용어 | 위치 | 설명 |
|------|------|------|
| 매개변수 (Parameter) | 함수 선언부 | 값을 받을 변수명 |
| 인수 (Argument) | 함수 호출부 | 실제로 전달하는 값 |

```js
function greet(name) { ... }  // name → 매개변수
greet('홍길동');               // '홍길동' → 인수
```

---

## 2. return 문

`return` 은 두 가지 역할을 합니다.

1. **값 반환** — 결과를 호출한 쪽으로 돌려줌
2. **함수 즉시 종료** — 이후 코드는 실행되지 않음

```js
function checkAge(age) {
    if (age >= 20) {
        return '성인입니다.'; // 반환 후 함수 종료
    }
    return '보호자 동의 필요'; // 위 조건 불만족 시 실행
}

// return 없으면 undefined 반환
function noReturn() {
    console.log('출력만 함');
}
console.log(noReturn()); // undefined
```

### 가드 패턴 (Guard Clause)

```js
// 조기 return 으로 중첩 if 를 줄임
function divide(a, b) {
    if (b === 0) return; // 잘못된 입력 → 즉시 종료
    return a / b;
}
```

---

## 3. 매개변수 심화

### 기본값 매개변수 (Default Parameters, ES6)

인수가 전달되지 않거나 `undefined` 일 때 기본값이 사용됩니다.

```js
function orderCoffee(type = '아메리카노', size = 'Tall') {
    console.log(`${type}, ${size} 사이즈`);
}

orderCoffee();                    // 아메리카노, Tall
orderCoffee('라떼');              // 라떼, Tall
orderCoffee('카푸치노', 'Grande'); // 카푸치노, Grande
orderCoffee(undefined, 'Venti'); // 아메리카노, Venti
```

### 나머지 매개변수 (Rest Parameters, ES6)

정해지지 않은 수의 인수를 **배열**로 받습니다. 항상 마지막에 위치해야 합니다.

```js
function sumAll(...numbers) { // 모든 인수 → 배열
    return numbers.reduce((acc, n) => acc + n, 0);
}

sumAll(1, 2, 3);       // 6
sumAll(10, 20, 30, 40); // 100

// 앞 매개변수와 혼합
function introduce(name, age, ...hobbies) {
    console.log(`${name}(${age}세), 취미: ${hobbies.join(', ')}`);
}
introduce('홍길동', 28, '독서', '여행'); // 홍길동(28세), 취미: 독서, 여행
```

---

## 4. 함수 표현식

함수를 **값처럼 변수에 저장**하는 방식입니다.

```js
// 익명 함수 표현식
const square = function (n) {
    return n * n;
};

// 기명 함수 표현식 — 재귀에 내부 이름 활용
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1); // 내부에서만 'fact' 사용 가능
};

console.log(factorial(5)); // 120
```

---

## 5. 화살표 함수 (Arrow Function, ES6)

`=>` 를 사용한 간결한 함수 표현입니다.

```js
// 기본 형태
const multiply = (a, b) => {
    return a * b;
};

// 단일 표현식 — 중괄호·return 생략 (묵시적 반환)
const add = (a, b) => a + b;

// 매개변수 1개 — 괄호 생략 가능
const double = n => n * 2;

// 매개변수 없음 — 빈 괄호 필수
const sayHi = () => console.log('Hi!');

// 객체 반환 — 괄호로 감싸야 함 (중괄호와 구분)
const makeUser = (name, age) => ({ name, age });
```

### 화살표 함수 축약 규칙 정리

| 상황 | 예시 |
|------|------|
| 기본 (여러 줄) | `(a, b) => { ...; return val; }` |
| 단일 표현식 반환 | `(a, b) => a + b` |
| 매개변수 1개 | `n => n * 2` |
| 매개변수 없음 | `() => 값` |
| 객체 리터럴 반환 | `(x) => ({ key: x })` |

---

## 6. 세 가지 선언 방식 비교

| 구분 | 함수 선언식 | 함수 표현식 | 화살표 함수 |
|------|-----------|-----------|-----------|
| 문법 | `function f(){}` | `const f = function(){}` | `const f = () => {}` |
| 호이스팅 | ✅ 선언 전 호출 가능 | ❌ 선언 후에만 | ❌ 선언 후에만 |
| `this` 바인딩 | 호출 방식에 따라 | 호출 방식에 따라 | 상위 스코프 그대로 |
| 주요 사용처 | 일반 함수 정의 | 콜백, 조건부 할당 | 콜백, 간단한 변환 |

```js
// 세 가지 방식이 동일한 기능을 수행
function   greet1(name) { return `안녕, ${name}!`; }
const      greet2 = function(name) { return `안녕, ${name}!`; };
const      greet3 = name => `안녕, ${name}!`;
```

---

## 7. 호이스팅

```js
// ✅ 함수 선언식 — 선언 전에 호출 가능
console.log(greetDecl('철수')); // 정상 작동
function greetDecl(name) { return `안녕, ${name}!`; }

// ❌ 함수 표현식 — 선언 전 호출 시 에러
// console.log(greetExpr('철수')); // ReferenceError
const greetExpr = name => `안녕, ${name}!`;
```

> 호이스팅에 의존하는 코드는 가독성이 낮아집니다. **선언 후 호출**하는 습관을 권장합니다.

---

## 8. 스코프 (Scope)

변수에 접근할 수 있는 **유효 범위**입니다.

```
전역 스코프  ────────────────────────────────────
│  const globalVar = '전역';    (어디서든 접근 가능)
│
│  function outer() {  ─── 지역 스코프
│  │  const localVar = '지역';  (함수 내부에서만)
│  │
│  │  {  ─── 블록 스코프
│  │  │  const blockVar = '블록'; (블록 내부에서만)
│  │  }
│  }
```

```js
const global = '전역';

function demo() {
    const local = '지역';
    console.log(global); // 접근 가능
    console.log(local);  // 접근 가능
}

// console.log(local); // ❌ ReferenceError
```

### 변수 쉐도잉

```js
const x = '전역';
function shadow() {
    const x = '지역'; // 같은 이름이지만 별개의 변수
    console.log(x);   // '지역' — 안쪽 값 우선
}
shadow();
console.log(x); // '전역' — 전역 변수는 변하지 않음
```

---

## 9. 콜백 함수

**다른 함수에 인수로 전달되어 나중에 호출되는 함수**입니다.

```js
// 콜백을 받는 함수
function process(data, callback) {
    return callback(data);
}

// 세 가지 방법으로 콜백 전달
process('hello', str => str.toUpperCase());   // 화살표 함수 (간결)
process('hello', function(s) { return s; });  // 익명 함수
process('hello', toUpperCase);                // 미리 정의한 함수명

// 배열 메서드 — 콜백의 대표적인 사용처
const nums = [1, 2, 3, 4, 5];
nums.map(n => n * 2);              // [2, 4, 6, 8, 10]
nums.filter(n => n % 2 === 0);     // [2, 4]
nums.reduce((acc, n) => acc + n, 0); // 15
```

---

## 10. 실전 패턴

### 함수를 반환하는 함수 (팩토리 패턴)

설정값을 미리 고정한 함수를 만들어 반환합니다.

```js
function makeMultiplier(factor) {
    return n => n * factor; // factor 를 기억하는 함수 반환
}

const triple   = makeMultiplier(3);
const tenTimes = makeMultiplier(10);

triple(5);    // 15
tenTimes(4);  // 40
```

### 데이터 처리 파이프라인

배열 메서드를 체이닝하여 복잡한 처리를 단계별로 표현합니다.

```js
const orders = [
    { product: '노트북', price: 1200000, qty: 2 },
    { product: '마우스', price:   35000, qty: 5 },
];

const total = orders
    .map(o => ({ ...o, subtotal: o.price * o.qty })) // 소계 계산
    .filter(o => o.subtotal >= 500000)               // 고액 주문만
    .reduce((sum, o) => sum + o.subtotal, 0);         // 합산
```

### 함수 합성 (pipe)

```js
const trim   = str => str.trim();
const lower  = str => str.toLowerCase();
const hyphen = str => str.replace(/\s+/g, '-');

const pipe = (...fns) => val => fns.reduce((acc, fn) => fn(acc), val);
const toSlug = pipe(trim, lower, hyphen);

toSlug('  Hello World  '); // 'hello-world'
```

---

## 파일 구조

```
ch08_methods/
├── methods.js  ← 함수 전체 예제 (10개 섹션)
└── README.md   ← 이 문서
```

## 실행 방법

```bash
node methods.js
```

---

## 핵심 요약

```
선언 방식:
  function f(){}      — 선언식, 호이스팅 O
  const f = function  — 표현식, 호이스팅 X
  const f = () =>     — 화살표, 호이스팅 X, this 없음

매개변수:
  (a, b = '기본값')  — 기본값 매개변수
  (...rest)          — 나머지 매개변수 → 배열

return:
  return 값;   — 값 반환 + 함수 종료
  return;      — undefined 반환 + 함수 종료 (가드 패턴)
  없음         — 자동으로 undefined 반환

스코프:
  전역 스코프  — 어디서든 접근
  지역 스코프  — 함수 내부에서만
  블록 스코프  — {} 내부에서만 (let/const)

콜백:
  인수로 전달된 함수 → 나중에 호출
  배열 메서드(map/filter/reduce)의 핵심
```
