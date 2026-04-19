# Stage 01. 자바스크립트 기초 (JavaScript Fundamentals)

이 폴더는 자바스크립트를 처음 배우는 분을 위한 기초 학습 자료입니다.  
프로그래밍 경험이 없어도 이해할 수 있도록 각 개념을 단계적으로 다룹니다.

---

## 학습 순서

```
ch01 → ch02 → ch03 → ch04 → ch05 → ch06 → ch07 → ch08 → ch09
자바스크립트란?  변수  코딩규칙  자료형  조건문  객체·배열  반복문  함수  내장객체
```

앞 챕터의 개념이 뒤 챕터에서 계속 활용되므로, **순서대로 학습하는 것을 권장**합니다.

---

## 챕터별 안내

---

### Ch01. 자바스크립트란?
**📁 `ch01_what_is_js/`**

자바스크립트가 무엇인지, 어디에 쓰이는지부터 시작합니다.

우리가 매일 쓰는 쇼핑몰 장바구니, SNS 좋아요 버튼, 검색 자동완성이 모두 자바스크립트로 만들어집니다.  
이 챕터에서는 자바스크립트의 역할을 이해하고, HTML 파일에 연결해 실행하는 방법을 배웁니다.

**핵심 내용**
- HTML / CSS / JavaScript 의 역할 구분 (구조 / 디자인 / 동작)
- 브라우저 콘솔 사용 방법 (`console.log`, `alert`, `confirm`, `prompt`)
- DOM — 자바스크립트가 HTML 요소를 읽고 바꾸는 방법
- `<script>` 태그 위치와 `defer` / `async` 속성

**실행 방법**: `index.html` 파일을 브라우저에서 열기

---

### Ch02. 변수와 상수
**📁 `ch02_variables/`**

데이터를 저장하는 방법을 배웁니다.

변수는 데이터에 이름표를 붙이는 것입니다. `userName = '홍길동'` 처럼 값에 이름을 붙이면  
코드 어디서든 그 이름으로 값을 꺼내 쓸 수 있습니다.  
`var`, `let`, `const` 세 가지 선언 방식의 차이와 올바른 사용 기준을 배웁니다.

**핵심 내용**
- `var` 의 문제점 (재선언, 함수 스코프, 호이스팅)
- `let` (재할당 가능) vs `const` (재할당 불가) — 기본은 `const`
- 변수 명명 규칙 (camelCase, PascalCase, SCREAMING_SNAKE_CASE)
- 7가지 기본 데이터 타입 (`number`, `string`, `boolean`, `undefined`, `null`, `bigint`, `symbol`)
- `typeof` 연산자로 타입 확인
- 템플릿 리터럴 (`` `${변수}` ``)

**실행 방법**: `node variables.js`

---

### Ch03. 코딩 컨벤션
**📁 `ch03_rules/`**

혼자가 아닌 팀과 함께, 또는 미래의 나를 위해 읽기 좋은 코드를 작성하는 규칙을 배웁니다.

기능적으로 맞는 코드와 좋은 코드는 다릅니다. 좋은 코드는 동작하면서도 읽기 쉽고 유지보수가 쉽습니다.  
이 챕터에서는 주석 작성법, 변수 네이밍, 들여쓰기, 매직 넘버 처리 등을 다룹니다.

**핵심 내용**
- 주석의 3가지 종류 (`//`, `/* */`, `/** JSDoc */`)
- 좋은 주석 vs 나쁜 주석 (코드 반복 X, 이유·맥락 O)
- 명확한 변수 이름 짓기
- 세미콜론 규칙과 ASI(자동 삽입) 함정
- 들여쓰기, 공백, 빈 줄 규칙
- 매직 넘버를 상수로 교체하는 습관
- Prettier / ESLint 같은 자동화 도구 소개

**실행 방법**: `node conventions.js`

---

### Ch04. 자료형 (Data Types)
**📁 `ch04_types/`**

자바스크립트에서 다룰 수 있는 값의 종류를 깊이 있게 이해합니다.

숫자, 문자열, 참/거짓뿐 아니라 '값이 없음'을 표현하는 `undefined`, `null` 의 차이,  
그리고 객체·배열이 기본 타입과 어떻게 다르게 동작하는지(메모리 관점)를 배웁니다.

**핵심 내용**
- 기본 타입 7가지 vs 참조 타입 (저장·복사 방식의 차이)
- `NaN`, `Infinity` 특수값 처리
- Truthy / Falsy 값 목록 (`'0'`, `[]`, `{}` 는 Truthy!)
- `undefined` (자동) vs `null` (의도적)
- `typeof` 의 예외 케이스 (`typeof null` = `'object'`)
- 참조 타입 복사 시 주소 공유 문제와 스프레드(`...`)를 이용한 해결

**실행 방법**: `node types.js`

---

