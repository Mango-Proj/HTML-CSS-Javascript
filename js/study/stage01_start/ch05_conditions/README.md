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

## 조건문이란?

우리는 매일 수많은 조건 판단을 합니다.  
"비가 오면 우산을 챙기고, 그렇지 않으면 그냥 나간다."  
"점수가 90점 이상이면 A, 80점 이상이면 B, ..."

조건문은 이런 **조건에 따라 다른 코드를 실행**하는 구문입니다.  
웹 페이지에서 "로그인한 사람에게는 마이페이지를 보여주고, 아닌 경우 로그인 버튼을 보여주는" 기능이 조건문으로 구현됩니다.

---

## 1. 비교 연산자

조건식은 비교 연산자로 만든 `boolean` 값이 판단 기준이 됩니다.  
두 값이 "같은지", "큰지", "작은지" 비교하는 데 사용합니다.

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

`==` 는 비교 전에 타입을 자동으로 맞춰서 비교합니다. 이 타입 변환이 예상치 못한 결과를 만들어냅니다.  
`===` 는 타입까지 포함해 정확히 비교합니다. **항상 `===` 를 사용하는 것이 안전합니다.**

```js
0 == false    // true  ← 0과 false가 같다고? 위험!
'' == false   // true  ← 빈 문자열과 false가 같다고? 위험!
null == undefined // true ← 위험!

0 === false   // false ← 숫자 0과 boolean false는 다름 (안전)
'' === false  // false ← 안전
```

---

## 2. 논리 연산자

여러 조건을 조합하거나 반전시킬 때 사용합니다.

| 연산자 | 의미 | 결과 |
|--------|------|------|
| `&&` | AND — 양쪽 모두 true | 둘 다 truthy → 오른쪽 값 / 하나라도 falsy → falsy 값 |
| `\|\|` | OR  — 하나라도 true | 왼쪽이 truthy → 왼쪽 값 / 왼쪽이 falsy → 오른쪽 값 |
| `!` | NOT — 반전 | `!true` → `false` |

```js
const score = 85;
const attendance = 90;

score >= 80 && attendance >= 80  // true  — 둘 다 충족 (AND)
score >= 90 || attendance >= 80  // true  — 하나라도 충족 (OR)
!false                           // true  — 반전 (NOT)
```

### 단락 평가 (Short-circuit Evaluation)

논리 연산자는 결과가 이미 결정되면 **오른쪽을 평가하지 않고 멈춥니다.**  
이 특성을 활용해 간결한 코드를 작성할 수 있습니다.

```
&&: 왼쪽이 falsy  → 오른쪽 평가 안 함, 왼쪽 값 반환
||: 왼쪽이 truthy → 오른쪽 평가 안 함, 왼쪽 값 반환
```

```js
// || — 기본값 패턴: 왼쪽이 비어있으면 오른쪽 기본값 사용
const name = userInput || '익명';    // userInput 이 falsy 면 '익명'

// && — 조건부 값 패턴: 왼쪽이 참일 때만 오른쪽 실행
const label = isAdmin && '[관리자]'; // isAdmin 이 truthy 면 '[관리자]'
```

---

## 3. if 문

가장 기본적인 조건문입니다. 조건이 `true` 일 때만 블록 안의 코드를 실행합니다.

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

두 가지 경우 중 하나를 선택해야 할 때 사용합니다.  
"로그인 상태면 마이페이지, 아니면 로그인 버튼"처럼 **둘 중 하나만** 실행됩니다.

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

세 가지 이상의 경우를 순서대로 검사할 때 사용합니다.  
성적 등급처럼 여러 구간으로 나누는 상황에 적합합니다.

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

