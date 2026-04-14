# Ch05. 자바스크립트 조건문 (Conditional Statements)

## 학습 목표

- 비교 연산자(`==` vs `===`)의 차이와 `===` 권장 이유를 설명할 수 있다
- 논리 연산자(`&&`, `||`, `!`)와 단락 평가(Short-circuit)를 이해한다
- `if` / `if...else` / `else if` / 중첩 `if` 를 상황에 맞게 작성할 수 있다
- `switch` 문의 `break` 역할과 fall-through 동작을 이해한다
- 삼항 연산자의 적절한 사용법과 남용 금지 기준을 안다
- `??`(Nullish 병합)와 `?.`(옵셔널 체이닝)의 차이를 설명할 수 있다
- 조기 반환(Guard Clause) 패턴으로 중첩을 줄일 수 있다

---

## 1. 비교 연산자

조건식은 비교 연산자로 만든 `boolean` 값이 판단 기준이 됩니다.

| 연산자 | 의미 | 예시 | 결과 |
|--------|------|------|------|
| `==` | 동등 (타입 변환 후 비교) | `10 == '10'` | `true` |
| `===` | 일치 (타입까지 비교) | `10 === '10'` | `false` |
| `!=` | 부등 (타입 변환 후 비교) | `10 != '10'` | `false` |
| `!==` | 불일치 (타입까지 비교) | `10 !== '10'` | `true` |
| `>` | 초과 | `10 > 5` | `true` |
| `<` | 미만 | `10 < 5` | `false` |
| `>=` | 이상 | `10 >= 10` | `true` |
| `<=` | 이하 | `10 <= 9` | `false` |

### `==` 의 함정 — 항상 `===` 를 사용하세요

```js
0 == false    // true  ← 위험!
'' == false   // true  ← 위험!
null == undefined // true ← 위험!

0 === false   // false ← 안전
'' === false  // false ← 안전
```

---

## 2. 논리 연산자

| 연산자 | 의미 | 결과 |
|--------|------|------|
| `&&` | AND — 양쪽 모두 true | 둘 다 truthy → 오른쪽 값 / 하나라도 falsy → falsy 값 |
| `\|\|` | OR  — 하나라도 true | 왼쪽이 truthy → 왼쪽 값 / 왼쪽이 falsy → 오른쪽 값 |
| `!` | NOT — 반전 | `!true` → `false` |

```js
const score = 85;
const attendance = 90;

score >= 80 && attendance >= 80  // true  — 둘 다 충족
score >= 90 || attendance >= 80  // true  — attendance 충족
!false                           // true
```

### 단락 평가 (Short-circuit Evaluation)

```
&&: 왼쪽이 falsy  → 오른쪽 평가 안 함, 왼쪽 값 반환
||: 왼쪽이 truthy → 오른쪽 평가 안 함, 왼쪽 값 반환
```

```js
// || — 기본값 패턴
const name = userInput || '익명';    // userInput 이 falsy 면 '익명'

// && — 조건부 값 패턴
const label = isAdmin && '[관리자]'; // isAdmin 이 truthy 면 '[관리자]'
```

---

## 3. if 문

```js
if (조건식) {
    // 조건식이 true 일 때만 실행
}
```

```js
const score = 80;

if (score >= 70) {
    console.log('합격!');
}

// 논리 연산자로 조건 결합
if (score >= 80 && absence <= 4) {
    console.log('우수 학생');
}
```

---

## 4. if...else 문

```js
if (조건식) {
    // true 일 때
} else {
    // false 일 때
}
```

```js
const score = 50;

if (score >= 70) {
    console.log('합격');
} else {
    console.log('불합격');
}
// → '불합격'
```

> `if` 와 `else` 중 하나는 **반드시** 실행되고, 둘이 **동시에** 실행되지 않습니다.

---

## 5. else if — 다중 분기

```js
if (조건1) {
    // 조건1 true
} else if (조건2) {
    // 조건1 false, 조건2 true
} else if (조건3) {
    // ...
} else {
    // 모든 조건 false
}
```

```js
const score = 73;

if (score >= 90) {
    console.log('A학점');
} else if (score >= 80) {
    console.log('B학점');
} else if (score >= 70) {
    console.log('C학점');  // ← 실행됨
} else {
    console.log('F학점');
}
```

> **⚠️ 조건 순서 주의**: 범위가 큰 조건을 앞에 두면 이후 조건에 도달하지 못합니다.
>
> ```js
> // ❌ 잘못된 순서
> if (score >= 60) { ... }  // 90점도 여기서 걸림
> else if (score >= 90) { ... }  // 절대 도달 안 함
> ```

### 실전 예시: 배송비 정책

```js
if (amount >= 50000)      console.log('무료 배송');
else if (amount >= 30000) console.log('2,000원');
else if (amount >= 10000) console.log('3,000원');
else                      console.log('5,000원');
```

---

## 6. 중첩 if 문

```js
const score = 85;

if (score >= 70) {
    if (score >= 90) {
        console.log('A학점');
    } else if (score >= 80) {
        console.log('B학점'); // ← 실행됨
    } else {
        console.log('C학점');
    }
}
```

> **중첩은 2단계까지만** 권장합니다. 3단계 이상이면 가독성이 급격히 저하됩니다.  
> `&&` 로 조건을 합치거나 **조기 반환(Guard Clause)** 패턴을 활용하세요.

---

## 7. switch 문

하나의 변수를 여러 **고정 값**과 비교할 때 `if-else if` 보다 가독성이 좋습니다.

```js
switch (표현식) {
    case 값1:
        // 실행 코드
        break;
    case 값2:
        // 실행 코드
        break;
    default:
        // 일치하는 case 없을 때
}
```

