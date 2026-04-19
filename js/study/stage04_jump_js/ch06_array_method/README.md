# Ch06. 자바스크립트 배열 메서드 완전 정복

## 학습 목표

- `forEach` / `map` / `filter` / `find` / `reduce` / `sort` / `join` 의 동작 원리를 이해한다
- 각 메서드를 목적에 맞게 선택하고 체이닝으로 조합할 수 있다
- `some` / `every` / `includes` / `findIndex` 로 배열 조건 검사를 간결하게 작성한다
- `reduce` 로 그룹화·빈도 카운트·조회 맵(lookup map) 등 고급 집계를 구현한다
- `sort` 의 함정(문자열 변환)과 다중 조건 정렬을 이해하고 활용한다
- `join` / `split` 로 배열 ↔ 문자열 변환을 자유롭게 다룬다

---

## 왜 배열 메서드를 배워야 하나?

데이터를 다루는 프로그래밍에서 배열은 어디서나 등장합니다.  
쇼핑몰의 상품 목록, SNS 피드, 성적 데이터 등 모두 배열 형태입니다.

배열 메서드를 쓰지 않으면:
```js
// for 반복문으로 90점 이상 학생 이름만 추출
const result = [];
for (let i = 0; i < students.length; i++) {
  if (students[i].score >= 90) {
    result.push(students[i].name);
  }
}
```

배열 메서드를 쓰면:
```js
// 같은 기능을 한 줄로
const result = students.filter(s => s.score >= 90).map(s => s.name);
```

코드가 짧아지는 것뿐 아니라 **무엇을 하는 코드인지 바로 읽힙니다.**

---

## 1. forEach — 순회 (부수 효과)

`forEach` 는 배열을 순서대로 방문하며 콜백을 실행합니다.  
**반환값이 없으며(undefined)**, 출력·외부 변수 수정 등 **부수 효과**가 목적일 때 사용합니다.

> **"부수 효과"란?** 함수가 값을 반환하는 것 외에 화면 출력, 파일 쓰기, 외부 변수 수정 등  
> 함수 바깥에 영향을 미치는 것을 말합니다.

```js
// 콜백 매개변수: (요소, 인덱스, 원본 배열)
const langs = ['JavaScript', 'Rust', 'Go'];

langs.forEach((lang, i) => {
  console.log(`${i + 1}: ${lang}`);
});
// 1: JavaScript / 2: Rust / 3: Go
```

### forEach vs for...of

| 상황 | 선택 |
|------|------|
| 단순 출력, 외부 변수 누적 | `forEach` |
| `break` 로 중간에 멈춰야 할 때 | `for...of` |
| `async/await` 와 함께 순서 보장 | `for...of` |
| 새 배열 생성 | `map` |

```js
// forEach — break 불가 (return 은 continue 처럼 동작)
arr.forEach((n) => {
  if (n === 3) return; // 이 항목만 건너뜀. 전체 순회는 계속됨.
  console.log(n);
});

// for...of — break 가능
for (const n of arr) {
  if (n === 3) break; // 즉시 전체 순회 종료
}
```

> **주의:** `forEach` 에서 `return`을 해도 전체 반복이 멈추지 않습니다.  
> 특정 조건에서 순회를 완전히 멈추고 싶다면 `for...of`와 `break`를 사용하세요.

---

## 2. map — 변환 (새 배열 반환)

`map` 은 각 요소를 콜백으로 **변환**해 **같은 길이의 새 배열**을 반환합니다.  
원본 배열은 변경되지 않습니다.

> **비유:** 공장의 컨베이어 벨트와 같습니다.  
> 원자재(원본 배열)가 컨베이어 위를 지나가면서 각 기계(콜백)에 의해 가공됩니다.  
> 가공된 제품(새 배열)이 나오고, 원자재는 그대로 남습니다.

