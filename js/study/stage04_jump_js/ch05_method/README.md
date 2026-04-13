# Ch05. 자바스크립트 함수 심화 & 클로저

## 학습 목표

- 함수 선언 4가지 방식과 각 특성을 구분할 수 있다
- `this` 바인딩 규칙을 이해하고 화살표 함수와의 차이를 설명할 수 있다
- 고차 함수(커링, 팩토리, pipe)를 작성하고 활용할 수 있다
- 배열 고차 메서드(`map/filter/reduce` 등)를 목적에 맞게 선택한다
- 클로저의 원리를 이해하고 private 변수 패턴으로 응용할 수 있다
- 콜백 함수의 동기/비동기 동작 차이를 이해한다
- 메모이제이션, 디바운스, 스로틀 실전 패턴을 구현할 수 있다

---

## 1. 함수 정의 4가지 방식

| 방식 | 호이스팅 | `this` | 사용 시점 |
|------|---------|--------|---------|
| 함수 선언문 `function f() {}` | ✅ 전체 | 호출 방식에 따라 동적 | 일반 유틸, 재귀 |
| 함수 표현식 `const f = function() {}` | ❌ (변수만) | 호출 방식에 따라 동적 | 조건부 정의, 콜백 |
| 화살표 함수 `const f = () => {}` | ❌ | 선언 위치의 `this` 고정 | 콜백, 메서드 아닌 곳 |
| IIFE `(function() {})()` | — | 호출 방식에 따라 동적 | 즉시 실행, 스코프 격리 |

```js
// ① 함수 선언문 — 호이스팅으로 선언 전 호출 가능
function greet(name) { return `Hello, ${name}`; }

// ② 함수 표현식 — 변수에 할당
const greet2 = function(name) { return `Hi, ${name}`; };

// ③ 화살표 함수 — 한 줄이면 return 생략
const greet3 = (name) => `Hey, ${name}`;

// ④ IIFE — 선언 즉시 실행 (전역 오염 방지)
const result = (function() { return 42; })();
```

---

## 2. `this` 바인딩 규칙

```
호출 방식               this 값
─────────────────────────────────────────
일반 함수 호출           전역(window) / undefined(strict)
메서드 호출              메서드를 소유한 객체
call / apply / bind      첫 번째 인수로 지정한 객체
화살표 함수              선언 시점의 상위 스코프 this (고정)
```

```js
const obj = {
  name: 'Kim',
  regular() { return this.name; },       // 'Kim' — obj가 this
  arrow: () => this?.name ?? undefined   // undefined — 화살표는 상위 this
};

// 콜백에서 this를 잃는 문제 → 화살표 함수로 해결
class Timer {
  constructor() { this.count = 0; }
  start() {
    setInterval(() => this.count++, 1000); // 화살표: Timer 인스턴스 유지
  }
}
```

---

## 3. 고차 함수 (Higher-order Function)

함수를 인수로 받거나, 함수를 반환하는 함수입니다.  
자바스크립트에서 함수는 **일급 객체**이므로 이것이 가능합니다.

### 커링 (Currying)

```js
// 인수를 나눠 받아 새 함수를 반환
const makeMultiplier = (factor) => (n) => n * factor;

const double = makeMultiplier(2);  // factor=2 고정
const triple = makeMultiplier(3);  // factor=3 고정

double(5); // 10
triple(5); // 15
```

### 함수 팩토리

```js
// 특정 설정을 기억하는 함수를 찍어내는 패턴
function createLogger(prefix) {
  return (msg) => console.log(`[${prefix}] ${msg}`);
}

const info  = createLogger('INFO');
const error = createLogger('ERROR');
info('서버 시작'); // [INFO] 서버 시작
```

### 함수 합성 — pipe

```js
// 왼쪽 → 오른쪽 순으로 실행: pipe(f, g)(x) === g(f(x))
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const process = pipe(
  (n) => n * 2,   // 10
  (n) => n + 3,   // 13
  (n) => n ** 2   // 169
);
process(5); // 169
```

---

## 4. 배열 고차 메서드

| 메서드 | 반환 | 목적 |
|--------|------|------|
| `map(fn)` | 새 배열 | 각 요소를 변환 |
| `filter(fn)` | 새 배열 (부분) | 조건에 맞는 요소만 추출 |
| `reduce(fn, init)` | 단일 값 | 배열 → 값 (합계, 그룹화 등) |
| `find(fn)` | 첫 번째 요소 or `undefined` | 조건 맞는 첫 항목 |
| `findIndex(fn)` | 인덱스 or `-1` | 조건 맞는 첫 항목의 위치 |
| `some(fn)` | boolean | 하나라도 조건 충족 시 `true` |
| `every(fn)` | boolean | 전부 조건 충족 시 `true` |
| `flat(depth)` | 새 배열 | 중첩 배열 평탄화 |
| `flatMap(fn)` | 새 배열 | map 후 1단계 flat |
| `forEach(fn)` | `undefined` | 부수 효과 목적 순회 |

```js
const products = [
  { name: '노트북', price: 1200000, category: '전자기기', stock: 5 },
  { name: '마우스', price:   35000, category: '전자기기', stock: 20 },
  { name: '책상',   price:  250000, category: '가구',     stock: 8 },
];

// filter → map 체이닝: 전자기기만 이름 추출
const names = products
  .filter(p => p.category === '전자기기')
  .map(p => p.name);
// ['노트북', '마우스']

// reduce: 재고 총합
const totalStock = products.reduce((sum, p) => sum + p.stock, 0); // 33

// some / every
const hasOutOfStock = products.some(p => p.stock === 0);  // false
const allInStock    = products.every(p => p.stock > 0);   // true
```

