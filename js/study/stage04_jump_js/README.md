# 🚀 Stage 04 — Jump JS (JavaScript 심화)

> JavaScript 기본 문법을 넘어, 실무에서 자주 쓰이는 심화 개념들을 학습합니다.  
> 각 챕터는 독립적이지만, ch01 → ch06 순서로 학습하는 것을 권장합니다.

---

## 이 폴더에서 배우는 것

stage01에서 기초 문법을 배웠다면, 이 폴더는 **"왜 이렇게 쓰는가"** 를 배웁니다.

- **왜** `var` 대신 `const`/`let`을 쓰는가? (ch01)
- **왜** 객체 복사가 생각대로 안 되는가? (ch02)
- **왜** `Set`이 배열보다 효율적인 경우가 있는가? (ch03)
- **왜** getter/setter가 유용한가? (ch04)
- **왜** 클로저가 중요한가? (ch05)
- **왜** `sort()`에 비교 함수를 넣어야 하는가? (ch06)

이 질문들에 답할 수 있게 되면, 더 안전하고 읽기 좋은 코드를 작성할 수 있습니다.

---

## 학습 순서

```
ch01_start     →  ch02_type     →  ch03_data_search
  변수·스코프       타입·복사·논리       자료구조·순회
      │
      ↓
ch04_object    →  ch05_method   →  ch06_array_method
  객체 심화         함수·클로저           배열 메서드
```

---

## 챕터별 안내

### ch01 — 자바스크립트 시작 (변수 선언과 스코프)

**한 줄 요약:** `var`가 왜 위험한지, `const`/`let`의 차이는 무엇인지, 호이스팅이 무엇인지 이해한다

**이것을 배우면 할 수 있는 것:**
- 변수가 왜 예상치 못하게 변하는지 이해한다
- 스코프를 의식해서 변수 오염을 방지한다
- 호이스팅으로 발생하는 버그를 예방한다

| 핵심 개념 | 설명 |
|-----------|------|
| `var` 문제점 | 중복 선언 가능, 블록 탈출, 호이스팅 undefined |
| `let` vs `const` | 재할당 여부, 블록 스코프, TDZ |
| 스코프 체인 | 안에서 밖은 접근 가능, 밖에서 안은 불가 |
| 호이스팅 | 선언이 맨 위로 올라가는 동작. var=undefined, let/const=TDZ |

```bash
node ch01_start/var.js
node ch01_start/let_const.js
node ch01_start/hoisting.js
```

---

### ch02 — 데이터 타입과 논리 연산

**한 줄 요약:** 원시 타입과 참조 타입의 차이, 안전한 복사 방법, 논리 연산자 활용

**이것을 배우면 할 수 있는 것:**
- 객체를 복사했는데 원본이 바뀌는 현상을 이해하고 방지한다
- `||` 와 `??` 를 상황에 맞게 올바르게 사용한다
- 중첩 객체를 `?.` 로 안전하게 접근한다

| 핵심 개념 | 설명 |
|-----------|------|
| 원시 vs 참조 타입 | 값 복사(독립) vs 주소 복사(공유) |
| 얕은 복사 vs 깊은 복사 | `{...obj}` vs `structuredClone()` |
| Truthy/Falsy | 조건문에서 false로 취급되는 7가지 값 |
| `??` vs `\|\|` | null/undefined만 vs Falsy 전체 |
| 옵셔널 체이닝 `?.` | null/undefined 안전 접근 |

```bash
node ch02_type/ref_type.js
node ch02_type/abref.js
node ch02_type/logic_null.js
```

---

### ch03 — 고급 자료구조와 순회 기법

**한 줄 요약:** for...of/for...in 차이, Set/Map 활용, 스프레드·구조 분해·Symbol

**이것을 배우면 할 수 있는 것:**
- 배열과 객체를 올바른 방법으로 순회한다
- 중복 제거를 Set으로 한 줄에 처리한다
- 구조 분해 할당으로 코드를 간결하게 만든다

| 핵심 개념 | 설명 |
|-----------|------|
| `for...of` | 이터러블의 값(value) 순회 |
| `for...in` | 객체의 키(key) 순회 |
| `Set` | 중복 없는 집합. 배열 중복 제거에 활용 |
| `Map` | 모든 타입을 키로 사용 가능한 키-값 저장소 |
| 스프레드 `...` | 펼치기: 배열/객체 복사·합치기 |
| 나머지 `...rest` | 모으기: 나머지 인수를 배열로 |
| 구조 분해 할당 | 배열/객체에서 원하는 값을 변수로 추출 |
| `Symbol` | 절대 겹치지 않는 유일한 식별자 |

```bash
node ch03_data_search/forof.js
node ch03_data_search/forin.js
node ch03_data_search/set.js
node ch03_data_search/spread.js
node ch03_data_search/symbol.js
```