```js
const numbers = [1, 2, 3, 4, 5];

// 값 변환
const doubled = numbers.map((n) => n * 2);   // [2, 4, 6, 8, 10]
const squared = numbers.map((n) => n ** 2);  // [1, 4, 9, 16, 25]

// 객체 배열 → 필드 추출
const users = [
  { id: 1, name: 'Alice', score: 92 },
  { id: 2, name: 'Bob',   score: 78 },
];
const names = users.map((u) => u.name);       // ['Alice', 'Bob']
const ids   = users.map((u) => u.id);         // [1, 2]

// 새 필드 추가 (스프레드로 원본 보존)
const withLabel = users.map((u) => ({
  ...u,
  passed: u.score >= 80,
}));
// [{ id: 1, name: 'Alice', score: 92, passed: true }, ...]
```

### flatMap — map + 1단계 flat

`map`의 결과가 배열일 때, 중첩 배열을 1단계 펼쳐줍니다.

```js
const sentences = ['Hello World', 'foo bar'];
sentences.flatMap((s) => s.split(' '));
// ['Hello', 'World', 'foo', 'bar']
// map만 쓰면: [['Hello', 'World'], ['foo', 'bar']] — 배열 안에 배열

// 조건에 따라 0개 or 여러 개 반환
[1,2,3,4].flatMap((n) => n % 2 === 0 ? [n, n*2] : []);
// [2, 4, 4, 8] — 홀수 제거, 짝수는 원본+2배
```

---

## 3. filter / find — 검색

### filter — 조건 맞는 모든 요소 → 새 배열

`filter`는 조건을 만족하는 요소만 골라내서 **새 배열**을 반환합니다.  
원본 배열은 변경되지 않습니다.

> **비유:** 체로 거르는 것과 같습니다.  
> 조건에 맞는 것만 아래로 통과하고, 나머지는 걸러집니다.

```js
const nums = [5, 12, 8, 130, 44];

nums.filter((n) => n > 10);      // [12, 130, 44]
nums.filter((n) => n % 2 === 0); // [12, 8, 130, 44]

// 객체 배열
const products = [
  { name: '노트북', price: 1200000, inStock: true  },
  { name: '마우스', price:   35000, inStock: true  },
  { name: '책상',   price:  250000, inStock: false },
];
const available = products.filter((p) => p.inStock);
// [노트북, 마우스] — 재고 있는 것만
```

### find / findIndex — 첫 번째 일치 요소

`filter`가 **모든** 조건 맞는 요소를 반환한다면,  
`find`는 **첫 번째** 조건 맞는 요소 하나만 반환합니다.

```js
const found    = nums.find((n) => n > 10);       // 12  (첫 번째 일치)
const notFound = nums.find((n) => n > 1000);     // undefined (없으면 undefined)

const idx    = nums.findIndex((n) => n > 10);    // 1
const noIdx  = nums.findIndex((n) => n > 1000);  // -1 (없으면 -1)

// ID로 특정 항목 찾기 (실무 빈출 패턴)
const user = users.find((u) => u.id === 3);
```

### some / every — 조건 충족 여부 검사

`some`은 "하나라도 있는가?", `every`는 "전부 조건을 만족하는가?"를 확인합니다.

> **비유:**  
> `some` → "반 학생 중 100점이 있나요?" (한 명이라도 있으면 yes)  
> `every` → "반 학생 모두 60점 이상인가요?" (한 명이라도 아니면 no)

```js
const scores = [72, 85, 91, 60];

scores.some((s) => s >= 90);   // true  — 하나라도 90 이상 (91이 있음)
scores.every((s) => s >= 60);  // true  — 전부 60 이상
scores.every((s) => s >= 80);  // false — 72, 60 이 있어서 false
```

### 메서드 선택 기준

```
여러 요소 필요        → filter   (배열 반환)
첫 번째 요소만        → find     (요소 반환, undefined 가능)
인덱스 필요           → findIndex(-1 가능)
존재 여부 boolean만   → some / includes
모두 만족하는지       → every
```

---

## 4. reduce — 누적 / 집계

`reduce` 는 배열을 **하나의 값**으로 줄이는 범용 메서드입니다.  
합계뿐 아니라 그룹화, 맵 생성 등 다양한 집계에 사용합니다.

> **비유:** 출퇴근 시간을 매일 기록한 후, 한 달 평균을 구하는 것과 같습니다.  
> 여러 데이터(배열)를 하나의 결과값(단일 값)으로 줄입니다.

