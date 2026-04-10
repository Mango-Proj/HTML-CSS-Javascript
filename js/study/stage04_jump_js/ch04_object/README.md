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

### 속성 접근 — 점 vs 대괄호

```js
const user = { name: 'Kim', age: 25 };

user.name        // 'Kim' — 점 표기법 (일반적)
user['age']      // 25   — 대괄호 표기법

// 대괄호는 키가 변수일 때 필수
const key = 'name';
user[key]        // 'Kim'
```

### ES6 단축 문법

```js
const name = 'Kim';
const age  = 25;

// ① 단축 프로퍼티 — 변수명과 키 이름이 같으면 하나로
const user = { name, age }; // { name: 'Kim', age: 25 }

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

// 객체 병합 (나중 것이 앞을 덮어씀)
const result = Object.assign({}, defaults, userPrefs);
// 또는 { ...defaults, ...userPrefs }
```

> **속성 정렬 순서**: 정수 키(오름차순) → 문자열 키(삽입 순) → Symbol 키(삽입 순)

---

## 3. getter / setter

속성처럼 읽고 쓰지만, 실제로는 함수가 실행됩니다.

```js
const circle = {
  _radius: 5,

  get radius() {           // circle.radius 로 읽으면 실행
    return this._radius;
  },
  set radius(value) {      // circle.radius = 값 으로 대입하면 실행
    if (value < 0) return; // 유효성 검사
    this._radius = value;
  },
  get area() {             // getter만 = 읽기 전용 파생 속성
    return Math.PI * this._radius ** 2;
  }
};

circle.radius = 10;             // setter 호출
console.log(circle.area);       // getter 호출 — 314.16...
```

### 언제 사용하나?

| 상황 | 방식 |
|------|------|
| 대입 시 유효성 검사 | `set` 안에서 검사 로직 실행 |
| 다른 값에서 파생되는 속성 | `get` 만 정의 (읽기 전용) |
| 내부 데이터를 숨기고 싶을 때 | `_` 접두사 속성 + getter/setter |

---

## 4. 얕은 복사 vs 깊은 복사

### 얕은 복사 (Shallow Copy)

```
original = { name: 'Kim', address: { city: 'Seoul' } }
                              ↑
copy = { ...original }     같은 주소 공유

copy.name = 'Lee'      → original.name 변하지 않음  ✅
copy.address.city = '부산' → original.address.city 도 바뀜!  ❌
```

```js
const copy = { ...original };       // 스프레드
const copy2 = Object.assign({}, original); // Object.assign
```

### 깊은 복사 (Deep Copy)

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

---

## 5. 객체 불변성

### `Object.freeze()` — 완전 동결

```js
const CONFIG = Object.freeze({
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000
});

CONFIG.API_URL = 'hacked'; // 무시됨 (strict mode에서는 에러)
CONFIG.newProp = 'added';  // 무시됨

Object.isFrozen(CONFIG) // true
```

> ⚠️ **얕게만 동결**: 중첩 객체(`CONFIG.nested.value`)는 여전히 변경 가능

### `Object.seal()` — 봉인 (수정만 허용)

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

```js
// ❌ 이전: 매 단계마다 && 체크
const theme = res && res.data && res.data.user && res.data.user.theme;

// ✅ 현재: ?. 로 간결하게
const theme = res?.data?.user?.theme ?? 'light';

// 메서드 호출
obj.method?.()         // method가 없으면 undefined
arr?.[0]               // arr이 null이면 undefined
```

---

## 7. console 객체 디버깅 메서드

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
// 표로 출력 — 배열 데이터 비교에 유용
console.table([
  { name: 'Alice', score: 95 },
  { name: 'Bob',   score: 87 }
]);

// 실행 시간 측정
console.time('label');
// ... 측정할 코드
console.timeEnd('label'); // label: x.xxms
```

---

## 8. 실무 패턴 — 불변 업데이트

React 등 프레임워크에서 상태를 업데이트할 때 원본을 직접 수정하지 않고 새 객체를 반환합니다.

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
