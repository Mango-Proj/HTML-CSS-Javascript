# Ch09. 자바스크립트 내장 객체와 메서드

## 학습 목표

- `String` 메서드로 문자열을 탐색·추출·변환·정규화할 수 있다
- `Array` 메서드로 배열을 추가·제거·탐색·변환할 수 있다
- `Date` 객체로 날짜·시간을 생성하고 포맷할 수 있다
- `Math` 객체로 올림·내림·반올림과 난수를 다룰 수 있다
- 여러 내장 메서드를 조합하여 실전 데이터 처리 코드를 작성할 수 있다

---

## 내장 객체란?

자바스크립트는 처음부터 자주 쓰이는 기능들을 미리 만들어 제공합니다. 이것이 **내장 객체(Built-in Object)** 입니다.

마치 스마트폰을 사면 기본 앱(계산기, 시계, 달력 등)이 이미 깔려있는 것처럼,  
자바스크립트도 문자열 처리, 숫자 계산, 날짜, 수학 기능을 기본으로 제공합니다.  
설치 없이 바로 쓸 수 있습니다.

---

## 1. String — 문자열 메서드

> 문자열은 **불변(immutable)** — 모든 메서드는 원본을 변경하지 않고 **새 문자열을 반환**합니다.  
> 즉, `str.toUpperCase()` 를 해도 `str` 자체는 바뀌지 않습니다. 반환값을 새 변수에 받아야 합니다.

### 기본 속성·접근

```js
const str = 'Hello, World!';

str.length      // 13 — 문자열 길이 (공백·특수문자 포함)
str.charAt(7)   // 'W' — 해당 인덱스 문자
str[0]          // 'H' — 배열처럼 접근 가능
str.at(-1)      // '!' — 음수 인덱스 (ES2022, 뒤에서 세기)
```

### 대소문자 변환

영어를 다루는 코드에서 가장 많이 쓰는 메서드입니다.  
이메일 주소처럼 대소문자를 구분해야 하는 경우, 일관성 있게 소문자로 변환해서 비교합니다.

```js
'Hello'.toUpperCase()  // 'HELLO'
'Hello'.toLowerCase()  // 'hello'

// 실전 패턴: 입력값 정규화 — 공백 제거 + 소문자 변환
'  User@Example.COM  '.trim().toLowerCase() // 'user@example.com'
```

### 탐색

문자열에서 특정 단어나 문자가 있는지, 어디에 있는지 찾을 때 사용합니다.

```js
const s = 'apple banana apple';

s.indexOf('apple')      // 0  — 첫 번째 위치 (-1: 없음)
s.lastIndexOf('apple')  // 13 — 마지막 위치
s.includes('banana')    // true — 포함 여부 (boolean)
s.startsWith('apple')   // true — 이 문자로 시작하는가?
s.endsWith('apple')     // true — 이 문자로 끝나는가?
```

### 추출

문자열에서 원하는 부분만 잘라낼 때 사용합니다.

```js
const text = 'JavaScript';

text.slice(0, 4)   // 'Java'   — 0번째부터 4번째 전까지
text.slice(4)      // 'Script' — 4번째부터 끝까지
text.slice(-6)     // 'Script' — 뒤에서 6번째부터
```

### 변환·치환

문자열의 특정 부분을 다른 내용으로 바꿉니다.

```js
'cats and cats'.replace('cats', 'dogs')    // 'dogs and cats' — 첫 번째만
'cats and cats'.replaceAll('cats', 'dogs') // 'dogs and dogs' — 전부

'a,b,c'.split(',')   // ['a', 'b', 'c'] — 구분자로 분할해 배열로 반환
'ha'.repeat(3)       // 'hahaha' — 반복 연결
'Hello'.concat(', ', 'World!') // 'Hello, World!' — 이어붙이기
```

### 공백 처리

사용자 입력을 처리할 때 앞뒤 공백을 제거하는 것이 중요합니다.  
"홍길동"과 "홍길동 "(공백 있음)은 컴퓨터가 다른 값으로 인식합니다.

```js
'  hello  '.trim()       // 'hello'       — 양쪽 공백 제거
'  hello  '.trimStart()  // 'hello  '     — 앞쪽만
'  hello  '.trimEnd()    // '  hello'     — 뒤쪽만

'7'.padStart(3, '0')   // '007' — 앞을 채움 (주문번호, 시간 자릿수 맞출 때)
'7'.padEnd(3, '0')     // '700' — 뒤를 채움
```

### 주요 메서드 요약표

