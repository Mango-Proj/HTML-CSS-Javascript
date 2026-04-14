# Ch07. 자바스크립트 반복문

## 학습 목표

- `for` 문의 초기식·조건식·증감식 구조를 이해하고 배열 순회에 활용할 수 있다
- `break` / `continue` 로 반복 흐름을 제어할 수 있다
- `while` / `do...while` 을 상황에 맞게 선택하여 사용할 수 있다
- `for...of` 로 배열·문자열·Map·Set 등 이터러블을 간결하게 순회할 수 있다
- `for...in` 으로 객체 키를 순회하고, 배열에 쓰면 안 되는 이유를 설명할 수 있다
- 레이블(Label)로 중첩 반복문의 바깥 루프를 제어할 수 있다
- 무한 루프의 원인을 파악하고 방지할 수 있다

---

## 반복문 종류 한눈에 보기

| 반복문 | 주요 용도 | 특징 |
|--------|---------|------|
| `for` | 반복 횟수가 명확할 때 | 초기식·조건식·증감식을 한 줄에 |
| `while` | 조건이 맞는 동안 반복 | 횟수 불명확, 조건 중심 |
| `do...while` | 최소 1회 실행 보장 | 먼저 실행 → 나중에 조건 평가 |
| `for...of` | 이터러블 값 순회 | 배열·문자열·Map·Set 등 |
| `for...in` | 객체 키 순회 | 배열에는 사용 비권장 |

---

## 1. for 문

```
실행 흐름: 초기식 → (조건식 → 코드 → 증감식) × N → 조건식 false → 종료
```

```js
// 기본 구조
for (초기식; 조건식; 증감식) {
    // 반복할 코드
}

// 1부터 5까지
for (let n = 1; n <= 5; n++) {
    console.log(n + '번째 손님, 안녕하세요!');
}

// 역순 카운트다운
for (let i = 5; i >= 1; i--) {
    console.log(i + '...');
}

// 짝수만 (2씩 증가)
for (let i = 2; i <= 10; i += 2) {
    console.log(i);
}
```

### 배열 순회

```js
const fruits = ['사과', '바나나', '체리'];

// 인덱스 + 값
for (let i = 0; i < fruits.length; i++) {
    console.log(`[${i}] ${fruits[i]}`);
}
```

### 중첩 for — 구구단·삼각형

```js
// 구구단 3~4단
for (let dan = 3; dan <= 4; dan++) {
    for (let num = 1; num <= 9; num++) {
        console.log(`${dan} × ${num} = ${dan * num}`);
    }
}

// 별 삼각형
for (let row = 1; row <= 5; row++) {
    let line = '';
    for (let col = 1; col <= row; col++) {
        line += '★ ';
    }
    console.log(line.trim());
}
// ★
// ★ ★
// ★ ★ ★
// ★ ★ ★ ★
// ★ ★ ★ ★ ★
```

---

## 2. break / continue

### break — 반복 즉시 종료

```js
for (let n = 1; n <= 10; n++) {
    if (n === 5) break; // 5에서 루프 탈출
    console.log(n);
}
// 1 2 3 4 출력 후 종료
```

> 배열에서 조건을 만족하는 첫 번째 값을 찾은 뒤 `break` 로 불필요한 탐색을 중단하는 것이 효율적입니다.

### continue — 현재 회차만 건너뜀

```js
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) continue; // 짝수는 건너뜀
    console.log(i); // 홀수만 출력
}
```

| 키워드 | 동작 | 반복 계속 여부 |
|--------|------|--------------|
| `break` | 반복문 즉시 탈출 | ✗ 종료 |
| `continue` | 현재 회차 나머지 건너뜀 | ✓ 계속 |

---

## 3. while 문

```js
// 기본 구조
while (조건식) {
    // 반복할 코드
    // ⚠️ 조건을 false 로 만드는 코드가 반드시 있어야 함
}
```

```js
// 목표 금액에 도달할 때까지 저축
let savings = 0;
let month = 0;
while (savings < 100000) {
    month++;
    savings += 30000;
    console.log(`${month}개월 후: ${savings}원`);
}
```

> 반복 횟수를 미리 알 수 없는 경우 (입력 검증, 파일 읽기, 시뮬레이션 등) `while` 이 적합합니다.

---

## 4. do...while 문

```js
// 기본 구조 — 코드를 먼저 실행, 그 다음 조건 평가
do {
    // 최소 1회 실행
} while (조건식);
```

### while vs do...while 핵심 차이

```js
let val = 10; // 조건(< 5)이 처음부터 false

// while: 조건이 false → 0회 실행
while (val < 5) { /* 실행 안 됨 */ }

// do...while: 조건이 false 여도 → 1회 실행
do {
    // 반드시 한 번은 실행됨
} while (val < 5);
```

```
while:       조건 → 실행 → 조건 → 실행 → ...
do...while:  실행 → 조건 → 실행 → 조건 → ...
```

---

## 5. for...of

```js
// 이터러블의 값을 순서대로 꺼냄
for (const 변수 of 이터러블) {
    // 반복할 코드
}
```

