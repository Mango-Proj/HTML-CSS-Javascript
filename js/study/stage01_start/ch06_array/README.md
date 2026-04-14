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

### 1. 객체 생성

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

### 2. 프로퍼티 접근

```js
// 점 표기법 — 일반적인 경우
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

### 3. 프로퍼티 추가 / 수정 / 삭제

```js
const profile = { name: 'John' };

// 추가 — 없는 키에 값 할당
profile.age = 30;
profile['email'] = 'john@example.com';

// 수정 — 있는 키에 새 값 할당
profile.name = 'Jane';

// 삭제 — delete 연산자
delete profile.age;
delete profile['email'];
```

> `const` 로 선언된 객체도 내부 속성은 추가·수정·삭제할 수 있습니다.  
> `const` 는 **참조(주소)** 를 고정하는 것이지 내부 내용을 고정하는 게 아닙니다.

### 4. 속성 존재 확인

```js
const product = { name: '노트북', stock: 0 };

// in 연산자 — 키 존재 여부 (값이 0·false·'' 여도 true)
'name' in product   // true
'email' in product  // false
'stock' in product  // true ← 값이 0 이어도 키는 존재

// hasOwnProperty — 직접 정의한 속성만 (상속 제외)
product.hasOwnProperty('name')     // true
product.hasOwnProperty('toString') // false (상속된 메서드)
```

### 5. 메서드 (객체 안의 함수)

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

### 6. Object 유틸리티 메서드

```js
const student = { name: '홍길동', grade: 'A', score: 95 };

Object.keys(student)    // ['name', 'grade', 'score']
Object.values(student)  // ['홍길동', 'A', 95]
Object.entries(student) // [['name','홍길동'], ['grade','A'], ['score',95]]

// 순회
Object.entries(student).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// 객체 병합 (스프레드 방식, 권장)
const merged = { ...defaults, ...userPrefs }; // 뒤쪽이 앞쪽을 덮어씀
```

### 7. 중첩 객체

```js
const company = {
    name: 'TechCorp',
    address: { city: '서울', zip: '06000' },
    ceo:     { name: '김대표', age: 45 },
};

company.address.city        // '서울'
company.ceo.name            // '김대표'
company?.cfo?.name          // undefined (옵셔널 체이닝, 에러 없음)
```

---

## 배열 (Array)

### 1. 생성과 인덱싱

```js
const seasons = ['spring', 'summer', 'autumn', 'winter'];
const mixed   = ['Hello', 42, true, null]; // 혼합 타입 가능

// 인덱스 — 0부터 시작
seasons[0]   // 'spring' (첫 번째)
seasons[3]   // 'winter' (마지막)
seasons[seasons.length - 1] // 'winter' (마지막)
seasons.at(-1)              // 'winter' (ES2022, 음수 인덱스)

// 범위 밖 인덱스 → undefined
seasons[10]  // undefined

// 배열 여부 확인
Array.isArray(seasons) // true
typeof seasons         // 'object' (배열도 object)
```

### 2. length

```js
const arr = [7, 11, 12, 21];

arr.length      // 4

arr.length = 2; // [7, 11] — 뒤 요소 삭제
arr.length = 4; // [7, 11, <2 empty>] — 빈 슬롯 추가 (undefined)

arr.length === 0 // 배열이 비었는지 확인
```

### 3. 추가 / 제거 메서드

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

### 4. splice — 원하는 위치에서 추가·제거·교체

```js
// splice(시작인덱스, 제거개수, 추가요소...)
const arr = ['a', 'b', 'c', 'd', 'e'];

// 제거
arr.splice(1, 2);          // ['b','c'] 제거 → ['a','d','e']

// 추가 (제거 없이 삽입)
arr.splice(1, 0, 'x', 'y'); // 인덱스 1에 삽입

// 교체
arr.splice(2, 1, 'z');     // 인덱스 2의 요소 1개를 'z'로 교체
```

### 5. 탐색

```js
const colors = ['red', 'green', 'blue', 'green'];

colors.indexOf('green')      // 1 (첫 번째 인덱스)
colors.lastIndexOf('green')  // 3 (마지막 인덱스)
colors.indexOf('purple')     // -1 (없음)

colors.includes('blue')      // true
colors.includes('pink')      // false

// 객체 배열 탐색
const users = [{ id:1, name:'Alice' }, { id:2, name:'Bob' }];
users.find((u) => u.id === 2)         // { id:2, name:'Bob' }
users.findIndex((u) => u.id === 2)    // 1
```

### 6. 추출 / 병합 / 복사

```js
const alpha = ['a', 'b', 'c', 'd', 'e'];

// slice(시작, 끝) — 원본 유지, 새 배열 반환 (끝 인덱스 미포함)
alpha.slice(1, 3)   // ['b', 'c']
alpha.slice(2)      // ['c', 'd', 'e']
alpha.slice(-2)     // ['d', 'e']

// concat — 배열 이어붙이기
[1,2].concat([3,4], [5,6])  // [1, 2, 3, 4, 5, 6]

// 스프레드 — 병합·복사 (권장)
const merged = [...arr1, ...arr2, ...arr3];
const copy   = [...original];   // 얕은 복사 (독립적인 새 배열)
```

### 7. 정렬 / 뒤집기

```js
// sort() — 원본 변경
['banana','apple','cherry'].sort()         // ['apple','banana','cherry']

// ⚠️ 숫자 정렬은 반드시 비교 함수 필요
[10, 5, 100, 2].sort()               // [10, 100, 2, 5] ← 문자열 정렬!
[10, 5, 100, 2].sort((a,b) => a-b)   // [2, 5, 10, 100] ← 오름차순
[10, 5, 100, 2].sort((a,b) => b-a)   // [100, 10, 5, 2] ← 내림차순

// reverse() — 순서 뒤집기 (원본 변경)
['a','b','c'].reverse()  // ['c','b','a']

// 원본 보존하며 정렬·뒤집기
const sorted   = [...arr].sort((a,b) => a-b);
const reversed = [...arr].reverse();
```

### 8. join / split

```js
// join(구분자) — 배열 → 문자열
['Hello','World'].join(' ')   // 'Hello World'
['a','b','c'].join('-')       // 'a-b-c'
['a','b','c'].join('')        // 'abc'

// split(구분자) — 문자열 → 배열
'apple,banana,cherry'.split(',')  // ['apple','banana','cherry']
'hello'.split('')                 // ['h','e','l','l','o']
```

### 9. 배열 순회

```js
const items = ['사과', '바나나', '체리'];

// forEach — 부수 효과 목적 (break 불가)
items.forEach((item, index) => console.log(index, item));

// for...of — break 가 필요할 때
for (const item of items) {
    if (item === '바나나') break;
    console.log(item);
}

// 전통 for — 인덱스 직접 제어
for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
}
```

### 10. 배열 구조 분해

```js
const [r, g, b] = [255, 128, 0];  // r=255, g=128, b=0

// 건너뛰기
const [first, , third] = ['A', 'B', 'C']; // first='A', third='C'

// 기본값
const [x=0, y=0, z=0] = [10, 20]; // x=10, y=20, z=0

// 나머지 수집
const [head, ...tail] = [1, 2, 3, 4, 5]; // head=1, tail=[2,3,4,5]

// 두 변수 교환 (임시 변수 없이)
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