| 메서드 | 기능 | 반환 타입 |
|--------|------|---------|
| `length` | 문자열 길이 | `number` |
| `toUpperCase()` / `toLowerCase()` | 대/소문자 변환 | `string` |
| `trim()` / `trimStart()` / `trimEnd()` | 공백 제거 | `string` |
| `slice(s, e)` | 부분 추출 | `string` |
| `replace(a, b)` / `replaceAll(a, b)` | 치환 | `string` |
| `split(sep)` | 분할 → 배열 | `string[]` |
| `indexOf(s)` / `lastIndexOf(s)` | 위치 탐색 | `number` |
| `includes(s)` | 포함 여부 | `boolean` |
| `startsWith(s)` / `endsWith(s)` | 시작/끝 여부 | `boolean` |
| `repeat(n)` | 반복 연결 | `string` |
| `padStart(n, c)` / `padEnd(n, c)` | 문자 채우기 | `string` |
| `charAt(i)` | 인덱스 문자 | `string` |

---

## 2. Array — 배열 메서드

### 추가·제거

배열의 앞과 뒤에서 요소를 추가하거나 제거합니다.

```
배열:  [앞] ← unshift/shift →  [뒤] ← push/pop
```

```js
const arr = ['b', 'c'];

arr.push('d')      // 끝에 추가 → 반환값: 새 length
arr.pop()          // 끝에서 제거 → 반환값: 제거된 요소
arr.unshift('a')   // 앞에 추가 → 반환값: 새 length
arr.shift()        // 앞에서 제거 → 반환값: 제거된 요소
```

### 탐색

배열에서 원하는 값을 찾습니다.

```js
const arr = ['a', 'b', 'c', 'b'];

arr.indexOf('b')      // 1  — 첫 번째 인덱스 (-1: 없음)
arr.lastIndexOf('b')  // 3  — 마지막 인덱스
arr.includes('c')     // true

// 객체 배열 탐색 — 조건 함수로 찾기
users.find(u => u.id === 2)       // 첫 번째 일치 요소
users.findIndex(u => u.id === 2)  // 첫 번째 일치 인덱스
```

### 추출·병합

원본 배열을 변경하지 않고 일부를 잘라내거나 합칩니다.

```js
[1,2,3,4,5].slice(1, 3)     // [2, 3] — 원본 유지, 끝 미포함
[1,2].concat([3,4], [5,6])  // [1,2,3,4,5,6]
[...[1,2], ...[3,4]]        // [1,2,3,4] — 스프레드 (권장)
```

### 변환 (고차 메서드)

배열의 각 요소를 변환하거나 조건에 맞는 것만 추출하거나 하나의 값으로 합칩니다.  
이 세 메서드는 **실무에서 가장 자주 쓰이는 배열 메서드**입니다.

```js
const scores = [60, 80, 90, 55, 75];

// map — 각 요소 변환 → 새 배열 (원본 유지)
scores.map(s => s * 2)              // [120, 160, 180, 110, 150]

// filter — 조건 만족하는 요소만 → 새 배열 (원본 유지)
scores.filter(s => s >= 70)         // [80, 90, 75]

// reduce — 누적 계산 → 단일 값 (원본 유지)
scores.reduce((acc, s) => acc + s, 0) // 360

// forEach — 반환값 없이 순회 (출력, 외부 변수 수정 등 부수 효과 목적)
scores.forEach((s, i) => console.log(i, s))
```

### 정렬·기타

```js
// sort — 원본 변경 (숫자는 비교 함수 필수!)
// 기본 sort()는 숫자를 문자열처럼 사전 순으로 정렬합니다
[10, 5, 100].sort()              // [10, 100, 5] ← 문자열 정렬 (위험!)
[10, 5, 100].sort((a, b) => a-b) // [5, 10, 100] ← 숫자 오름차순

// join — 배열 → 문자열
['a', 'b', 'c'].join('-') // 'a-b-c'

// flat — 중첩 배열 평탄화
[1, [2, [3]]].flat()         // [1, 2, [3]]
[1, [2, [3]]].flat(Infinity) // [1, 2, 3]
```

### 고차 메서드 비교

| 메서드 | 반환값 | 원본 변경 | 주요 용도 |
|--------|--------|---------|---------|
| `forEach` | `undefined` | ✗ | 부수 효과 (출력, 외부 변수 수정) |
| `map` | 새 배열 | ✗ | 각 요소 변환 |
| `filter` | 새 배열 | ✗ | 조건에 맞는 요소 추출 |
| `reduce` | 단일 값 | ✗ | 누적 계산 (합산, 그룹핑 등) |
| `find` | 첫 요소 또는 `undefined` | ✗ | 조건 일치 첫 요소 |
| `sort` | 정렬된 원본 배열 | ✅ | 정렬 |