```js
const season = 'summer';

switch (season) {
    case 'spring': console.log('딸기');  break;
    case 'summer': console.log('수박');  break; // ← 실행됨
    case 'autumn': console.log('사과');  break;
    case 'winter': console.log('귤');    break;
    default:       console.log('모름');
}
```

### break 와 fall-through

```js
// break 없으면 다음 case 로 계속 실행됨 (fall-through)
switch (level) {
    case 2:
        console.log('level 2'); // ← 실행됨
        // break 없음!
    case 3:
        console.log('level 3'); // ← fall-through 로 함께 실행됨
        break;
    case 4:
        console.log('level 4'); // ← 실행 안 됨
}
```

### 여러 case 묶기

```js
// 동일한 결과를 여러 값에 적용
switch (grade) {
    case 'A+':
    case 'A':
    case 'A-':
        console.log('훌륭합니다!'); // A+, A, A- 모두 여기로
        break;
    case 'B+':
    case 'B':
    case 'B-':
        console.log('잘했습니다!');
        break;
    default:
        console.log('노력이 필요합니다.');
}
```

### if-else if vs switch 선택 기준

```
범위 비교 (>, >=, <, <=)           → if-else if
여러 조건 조합 (&&, ||)            → if-else if
하나의 변수를 고정 값과 비교       → switch (더 간결)
```

---

## 8. 삼항 연산자

```
조건식 ? 참일 때 값 : 거짓일 때 값
```

```js
// if...else 대신 한 줄로
const score = 85;
const result = score >= 70 ? 'Pass' : 'Fail'; // 'Pass'

// 변수 할당
const ticket = age >= 18 ? '성인권' : '청소년권';

// 템플릿 리터럴 안에 삽입
console.log(`등급: ${points >= 1000 ? 'Gold' : 'Silver'}`);
```

### 삼항 vs if-else 선택 기준

```
값을 선택하는 단순한 경우  → 삼항 ✅
복잡한 로직·여러 줄 코드   → if-else ✅
삼항 중첩 (3중 이상)       → 금지 ❌
```

```js
// ❌ 중첩 삼항 — 읽기 어려움
const grade = s >= 90 ? 'A' : s >= 80 ? 'B' : s >= 70 ? 'C' : 'F';

// ✅ else if 로 변환 — 읽기 쉬움
function getGrade(s) {
    if (s >= 90) return 'A';
    if (s >= 80) return 'B';
    if (s >= 70) return 'C';
    return 'F';
}
```

---

## 9. `??` 와 `?.` (ES2020)

### Nullish 병합(`??`) — `null` / `undefined` 일 때만 기본값

```js
const a = 0;
const b = null;

a || 10    // 10  ← 0 이 falsy 라서 (의도치 않을 수 있음)
a ?? 10    // 0   ← null/undefined 아니므로 그대로 유지

b || 10    // 10
b ?? 10    // 10

// 사용자가 0 을 입력한 경우
const score = userInput ?? '미입력'; // 0 도 유효한 값으로 취급
```

| 연산자 | 오른쪽을 반환하는 경우 |
|--------|----------------------|
| `\|\|` | 왼쪽이 **falsy** (0, '', false, null, undefined, NaN) |
| `??` | 왼쪽이 **null 또는 undefined** 만 |

### 옵셔널 체이닝(`?.`) — 중간에 null 이 있어도 에러 없이 undefined

```js
const user = { address: { city: '서울' } };
const guest = null;

// ❌ 기존 방식 — 중간이 null 이면 에러
// guest.address.city  // TypeError!

// ✅ ?. 사용 — undefined 반환
user?.address?.city    // '서울'
guest?.address?.city   // undefined (에러 없음)

// ?? 와 조합
guest?.address?.city ?? '위치 정보 없음' // '위치 정보 없음'

// 메서드 호출
obj.method?.() // method 가 없으면 undefined, 에러 없음
```

---

## 10. 조기 반환 (Guard Clause)

함수 안에서 유효하지 않은 조건을 **먼저 검사하고 일찍 반환**해서 중첩 깊이를 줄입니다.

```js
// ❌ 깊은 중첩
function pay(user, amount) {
    if (user) {
        if (user.isActive) {
            if (amount > 0) {
                console.log('결제 처리');
            }
        }
    }
}

// ✅ 조기 반환 — 같은 동작, 더 읽기 쉬움
function pay(user, amount) {
    if (!user)          return console.log('사용자 없음');
    if (!user.isActive) return console.log('비활성 계정');
    if (amount <= 0)    return console.log('유효하지 않은 금액');

    // 검증 통과 — 핵심 로직
    console.log('결제 처리');
}
```

---

## 파일 구조

```
ch05_conditions/
├── conditions.js  ← 비교·논리 연산자, if/else if/switch, 삼항, ??, ?., Guard Clause
└── README.md      ← 이 문서
```

## 실행 방법

```bash
node conditions.js
```

---

## 핵심 요약

```
비교 연산자:
  항상 === / !== 사용 (== 의 형변환 함정 주의)

논리 연산자:
  &&  — 둘 다 true 일 때 true / 단락: 왼쪽 falsy → 왼쪽 반환
  ||  — 하나라도 true → 오른쪽 반환 / 기본값 패턴에 활용
  !   — boolean 반전

조건문 선택 기준:
  범위·복합 조건                  → if-else if
  고정 값 비교                    → switch (break 필수)
  단순 값 선택                    → 삼항 (중첩 금지)

ES2020 연산자:
  ?? — null/undefined 일 때만 기본값 (0·''·false 는 유지)
  ?. — 중첩 객체 접근 시 null/undefined 에 안전

패턴:
  Guard Clause — 조기 반환으로 중첩 제거, 핵심 로직 강조
```
