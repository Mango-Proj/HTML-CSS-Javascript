# Ch04. 자바스크립트 객체(Object) 완전 정복

## 학습 목표

- 객체의 생성, 조작, 단축 문법을 자유롭게 쓸 수 있다
- `Object` 유틸리티 메서드(`keys`, `values`, `entries`, `fromEntries`, `assign`)를 활용한다
- getter / setter 로 속성 접근을 제어할 수 있다
- 얕은 복사와 깊은 복사의 차이를 이해하고 상황에 맞게 선택한다
- `Object.freeze()` / `seal()` 로 객체 불변성을 제어한다
- `console` 객체의 다양한 메서드로 효과적으로 디버깅한다

---

## 1. 객체 기본과 ES6 단축 문법

JavaScript에서 **객체(Object)** 는 연관된 데이터와 동작(함수)을 하나로 묶는 가장 기본적인 구조입니다.

> **비유:** 명함을 생각해보세요.  
> 명함에는 이름, 직책, 연락처, 회사명 등 **관련 정보들이 하나의 카드에 묶여 있습니다.**  
> JavaScript 객체도 마찬가지입니다. 관련된 데이터들을 하나의 변수에 담습니다.

### 속성 접근 — 점 vs 대괄호

```js
const user = { name: 'Kim', age: 25 };

user.name        // 'Kim' — 점 표기법 (일반적, 코드가 깔끔)
user['age']      // 25   — 대괄호 표기법

// 대괄호는 키가 변수일 때 필수
const key = 'name';
user[key]        // 'Kim' — 변수 key의 값('name')으로 접근
```

> **언제 대괄호를 쓰나?**  
> 어떤 속성에 접근할지 실행 중에 결정해야 할 때 사용합니다.  
> 예: 사용자가 "name"이라고 입력하면 name을, "age"라고 입력하면 age를 읽어야 할 때.

### ES6 단축 문법

ES6(2015)에서 객체를 더 편리하게 작성할 수 있는 문법들이 추가되었습니다.

```js
const name = 'Kim';
const age  = 25;

// ① 단축 프로퍼티 — 변수명과 키 이름이 같으면 하나로
const user = { name, age }; // { name: 'Kim', age: 25 }
// 기존: { name: name, age: age }와 동일

// ② 단축 메서드 — function 키워드 생략
const obj = {
  value: 10,
  double() { return this.value * 2; } // function 불필요
};

// ③ 계산된 프로퍼티 키 — 동적 키 이름
const prefix = 'btn';
const btns = {
  [`${prefix}_ok`]: '확인',  // 키: 'btn_ok'
  [`${prefix}_ng`]: '취소',  // 키: 'btn_ng'
};
```

---

## 2. Object 유틸리티 메서드

객체를 다루기 위한 `Object`의 내장 메서드들입니다.  
이 메서드들은 객체를 배열로 변환하거나, 병합하거나, 새로 만드는 데 사용됩니다.

| 메서드 | 반환 | 설명 |
|--------|------|------|
| `Object.keys(obj)` | `string[]` | 열거 가능한 키 배열 |
| `Object.values(obj)` | `any[]` | 값 배열 |
| `Object.entries(obj)` | `[key, val][]` | 키-값 쌍 배열 |
| `Object.fromEntries(pairs)` | `object` | `[키,값]` 배열 → 객체 |
| `Object.assign(target, ...sources)` | `object` | 여러 객체 병합 |

```js
const scores = { Alice: 95, Bob: 87, Charlie: 92 };

// 90점 이상만 필터 — entries → filter → fromEntries
const top = Object.fromEntries(
  Object.entries(scores).filter(([, score]) => score >= 90)
);
// { Alice: 95, Charlie: 92 }
// 객체를 배열로 바꿔서 배열 메서드(filter)를 쓴 다음, 다시 객체로 변환하는 패턴

// 객체 병합 (나중 것이 앞을 덮어씀)
const result = Object.assign({}, defaults, userPrefs);
// 또는 { ...defaults, ...userPrefs }  (스프레드 방식이 더 간결)
```

> **`Object.entries()`를 쓰는 이유:**  
> 객체는 `map`, `filter` 같은 배열 메서드를 직접 사용할 수 없습니다.  
> `Object.entries()`로 `[키, 값]` 형태의 배열로 변환하면 배열 메서드를 모두 사용할 수 있습니다.  
> 처리 후 `Object.fromEntries()`로 다시 객체로 돌아올 수 있습니다.

> **속성 정렬 순서**: 정수 키(오름차순) → 문자열 키(삽입 순) → Symbol 키(삽입 순)

---

## 3. getter / setter

속성처럼 읽고 쓰지만, 실제로는 **함수**가 실행됩니다.