```js
// 배열
for (const color of ['빨강', '초록', '파랑']) {
    console.log(color);
}

// 문자열 — 글자 하나씩
for (const ch of 'Hello') {
    console.log(ch);
}

// 인덱스 포함 — entries()
for (const [index, value] of ['a', 'b', 'c'].entries()) {
    console.log(`[${index}] ${value}`);
}

// Set
const unique = new Set([1, 2, 2, 3, 3]);
for (const n of unique) {
    console.log(n); // 1 2 3 (중복 제거)
}

// Map
const map = new Map([['한국', '서울'], ['일본', '도쿄']]);
for (const [country, capital] of map) {
    console.log(`${country} → ${capital}`);
}
```

### for...of 사용 가능한 이터러블

| 타입 | 꺼내는 값 |
|------|---------|
| `Array` | 각 요소 |
| `String` | 각 문자 |
| `Set` | 고유 값 |
| `Map` | `[key, value]` 쌍 |
| `NodeList` | DOM 노드 |

---

## 6. for...in

```js
// 객체의 열거 가능한 키를 문자열로 꺼냄
for (const key in 객체) {
    console.log(key, 객체[key]);
}
```

```js
const person = { name: '홍길동', age: 28, job: '개발자' };

for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}
// name: 홍길동
// age: 28
// job: 개발자
```

### 상속 속성 제외 — hasOwnProperty

```js
for (const key in person) {
    if (person.hasOwnProperty(key)) { // 직접 정의한 속성만
        console.log(key, person[key]);
    }
}
```

### ⚠️ 배열에 for...in 을 쓰면 안 되는 이유

```js
const arr = ['a', 'b', 'c'];
for (const i in arr) {
    console.log(typeof i); // 'string' ← 인덱스가 문자열!
    // 산술 연산에 쓰면 오동작
}
// 배열은 for / for...of / forEach 를 사용할 것
```

---

## 7. 레이블 (Label)

중첩 반복문에서 `break`/`continue` 의 대상 루프를 명시합니다.

```js
// 레이블 없이 break → 안쪽 루프만 종료
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (j === 1) break; // i 루프는 계속
        console.log(i, j);
    }
}

// 레이블로 바깥 루프 전체 종료
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outer; // outer 레이블 루프 전체 탈출
        }
        console.log(i, j);
    }
}
```

---

## 8. 무한 루프 주의

```js
// ❌ 무한 루프 — 조건 변수 업데이트 누락
let x = 0;
while (x < 10) {
    console.log(x);
    // x++ 없으면 영원히 반복!
}

// ❌ 부동소수점 비교 위험
let f = 0;
while (f !== 1.0) { // 0.1 × 10 은 정확히 1.0 이 아닐 수 있음
    f += 0.1;
}

// ✅ 부동소수점은 범위 비교 사용
while (f < 1.0) {
    f += 0.1;
}

// ✅ 의도적 무한 루프 — 반드시 break 조건 포함
while (true) {
    const result = tryOperation();
    if (result === 'success') break; // 탈출 조건 필수
}
```

---

## 9. 반복문 선택 가이드

```
반복 횟수가 명확하다
  → for 문

횟수 불명확, 조건이 핵심이다
  → while 문

최소 1회 실행이 필요하다 (메뉴, 입력 검증)
  → do...while 문

배열·문자열·Map·Set 값을 순서대로 꺼내고 싶다
  인덱스가 필요 없다  → for...of
  인덱스가 필요하다   → for...of + entries() 또는 for 문

객체 키를 순회하고 싶다
  → for...in (+ hasOwnProperty 안전 패턴)
```

---

## 10. 실전 패턴 요약

```js
// 누적 합산 + 평균
let total = 0;
for (const v of data) total += v;
const avg = total / data.length;

// 최댓값·최솟값
let max = data[0], min = data[0];
for (const v of data) {
    if (v > max) max = v;
    if (v < min) min = v;
}

// 조건 필터링 (합격/불합격 분류)
const passed = [], failed = [];
for (const score of scores) {
    (score >= 70 ? passed : failed).push(score);
}

// 중복 제거
const unique = [...new Set(arr)]; // Set 활용 (간결)

// FizzBuzz
for (let i = 1; i <= 20; i++) {
    if (i % 15 === 0) console.log('FizzBuzz');
    else if (i % 3 === 0) console.log('Fizz');
    else if (i % 5 === 0) console.log('Buzz');
    else console.log(i);
}
```

---

## 파일 구조

```
ch07_loops/
├── loops.js   ← 반복문 전체 예제 (10개 섹션)
└── README.md  ← 이 문서
```

## 실행 방법

```bash
node loops.js
```

---

## 핵심 요약

```
흐름 제어:
  break      — 반복문 즉시 탈출 (더 이상 반복 없음)
  continue   — 현재 회차만 건너뜀 (반복은 계속)
  label:     — 중첩 루프에서 바깥 루프 대상 지정

for 계열:
  for        — 횟수 명확, 인덱스 필요
  for...of   — 값만 필요, 이터러블 순회
  for...in   — 객체 키 순회 (배열엔 비권장)

조건 반복:
  while      — 횟수 불명확, 조건 중심
  do...while — 최소 1회 실행 보장

무한 루프 방지:
  조건 변수 업데이트 확인
  부동소수점은 !== 대신 < / > 범위 비교
  while(true) 에는 반드시 break 조건 포함
```
