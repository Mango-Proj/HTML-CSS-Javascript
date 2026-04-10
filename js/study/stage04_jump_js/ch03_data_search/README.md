# Ch03. 고급 자료구조와 순회 기법

## 학습 목표

- `for...of` 와 `for...in` 의 차이를 명확히 구분한다
- `Set` / `Map` 의 특징과 일반 배열/객체와의 차이를 이해한다
- 스프레드 연산자(`...`), 나머지 매개변수, 구조 분해 할당을 활용한다
- `Symbol` 의 고유성과 활용 목적을 이해한다

---

## 1. 이터러블 (Iterable)

`for...of` 로 순회할 수 있는 객체를 **이터러블**이라고 합니다.
내부적으로 `Symbol.iterator` 메서드를 가지고 있는 객체들입니다.

```
이터러블 O: Array, String, Map, Set, arguments, NodeList
이터러블 X: 일반 객체 ({})  → for...of 사용 불가
```

---

## 2. `for...of` — 값(value) 순회 (`forof.js`)

이터러블의 **값**을 순서대로 꺼냅니다.

```js
// 배열 — 값을 순회
const fruits = ['🍒', '🍓', '🍉'];
for (const fruit of fruits) {
  console.log(fruit); // 🍒, 🍓, 🍉
}

// 인덱스 + 값 동시에 — entries()
for (const [index, fruit] of fruits.entries()) {
  console.log(index, fruit); // 0 🍒, 1 🍓, 2 🍉
}

// 문자열도 이터러블
for (const char of 'Hello') {
  process.stdout.write(char + ' '); // H e l l o
}

// 일반 객체는 불가 → Object.entries() 로 변환 후 사용
for (const [key, val] of Object.entries({ a: 1, b: 2 })) {
  console.log(key, val);
}
```

---

## 3. `for...in` — 키(key) 순회 (`forin.js`)

객체의 **열거 가능한 속성 키**를 순회합니다.

```js
const person = { name: 'Kim', age: 25 };

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
// name: Kim
// age: 25
```

### 주의 사항

| 주의점 | 설명 |
|--------|------|
| 프로토타입 체인 순회 | 상속된 속성까지 포함됨 → `hasOwnProperty` 로 필터 |
| 배열에 쓰면 안 됨 | 인덱스가 문자열로 반환, 프로토타입 속성 포함 가능 |

```js
// ✅ 프로토타입 속성 제외
for (const key in obj) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    // 자기 것만 처리
  }
}

// ✅ 더 안전한 객체 순회
for (const [key, val] of Object.entries(obj)) { ... }
```

### `for...of` vs `for...in` 한눈에 비교

| | `for...of` | `for...in` |
|--|-----------|-----------|
| 대상 | 이터러블 (배열, 문자열, Map, Set…) | 객체 (열거 가능 속성) |
| 반환값 | **값(value)** | **키(key)** |
| 배열 | ✅ 권장 | ❌ 비권장 |
| 일반 객체 | ❌ 직접 불가 | ✅ |

---

## 4. Set과 Map (`set.js`)

### Set — 중복 없는 집합

```js
const set = new Set([1, 2, 2, 3]); // 중복 자동 제거
// Set(3) { 1, 2, 3 }

set.add('hello');   // 추가
set.has(2);         // true — 포함 여부
set.delete(2);      // 제거
set.size;           // 개수

// 가장 많이 쓰는 활용: 배열 중복 제거
const unique = [...new Set([1, 1, 2, 2, 3])]; // [1, 2, 3]
```

**집합 연산**
```js
const A = new Set([1, 2, 3, 4]);
const B = new Set([3, 4, 5, 6]);

const 합집합 = new Set([...A, ...B]);                      // {1,2,3,4,5,6}
const 교집합 = new Set([...A].filter(x => B.has(x)));     // {3,4}
const 차집합 = new Set([...A].filter(x => !B.has(x)));    // {1,2}
```

### Map — 유연한 키-값 저장소

```js
const map = new Map();

map.set('key', 'value');  // 추가
map.get('key');           // 'value' — 조회
map.has('key');           // true
map.delete('key');        // 제거
map.size;                 // 개수
```

**일반 객체와의 차이**

