# Ch06. 자바스크립트 객체와 배열

## 학습 목표

- 객체를 리터럴로 생성하고 속성에 점·대괄호 표기법으로 접근할 수 있다
- 객체 속성을 추가·수정·삭제하고, `in` / `hasOwnProperty` 로 존재를 확인한다
- `Object.keys` / `values` / `entries` 로 객체를 순회할 수 있다
- 배열의 생성, 인덱싱, `length` 를 이해한다
- 배열 앞·뒤 추가/제거(`push`, `pop`, `unshift`, `shift`)를 구분해 사용한다
- `splice` 로 원하는 위치에서 요소를 추가·제거·교체할 수 있다
- `slice`, `concat`, `스프레드` 로 배열을 추출·병합·복사할 수 있다
- `sort`, `reverse`, `join`, `split` 을 활용할 수 있다
- 배열 구조 분해로 변수를 간결하게 할당할 수 있다

---

## 객체 (Object)

객체는 **서로 관련된 정보를 하나의 묶음으로 표현**하는 자료구조입니다.

현실에서 사람을 설명할 때 "이름은 홍길동, 나이는 28세, 직업은 개발자"처럼 여러 속성을 함께 묶어 말합니다.  
자바스크립트의 객체는 이런 정보 묶음을 코드로 표현하는 방법입니다.

```
현실          →   코드
------           ------
사람 프로필  →   const person = { name: '홍길동', age: 28 }
상품 정보    →   const product = { name: '노트북', price: 1200000 }
주문 정보    →   const order = { id: 1, status: 'pending', items: [...] }
```

---

### 1. 객체 생성

객체를 만드는 가장 일반적인 방법은 **중괄호 `{}`** 를 사용하는 리터럴 방식입니다.  
키(key)와 값(value)을 콜론(`:`)으로 연결하고, 여러 쌍은 쉼표로 구분합니다.

```js
// 객체 리터럴 방식 (권장)
const person = {
    name:    'John',
    age:     30,
    isAdmin: false,
    scores:  [90, 85, 92],          // 배열도 값으로 사용 가능
    'place of birth': 'Seoul',      // 공백 포함 키 → 따옴표 필요
};

// 빈 객체 생성 후 속성 추가
const car = {};
car.brand = 'Hyundai';
car.year  = 2024;
```

---

### 2. 프로퍼티 접근

객체에 저장된 값을 가져오는 방법은 두 가지입니다.

```js
// 점 표기법 — 가장 일반적인 방법
person.name   // 'John'
person.age    // 30

// 대괄호 표기법 — 공백·특수문자 키, 변수로 동적 접근
person['place of birth']  // 'Seoul'

const key = 'age';
person[key]   // 30 — 변수 값으로 접근 (동적 키)
// person.key // undefined — 'key' 라는 이름의 속성을 찾음

// 없는 속성 → undefined (에러 아님)
person.email  // undefined
```

| 표기법 | 사용 시점 |
|--------|---------|
| 점 표기법 `obj.key` | 일반적인 경우 (식별자 규칙 준수 키) |
| 대괄호 표기법 `obj['key']` | 공백·특수문자 포함 키, 변수로 동적 접근 |

---

### 3. 프로퍼티 추가 / 수정 / 삭제

`const` 로 선언한 객체라도 **내부 속성은 자유롭게 변경**할 수 있습니다.  
`const` 는 객체 자체(주소)를 고정하는 것이지, 내부 내용을 고정하는 것이 아닙니다.

```js
const profile = { name: 'John' };

// 추가 — 없는 키에 값을 할당하면 새 속성이 생김
profile.age = 30;
profile['email'] = 'john@example.com';

// 수정 — 있는 키에 새 값을 할당
profile.name = 'Jane';

// 삭제 — delete 연산자
delete profile.age;
delete profile['email'];
```

---

### 4. 속성 존재 여부 확인

객체에 특정 속성이 있는지 확인하는 방법이 여러 가지 있습니다.  
특히 `in` 연산자는 값이 `0`, `false`, `''` 처럼 Falsy 여도 키가 있으면 `true` 를 반환한다는 점이 중요합니다.

