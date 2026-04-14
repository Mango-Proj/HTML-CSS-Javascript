# Ch04. 자바스크립트 자료형 (Data Types)

## 학습 목표

- 기본 타입 7가지와 참조 타입의 차이를 메모리 관점에서 설명할 수 있다
- 문자열 생성 방법 3가지(작은따옴표·큰따옴표·백틱)와 주요 메서드를 활용한다
- 숫자의 특수값(Infinity, NaN)과 Number 유틸리티를 이해한다
- Truthy / Falsy 값 목록을 암기하고 조건문에 적용할 수 있다
- `undefined` 와 `null` 의 차이를 설명할 수 있다
- `typeof` 연산자의 반환값과 예외 케이스(null, 배열)를 안다
- 참조 타입의 얕은 복사 문제와 해결책을 이해한다

---

## 1. 자료형 분류

```
자료형 (Data Types)
├── 기본 타입 (Primitive)  — 값이 변수에 직접 저장
│   ├── string    — 문자열
│   ├── number    — 숫자 (정수·실수 통합)
│   ├── boolean   — true / false
│   ├── undefined — 값이 아직 없음 (자동 할당)
│   ├── null      — 값이 없음 (의도적 명시)
│   ├── symbol    — 유일한 식별자
│   └── bigint    — 매우 큰 정수
│
└── 참조 타입 (Reference)  — 메모리 주소가 변수에 저장
    ├── object    — 객체 { }
    ├── array     — 배열 [ ]
    └── function  — 함수
```

---

## 2. 문자열 (String)

### 생성 방법 3가지

```js
const str1 = '작은따옴표';       // JS 에서 가장 일반적
const str2 = "큰따옴표";         // 동일하게 동작
const str3 = `백틱(템플릿 리터럴)`; // 변수 삽입·여러 줄 지원
```

### 이스케이프 문자

