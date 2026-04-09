# Ch01. 자바스크립트 시작 — 변수 선언과 스코프

## 학습 목표

- 자바스크립트가 어떤 언어인지 큰 그림을 이해한다
- `var` / `let` / `const` 의 차이를 설명할 수 있다
- 스코프(Scope)와 호이스팅(Hoisting)이 무엇인지 이해한다

---

## 1. 자바스크립트란?

웹 페이지를 **살아 움직이게** 만드는 프로그래밍 언어입니다.

```
HTML  →  웹 페이지의 뼈대 (구조)
CSS   →  웹 페이지의 외형 (디자인)
JS    →  웹 페이지의 동작 (버튼 클릭, 데이터 처리 등)
```

### 주요 특징

| 특징 | 설명 |
|------|------|
| **동적 타입** | 변수 선언 시 타입을 명시하지 않아도 됩니다 |
| **인터프리터** | 코드를 한 줄씩 읽으며 바로 실행합니다 |
| **다재다능** | 브라우저, 서버(Node.js), 앱(React Native) 모두 가능 |
| **높은 접근성** | 브라우저 개발자 도구만으로 바로 실행 가능 |

### 라이브러리 vs 프레임워크

둘 다 다른 사람이 미리 만들어 놓은 코드를 가져다 쓰는 것입니다.

```
라이브러리: "내가 필요할 때 꺼내 쓰는 도구"
  → 개발자가 흐름을 직접 제어
  → 예: jQuery, Lodash

프레임워크: "이미 정해진 틀 안에서 내 코드를 끼워 넣는 것"
  → 프레임워크가 흐름을 제어하고, 개발자는 정해진 방식대로 코딩
  → 예: React, Vue, Angular
```

---

## 2. 변수 선언 — `var` / `let` / `const`

### 비교표

| 구분 | `var` | `let` | `const` |
|------|-------|-------|---------|
| 등장 시기 | ES1 (초창기) | ES6 (2015) | ES6 (2015) |
| 스코프 | 함수 스코프 | 블록 스코프 | 블록 스코프 |
| 중복 선언 | ✅ 가능 (위험) | ❌ 불가 | ❌ 불가 |
| 재할당 | ✅ 가능 | ✅ 가능 | ❌ 불가 |
| 호이스팅 | `undefined` 반환 | TDZ → 에러 | TDZ → 에러 |
| 사용 권장 | ❌ 사용 금지 | ✅ | ✅ |

### var의 문제점 (`var.js`)

```js
// ❌ 문제 1: 중복 선언 허용 → 실수를 잡아주지 못함
var userName = 'John';
var userName = 'Doe'; // 에러 없이 덮어씀

// ❌ 문제 2: 블록 스코프 없음 → if/for 블록 탈출
if (true) {
  var age = 20;
}
console.log(age); // 20 — 블록 밖에서도 접근됨!

// ❌ 문제 3: 호이스팅으로 undefined 반환
console.log(score); // undefined (에러 아님)
var score = 100;
```

### let과 const 사용법 (`let_const.js`)

```js
// ✅ let: 재할당 가능, 중복 선언 불가
let count = 0;
count = 1; // OK
// let count = 2; // SyntaxError!

// ✅ const: 재할당 불가 (상수)
const PI = 3.14;
// PI = 4; // TypeError!

// ✅ const + 객체: 내용 변경은 가능
const user = { name: 'Kim' };
user.name = 'Lee'; // OK — 속성 변경은 가능
// user = {};        // TypeError — 객체 자체 교체는 불가
```

### 선택 기준

```
1순위: const  →  기본적으로 const 사용 (불변 의도 명시)
2순위: let    →  값이 바뀌어야 할 때만 let 사용
사용 금지: var  →  구형 코드에서만 볼 것, 직접 쓰지 않기
```

---

## 3. 스코프 (Scope)

변수가 **어디서 접근 가능한지**의 유효 범위입니다.