### Ch05. 조건문 (Conditional Statements)
**📁 `ch05_conditions/`**

상황에 따라 다른 코드를 실행하는 방법을 배웁니다.

"로그인 상태면 마이페이지, 아니면 로그인 버튼을 보여라"처럼 조건에 따라 분기하는 것이 조건문입니다.  
`if`, `else if`, `switch`, 삼항 연산자 등 다양한 방법과 사용 기준을 배웁니다.

**핵심 내용**
- `==` vs `===` — 항상 `===` 사용 (타입 변환 함정 주의)
- 논리 연산자 `&&`, `||`, `!` 와 단락 평가(Short-circuit)
- `if` / `else if` / `switch` 선택 기준
- 삼항 연산자 `조건 ? 참 : 거짓` (단순 값 선택에만, 중첩 금지)
- `??` (Nullish 병합) — `0`, `''` 은 유지하고 `null/undefined` 만 기본값 적용
- `?.` (옵셔널 체이닝) — 중첩 객체 접근 시 에러 방지
- Guard Clause — 조기 반환으로 중첩 제거

**실행 방법**: `node conditions.js`

---

### Ch06. 객체와 배열
**📁 `ch06_array/`**

복잡한 데이터를 구조적으로 다루는 방법을 배웁니다.

- **객체(Object)**: 이름(key)과 값(value)의 쌍으로 구성된 데이터 묶음. 사람 프로필, 상품 정보처럼 여러 속성을 하나로 묶을 때 사용
- **배열(Array)**: 순서가 있는 데이터 목록. 장바구니 상품 목록, 검색 결과처럼 같은 종류의 데이터 여러 개를 다룰 때 사용

**핵심 내용**
- 객체 생성, 속성 접근(점·대괄호), 추가·수정·삭제
- `in` / `hasOwnProperty` 로 속성 존재 확인
- `Object.keys()` / `values()` / `entries()` 로 객체 순회
- 배열 인덱스(0부터 시작), `length`
- `push` / `pop` / `unshift` / `shift` / `splice`
- `slice` / `concat` / 스프레드로 추출·병합·복사
- `sort` (숫자 정렬 시 비교 함수 필수!) / `reverse` / `join` / `split`
- 배열 구조 분해로 변수 간결 할당

**실행 방법**: `node objects.js` / `node arrays.js`

---

### Ch07. 반복문 (Loop Statements)
**📁 `ch07_loops/`**

같은 작업을 여러 번 반복하는 방법을 배웁니다.

"100명에게 메시지를 보내라"를 코드 100줄 대신 반복문 3줄로 처리합니다.  
상황에 맞는 반복문을 선택하고, 반복을 중간에 제어하는 방법을 배웁니다.

**핵심 내용**
- `for` — 반복 횟수가 명확할 때 (초기식·조건식·증감식)
- `break` — 반복 즉시 종료 / `continue` — 현재 회차 건너뜀
- `while` — 횟수 불명확, 조건 기반 반복
- `do...while` — 최소 1회 실행 보장 (조건이 처음부터 false 여도)
- `for...of` — 배열·문자열·Map·Set 값 순회 (가장 많이 쓰임)
- `for...in` — 객체 키 순회 (배열에는 비권장)
- 레이블로 중첩 반복문의 바깥 루프 제어
- 무한 루프 방지 패턴

**실행 방법**: `node loops.js`

---

### Ch08. 함수 (Functions)
**📁 `ch08_methods/`**

코드를 재사용 가능한 단위로 묶는 방법을 배웁니다.

함수는 코드의 기본 단위입니다. 한 번 작성한 기능을 이름으로 호출해 재사용하고,  
입력값에 따라 다른 결과를 돌려주는 방법을 배웁니다.  
자바스크립트의 함수는 숫자나 문자열처럼 변수에 담거나 다른 함수에 전달할 수 있는 특별한 존재입니다.

**핵심 내용**
- 함수 선언식 — `function` 키워드, 호이스팅 O
- `return` 의 두 역할: 값 반환 + 함수 즉시 종료
- 기본값 매개변수 `(a = '기본값')`
- 나머지 매개변수 `(...rest)` — 몇 개든 배열로 받기
- 함수 표현식 `const f = function() {}`
- 화살표 함수 `const f = () => {}` — 간결한 콜백 작성
- 스코프 (전역 / 지역 / 블록) — 변수 접근 가능 범위
- 콜백 함수 — 다른 함수에 인수로 전달되는 함수

**실행 방법**: `node methods.js`

---

### Ch09. 내장 객체와 메서드
**📁 `ch09_obj_method/`**

자바스크립트가 기본으로 제공하는 도구들을 활용합니다.

설치 없이 바로 쓸 수 있는 4가지 핵심 내장 객체를 다룹니다.  
실무에서 문자열 처리, 데이터 변환, 날짜 표시, 수학 계산에 가장 자주 쓰이는 메서드들입니다.