> **비유:** 자동차 계기판의 연료 게이지를 생각해보세요.  
> 계기판의 숫자를 **읽는 것(getter)** 은 실제 연료 센서를 실시간으로 읽어오는 함수입니다.  
> 연료를 **채우는 것(setter)** 은 유효성 검사(음수는 불가) 후 연료량을 업데이트하는 함수입니다.  
> 사용하는 쪽에서는 그냥 숫자처럼 읽고 쓰지만, 내부적으로는 함수가 실행됩니다.

```js
const circle = {
  _radius: 5,

  get radius() {           // circle.radius 로 읽으면 실행
    return this._radius;
  },
  set radius(value) {      // circle.radius = 값 으로 대입하면 실행
    if (value < 0) return; // 유효성 검사 — 음수 반지름은 말이 안 됨
    this._radius = value;
  },
  get area() {             // getter만 = 읽기 전용 파생 속성
    return Math.PI * this._radius ** 2;
  }
};

circle.radius = 10;             // setter 호출
console.log(circle.area);       // getter 호출 — 314.16...
// circle.area = 300;           // setter가 없으므로 무시됨 (읽기 전용)
```

### 언제 사용하나?

| 상황 | 방식 |
|------|------|
| 대입 시 유효성 검사 | `set` 안에서 검사 로직 실행 |
| 다른 값에서 파생되는 속성 | `get` 만 정의 (읽기 전용) |
| 내부 데이터를 숨기고 싶을 때 | `_` 접두사 속성 + getter/setter |

---

## 4. 얕은 복사 vs 깊은 복사

객체를 복사하는 방법에는 두 가지가 있으며, 이 차이를 모르면 예상치 못한 버그가 생깁니다.

### 얕은 복사 (Shallow Copy)

1단계 속성(최상위 속성)만 복사합니다.  
객체 안에 또 다른 객체(중첩 객체)가 있으면, 그 중첩 객체는 여전히 **주소를 공유**합니다.

```
original = { name: 'Kim', address: { city: 'Seoul' } }
                              ↑
copy = { ...original }     같은 주소 공유

copy.name = 'Lee'          → original.name 변하지 않음  ✅
copy.address.city = '부산' → original.address.city 도 바뀜!  ❌
```

```js
const copy = { ...original };       // 스프레드
const copy2 = Object.assign({}, original); // Object.assign
```

### 깊은 복사 (Deep Copy)

중첩 구조까지 통째로 새로 복사합니다. 원본과 완전히 독립적입니다.

```
original = { name: 'Kim', address: { city: 'Seoul' } }

structuredClone(original)
  → { name: 'Kim', address: { city: 'Seoul' } }  완전히 새 객체
     아무리 내부를 바꿔도 원본에 영향 없음  ✅
```

| 방법 | 장점 | 단점 |
|------|------|------|
| `structuredClone(obj)` | Date, Map, Set 복사 가능, 권장 | function, Symbol 불가 |
| `JSON.parse(JSON.stringify(obj))` | 간단 | function, Date, undefined 누락 |
| 재귀 `deepClone(obj)` | 커스텀 제어 가능 | 직접 구현 필요 |

```js
// 권장 방법 (ES2022+)
const deep = structuredClone(original);
```

> **어떤 복사를 써야 하나?**  
> - 1단계 속성만 독립적이어도 되면 → `{ ...obj }` (얕은 복사)  
> - 중첩 객체까지 완전히 독립적이어야 하면 → `structuredClone(obj)` (깊은 복사)

---

## 5. 객체 불변성

코드에서 절대로 바뀌면 안 되는 데이터(설정값, 상수 등)를 보호할 때 사용합니다.

### `Object.freeze()` — 완전 동결

속성 추가, 수정, 삭제 모두 불가합니다.

> **비유:** 전시관의 유리 케이스 안에 넣는 것과 같습니다.  
> 내용을 볼 수는 있지만 만지거나 바꿀 수 없습니다.

```js
const CONFIG = Object.freeze({
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000
});

CONFIG.API_URL = 'hacked'; // 무시됨 (strict mode에서는 에러)
CONFIG.newProp = 'added';  // 무시됨

Object.isFrozen(CONFIG) // true
```

> ⚠️ **얕게만 동결**: 중첩 객체(`CONFIG.nested.value`)는 여전히 변경 가능합니다.  
> 완전한 불변성을 원한다면 중첩 객체에도 각각 `freeze()`를 적용해야 합니다.

### `Object.seal()` — 봉인 (수정만 허용)

기존 속성은 수정할 수 있지만, 속성 추가와 삭제는 불가합니다.