```
전역 스코프: 코드 어디서든 접근 가능
│
└── 함수 스코프: 함수 내부에서만 접근 가능 (var)
│       function fn() {
│         var x = 1;  ← 함수 밖에서 접근 불가
│       }
│
└── 블록 스코프: {} 블록 내부에서만 접근 가능 (let, const)
        if (true) {
          let y = 2;  ← 블록 밖에서 접근 불가
          const z = 3;
        }
```

### 스코프 체인

안쪽에서 바깥쪽 변수에는 접근할 수 있습니다. 반대는 불가합니다.

```js
const outer = '바깥';

function fn() {
  const inner = '안쪽';
  console.log(outer); // OK — 바깥 변수 접근 가능
}

// console.log(inner); // ReferenceError — 안쪽 변수는 밖에서 접근 불가
```

---

## 4. 호이스팅 (Hoisting)

자바스크립트 엔진이 코드를 실행하기 **전에**, 변수·함수 선언을 스코프 맨 위로 **끌어올리는** 동작입니다.

> 실제 코드가 이동하는 게 아니라, 엔진이 그렇게 처리한다는 의미입니다.

### 함수 선언문 — 전체가 호이스팅

```js
sayHello(); // ← 선언 전인데 정상 작동!

function sayHello() {
  console.log('Hello!');
}
```

### var — 선언만 호이스팅, 값은 undefined

```js
// 실제 동작 순서:
// var score;               ← 선언이 맨 위로 끌어올려짐 (호이스팅)
// console.log(score);      → undefined
// score = 100;             ← 초기화는 제자리

console.log(score); // undefined (에러 아님!)
var score = 100;
console.log(score); // 100
```

### let / const — TDZ (Temporal Dead Zone)

선언 전 구간에서 접근하면 즉시 에러가 발생합니다.

```
코드 시작
    │
    ▼  ← TDZ 시작 (호이스팅은 되었지만 접근 불가)
    │  console.log(city); → ReferenceError!
    │
    ▼  let city = 'Seoul'; ← 선언문 도달 → TDZ 종료
    │
    ▼  console.log(city); → 'Seoul' (정상 접근)
```

### 함수 표현식 — 변수 호이스팅 규칙을 따름

```js
// printBye(); // TypeError (var이므로 선언 전엔 undefined, 호출 불가)
var printBye = function () { console.log('Bye!'); };

// greetUser(); // ReferenceError (const이므로 TDZ)
const greetUser = function () { console.log('안녕!'); };
```

### 호이스팅 요약

| 선언 방식 | 호이스팅 | 선언 전 접근 |
|----------|---------|------------|
| `var` 변수 | O | `undefined` |
| `let` 변수 | O (TDZ) | `ReferenceError` |
| `const` 변수 | O (TDZ) | `ReferenceError` |
| 함수 선언문 | O (전체) | 정상 작동 |
| 함수 표현식 (`var`) | O | `TypeError` |
| 함수 표현식 (`const`) | O (TDZ) | `ReferenceError` |

---

## 5. 파일 구조

```
ch01_start/
├── var.js         ← var의 문제점 (중복 선언, 블록 탈출, 호이스팅)
├── let_const.js   ← let/const 특징 (블록 스코프, TDZ, const+객체)
├── hoisting.js    ← 호이스팅 4가지 케이스 상세 정리
└── README.md      ← 이 문서
```

## 6. 실행 방법

```bash
# Node.js가 설치되어 있다면 터미널에서 실행
node var.js
node let_const.js
node hoisting.js
```

또는 브라우저 개발자 도구(F12) → Console 탭에 코드를 직접 붙여넣어 실행할 수 있습니다.

---

## 핵심 요약

> **"기본은 `const`, 바뀌면 `let`, `var`는 쓰지 않는다"**
>
> 호이스팅 버그를 피하려면: 변수와 함수는 항상 **사용 전에 선언**하는 습관을 들인다.