| | 일반 객체 `{}` | `Map` |
|--|------------|-------|
| 키 타입 | 문자열/Symbol만 | **모든 타입** 가능 |
| 순서 보장 | 미보장 (ES2015+ 일부 보장) | **삽입 순서 완전 보장** |
| 크기 확인 | `Object.keys(o).length` | `map.size` |
| 순회 | `Object.entries()` 필요 | `for...of` 바로 사용 |

---

## 5. 스프레드 / 나머지 / 구조 분해 (`spread.js`)

### 스프레드 연산자 `...` — 펼치기

```js
// 배열 복사·합치기
const merged = [...arr1, ...arr2];
const withItem = [...arr, 99, ...arr2];

// 객체 복사·업데이트
const updated = { ...original, hobby: '글쓰기' }; // hobby만 덮어씀

// 여러 설정 병합 (나중 것이 앞을 덮어씀)
const config = { ...defaults, ...userConfig };

// 함수 인수로 펼치기
Math.max(...numbers);
```

### 나머지 매개변수 `...rest` — 모으기

```js
// 인수를 배열로 모아서 받음
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10

// 첫 인수는 따로, 나머지는 배열로
function greet(first, ...others) {
  console.log(first);  // 'Alice'
  console.log(others); // ['Bob', 'Charlie']
}
```

### 구조 분해 할당 — 추출

**배열 구조 분해**
```js
const [r, g, b] = [255, 128, 0];

const [head, ...tail] = [1, 2, 3, 4]; // head=1, tail=[2,3,4]

// 두 변수 교환 (임시 변수 불필요)
[a, b] = [b, a];

// 기본값
const [x = 0, y = 0] = [1]; // x=1, y=0
```

**객체 구조 분해**
```js
const { name, age } = user;

// 다른 변수명으로
const { name: userName } = user;

// 기본값
const { role = 'guest' } = user;

// 함수 매개변수에서 바로 구조 분해
function show({ name, age = 0 }) { ... }
```

---

## 6. Symbol — 고유한 식별자 (`symbol.js`)

```js
const sym1 = Symbol('id');
const sym2 = Symbol('id');
sym1 === sym2 // false — 이름이 같아도 항상 다른 값
```

### 주요 활용

**① 객체 숨겨진 프로퍼티 키**
```js
const KEY = Symbol('key');
const obj = { [KEY]: 'secret', name: 'public' };

obj[KEY]            // 'secret'
Object.keys(obj)    // ['name'] — Symbol 키는 안 보임
for (const k in obj) // name 만 순회 — Symbol 제외
```

**② 충돌 없는 상수**
```js
// 이름이 같아도 절대 충돌하지 않는 상수
const UP    = Symbol('UP');
const DOWN  = Symbol('DOWN');
```

**③ Symbol.for() — 전역 공유**
```js
// 같은 키면 같은 Symbol 반환 (파일 간 공유)
Symbol.for('key') === Symbol.for('key') // true
```

**④ Well-known Symbol — 내장 동작 커스터마이징**
```js
// Symbol.iterator: for...of 동작 정의
const range = {
  [Symbol.iterator]() {
    // ... 이터레이터 반환
  }
};
for (const n of range) { ... }
```

---

## 파일 구조

```
ch03_data_search/
├── forof.js   ← for...of, entries(), 문자열/Map/Set 순회, 이터러블 개념
├── forin.js   ← for...in, hasOwnProperty, Object.keys/values/entries
├── set.js     ← Set(중복제거·집합연산) + Map(유연한 키·캐시패턴)
├── spread.js  ← 스프레드(...), 나머지 매개변수, 구조 분해 할당
├── symbol.js  ← Symbol 고유성, 숨겨진 키, Symbol.for, Well-known Symbol
└── README.md  ← 이 문서
```

## 실행 방법

```bash
node forof.js
node forin.js
node set.js
node spread.js
node symbol.js
```

---

## 핵심 요약

```
순회 선택 기준:
  배열/문자열/Map/Set → for...of (값을 원할 때)
  일반 객체 키       → for...in (+ hasOwnProperty)
  객체 키+값 모두   → for...of + Object.entries()

자료구조 선택 기준:
  중복 제거 필요     → Set
  키에 다양한 타입   → Map
  그 외              → 일반 배열/객체

... 연산자 문맥 구분:
  함수 호출 인수 / 배열 리터럴 / 객체 리터럴 → 스프레드 (펼치기)
  함수 선언 마지막 매개변수                  → 나머지 (모으기)
```