---

## 3. Date — 날짜·시간 객체

> `Date` 는 내부적으로 **1970-01-01 00:00:00 UTC(유닉스 에포크)** 기준 경과 밀리초를 저장합니다.

날짜와 시간을 다루는 모든 기능을 제공합니다.  
"오늘 날짜를 보여줘", "생일까지 며칠 남았어?", "몇 요일이야?" 같은 기능이 모두 Date 객체로 구현됩니다.

### 생성

```js
new Date()                        // 현재 날짜·시간
new Date('2024-07-04')            // 날짜 문자열
new Date('2024-07-04T14:30:00')   // 날짜 + 시간
new Date(2024, 6, 4)              // 연, 월(0~11), 일 → 2024-07-04
new Date(0)                       // 유닉스 에포크 기준시
```

### Getter 메서드

| 메서드 | 반환 | 범위 | 주의사항 |
|--------|------|------|--------|
| `getFullYear()` | 연도 | 4자리 | |
| `getMonth()` | 월 | **0~11** | ⚠️ +1 해야 실제 월! (0 = 1월) |
| `getDate()` | 일 | 1~31 | |
| `getDay()` | 요일 | **0~6** | 0 = 일요일, 6 = 토요일 |
| `getHours()` | 시 | 0~23 | |
| `getMinutes()` | 분 | 0~59 | |
| `getSeconds()` | 초 | 0~59 | |
| `getTime()` | 밀리초 | 에포크 기준 | 날짜 차이 계산에 활용 |

```js
const d = new Date('2024-07-04T14:30:45');

d.getFullYear() // 2024
d.getMonth()    // 6 ← 7월이지만 0부터 시작하므로 6! (+1 필요)
d.getDate()     // 4
d.getDay()      // 4 (목요일)
```

> **가장 많이 하는 실수**: `getMonth()` 는 0부터 시작합니다.  
> 1월은 0, 7월은 6, 12월은 11입니다. 화면에 표시할 때는 반드시 `+1` 해야 합니다.

### 날짜 차이 계산

`getTime()` 은 에포크(1970-01-01) 기준 경과 밀리초를 반환합니다.  
두 날짜의 밀리초 차이를 구하면 경과 일수를 계산할 수 있습니다.

```js
const start = new Date('2024-01-01');
const end   = new Date('2024-12-31');
const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
// 1000ms × 60s × 60min × 24h = 하루의 밀리초
```

### 포맷팅

```js
const now = new Date();

now.toLocaleDateString('ko-KR')   // '2024. 7. 4.'  (한국식)
now.toLocaleDateString('en-US')   // '7/4/2024'     (미국식)
now.toLocaleTimeString('ko-KR')   // '오후 2:30:45'
now.toISOString()                 // '2024-07-04T05:30:00.000Z' (API 통신 표준)
now.toDateString()                // 'Thu Jul 04 2024'
```

---

## 4. Math — 수학 객체

> `Math` 는 `new` 없이 **정적 메서드**로 바로 사용합니다.

수학 계산에 필요한 기능을 모아 놓은 내장 객체입니다.  
`new Math()` 로 인스턴스를 만드는 것이 아니라 `Math.메서드()` 형태로 바로 사용합니다.

### 수학 상수

```js
Math.PI    // 3.14159265... (원주율)
Math.E     // 2.71828...   (자연로그 밑)
Math.SQRT2 // 1.41421...   (√2)
```

### 올림·내림·반올림

4가지 메서드가 헷갈릴 수 있습니다. 특히 **음수에서의 동작**을 주의하세요.

```js
//          양수(4.7)   음수(-4.3)   의미
Math.ceil   //  5         -4        올림 (더 큰 방향)
Math.floor  //  4         -5        내림 (더 작은 방향)
Math.round  //  5         -4        반올림
Math.trunc  //  4         -4        0 방향으로 버림 (소수점만 제거)
```

- **ceil** (천장): 항상 위로 올립니다. `4.1` → `5`, `-4.9` → `-4`
- **floor** (바닥): 항상 아래로 내립니다. `4.9` → `4`, `-4.1` → `-5`
- **round**: 0.5 이상이면 올림, 미만이면 내림
- **trunc**: 소수점 아래를 무조건 버림. 음수도 0 방향으로

### 최댓값·최솟값·절댓값

```js
Math.max(1, 5, 3)       // 5
Math.min(1, 5, 3)       // 1
Math.max(...[1, 5, 3])  // 5 — 배열은 스프레드로 펼쳐서 전달
Math.abs(-15)           // 15 — 절댓값 (부호 제거)
```

### 거듭제곱·제곱근