```js
const product = { name: '노트북', price: 1200000, stock: 0 };

// in 연산자 — 키 존재 여부 (값이 0·false·'' 여도 true)
'name' in product   // true
'email' in product  // false
'stock' in product  // true ← 값이 0 이어도 키는 존재

// hasOwnProperty — 직접 정의한 속성만 (상속 제외)
product.hasOwnProperty('name')     // true
product.hasOwnProperty('toString') // false (상속된 메서드)
```

> `undefined` 비교로 속성 존재를 확인하는 방식(`product.email === undefined`)은  
> 키가 없는 것인지, 키는 있는데 값이 `undefined` 인 것인지 구분이 안 되므로 권장하지 않습니다.

---

### 5. 메서드 (객체 안의 함수)

객체의 속성 값이 함수인 경우, 그것을 **메서드(method)** 라고 부릅니다.  
메서드 안에서 `this` 는 그 메서드를 호출한 객체 자신을 가리킵니다.

```js
const counter = {
    value: 0,

    // 메서드 단축 문법 (ES6, 권장)
    increment() {
        this.value++;    // this = counter 객체
        return this;     // 체이닝을 위해 자신 반환
    },

    getResult() {
        return this.value;
    },
};

counter.increment().increment().increment();
console.log(counter.getResult()); // 3
```

---

### 6. Object 유틸리티 메서드

객체의 키, 값, 또는 키-값 쌍을 배열로 꺼낼 때 사용합니다.  
배열로 만들면 `forEach`, `map` 같은 배열 메서드를 활용해 객체를 순회할 수 있습니다.

```js
const student = { name: '홍길동', grade: 'A', score: 95 };

Object.keys(student)    // ['name', 'grade', 'score']    — 키 목록
Object.values(student)  // ['홍길동', 'A', 95]           — 값 목록
Object.entries(student) // [['name','홍길동'], ['grade','A'], ['score',95]] — 쌍 목록

// 순회 예시 — 키·값을 함께 출력
Object.entries(student).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// 객체 병합 (스프레드 방식, 권장) — 뒤쪽이 앞쪽을 덮어씀
const merged = { ...defaults, ...userPrefs };
```

---

### 7. 중첩 객체

객체의 속성 값으로 또 다른 객체를 넣을 수 있습니다.  
실제 데이터는 계층 구조를 가지는 경우가 많아 (예: 회사 > 부서 > 직원) 중첩 객체가 자주 쓰입니다.

```js
const company = {
    name: 'TechCorp',
    address: { city: '서울', zip: '06000' },
    ceo:     { name: '김대표', age: 45 },
};

company.address.city        // '서울'
company.ceo.name            // '김대표'
company?.cfo?.name          // undefined — 옵셔널 체이닝, 없는 속성에도 에러 없음
```

---

## 배열 (Array)

배열은 **순서가 있는 데이터 목록**입니다.

장바구니 상품 목록, 검색 결과, 사용자 리스트처럼 "여러 개의 같은 종류" 데이터를 다룰 때 사용합니다.  
인덱스(0부터 시작하는 번호)로 각 요소에 접근합니다.

---

### 1. 생성과 인덱싱

```js
const seasons = ['spring', 'summer', 'autumn', 'winter'];
const mixed   = ['Hello', 42, true, null]; // 혼합 타입도 가능

// 인덱스 — 0부터 시작 (0, 1, 2, ...)
seasons[0]   // 'spring' (첫 번째)
seasons[3]   // 'winter' (마지막)
seasons[seasons.length - 1] // 'winter' (마지막 — 범용 방법)
seasons.at(-1)              // 'winter' — 음수 인덱스 (ES2022)

// 범위 밖 인덱스 → undefined (에러 아님)
seasons[10]  // undefined

// 배열 여부 확인 — typeof 는 'object' 반환하므로 구분 불가
Array.isArray(seasons) // true
typeof seasons         // 'object' (배열도 객체 타입)
```

---