```js
const user = Object.seal({ name: 'Kim', age: 25 });

user.name = 'Lee';  // ✅ 수정 가능
user.email = 'x';   // ❌ 추가 불가 (무시)
delete user.age;    // ❌ 삭제 불가 (무시)
```

| | `freeze` | `seal` | 일반 객체 |
|--|---------|--------|---------|
| 속성 추가 | ❌ | ❌ | ✅ |
| 속성 수정 | ❌ | ✅ | ✅ |
| 속성 삭제 | ❌ | ❌ | ✅ |

---

## 6. 옵셔널 체이닝 `?.`

중첩 객체에 안전하게 접근합니다. `null`/`undefined`를 만나면 즉시 `undefined`를 반환합니다.

중첩 객체를 다루다 보면 중간에 값이 없는 경우를 항상 방어해야 합니다.  
옵셔널 체이닝이 없었다면 아주 복잡한 if 문이 필요했습니다.

```js
// ❌ 이전: 매 단계마다 && 체크
const theme = res && res.data && res.data.user && res.data.user.theme;

// ✅ 현재: ?. 로 간결하게
const theme = res?.data?.user?.theme ?? 'light';

// 메서드 호출
obj.method?.()         // method가 없으면 undefined (에러 없음)
arr?.[0]               // arr이 null이면 undefined (에러 없음)
```

> API로부터 데이터를 받아올 때, 서버 응답 구조가 불완전하거나 일부 필드가 없을 수 있습니다.  
> `?.`를 사용하면 이런 상황에서도 안전하게 원하는 값을 추출할 수 있습니다.

---

## 7. console 객체 디버깅 메서드

코드가 의도대로 동작하는지 확인하기 위해 사용하는 도구들입니다.  
`console.log()` 외에도 다양한 메서드가 있습니다.

| 메서드 | 설명 | 사용 시점 |
|--------|------|---------|
| `console.log()` | 일반 출력 | 일반적인 값 확인 |
| `console.warn()` | 노란 경고 | 잠재적 문제 |
| `console.error()` | 빨간 에러 | 오류 상황 |
| `console.table()` | 표 형태 출력 | 배열/객체 비교 |
| `console.time()` / `timeEnd()` | 실행 시간 측정 | 성능 측정 |
| `console.group()` / `groupEnd()` | 출력 그룹화 | 계층적 로그 |
| `console.count()` | 호출 횟수 카운트 | 함수 호출 빈도 파악 |
| `console.assert()` | 조건 거짓일 때만 출력 | 디버깅 단언 |

```js
// 표로 출력 — 배열 데이터 비교에 유용 (개발자 도구 Console에서 표 형태로 보임)
console.table([
  { name: 'Alice', score: 95 },
  { name: 'Bob',   score: 87 }
]);

// 실행 시간 측정 — 어떤 코드가 느린지 찾을 때
console.time('label');
// ... 측정할 코드
console.timeEnd('label'); // label: x.xxms
```

> `console.table()`은 여러 객체의 속성을 한 눈에 비교할 때 특히 유용합니다.  
> 브라우저 개발자 도구(F12)에서 표 형태로 보여주어 훨씬 가독성이 좋습니다.

---

## 8. 실무 패턴 — 불변 업데이트

React 등 프레임워크에서 상태를 업데이트할 때 원본을 직접 수정하지 않고 새 객체를 반환합니다.

> **왜 원본을 수정하지 않나?**  
> React는 상태가 변했는지 감지해서 화면을 다시 그립니다.  
> 같은 객체를 직접 수정하면 React가 변화를 감지하지 못합니다.  
> 새 객체를 반환해야 "아, 데이터가 바뀌었구나"를 인식합니다.

```js
// 중첩 객체의 특정 속성만 변경
function updateTheme(state, newTheme) {
  return {
    ...state,
    settings: { ...state.settings, theme: newTheme }
  };
}

// 배열 항목 추가
function addItem(state, item) {
  return {
    ...state,
    cart: [...state.cart, item]
  };
}
```

---

## 파일 구조

```
ch04_object/
├── app.js     ← 객체 생성·단축문법·유틸리티·getter/setter·복사·불변성·console
└── README.md  ← 이 문서
```

## 실행 방법

```bash
node app.js
```

---

## 핵심 요약

```
속성 접근:  obj.key (일반) / obj[변수] (동적 키)
단축 문법:  { name } / method() {} / { [expr]: val }

복사 선택:
  1단계 속성만 독립적이어도 됨 → { ...obj }
  중첩까지 완전 독립 필요     → structuredClone(obj)

불변성:
  읽기 전용 상수 객체 → Object.freeze()
  추가/삭제만 막기    → Object.seal()

디버깅:
  일반값 → console.log
  배열/객체 비교 → console.table
  성능 측정 → console.time / timeEnd
```