> **⚠️ 조건 순서 주의**: 범위가 큰 조건을 앞에 두면 이후 조건에 절대 도달하지 못합니다.
>
> ```js
> // ❌ 잘못된 순서 — 90점도 첫 번째 조건에서 걸림
> if (score >= 60) { ... }  // 60점 이상이면 모두 여기서 끝
> else if (score >= 90) { ... }  // 절대 실행 안 됨
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

`if` 안에 또 `if` 를 쓰는 구조입니다. 조건이 계층적으로 연결될 때 사용합니다.

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

> **중첩은 2단계까지만** 권장합니다. 3단계 이상이 되면 코드가 피라미드처럼 쌓여 읽기 어려워집니다.  
> `&&` 로 조건을 합치거나 **조기 반환(Guard Clause)** 패턴으로 해결하세요.

---

## 7. switch 문

하나의 변수를 여러 **고정 값**과 비교할 때 `if-else if` 보다 가독성이 좋습니다.  
메뉴 선택, 요일별 처리, 상태 코드 분기처럼 **정해진 값 목록**에서 고를 때 적합합니다.

```js
switch (표현식) {
    case 값1:
        // 실행 코드
        break;       // ← 반드시 break! 없으면 다음 case 로 계속 실행됨
    case 값2:
        // 실행 코드
        break;
    default:
        // 일치하는 case 없을 때 (else 역할)
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

`break` 를 쓰지 않으면 일치한 `case` 아래의 코드가 모두 실행됩니다. 이를 **fall-through** 라고 합니다.  
의도치 않은 경우에는 버그가 되므로, 항상 각 `case` 끝에 `break` 를 써야 합니다.

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

여러 값에 대해 같은 결과를 낼 때, fall-through 를 **의도적으로** 활용할 수 있습니다.

```js
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

`if...else` 를 한 줄로 줄이는 표현입니다. **값을 선택**할 때 특히 유용합니다.

```
조건식 ? 참일 때 값 : 거짓일 때 값
```

```js
// if...else 대신 한 줄로
const score = 85;
const result = score >= 70 ? 'Pass' : 'Fail'; // 'Pass'

// 변수 할당
const ticket = age >= 18 ? '성인권' : '청소년권';

// 템플릿 리터럴 안에 직접 삽입
console.log(`등급: ${points >= 1000 ? 'Gold' : 'Silver'}`);
```

### 삼항 vs if-else 선택 기준

```
값을 선택하는 단순한 경우  → 삼항 ✅
복잡한 로직·여러 줄 코드   → if-else ✅
삼항 중첩 (3중 이상)       → 금지 ❌ (읽기 너무 어려워짐)
```

```js
// ❌ 중첩 삼항 — 읽기 어려움
const grade = s >= 90 ? 'A' : s >= 80 ? 'B' : s >= 70 ? 'C' : 'F';

// ✅ else if 로 변환 — 훨씬 읽기 쉬움
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

`||` 와 비슷하지만, `||` 은 0이나 빈 문자열도 falsy 로 취급해 기본값을 반환합니다.  
`??` 는 **null 또는 undefined 일 때만** 기본값을 반환해서 `0`, `''`, `false` 같은 유효한 값을 지킵니다.

```js
const a = 0;
const b = null;

a || 10    // 10  ← 0 이 falsy 라서 기본값이 됨 (원하지 않을 수 있음)
a ?? 10    // 0   ← 0 은 null/undefined 아니므로 0 그대로 유지

b || 10    // 10
b ?? 10    // 10

// 사용자가 점수 0을 입력한 경우에도 '미입력'이 되지 않음
const score = userInput ?? '미입력'; // userInput 이 null/undefined 일 때만 '미입력'
```

| 연산자 | 오른쪽을 반환하는 경우 |
|--------|----------------------|
| `\|\|` | 왼쪽이 **falsy** (0, '', false, null, undefined, NaN) |
| `??` | 왼쪽이 **null 또는 undefined** 만 |

### 옵셔널 체이닝(`?.`) — 중간에 null 이 있어도 에러 없이 undefined

깊이 중첩된 객체에 접근할 때, 중간 단계가 `null` 이면 에러가 납니다.  
`?.` 를 쓰면 중간이 `null` 이어도 에러 없이 `undefined` 를 반환합니다.

```js
const user = { address: { city: '서울' } };
const guest = null;

// ❌ 기존 방식 — 중간이 null 이면 TypeError
// guest.address.city  // TypeError: Cannot read properties of null

// ✅ ?. 사용 — undefined 반환 (에러 없음)
user?.address?.city    // '서울'
guest?.address?.city   // undefined

// ?? 와 조합 — "없으면 기본값" 패턴
guest?.address?.city ?? '위치 정보 없음' // '위치 정보 없음'

// 메서드 호출에도 사용 가능
obj.method?.() // method 가 없으면 undefined, 에러 없음
```

---

## 10. 조기 반환 (Guard Clause)

함수 안에서 유효하지 않은 조건을 **먼저 검사하고 일찍 반환**해서 중첩 깊이를 줄이는 패턴입니다.

깊게 중첩된 코드는 "오른쪽으로 흘러가는" 형태가 되어 읽기 어렵습니다.  
Guard Clause 는 "이 조건이 아니면 일찍 끝내버리고" 나머지 핵심 로직을 평평하게 작성합니다.

```js
// ❌ 깊은 중첩 — 피라미드 구조, 핵심 로직이 안쪽에 묻힘
function pay(user, amount) {
    if (user) {
        if (user.isActive) {
            if (amount > 0) {
                console.log('결제 처리'); // 진짜 핵심이 여기에 묻힘
            }
        }
    }
}

// ✅ 조기 반환 — 같은 동작, 핵심 로직이 평평하게 드러남
function pay(user, amount) {
    if (!user)          return console.log('사용자 없음');   // 실패 조건을 먼저 처리
    if (!user.isActive) return console.log('비활성 계정');
    if (amount <= 0)    return console.log('유효하지 않은 금액');

    // 모든 검증 통과 → 핵심 로직
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
  범위·복합 조건        → if-else if
  고정 값 비교          → switch (break 필수!)
  단순 값 선택          → 삼항 (중첩 금지)

ES2020 연산자:
  ?? — null/undefined 일 때만 기본값 (0·''·false 는 유지)
  ?. — 중첩 객체 접근 시 null/undefined 에 안전

패턴:
  Guard Clause — 유효하지 않은 조건 먼저 처리 후 반환
               → 중첩 제거, 핵심 로직을 읽기 쉽게 강조
```