```js
Math.pow(2, 10)  // 1024 (2^10) — **연산자와 동일
Math.sqrt(144)   // 12 (√144)
Math.cbrt(27)    // 3 (∛27, 세제곱근)
Math.sign(-5)    // -1 (부호: 양수 1, 음수 -1, 0은 0)
```

### 난수

랜덤한 숫자가 필요할 때 사용합니다. 게임의 주사위, 랜덤 배너 이미지, 퀴즈 문제 순서 섞기 등에 활용됩니다.

```js
Math.random() // 0 이상 1 미만 실수 (0.7382... 같은 값)

// 정수 난수 공식 (min 이상 max 이하)
Math.floor(Math.random() * (max - min + 1)) + min

// 예시
Math.floor(Math.random() * 6) + 1   // 1~6 주사위
Math.floor(Math.random() * 100) + 1 // 1~100
```

### 주요 메서드 요약

| 메서드 | 기능 |
|--------|------|
| `Math.ceil(n)` | 올림 |
| `Math.floor(n)` | 내림 |
| `Math.round(n)` | 반올림 |
| `Math.trunc(n)` | 소수점 버림 (0 방향) |
| `Math.max(...args)` | 최댓값 |
| `Math.min(...args)` | 최솟값 |
| `Math.abs(n)` | 절댓값 |
| `Math.pow(x, y)` | x의 y제곱 |
| `Math.sqrt(n)` | 양의 제곱근 |
| `Math.cbrt(n)` | 세제곱근 |
| `Math.sign(n)` | 부호 반환 |
| `Math.random()` | 0 이상 1 미만 난수 |

---

## 5. 실전 조합 패턴

여러 내장 객체를 함께 사용하면 실용적인 기능을 만들 수 있습니다.

### 문자열 + 배열 — 이메일 정규화

사용자가 입력한 이메일은 공백, 대소문자가 제각각일 수 있습니다.  
처리 전에 정규화(normalize)해서 일관성 있게 만드는 것이 중요합니다.

```js
const rawEmails = ['  Alice@Gmail.com', 'BOB@NAVER.COM  '];

const cleaned = rawEmails
    .map(e => e.trim().toLowerCase())        // 정규화
    .filter(e => e.endsWith('@gmail.com'));   // 특정 도메인만

const ids = cleaned.map(e => e.split('@')[0]); // ['alice']
```

### Math + Array — 성적 통계

```js
const scores = [78, 92, 65, 88, 95];

const avg     = scores.reduce((a, b) => a + b, 0) / scores.length;
const highest = Math.max(...scores); // 95
const lowest  = Math.min(...scores); // 65
const passing = scores.filter(s => s >= 70).length;
```

### Date + String — 날짜 포맷 함수

실무에서 날짜를 "2024-07-04 (목)" 형태로 표시하는 함수입니다.

```js
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatDate(date) {
    const y   = date.getFullYear();
    const m   = String(date.getMonth() + 1).padStart(2, '0'); // '07'
    const d   = String(date.getDate()).padStart(2, '0');       // '04'
    const day = WEEKDAYS[date.getDay()];
    return `${y}-${m}-${d} (${day})`;
}
// '2024-07-04 (목)'
```

---

## 파일 구조

```
ch09_obj_method/
├── script.js  ← 내장 객체 전체 예제 (5개 섹션)
└── README.md  ← 이 문서
```

## 실행 방법

```bash
node script.js
```

---

## 핵심 요약

```
String (불변 — 항상 새 값 반환):
  탐색:  indexOf / lastIndexOf / includes / startsWith / endsWith
  추출:  slice(start, end) — 끝 인덱스 미포함, 음수 가능
  변환:  replace / replaceAll / toUpperCase / toLowerCase
  분할:  split(구분자) → 배열
  정리:  trim / trimStart / trimEnd / padStart / padEnd

Array:
  끝:  push(추가, 반환: length) / pop(제거, 반환: 제거된 값)
  앞:  unshift(추가) / shift(제거)
  변환: map → 새 배열, filter → 조건 배열, reduce → 단일 값
  탐색: indexOf / includes / find / findIndex
  기타: sort(비교함수 필수!) / join / flat

Date:
  생성:  new Date() / new Date('yyyy-mm-dd')
  주의:  getMonth() → 0~11 (+1 해야 실제 월)
         getDay()   → 0 = 일요일, 6 = 토요일
  포맷:  toLocaleDateString / toISOString

Math:
  올림: ceil / 내림: floor / 반올림: round / 소수 버림: trunc
  난수: Math.floor(Math.random() * (max-min+1)) + min
  배열 max/min: Math.max(...arr) / Math.min(...arr)
```
