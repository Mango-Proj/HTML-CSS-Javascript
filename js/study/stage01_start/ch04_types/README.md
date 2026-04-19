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

자바스크립트에서 다루는 모든 값은 **기본 타입(Primitive)** 또는 **참조 타입(Reference)** 중 하나입니다.  

이 두 가지는 메모리에 저장되는 방식이 달라서, 복사나 비교 시 전혀 다르게 동작합니다.  
이 차이를 모르면 "왜 값이 갑자기 바뀌었지?" 같은 버그를 만나게 됩니다.

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

문자열은 텍스트 데이터를 표현합니다. 사람이 읽고 쓰는 모든 글자(이름, 메시지, URL 등)가 문자열입니다.

### 생성 방법 3가지

자바스크립트에서 문자열을 만들 때는 따옴표로 감쌉니다. 세 가지 방식이 있으며 각각 장단점이 있습니다.

```js
const str1 = '작은따옴표';       // JS 에서 가장 일반적
const str2 = "큰따옴표";         // 동일하게 동작
const str3 = `백틱(템플릿 리터럴)`; // 변수 삽입·여러 줄 지원
```

### 이스케이프 문자

문자열 안에서 특수한 의미를 가진 문자를 그대로 표현하고 싶을 때 `\` 를 앞에 붙입니다.  
예를 들어 `'` 로 감싼 문자열 안에 `'` 를 넣고 싶다면 `\'` 라고 써야 합니다.

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