### 2. length

```js
const arr = [7, 11, 12, 21];

arr.length      // 4

arr.length = 2; // [7, 11] — 뒤 요소 삭제 (주의: 데이터 손실)
arr.length = 4; // [7, 11, <2 empty>] — 빈 슬롯 추가 (undefined)

arr.length === 0 // 배열이 비었는지 확인
```

---

### 3. 추가 / 제거 메서드

배열 앞과 뒤에서 요소를 추가하거나 제거하는 4가지 메서드입니다.  
각각 반환값이 다르니 주의하세요.

```
배열:  [앞] ← unshift / shift →  [뒤] ← push / pop
```

| 메서드 | 위치 | 동작 | 반환값 |
|--------|------|------|--------|
| `push(값)` | 끝 | 추가 | 새 length |
| `pop()` | 끝 | 제거 | 제거된 요소 |
| `unshift(값)` | 앞 | 추가 | 새 length |
| `shift()` | 앞 | 제거 | 제거된 요소 |

```js
const arr = ['b', 'c'];

arr.push('d', 'e');   // ['b', 'c', 'd', 'e']
arr.pop();            // 'e' 제거 → ['b', 'c', 'd']
arr.unshift('a');     // ['a', 'b', 'c', 'd']
arr.shift();          // 'a' 제거 → ['b', 'c', 'd']
```

---

### 4. splice — 원하는 위치에서 추가·제거·교체

`splice` 는 배열의 **중간 어디서든** 요소를 추가·제거·교체할 수 있는 강력한 메서드입니다.  
원본 배열을 직접 수정합니다.

```js
// splice(시작인덱스, 제거개수, 추가요소...)
const arr = ['a', 'b', 'c', 'd', 'e'];

// 제거 — 인덱스 1부터 2개 제거
arr.splice(1, 2);          // ['b','c'] 제거 → ['a','d','e']

// 추가 (제거 없이 삽입) — 인덱스 1에 삽입
arr.splice(1, 0, 'x', 'y');

// 교체 — 인덱스 2의 요소 1개를 'z'로 교체
arr.splice(2, 1, 'z');
```

---

### 5. 탐색

배열에서 원하는 값을 찾을 때 사용합니다.

```js
const colors = ['red', 'green', 'blue', 'green'];

colors.indexOf('green')      // 1 (첫 번째 인덱스)
colors.lastIndexOf('green')  // 3 (마지막 인덱스)
colors.indexOf('purple')     // -1 (없으면 -1 반환)

colors.includes('blue')      // true (포함 여부, boolean 반환)
colors.includes('pink')      // false

// 객체 배열 탐색 — 조건 함수(콜백)로 찾기
const users = [{ id:1, name:'Alice' }, { id:2, name:'Bob' }];
users.find((u) => u.id === 2)         // { id:2, name:'Bob' } — 첫 번째 일치 요소
users.findIndex((u) => u.id === 2)    // 1 — 첫 번째 일치 인덱스
```

---

### 6. 추출 / 병합 / 복사

```js
const alpha = ['a', 'b', 'c', 'd', 'e'];

// slice(시작, 끝) — 원본 유지, 새 배열 반환 (끝 인덱스 미포함)
alpha.slice(1, 3)   // ['b', 'c']
alpha.slice(2)      // ['c', 'd', 'e']
alpha.slice(-2)     // ['d', 'e'] — 음수: 뒤에서부터

// concat — 배열 이어붙이기 (원본 유지)
[1,2].concat([3,4], [5,6])  // [1, 2, 3, 4, 5, 6]

// 스프레드 — 병합·복사 (권장, 더 직관적)
const merged = [...arr1, ...arr2, ...arr3];
const copy   = [...original];   // 얕은 복사 (독립적인 새 배열)
```

---

### 7. 정렬 / 뒤집기