---

### ch04 — 자바스크립트 객체 완전 정복

**한 줄 요약:** 객체의 단축 문법, 유틸리티 메서드, getter/setter, 불변성 제어, 디버깅

**이것을 배우면 할 수 있는 것:**
- ES6 단축 문법으로 객체를 간결하게 작성한다
- `Object.entries()`로 객체에 배열 메서드를 적용한다
- getter/setter로 유효성 검사를 자동화한다
- `console.table()` 등으로 효과적으로 디버깅한다

| 핵심 개념 | 설명 |
|-----------|------|
| 단축 프로퍼티/메서드 | `{ name }`, `method() {}` |
| 계산된 프로퍼티 키 | `{ [expr]: value }` |
| `Object.entries/fromEntries` | 객체 ↔ 배열 변환 |
| getter / setter | 속성처럼 읽고 쓰지만 함수 실행 |
| `structuredClone()` | 깊은 복사 권장 방법 |
| `Object.freeze/seal` | 객체 불변성 제어 |
| `console.table/time` | 배열 비교, 성능 측정 |

```bash
node ch04_object/app.js
```

---

### ch05 — 함수 심화 & 클로저

**한 줄 요약:** this 바인딩, 고차 함수, 클로저, 디바운스·스로틀 실전 패턴

**이것을 배우면 할 수 있는 것:**
- `this`가 왜 예상치 못한 값이 되는지 이해하고 해결한다
- 커링, 팩토리 패턴으로 재사용 가능한 함수를 만든다
- 클로저로 private 변수를 구현한다
- 검색 자동완성에 디바운스를 적용한다

| 핵심 개념 | 설명 |
|-----------|------|
| 함수 선언 4가지 | 선언문/표현식/화살표/IIFE |
| `this` 바인딩 | 호출 방식에 따라 달라지는 this |
| 화살표 함수의 this | 선언 위치의 this 고정 |
| 고차 함수 | 함수를 인수로 받거나 반환하는 함수 |
| 커링 | 인수를 나눠 받는 함수 패턴 |
| 클로저 | 함수가 선언 환경의 변수를 기억하는 현상 |
| private 변수 | 클로저로 외부 접근 차단 |
| 메모이제이션 | 계산 결과를 캐싱해 재활용 |
| 디바운스 | 마지막 호출 후 N ms 뒤 실행 |
| 스로틀 | N ms 간격으로 최대 1회 실행 |

```bash
node ch05_method/calculate.js
node ch05_method/counter.js
```

---

### ch06 — 배열 메서드 완전 정복

**한 줄 요약:** forEach/map/filter/reduce/sort/join — 배열을 자유자재로 다루는 방법

**이것을 배우면 할 수 있는 것:**
- 배열에서 원하는 데이터를 한 줄로 추출한다
- `reduce`로 그룹화, 집계, 조회 맵을 만든다
- `sort`의 함정을 피해 숫자를 올바르게 정렬한다
- 여러 메서드를 체이닝해서 복잡한 데이터를 처리한다

| 핵심 개념 | 설명 |
|-----------|------|
| `forEach` | 순회 (부수 효과 목적, break 불가) |
| `map` | 변환 (같은 길이의 새 배열) |
| `filter` | 추출 (조건 맞는 요소만) |
| `find/findIndex` | 첫 번째 일치 요소 찾기 |
| `some/every` | 하나라도/모두 조건 충족 여부 |
| `reduce` | 집계 (합계, 그룹화, 빈도 카운트) |
| `sort` | 정렬 (비교 함수 필수) |
| `toSorted` | 원본 유지 정렬 (ES2023) |
| `join/split` | 배열 ↔ 문자열 변환 |

```bash
node ch06_array_method/foreach.js
node ch06_array_method/map.js
node ch06_array_method/filter_find.js
node ch06_array_method/reduce.js
node ch06_array_method/sorts.js
node ch06_array_method/join.js
```

---

## 폴더 구조