변수를 섞어 문자열을 만들 때는 백틱(`` ` ``)과 `${}` 를 사용하는 템플릿 리터럴이 가장 편합니다.

```js
const name = '홍길동';
const age  = 28;

// 변수 삽입
console.log(`이름: ${name}, 나이: ${age}세`);

// 표현식 삽입 — ${} 안에 계산식도 넣을 수 있음
console.log(`2 + 3 = ${2 + 3}`);
console.log(`할인: ${age >= 20 ? '성인 할인' : '청소년 할인'}`);

// 여러 줄 문자열 — \n 없이 그냥 엔터키로 줄바꿈
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
C나 Java처럼 `int`, `float`, `double` 로 구분하지 않고, 하나의 타입으로 통합합니다.  
(64비트 부동소수점, IEEE 754 표준)

```js
let n1 = 42;       // 정수
let n2 = 3.14;     // 실수
let n3 = -100;     // 음수
let n4 = 0xFF;     // 16진수 (255)
let n5 = 0b1010;   // 2진수  (10)
let n6 = 1_000_000;// 숫자 구분자 — 읽기 편하도록 _ 로 자릿수 구분 (ES2021)
```

### 특수값

숫자로 표현할 수 없는 상황을 나타내는 특수값이 3가지 있습니다.

| 값 | 발생 상황 | 판별 함수 |
|----|---------|---------|
| `Infinity` | `1 / 0` — 0으로 나눔 | `isFinite()` |
| `-Infinity` | `-1 / 0` | `isFinite()` |
| `NaN` | `'abc' * 3`, `0/0` — 숫자 아닌 것에 연산 | `isNaN()`, `Number.isNaN()` |

```js
console.log(1 / 0);           // Infinity
console.log('abc' * 3);       // NaN (Not a Number — "숫자가 아님")
console.log(NaN === NaN);     // false ⚠️ NaN은 자기 자신과도 같지 않음!
console.log(isNaN(NaN));      // true — NaN 여부 확인은 isNaN() 함수 사용
```

### Number 유틸리티

숫자를 보기 좋게 포맷하거나, 다른 타입을 숫자로 변환할 때 사용합니다.

```js
(3.14159).toFixed(2);          // '3.14' (소수점 둘째자리까지, 문자열 반환)
(1234567).toLocaleString();    // '1,234,567' (천 단위 쉼표, 한국어 환경)

Number('42');     // 42       — 문자열 → 숫자
Number(true);     // 1        — true → 1
Number(false);    // 0        — false → 0
Number('abc');    // NaN      — 변환 불가

parseInt('42px');     // 42   — 숫자 부분만 추출 (정수)
parseFloat('3.14rem'); // 3.14 — 소수점까지 추출
```

### BigInt (ES2020)

자바스크립트의 `number` 타입은 약 9천조를 초과하는 정수를 정확하게 표현하지 못합니다.  
아주 큰 수(암호화, 금융, ID 등)를 다룰 때는 `BigInt` 를 사용합니다.

```js
// Number.MAX_SAFE_INTEGER(9007199254740991) 초과 정수를 정확히 표현
const big = 9007199254740991n; // 숫자 끝에 n 을 붙이면 BigInt
console.log(big + 2n);         // 9007199254740993n (정확)
// big + 2; // ❌ TypeError — number 와 혼합 연산 불가
```

### Math 주요 메서드

수학 계산에 필요한 기능을 모아 놓은 내장 객체입니다.

```js
Math.abs(-5)        // 5    절댓값
Math.round(3.6)     // 4    반올림
Math.floor(3.9)     // 3    내림 (소수점 버림)
Math.ceil(3.1)      // 4    올림
Math.max(1, 5, 3)   // 5    최댓값
Math.min(1, 5, 3)   // 1    최솟값
Math.pow(2, 10)     // 1024 거듭제곱 (2의 10승)
Math.sqrt(16)       // 4    제곱근
Math.random()       // 0 이상 1 미만 무작위 실수

// 1~10 사이 정수 난수
Math.floor(Math.random() * 10) + 1
```

---

## 4. 논리형 (Boolean)

`true` 와 `false` 두 값만 존재합니다. 조건문(`if`, `while` 등)의 판단 기준이 됩니다.  
"로그인 되어 있는가?", "권한이 있는가?", "값이 유효한가?" 같은 예/아니오 상황에 씁니다.

### Falsy — boolean 변환 시 false 가 되는 값 (8가지)

조건문에서 이 값들은 `false` 처럼 취급됩니다. 외워두면 조건문 작성이 편해집니다.

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

직관적으로 "비어 있을 것 같은" 값도 Truthy 일 수 있어서 주의가 필요합니다.

```js
Boolean('0')    // true  ← 문자열 '0' 은 truthy! (비어있지 않은 문자열)
Boolean('false')// true  ← 문자열 'false' 도 truthy!
Boolean({})     // true  ← 빈 객체도 truthy!
Boolean([])     // true  ← 빈 배열도 truthy!
Boolean(-1)     // true  ← 음수도 truthy (0만 false)
```

> **주의**: `'0'`, `'false'`, `{}`, `[]` 는 모두 **truthy** 입니다.  
> `0` (숫자)은 falsy, `'0'` (문자열 '0')은 truthy입니다. 헷갈리기 쉬운 포인트입니다.

---

## 5. undefined와 null

두 값 모두 "아무것도 없음"을 나타내지만, **누가** 그 상태를 만들었느냐가 다릅니다.

| 구분 | `undefined` | `null` |
|------|-------------|--------|
| 의미 | 아직 값이 없음 | 의도적으로 값이 없음을 명시 |
| 할당 주체 | JS 엔진이 자동 | 개발자가 직접 |
| `typeof` | `'undefined'` | `'object'` (역사적 버그) |
| 비교 | `null == undefined` → `true` | `null === undefined` → `false` |

```js
let a;          // undefined — JS가 자동으로 "아직 값 없음" 표시
let b = null;   // null     — "나중에 값이 올 자리" 임을 명시

// 함수에 return 없으면 → undefined 자동 반환
function noReturn() {}
console.log(noReturn()); // undefined

// 객체에서 없는 속성 접근 → undefined
const obj = { name: '홍길동' };
console.log(obj.age); // undefined (에러 아님)
```

---

## 6. Symbol

매번 호출마다 **유일(unique)한 값**을 만드는 원시 타입입니다.  
주로 객체의 속성 키가 충돌하지 않도록 고유한 식별자를 만들 때 사용합니다.  
라이브러리나 프레임워크에서 내부 구현에 많이 활용되며, 일반 개발에서는 자주 쓰지 않습니다.

```js
const sym1 = Symbol('id');
const sym2 = Symbol('id');

// 같은 설명('id')을 줬어도 완전히 다른 값
console.log(sym1 === sym2); // false — 항상 유일
console.log(typeof sym1);   // 'symbol'

// 객체의 숨겨진 키로 활용
const KEY = Symbol('secretKey');
const obj = { [KEY]: '비밀', name: '공개' };

console.log(obj[KEY]);          // '비밀'
console.log(Object.keys(obj));  // ['name'] — Symbol 키는 for-in, Object.keys 에 노출 안 됨
```

---

## 7. typeof 연산자

`typeof` 는 값의 타입을 문자열로 알려주는 연산자입니다.  
함수에 어떤 값이 들어올지 모를 때, 또는 변수에 실제로 어떤 타입의 값이 있는지 확인할 때 씁니다.

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
> `typeof []` 는 `'object'` 를 반환해 배열과 객체를 구분할 수 없습니다.
>
> ```js
> Array.isArray([]);  // true  ← 배열이 맞음
> Array.isArray({});  // false ← 객체는 배열 아님
> ```

---

## 8. 참조 타입 — 객체·배열·함수

### 객체 (Object)

객체는 **서로 관련된 데이터(속성)와 기능(메서드)을 하나로 묶은** 자료구조입니다.  
사람을 표현한다면 이름, 나이, 직업 등 여러 정보를 하나의 묶음으로 관리할 수 있습니다.

```js
const person = {
    name: '홍길동',            // 문자열 속성
    age: 30,                   // 숫자 속성
    isAdmin: false,            // 불리언 속성
    address: { city: '서울' }, // 중첩 객체
    greet() {                  // 메서드 (객체 안에 있는 함수)
        return `안녕, ${this.name}!`;
    },
};

person.name        // 점 표기법 — 일반적인 접근
person['age']      // 대괄호 표기법 — 변수로 동적 접근 가능
person.address.city // 중첩 접근
person.greet()     // 메서드 호출
```

### 배열 (Array)

배열은 **같은 종류의 데이터를 순서대로 나열**한 자료구조입니다.  
여러 사용자의 점수, 상품 목록, 메뉴 이름 등을 관리할 때 사용합니다.

```js
const fruits = ['사과', '바나나', '체리'];

fruits[0]           // '사과' (인덱스는 0부터 시작!)
fruits.length       // 3
fruits.push('딸기') // 끝에 추가
fruits.pop()        // 끝에서 제거 후 반환
fruits.includes('바나나') // true
fruits.indexOf('체리')    // 2
fruits.join(', ')   // '사과, 바나나, 체리'
```

---

## 9. 기본 타입 vs 참조 타입 — 메모리 모델

이 차이는 처음엔 이해하기 어렵지만 매우 중요합니다. 모르면 "값을 복사했는데 원본이 바뀌는" 버그를 만납니다.

### 기본 타입 — 값 복사 (독립)

기본 타입 값을 복사하면 **완전히 독립된 새 값**이 생깁니다.  
마치 종이에 쓴 메모를 복사기로 복사하면, 복사본을 수정해도 원본은 변하지 않는 것처럼요.

```
let a = 10;
let b = a;     // 값 복사 — b 는 a 와 완전히 독립
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

참조 타입을 복사하면 **실제 데이터의 메모리 주소**가 복사됩니다.  
마치 두 사람이 같은 Google Docs 문서를 공유하면, 한 명이 수정하면 다른 사람의 화면에도 반영되는 것처럼요.

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
const objB = objA;     // 같은 객체를 가리킴
objB.value = 999;
console.log(objA.value); // 999 — objA 도 함께 변경됨!
```

### 독립적인 복사본 만들기 (얕은 복사)

주소가 아니라 **값을 새로 만들어** 복사하는 방법입니다.  
스프레드 연산자(`...`)를 사용하면 속성들을 꺼내 새 객체를 만들어 줍니다.

```js
const objC = { ...objA }; // 스프레드 연산자 — 새 객체 생성
objC.value = 42;
console.log(objA.value); // 999 — 영향 없음 (독립적인 복사본)
```

> **얕은 복사의 한계**: 스프레드는 1단계 깊이까지만 새로 복사합니다.  
> 중첩된 객체(객체 안의 객체)는 여전히 주소를 공유합니다.  
> 완전히 독립된 복사는 "깊은 복사(deep copy)"가 필요합니다.

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
  → 주소가 변수에 저장 / 복사 시 같은 객체 공유 (얕은 복사로 독립화)

특수값 주의:
  typeof null    → 'object' (버그)
  typeof []      → 'object' (배열 확인은 Array.isArray())
  NaN === NaN    → false    (판별은 isNaN() 사용)
  null == undefined → true  (=== 는 false)

Falsy 8가지:
  false, 0, -0, 0n, '', null, undefined, NaN
  → 나머지는 모두 Truthy ('0', [], {} 포함!)

복사 주의:
  기본 타입  → 값 복사 (독립)
  참조 타입  → 주소 복사 (연동) → {...obj} 스프레드로 얕은 복사
```