```js
// sort() — 원본 변경
['banana','apple','cherry'].sort()         // ['apple','banana','cherry']

// ⚠️ 숫자 정렬은 반드시 비교 함수 필요
// 기본 sort()는 요소를 문자열로 변환해 사전 순으로 정렬합니다
[10, 5, 100, 2].sort()               // [10, 100, 2, 5] ← 문자열 정렬! ('10' < '100' < '2')
[10, 5, 100, 2].sort((a,b) => a-b)   // [2, 5, 10, 100] ← 숫자 오름차순
[10, 5, 100, 2].sort((a,b) => b-a)   // [100, 10, 5, 2] ← 숫자 내림차순

// reverse() — 순서 뒤집기 (원본 변경)
['a','b','c'].reverse()  // ['c','b','a']

// 원본을 보존하면서 정렬·뒤집기
const sorted   = [...arr].sort((a,b) => a-b);
const reversed = [...arr].reverse();
```

---

### 8. join / split

배열과 문자열을 서로 변환하는 메서드입니다.

```js
// join(구분자) — 배열 → 문자열
['Hello','World'].join(' ')   // 'Hello World'
['a','b','c'].join('-')       // 'a-b-c'
['a','b','c'].join('')        // 'abc'

// split(구분자) — 문자열 → 배열
'apple,banana,cherry'.split(',')  // ['apple','banana','cherry']
'hello'.split('')                 // ['h','e','l','l','o']
```

---

### 9. 배열 순회

배열의 모든 요소를 하나씩 처리할 때는 아래 방법들을 상황에 맞게 선택합니다.

```js
const items = ['사과', '바나나', '체리'];

// forEach — 부수 효과 목적 (출력, 외부 변수 수정 등), break 불가
items.forEach((item, index) => console.log(index, item));

// for...of — 값이 필요하고 break 가 필요할 때
for (const item of items) {
    if (item === '바나나') break;
    console.log(item);
}

// 전통 for — 인덱스를 직접 제어해야 할 때
for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
}
```

---

### 10. 배열 구조 분해

배열의 값을 순서대로 변수에 담는 간결한 문법입니다.  
`const first = arr[0]; const second = arr[1];` 처럼 일일이 인덱스로 꺼내지 않아도 됩니다.

```js
const [r, g, b] = [255, 128, 0];  // r=255, g=128, b=0

// 건너뛰기 — 필요 없는 요소는 빈 자리로 건너뜀
const [first, , third] = ['A', 'B', 'C']; // first='A', third='C'

// 기본값 — 값이 없을 때 사용할 기본값 지정
const [x=0, y=0, z=0] = [10, 20]; // x=10, y=20, z=0

// 나머지 수집 — 남은 요소를 배열로 받기
const [head, ...tail] = [1, 2, 3, 4, 5]; // head=1, tail=[2,3,4,5]

// 두 변수 교환 — 임시 변수 없이
let a = '사과', b = '바나나';
[a, b] = [b, a]; // a='바나나', b='사과'
```

---

## 파일 구조

```
ch06_array/
├── objects.js  ← 객체 생성·접근·추가/삭제·메서드·Object 유틸·중첩 객체
├── arrays.js   ← 생성·인덱싱·length·추가/제거·탐색·추출/병합·정렬·구조분해
└── README.md   ← 이 문서
```

## 실행 방법

```bash
node objects.js
node arrays.js
```

---

## 핵심 요약

```
객체 접근:
  obj.key        — 점 표기법 (일반적)
  obj['key']     — 대괄호 표기법 (공백·특수문자, 동적 키)
  'key' in obj   — 존재 확인 (값이 0·false 여도 true)

배열 추가/제거:
  push / pop     — 끝에서 추가/제거
  unshift/shift  — 앞에서 추가/제거
  splice         — 원하는 위치에서 추가·제거·교체

배열 탐색:
  includes       — 포함 여부 (boolean)
  indexOf        — 첫 번째 인덱스 (-1: 없음)
  find           — 첫 번째 요소 (콜백 조건)

배열 변환:
  slice          — 추출 (원본 유지)
  concat / [...]  — 병합 (스프레드 권장)
  sort((a,b)=>a-b) — 숫자 정렬 필수 비교 함수
  join / split   — 배열 ↔ 문자열
```
