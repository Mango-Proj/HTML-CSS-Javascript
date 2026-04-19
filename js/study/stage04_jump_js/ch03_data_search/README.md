# Ch03. 고급 자료구조와 순회 기법

## 학습 목표

- `for...of` 와 `for...in` 의 차이를 명확히 구분한다
- `Set` / `Map` 의 특징과 일반 배열/객체와의 차이를 이해한다
- 스프레드 연산자(`...`), 나머지 매개변수, 구조 분해 할당을 활용한다
- `Symbol` 의 고유성과 활용 목적을 이해한다

---

## 1. 이터러블 (Iterable)

**이터러블(Iterable)** 이란 한 마디로 **"반복 순회가 가능한 것"** 입니다.  
`for...of` 로 순회할 수 있는 객체를 이터러블이라고 합니다.  
내부적으로 `Symbol.iterator` 메서드를 가지고 있는 객체들이 이터러블입니다.

```
이터러블 O: Array, String, Map, Set, arguments, NodeList
이터러블 X: 일반 객체 ({})  → for...of 사용 불가
```

> **왜 일반 객체는 for...of가 안 될까요?**  
> 배열 `[1, 2, 3]`은 "1 다음 2 다음 3"이라는 순서가 명확합니다.  
> 하지만 객체 `{ name: 'Kim', age: 25 }`는 어떤 순서로 순회해야 할지 정해진 규칙이 없습니다.  
> 그래서 일반 객체는 `Object.entries()`로 먼저 변환해야 `for...of`를 사용할 수 있습니다.

---

## 2. `for...of` — 값(value) 순회 (`forof.js`)

이터러블의 **값(value)** 을 순서대로 꺼냅니다.  
배열에서 각 요소를 하나씩 꺼낼 때 가장 자주 사용하는 문법입니다.

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

객체의 **열거 가능한 속성 키(key)** 를 순회합니다.  
값이 아닌 **키**를 꺼낸다는 점이 `for...of`와 가장 큰 차이입니다.

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

> **프로토타입(Prototype)이란?**  
> JavaScript의 모든 객체는 내부적으로 부모 객체(프로토타입)를 가집니다.  
> `for...in`은 이 부모 객체의 속성까지 순회할 수 있어서,  
> 내가 만든 속성만 처리하려면 `hasOwnProperty`로 필터링해야 합니다.

```js
// ✅ 프로토타입 속성 제외
for (const key in obj) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    // 자기 것만 처리
  }
}

// ✅ 더 안전한 객체 순회 (현업에서 권장)
for (const [key, val] of Object.entries(obj)) { ... }
```

### `for...of` vs `for...in` 한눈에 비교

| | `for...of` | `for...in` |
|--|-----------|-----------|
| 대상 | 이터러블 (배열, 문자열, Map, Set…) | 객체 (열거 가능 속성) |
| 반환값 | **값(value)** | **키(key)** |
| 배열 | ✅ 권장 | ❌ 비권장 |
| 일반 객체 | ❌ 직접 불가 | ✅ |

> **쉽게 기억하기:**  
> - `for...of` → "**of** value" → 값을 꺼낸다  
> - `for...in` → "**in** key" → 키 안을 탐색한다

---

## 4. Set과 Map (`set.js`)

### Set — 중복 없는 집합

`Set`은 **중복된 값을 허용하지 않는 컬렉션**입니다.  
가장 많이 사용되는 기능은 **배열의 중복 제거**입니다.

> **비유:** 출석부처럼 생각하면 됩니다.  
> 한 사람의 이름이 두 번 적혀도 출석 처리는 한 번만 됩니다.

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

**집합 연산:** 수학에서 배운 합집합, 교집합, 차집합을 코드로 구현할 수 있습니다.

```js
const A = new Set([1, 2, 3, 4]);
const B = new Set([3, 4, 5, 6]);

const 합집합 = new Set([...A, ...B]);                      // {1,2,3,4,5,6}
const 교집합 = new Set([...A].filter(x => B.has(x)));     // {3,4}
const 차집합 = new Set([...A].filter(x => !B.has(x)));    // {1,2}
```

### Map — 유연한 키-값 저장소

`Map`은 일반 객체와 비슷하게 키-값 쌍을 저장하지만  
**키로 어떤 타입이든 사용**할 수 있다는 점이 가장 큰 차이입니다.

> **비유:** 일반 객체(`{}`)가 "문자열 라벨이 붙은 서랍장"이라면,  
> `Map`은 "어떤 것이든 라벨로 붙일 수 있는 서랍장"입니다.  
> DOM 요소를 키로 쓰거나, 숫자를 키로 쓰거나, 다른 객체를 키로 쓸 수 있습니다.

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

`...` 기호 하나가 문맥에 따라 **펼치기(스프레드)** 와 **모으기(나머지)** 두 가지로 사용됩니다.