| 기호 | 의미 |
|------|------|
| `\n` | 줄 바꿈 |
| `\t` | 탭 |
| `\\` | 백슬래시(`\`) 자체 |
| `\"` | 큰따옴표 |
| `\'` | 작은따옴표 |

```js
console.log('첫째 줄\n둘째 줄');  // 줄 바꿈
console.log('탭:\t끝');           // 탭
console.log('경로: C:\\Users');    // 백슬래시
```

### 템플릿 리터럴

```js
const name = '홍길동';
const age  = 28;

// 변수 삽입
console.log(`이름: ${name}, 나이: ${age}세`);

// 표현식 삽입
console.log(`2 + 3 = ${2 + 3}`);
console.log(`할인: ${age >= 20 ? '성인 할인' : '청소년 할인'}`);

// 여러 줄 문자열
const msg = `첫째 줄
둘째 줄
셋째 줄`;
```

### 주요 메서드

| 메서드 | 설명 | 예시 |
|--------|------|------|
| `.length` | 문자열 길이 | `'hello'.length` → `5` |
| `.trim()` | 앞뒤 공백 제거 | `' hi '.trim()` → `'hi'` |
| `.toUpperCase()` | 대문자 변환 | `'hi'.toUpperCase()` → `'HI'` |
| `.toLowerCase()` | 소문자 변환 | `'HI'.toLowerCase()` → `'hi'` |
| `.includes(str)` | 포함 여부 | `'hello'.includes('ell')` → `true` |
| `.indexOf(str)` | 위치 반환 | `'hello'.indexOf('l')` → `2` |
| `.slice(s, e)` | 부분 추출 | `'hello'.slice(1, 3)` → `'el'` |
| `.replace(a, b)` | 첫 번째 교체 | `'aab'.replace('a','x')` → `'xab'` |
| `.replaceAll(a, b)` | 전체 교체 | `'aab'.replaceAll('a','x')` → `'xxb'` |
| `.split(sep)` | 배열로 분리 | `'a,b'.split(',')` → `['a','b']` |
| `.repeat(n)` | 반복 | `'-'.repeat(3)` → `'---'` |
| `.padStart(n, c)` | 앞 채우기 | `'7'.padStart(3,'0')` → `'007'` |

---

## 3. 숫자 (Number)

자바스크립트는 정수와 실수를 **모두 number 타입**으로 처리합니다.  
(64비트 부동소수점, IEEE 754 표준)

```js
let n1 = 42;       // 정수
let n2 = 3.14;     // 실수
let n3 = -100;     // 음수
let n4 = 0xFF;     // 16진수 (255)
let n5 = 0b1010;   // 2진수  (10)
let n6 = 1_000_000;// 숫자 구분자(ES2021)
```

### 특수값

| 값 | 발생 상황 | 판별 함수 |
|----|---------|---------|
| `Infinity` | `1 / 0` | `isFinite()` |
| `-Infinity` | `-1 / 0` | `isFinite()` |
| `NaN` | `'abc' * 3`, `0/0` | `isNaN()`, `Number.isNaN()` |

```js
console.log(1 / 0);           // Infinity
console.log('abc' * 3);       // NaN
console.log(NaN === NaN);     // false ⚠️ NaN은 자기 자신과도 다름
console.log(isNaN(NaN));      // true — NaN 판별은 isNaN() 사용
```

### Number 유틸리티

```js
(3.14159).toFixed(2);          // '3.14' (반올림, 문자열 반환)
(1234567).toLocaleString();    // '1,234,567' (천 단위 쉼표)

Number('42');     // 42
Number(true);     // 1
Number(false);    // 0
Number('abc');    // NaN

parseInt('42px');     // 42 (숫자 부분만 추출)
parseFloat('3.14rem'); // 3.14
```

### BigInt (ES2020)

```js
// Number.MAX_SAFE_INTEGER(9007199254740991) 초과 정수를 정확히 표현
const big = 9007199254740991n; // 끝에 n 붙임
console.log(big + 2n);         // 9007199254740993n (정확)
// big + 2; // ❌ TypeError — number 와 혼합 연산 불가
```

### Math 주요 메서드

```js
Math.abs(-5)        // 5    절댓값
Math.round(3.6)     // 4    반올림
Math.floor(3.9)     // 3    내림
Math.ceil(3.1)      // 4    올림
Math.max(1, 5, 3)   // 5    최댓값
Math.min(1, 5, 3)   // 1    최솟값
Math.pow(2, 10)     // 1024 거듭제곱
Math.sqrt(16)       // 4    제곱근
Math.random()       // 0 이상 1 미만 난수

// 1~10 사이 정수 난수
Math.floor(Math.random() * 10) + 1
```

---

## 4. 논리형 (Boolean)

`true` 와 `false` 두 값만 존재합니다.

### Falsy — boolean 변환 시 false 가 되는 값 (6+1가지)

```js
Boolean(false)     // false
Boolean(0)         // false
Boolean(-0)        // false
Boolean(0n)        // false  (BigInt 0)
Boolean('')        // false  (빈 문자열)
Boolean(null)      // false
Boolean(undefined) // false
Boolean(NaN)       // false
```

### Truthy — 위를 제외한 모든 값

```js
Boolean('0')    // true  ← 문자열 '0' 은 truthy!
Boolean('false')// true  ← 문자열 'false' 도 truthy!
Boolean({})     // true  ← 빈 객체도 truthy!
Boolean([])     // true  ← 빈 배열도 truthy!
Boolean(-1)     // true
```

> **주의**: `'0'`, `'false'`, `{}`, `[]` 는 모두 **truthy** 입니다.

---

## 5. undefined와 null

| 구분 | `undefined` | `null` |
|------|-------------|--------|
| 의미 | 아직 값이 없음 | 의도적으로 값이 없음을 명시 |
| 할당 주체 | JS 엔진이 자동 | 개발자가 직접 |
| `typeof` | `'undefined'` | `'object'` (역사적 버그) |
| 비교 | `null == undefined` → `true` | `null === undefined` → `false` |

```js
let a;          // undefined — 아직 초기화 안 됨
let b = null;   // null     — 나중에 값을 받을 자리 예약

// 함수 반환값 없음 → undefined
function noReturn() {}
console.log(noReturn()); // undefined

// 객체의 없는 속성 → undefined
const obj = { name: '홍길동' };
console.log(obj.age); // undefined
```

---

## 6. Symbol

매번 호출마다 **유일(unique)한 값**을 만드는 원시 타입입니다.  
주로 객체 속성 충돌을 방지하는 고유 키로 사용합니다.

```js
const sym1 = Symbol('id');
const sym2 = Symbol('id');

console.log(sym1 === sym2); // false — 항상 유일
console.log(typeof sym1);   // 'symbol'

// 객체의 숨겨진 키로 활용
const KEY = Symbol('secretKey');
const obj = { [KEY]: '비밀', name: '공개' };

console.log(obj[KEY]);          // '비밀'
console.log(Object.keys(obj));  // ['name'] — Symbol 키는 노출 안 됨
```

---

## 7. typeof 연산자

```js
typeof 'hello'        // 'string'
typeof 42             // 'number'
typeof true           // 'boolean'
typeof undefined      // 'undefined'
typeof null           // 'object'    ← JS 역사적 버그!
typeof {}             // 'object'
typeof []             // 'object'    ← 배열도 object!
typeof function() {}  // 'function'
typeof Symbol()       // 'symbol'
typeof 1n             // 'bigint'
```

> **배열 확인**은 `typeof` 가 아닌 `Array.isArray()` 를 사용하세요.
>
> ```js
> Array.isArray([]);  // true
> Array.isArray({});  // false
> ```

---

## 8. 참조 타입 — 객체·배열·함수

### 객체 (Object)

```js
const person = {
    name: '홍길동',            // 문자열 속성
    age: 30,                   // 숫자 속성
    isAdmin: false,            // 불리언 속성
    address: { city: '서울' }, // 중첩 객체
    greet() {                  // 메서드
        return `안녕, ${this.name}!`;
    },
};

person.name        // 점 표기법
person['age']      // 대괄호 표기법
person.address.city // 중첩 접근
person.greet()     // 메서드 호출
```

### 배열 (Array)

```js
const fruits = ['사과', '바나나', '체리'];

fruits[0]           // '사과' (인덱스 0부터)
fruits.length       // 3
fruits.push('딸기') // 끝에 추가
fruits.pop()        // 끝에서 제거 후 반환
fruits.includes('바나나') // true
fruits.indexOf('체리')    // 2
fruits.join(', ')   // '사과, 바나나, 체리'
```

---

## 9. 기본 타입 vs 참조 타입 — 메모리 모델

### 기본 타입 — 값 복사 (독립)

```
let a = 10;
let b = a;     // 값 복사
b = 20;

a → [10]   b → [20]    ← 서로 독립
```

```js
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 — a 는 변하지 않음
```

### 참조 타입 — 주소 공유 (연동)

```
const objA = { value: 10 };
const objB = objA;   // 주소 복사

objA → [주소: 0x01]
objB → [주소: 0x01]
         ↓
    { value: 10 }     ← 같은 데이터를 가리킴
```

```js
const objA = { value: 10 };
const objB = objA;
objB.value = 999;
console.log(objA.value); // 999 — objA 도 함께 변경!
```

### 독립적인 복사본 만들기 (얕은 복사)

```js
const objC = { ...objA }; // 스프레드 연산자로 새 객체 생성
objC.value = 42;
console.log(objA.value); // 999 — 영향 없음
```

---

## 파일 구조

```
ch04_types/
├── types.js   ← string/number/boolean/undefined/null/symbol/bigint/object/array
└── README.md  ← 이 문서
```

## 실행 방법

```bash
node types.js
```

---

## 핵심 요약

```
기본 타입 (7가지):
  string, number, boolean, undefined, null, symbol, bigint
  → 값이 변수에 직접 저장 / 복사 시 독립적

참조 타입:
  object, array, function
  → 주소가 변수에 저장 / 복사 시 같은 객체 공유

특수값 주의:
  typeof null    → 'object' (버그)
  typeof []      → 'object' (배열 확인은 Array.isArray())
  NaN === NaN    → false    (판별은 isNaN() 사용)
  null == undefined → true  (=== 는 false)

Falsy 8가지:
  false, 0, -0, 0n, '', null, undefined, NaN
  → 나머지는 모두 Truthy ('0', '[]', '{}' 포함!)
```