**핵심 내용**
- **String**: `trim`, `slice`, `replace`, `split`, `includes`, `indexOf` 등 문자열 가공
- **Array**: `map`, `filter`, `reduce`, `sort`, `find` 등 데이터 변환
- **Date**: `getFullYear/Month/Date/Day` 로 날짜 분해, 날짜 차이 계산, 포맷팅
- **Math**: `ceil/floor/round/trunc`, `max/min/abs`, `random` 난수 생성

**실행 방법**: `node script.js`

---

## 전체 파일 구조

```
stage01_start/
│
├── ch01_what_is_js/
│   ├── index.html     ← HTML + JS 연결 데모
│   ├── script.js      ← console, DOM, 이벤트 예제
│   └── README.md
│
├── ch02_variables/
│   ├── variables.js   ← var/let/const, 타입, 템플릿 리터럴
│   └── README.md
│
├── ch03_rules/
│   ├── conventions.js ← 주석, 네이밍, 세미콜론, 매직 넘버
│   └── README.md
│
├── ch04_types/
│   ├── types.js       ← 기본 타입 7가지, 참조 타입, 메모리 모델
│   └── README.md
│
├── ch05_conditions/
│   ├── conditions.js  ← if/switch/삼항/??.?./ Guard Clause
│   └── README.md
│
├── ch06_array/
│   ├── objects.js     ← 객체 생성·접근·메서드
│   ├── arrays.js      ← 배열 조작·탐색·구조분해
│   └── README.md
│
├── ch07_loops/
│   ├── loops.js       ← for/while/for...of/for...in/레이블
│   └── README.md
│
├── ch08_methods/
│   ├── methods.js     ← 함수 선언·반환·스코프·콜백·화살표함수
│   └── README.md
│
├── ch09_obj_method/
│   ├── script.js      ← String/Array/Date/Math 내장 객체
│   └── README.md
│
└── README.md          ← 이 문서
```

---

## 개발 환경 설정

### Node.js 설치 확인

`ch02` 이후 챕터의 `.js` 파일은 `node` 명령으로 실행합니다.

```bash
# Node.js 설치 여부 확인
node --version   # v18.0.0 처럼 버전이 나오면 설치 완료

# Node.js 가 없다면 https://nodejs.org 에서 LTS 버전 설치
```

### VS Code 권장 확장

| 확장 | 역할 |
|------|------|
| **Live Server** | HTML 파일을 실시간으로 브라우저에서 미리보기 (ch01 필수) |
| **Prettier** | 저장할 때마다 코드 자동 포맷팅 |
| **ESLint** | 잠재적 오류 실시간 감지 |

---

## 학습 팁

### 코드는 직접 입력하세요

복사·붙여넣기보다 직접 타이핑하면 기억에 훨씬 잘 남습니다.  
오타가 나도 괜찮습니다. 에러 메시지를 읽고 수정하는 과정이 실력이 됩니다.

### 콘솔을 자주 활용하세요

코드를 실행하면서 중간중간 `console.log()` 로 값을 찍어보세요.  
"이 시점에 변수가 어떤 값을 가지고 있지?" 확인하는 습관이 디버깅 능력을 키웁니다.

### 공식 문서를 참고하세요

- **MDN Web Docs** (developer.mozilla.org) — 자바스크립트 공식 레퍼런스
- 메서드 사용법이 헷갈릴 때 MDN 에서 검색하면 예제와 함께 정확한 설명을 볼 수 있습니다.

### 에러를 두려워하지 마세요

에러 메시지는 문제가 어디 있는지 알려주는 친절한 안내입니다.  
메시지를 읽고, 해당 줄 번호를 확인하고, 모르면 에러 메시지를 그대로 검색해 보세요.

---

## 챕터별 핵심 키워드

| 챕터 | 핵심 키워드 |
|------|------------|
| Ch01 | `script` 태그, DOM, `console.log`, `alert`, `addEventListener` |
| Ch02 | `let`, `const`, `var`, 스코프, `typeof`, 템플릿 리터럴 |
| Ch03 | 주석, 네이밍, 세미콜론, ASI, 매직 넘버, Prettier |
| Ch04 | 기본 타입, 참조 타입, Falsy, `null` vs `undefined`, 얕은 복사 |
| Ch05 | `===`, `&&`/`\|\|`, `if...else`, `switch`, 삼항, `??`, `?.`, Guard Clause |
| Ch06 | 객체 리터럴, 점 표기법, `push`/`pop`, `map`/`filter`, 구조 분해 |
| Ch07 | `for`, `while`, `for...of`, `break`/`continue`, 무한 루프 |
| Ch08 | 함수 선언식, `return`, 기본값 매개변수, 화살표 함수, 콜백, 스코프 |
| Ch09 | `String.trim/slice/split`, `Array.map/filter/reduce`, `Date`, `Math.random` |