### flatMap 예시

```js
const sentences = ['Hello World', 'foo bar'];
const words = sentences.flatMap(s => s.split(' '));
// ['Hello', 'World', 'foo', 'bar']
```

---

## 5. 클로저 (Closure)

### 개념

```
outer() 실행 → 종료
  ↓ 하지만 inner는 outerVar를 기억!
inner() 호출 → outerVar 접근 성공

이것이 클로저 — 함수가 선언된 시점의 렉시컬 환경을 기억하는 현상
```

```js
function outer() {
  const outerVar = '나는 outer의 변수';
  return function inner() {
    console.log(outerVar); // outer 종료 후에도 접근 가능!
  };
}

const fn = outer();
fn(); // '나는 outer의 변수'
```

### private 변수 패턴

클로저를 이용해 외부에서 직접 수정할 수 없는 변수를 만들 수 있습니다.

```js
function createCounter(initialValue = 0) {
  let count = initialValue; // 외부 접근 불가 (private)

  return {
    increment() { return ++count; },
    decrement() { return --count; },
    reset()     { return (count = initialValue); },
    getCount()  { return count; }
  };
}

const counter = createCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.reset();     // 10
// counter.count    — undefined (직접 접근 불가!)
```

### 은행 계좌 패턴

```js
function createBankAccount(owner, initialBalance) {
  let balance = initialBalance; // private

  return {
    deposit(amount)  { balance += amount; },
    withdraw(amount) { if (amount <= balance) balance -= amount; },
    getBalance()     { return balance; }
  };
}

const account = createBankAccount('Kim', 100000);
account.deposit(50000);
account.getBalance(); // 150000
// account.balance   — undefined!
```

---

## 6. 콜백 함수 (Callback Function)

"나중에 불러줘(call back)" — 다른 함수에 인수로 전달되어 특정 시점에 실행됩니다.

### 동기 vs 비동기

```js
console.log('1. 시작');

setTimeout(() => {
  console.log('3. 1초 후 (비동기 콜백)');
}, 1000);

console.log('2. setTimeout 등록 직후');

// 출력 순서: 1 → 2 → 3
```

```
동기 콜백      — 즉시 실행 (Array.forEach, sort, map …)
비동기 콜백    — 나중에 실행 (setTimeout, addEventListener …)
```

---

## 7. 실전 클로저 활용 패턴

### 메모이제이션 — 계산 결과 캐싱

비용이 큰 연산의 결과를 `Map`에 저장해 중복 계산을 방지합니다.

```js
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const memoFib = memoize(fibonacci);
memoFib(10); // 새로 계산
memoFib(10); // 캐시 히트 — 즉시 반환
```

### once — 단 한 번만 실행

```js
function once(fn) {
  let called = false;
  return function (...args) {
    if (!called) { called = true; return fn(...args); }
  };
}

const init = once(() => console.log('초기화'));
init(); // '초기화'
init(); // 아무것도 출력 안 됨
```

### 디바운스 — 마지막 호출 후 실행

```
연속 호출:  ──┬──┬──┬──────────────┬▶ 실행
              ↑  ↑  ↑ (타이머 리셋)  ↑ delay 경과 후 한 번만
```

```js
function debounce(fn, delay) {
  let timerId = null;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

// 활용: 검색창 자동완성, 창 크기 감지, 폼 유효성 검사
const search = debounce((q) => console.log(`검색: ${q}`), 300);
```

### 스로틀 — 일정 간격으로만 실행

```
연속 호출:  ─┬─┬─┬─┬─┬─┬──────┬─▶
              ↑       ↑       ↑  interval마다 한 번씩만 통과
```

```js
function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn(...args);
    }
  };
}

// 활용: 스크롤 이벤트, 버튼 연타 방지
const onScroll = throttle(() => console.log('스크롤 처리'), 200);
```

| 패턴 | 실행 시점 | 활용 사례 |
|------|---------|---------|
| 디바운스 | 마지막 호출 후 delay 경과 | 검색 자동완성, 리사이즈 |
| 스로틀 | interval마다 최대 1회 | 스크롤 핸들러, 연타 방지 |

---

## 파일 구조

```
ch05_method/
├── calculate.js  ← 함수 정의·this·고차함수·배열 메서드·메서드 체이닝
├── counter.js    ← 클로저·콜백·메모이제이션·once·debounce·throttle
└── README.md     ← 이 문서
```

## 실행 방법

```bash
node calculate.js
node counter.js
```

---

## 핵심 요약

```
함수 선언 선택:
  호이스팅 필요          → 함수 선언문
  this 고정 필요 (콜백)  → 화살표 함수
  즉시 실행·스코프 격리  → IIFE

고차 함수:
  값 변환   → map
  조건 추출 → filter
  값 집계   → reduce
  존재 확인 → some / every
  첫 항목   → find

클로저 활용:
  private 변수  → 외부에서 직접 접근·수정 불가
  메모이제이션  → Map으로 캐싱, 중복 연산 방지
  once          → 초기화 함수, 단 1회 실행 보장
  debounce      → 마지막 입력 완료 후 실행
  throttle      → 일정 간격 최대 1회 실행
```