```
stage04_jump_js/
│
├── README.md                    ← 이 문서 (전체 안내)
│
├── ch01_start/
│   ├── var.js                   ← var의 문제점 3가지
│   ├── let_const.js             ← let/const 특징과 선택 기준
│   ├── hoisting.js              ← 호이스팅 4가지 케이스
│   └── README.md
│
├── ch02_type/
│   ├── ref_type.js              ← 원시/참조 타입, 얕은/깊은 복사
│   ├── abref.js                 ← 단축 평가, Truthy/Falsy, 형 변환
│   ├── logic_null.js            ← ??, ?., 논리 할당 연산자
│   └── README.md
│
├── ch03_data_search/
│   ├── forof.js                 ← for...of, 이터러블
│   ├── forin.js                 ← for...in, hasOwnProperty
│   ├── set.js                   ← Set(중복제거), Map(유연한 키)
│   ├── spread.js                ← 스프레드, 나머지, 구조 분해
│   ├── symbol.js                ← Symbol 고유성과 활용
│   └── README.md
│
├── ch04_object/
│   ├── app.js                   ← 객체 단축문법·유틸리티·getter/setter·불변성
│   └── README.md
│
├── ch05_method/
│   ├── calculate.js             ← 함수 정의·this·고차함수·배열 메서드
│   ├── counter.js               ← 클로저·콜백·메모이제이션·debounce·throttle
│   └── README.md
│
└── ch06_array_method/
    ├── foreach.js               ← forEach vs for...of
    ├── map.js                   ← map, flatMap
    ├── filter_find.js           ← filter, find, some, every
    ├── reduce.js                ← 집계, 그룹화, 빈도 카운트
    ├── sorts.js                 ← sort 함정, 다중 조건, toSorted
    ├── join.js                  ← join, split, 실전 변환 패턴
    └── README.md
```

---

## 실행 환경

Node.js가 설치되어 있어야 합니다.

```bash
# Node.js 버전 확인
node -v    # v18 이상 권장

# 파일 실행
node ch01_start/var.js
```

브라우저 콘솔(F12)에서도 대부분의 코드를 직접 붙여넣어 실행할 수 있습니다.

---

## stage01과의 관계

| | stage01_start | stage04_jump_js |
|---|---|---|
| **수준** | 기초 문법 | 심화 개념 |
| **초점** | 무엇을 쓰는가 | 왜 이렇게 쓰는가 |
| **예시** | `const` 사용법 | `const` vs `let` 선택 기준과 이유 |
| **권장** | 처음 배울 때 | stage01 이후 |

> stage01에서 변수, 조건문, 반복문, 함수, 배열, 객체를 배웠다면  
> 이 폴더에서 각 개념의 **깊은 이해**와 **실무 활용 패턴**을 익힙니다.

---

## 학습 팁

1. **코드를 직접 실행해보세요** — 읽는 것보다 직접 실행하고 값을 바꿔보는 것이 훨씬 효과적입니다.
2. **console.log를 적극 활용하세요** — 중간 결과를 출력해서 데이터가 어떻게 변하는지 확인하세요.
3. **오류 메시지를 읽으세요** — TypeError, ReferenceError 등 오류 메시지가 무엇이 잘못됐는지 알려줍니다.
4. **실무 연결 포인트를 찾으세요** — 각 개념이 실제 어떤 상황에서 쓰이는지 생각해보세요.
5. **ch05 클로저와 ch06 reduce는 처음엔 어렵습니다** — 반복해서 보면 반드시 이해됩니다.

---

## 개념 키워드 빠른 참조

| 키워드 | 챕터 | 핵심 |
|--------|------|------|
| var | ch01 | 사용 금지. 블록 탈출, 중복 선언 허용 |
| let | ch01 | 재할당 가능, 블록 스코프 |
| const | ch01 | 재할당 불가, 기본값으로 사용 |
| 호이스팅 | ch01 | 선언이 위로 올라가는 동작 |
| TDZ | ch01 | let/const 선언 전 접근 금지 구간 |
| 원시 타입 | ch02 | 값 복사 → 독립적 |
| 참조 타입 | ch02 | 주소 복사 → 연결됨 |
| structuredClone | ch02 | 깊은 복사 권장 방법 |
| ?? | ch02 | null/undefined일 때만 기본값 |
| ?. | ch02 | null/undefined 안전 접근 |
| === | ch02 | 타입까지 비교하는 엄격 비교 |
| for...of | ch03 | 이터러블의 값 순회 |
| for...in | ch03 | 객체의 키 순회 |
| Set | ch03 | 중복 없는 컬렉션 |
| Map | ch03 | 모든 타입 키 사용 가능한 맵 |
| 스프레드 | ch03 | `...` 펼치기 |
| 구조 분해 | ch03 | 배열/객체에서 값 추출 |
| getter/setter | ch04 | 속성처럼 접근, 함수처럼 실행 |
| Object.freeze | ch04 | 객체 완전 동결 |
| console.table | ch04 | 배열/객체를 표로 출력 |
| 고차 함수 | ch05 | 함수를 받거나 반환하는 함수 |
| 클로저 | ch05 | 선언 환경의 변수를 기억하는 함수 |
| 디바운스 | ch05 | 마지막 호출 후 N ms 뒤 실행 |
| 스로틀 | ch05 | N ms 간격으로 최대 1회 실행 |
| map | ch06 | 변환 → 같은 길이 새 배열 |
| filter | ch06 | 추출 → 조건 맞는 요소만 |
| reduce | ch06 | 집계 → 하나의 값으로 |
| sort | ch06 | 정렬 (비교 함수 필수) |
| join/split | ch06 | 배열 ↔ 문자열 변환 |