```js
// 구조: array.reduce((누산기, 현재값) => 새 누산기, 초기값)

const nums = [1, 2, 3, 4, 5];

// 합계
nums.reduce((acc, n) => acc + n, 0);   // 15
// 초기값 0에서 시작, 각 요소를 더해가며 누적

// 최댓값
nums.reduce((max, n) => n > max ? n : max, -Infinity); // 5

// 객체 배열 합산
products.reduce((acc, p) => acc + p.price * p.qty, 0);
```

### 그룹화 (groupBy 패턴)

카테고리별로 묶는 것처럼, 특정 기준으로 데이터를 그룹화할 때 사용합니다.

```js
const items = [
  { name: '노트북', category: '전자기기' },
  { name: '책상',   category: '가구'     },
  { name: '마우스', category: '전자기기' },
];

const grouped = items.reduce((acc, item) => {
  const key = item.category;
  if (!acc[key]) acc[key] = [];
  acc[key].push(item.name);
  return acc;
}, {});
// { '전자기기': ['노트북', '마우스'], '가구': ['책상'] }
```

### 빈도 카운트

투표 결과 집계, 단어 빈도 분석 등에 사용합니다.

```js
const votes = ['Alice', 'Bob', 'Alice', 'Carol', 'Alice', 'Bob'];

const tally = votes.reduce((acc, name) => {
  acc[name] = (acc[name] ?? 0) + 1;
  return acc;
}, {});
// { Alice: 3, Bob: 2, Carol: 1 }
```

### 배열 → 조회 맵(Lookup Map)

배열을 매번 순회(`find`)하면 느립니다.  
`reduce`로 ID를 키로 하는 객체를 만들면 O(1) 즉시 조회가 가능합니다.

```js
// ID를 키로 O(1) 조회가 가능한 객체를 만드는 패턴
const userMap = users.reduce((acc, u) => {
  acc[u.id] = u;
  return acc;
}, {});

userMap[2]; // { id: 2, name: 'Bob', score: 78 } — 즉시 조회
```

> **O(1) 조회:** 데이터가 1만 개든 100만 개든 같은 속도로 찾을 수 있습니다.  
> `find`를 사용하면 최악의 경우 데이터 전체를 순회해야 합니다.

---

## 5. sort — 정렬

`sort()` 는 **원본 배열을 직접 변경**합니다.  
비교 함수가 없으면 요소를 **문자열로 변환**해 유니코드 순으로 정렬합니다.  
이것이 숫자 정렬 시 발생하는 가장 흔한 함정입니다.

### 숫자 정렬 — 비교 함수 필수

```js
const nums = [10, 5, 80, 100, 2, 25];

// ❌ 비교 함수 없음 → 문자열 정렬 (오류!)
nums.sort();  // [10, 100, 2, 25, 5, 80]
// 왜? 숫자를 문자열로 바꾸면 "100"이 "2"보다 앞에 옵니다 (사전 순으로)

// ✅ 비교 함수 제공
[...nums].sort((a, b) => a - b); // 오름차순: [2, 5, 10, 25, 80, 100]
[...nums].sort((a, b) => b - a); // 내림차순: [100, 80, 25, 10, 5, 2]
```

> **비교 함수 반환값:**  
> - **음수** (`a - b < 0`) → a가 b 앞에
> - **양수** (`a - b > 0`) → b가 a 앞에
> - **0** → 순서 유지

> **`[...nums].sort()`를 쓰는 이유:**  
> `sort()`는 원본 배열을 변경합니다.  
> 원본을 유지하고 싶다면 스프레드로 복사한 후 정렬합니다.

### 문자열 정렬 — localeCompare

```js
const fruits = ['banana', 'Apple', 'cherry'];

// 대소문자 무시 정렬
fruits.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

// 한국어 가나다 순
['바나나', '사과', '딸기'].sort((a, b) => a.localeCompare(b, 'ko'));
```

### 객체 배열 다중 조건 정렬

여러 기준을 순서대로 적용하는 정렬입니다.  
"나이 오름차순, 같으면 점수 내림차순, 같으면 이름 순" 같은 복합 정렬에 사용합니다.