### 스프레드 연산자 `...` — 펼치기

배열이나 객체를 **펼쳐서** 복사하거나 합칩니다.

> **비유:** 라면 봉지를 뜯어서 내용물을 냄비에 붓는 것과 같습니다.  
> 봉지(배열/객체) 자체가 아니라 **안의 내용물**이 펼쳐집니다.

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

함수에서 인수들을 **배열로 모아서** 받습니다.  
몇 개를 받을지 미리 모를 때 사용합니다.

```js
// 인수를 배열로 모아서 받음
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10
sum(1, 2);       // 3 — 인수 개수에 상관없이 동작

// 첫 인수는 따로, 나머지는 배열로
function greet(first, ...others) {
  console.log(first);  // 'Alice'
  console.log(others); // ['Bob', 'Charlie']
}
```

### 구조 분해 할당 — 추출

배열이나 객체에서 필요한 값만 **변수로 추출**합니다.  
원래는 `const name = user.name; const age = user.age;` 처럼 하나씩 꺼내야 했는데,  
구조 분해 할당으로 훨씬 짧게 쓸 수 있습니다.

**배열 구조 분해**
```js
const [r, g, b] = [255, 128, 0];
// r = 255, g = 128, b = 0

const [head, ...tail] = [1, 2, 3, 4]; // head=1, tail=[2,3,4]

// 두 변수 교환 (임시 변수 불필요) — 수학의 교환처럼 깔끔하게
[a, b] = [b, a];

// 기본값 — 값이 없을 때 사용할 값을 지정
const [x = 0, y = 0] = [1]; // x=1, y=0
```

**객체 구조 분해**
```js
const { name, age } = user;
// user.name과 user.age를 각각 name, age 변수에 담음

// 다른 변수명으로 받기
const { name: userName } = user; // user.name을 userName이라는 이름으로 받음

// 기본값
const { role = 'guest' } = user; // role 속성이 없으면 'guest' 사용

// 함수 매개변수에서 바로 구조 분해 (API 응답 객체 처리 시 자주 사용)
function show({ name, age = 0 }) { ... }
```

> 구조 분해 할당은 React, API 응답 처리 등 실무에서 아주 자주 사용됩니다.  
> 처음에는 문법이 낯설 수 있지만, 익숙해지면 코드가 훨씬 간결해집니다.

---

## 6. Symbol — 고유한 식별자 (`symbol.js`)

`Symbol`은 **절대로 겹치지 않는 유일한 값**을 만드는 원시 타입입니다.  
이름이 같아도 다른 Symbol이 만들어집니다.

```js
const sym1 = Symbol('id');
const sym2 = Symbol('id');
sym1 === sym2 // false — 이름이 같아도 항상 다른 값
```

> **비유:** 세상에 "김철수"라는 이름을 가진 사람이 여러 명 있을 수 있습니다.  
> 하지만 주민등록번호는 세상에 단 하나, 완전히 고유한 번호입니다.  
> Symbol은 이 주민등록번호와 같은 역할을 합니다.

### 주요 활용

**① 객체 숨겨진 프로퍼티 키**  
일반적인 `Object.keys()`나 `for...in` 에서 보이지 않는 숨겨진 속성을 만들 수 있습니다.

```js
const KEY = Symbol('key');
const obj = { [KEY]: 'secret', name: 'public' };

obj[KEY]            // 'secret'
Object.keys(obj)    // ['name'] — Symbol 키는 안 보임
for (const k in obj) // name 만 순회 — Symbol 제외
```

**② 충돌 없는 상수**  
이름이 같아도 절대 같은 값이 되지 않으므로 의도치 않은 충돌을 방지할 수 있습니다.

```js
// 이름이 같아도 절대 충돌하지 않는 상수
const UP    = Symbol('UP');
const DOWN  = Symbol('DOWN');
```

**③ Symbol.for() — 전역 공유**  
같은 키를 사용하면 어디서든 같은 Symbol을 가져올 수 있습니다.

```js
// 같은 키면 같은 Symbol 반환 (파일 간 공유)
Symbol.for('key') === Symbol.for('key') // true
```

**④ Well-known Symbol — 내장 동작 커스터마이징**  
`Symbol.iterator`를 직접 구현하면 `for...of`로 순회할 수 없는 객체도 순회 가능하게 만들 수 있습니다.

```js
// Symbol.iterator: for...of 동작 정의
const range = {
  [Symbol.iterator]() {
    // ... 이터레이터 반환
  }
};
for (const n of range) { ... }
```

> Symbol은 처음에는 "이걸 언제 쓰지?" 싶을 수 있습니다.  
> 당장은 Symbol이 "절대 겹치지 않는 유일한 값을 만든다"는 핵심 개념만 기억하세요.  
> 라이브러리나 프레임워크를 만들 때, 또는 충돌을 완전히 차단해야 할 때 유용합니다.

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