```js
users.sort((a, b) => {
  if (a.age !== b.age)   return a.age - b.age;     // 1순위: 나이 오름차순
  if (a.score !== b.score) return b.score - a.score; // 2순위: 점수 내림차순
  return a.name.localeCompare(b.name);               // 3순위: 이름 사전순
});
```

### toSorted (ES2023) — 원본 유지

원본을 변경하지 않고 정렬된 새 배열을 반환합니다.

```js
const original = [40, 1, 5, 200];

const sorted   = original.toSorted((a, b) => a - b); // 새 배열
const reversed = original.toReversed();               // 새 배열 (역순)

// original 은 변경되지 않음
```

> 브라우저 지원이 최신 환경에 한정되므로, 구형 환경이 필요하다면 `[...arr].sort()`를 사용합니다.

---

## 6. join / split — 배열 ↔ 문자열

배열과 문자열을 서로 변환하는 두 메서드입니다. 항상 쌍으로 기억하세요.

```js
// join: 배열 → 문자열 (구분자로 연결)
['Hello', 'World'].join(' ');  // "Hello World"
['a', 'b', 'c'].join('-');     // "a-b-c"
['a', 'b', 'c'].join('');      // "abc"

// split: 문자열 → 배열 (구분자로 분리)
'Hello World'.split(' ');      // ['Hello', 'World']
'a,b,c'.split(',');            // ['a', 'b', 'c']
'hello'.split('');             // ['h','e','l','l','o']
```

### 실전 활용

```js
// URL 경로 조합
['api', 'v1', 'users', '123'].join('/'); // "api/v1/users/123"

// 쿼리 스트링 생성
Object.entries({ page: 1, limit: 20 })
  .map(([k, v]) => `${k}=${v}`)
  .join('&');
// "page=1&limit=20"

// CSV 행 생성 (엑셀 호환 형식)
['Alice', 28, 92, 'A'].join(','); // "Alice,28,92,A"

// kebab-case → camelCase 변환
'background-color'
  .split('-')
  .map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1))
  .join('');
// "backgroundColor"
```

---

## 7. 메서드 선택 빠른 참조

```
목적                       메서드
────────────────────────────────────────────────
모든 요소 순회 (부수 효과) → forEach
값 변환 (새 배열)          → map
배열 평탄화 후 변환        → flatMap
조건 맞는 요소 (모두)      → filter
조건 맞는 첫 요소          → find
조건 맞는 첫 인덱스        → findIndex
하나라도 조건 충족?        → some
전부 조건 충족?            → every
특정 값 포함?              → includes
배열 → 단일 값 (집계)      → reduce
정렬 (원본 변경)           → sort
정렬 (원본 유지, ES2023)   → toSorted
배열 → 문자열              → join
문자열 → 배열              → split
```

---

## 파일 구조

```
ch06_array_method/
├── foreach.js      ← forEach 기본, vs for...of, 외부 변수 누적, NodeList
├── map.js          ← map 기본, 객체 배열 변환, 체이닝, flatMap
├── filter_find.js  ← filter, find/findIndex, findLast, some/every, includes
├── reduce.js       ← 합계/최대·최솟값, 그룹화, 빈도 카운트, 배열→객체, flat
├── sorts.js        ← sort 함정, 숫자/문자/객체 정렬, 다중 조건, toSorted
├── join.js         ← join 기본, split, split+join 조합, URL/CSV/HTML 생성
└── README.md       ← 이 문서
```

## 실행 방법

```bash
node foreach.js
node map.js
node filter_find.js
node reduce.js
node sorts.js
node join.js
```

---

## 핵심 요약

```
변환이 필요하면   → map  (원본 불변, 같은 길이 새 배열)
추출이 필요하면   → filter (조건 충족 요소만)
하나만 찾으면     → find (없으면 undefined)
집계가 필요하면   → reduce (초기값 항상 명시)
정렬할 때         → sort + 비교 함수 (숫자는 반드시 (a,b)=>a-b)
원본 유지 정렬    → toSorted (ES2023)
배열 ↔ 문자열    → join / split
```
