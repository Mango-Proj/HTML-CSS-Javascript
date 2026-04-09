# Ch02. 데이터 타입과 논리 연산

## 학습 목표

- 원시 타입과 참조 타입의 차이를 메모리 관점에서 설명할 수 있다
- 얕은 복사와 깊은 복사의 차이를 이해하고 활용할 수 있다
- `||` 와 `??` 의 차이를 구분하고 적절히 사용할 수 있다
- 옵셔널 체이닝 `?.` 으로 안전하게 속성에 접근할 수 있다
- 형 변환과 `==` vs `===` 의 차이를 이해한다

---

## 1. 원시 타입 vs 참조 타입 (`ref_type.js`)

### 종류

| 구분 | 타입 종류 | 저장 방식 |
|------|----------|---------|
| **원시 타입** | `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint` | 값 자체를 직접 저장 |
| **참조 타입** | `object`, `array`, `function` | 값의 메모리 주소(참조)를 저장 |

### 원시 타입 — 값 복사

```js
let a = 10;
let b = a;   // 값이 복사됨 → 독립적인 10

b = 20;
console.log(a); // 10 — a는 변하지 않음
console.log(b); // 20
```

```
메모리:
  a → [10]    (독립 공간)
  b → [20]    (독립 공간)
```

### 참조 타입 — 주소 복사

```js
const objA = { name: 'Kim' };
const objB = objA;   // 주소가 복사됨 → 같은 객체를 가리킴

objB.name = 'Lee';
console.log(objA.name); // 'Lee' — objA도 바뀜!
```

```
메모리:
  objA → [주소 #100] ─┐
                        └→ { name: 'Lee' }  (실제 데이터)
  objB → [주소 #100] ─┘
```

### 얕은 복사 vs 깊은 복사

```js
// 얕은 복사: 1단계 속성만 복사 → 중첩 객체는 여전히 공유
const copy = { ...original };

// 깊은 복사: 중첩 구조까지 완전히 새로 복사 → 완전 독립
const deepCopy = structuredClone(original);            // 권장
const deepCopy2 = JSON.parse(JSON.stringify(original)); // 함수/Date 불가
```

```
얕은 복사:
  copy    → { name: 'Lee'  ← 독립
              address ────────→ { city: 'Seoul' }  ← 공유!
            }

깊은 복사:
  deepCopy → { name: 'Lee'
               address → { city: 'Seoul' }  ← 완전히 새 객체
             }
```

### 함수에서 원본 보호 패턴

```js
// ❌ 원본이 변하는 경우
function addJob(person) {
  person.job = 'Dev'; // 전달받은 주소를 통해 원본 수정
}

// ✅ 원본 보호 패턴
function updateName(person) {
  const newPerson = { ...person }; // 복사본을 만들어 작업
  newPerson.name = 'Lee';
  return newPerson;
}
```

---

## 2. Truthy / Falsy + 단축 평가 (`abref.js`)

### Falsy 값 7가지

조건문에서 `false`로 취급되는 값들입니다.

```js
false, 0, -0, 0n, "", '', ``, null, undefined, NaN
```

> **주의**: 빈 배열 `[]`과 빈 객체 `{}`는 **Truthy**입니다!
> ```js
> Boolean([]) // true
> Boolean({}) // true
> Boolean('0') // true — 문자열 '0'도 Truthy
> ```

### `||` 단축 평가 — 첫 번째 Truthy 반환

```
왼쪽 평가 → Truthy면 즉시 반환
           Falsy면 → 오른쪽 평가 → 그 값 반환
```

```js
null || 'default'    // 'default'
0    || 'default'    // 'default' ← 0도 Falsy 취급
'hi' || 'default'   // 'hi'      ← Truthy이므로 즉시 반환

// 활용: 기본값 설정
const msg = userMsg || '안녕하세요';
```

### `&&` 단축 평가 — 첫 번째 Falsy 반환

```
왼쪽 평가 → Falsy면 즉시 반환
           Truthy면 → 오른쪽 평가 → 그 값 반환
```

```js
false && '실행'    // false  ← Falsy이므로 즉시 반환 (오른쪽 실행 안 됨)
true  && '실행'    // '실행' ← Truthy이므로 오른쪽 반환

// 활용: 조건부 실행 (if 문 대체)
isLoggedIn && console.log('환영합니다!');
```

### 형 변환

```js
// 묵시적 형 변환 (자동)
1 + '2'     // '12'  ← + 는 문자열 우선
'5' - 2     // 3     ← - 는 숫자로 변환
0 == false  // true  ← == 는 타입 변환 후 비교 (위험!)

// 명시적 형 변환 (의도적)
Number('42')    // 42
Number(null)    // 0
Number(undefined) // NaN
parseInt('42px')  // 42 — 숫자 부분만 추출
String(42)      // '42'
Boolean(0)      // false
```

### `==` vs `===`

```js
1 == '1'    // true  ← 타입 변환 후 비교 (위험)
1 === '1'   // false ← 타입까지 비교 (안전)

// ✅ 항상 === 을 사용합니다
// 예외: null/undefined 동시 체크
val == null  // null과 undefined 모두 잡는 유일한 == 사용 케이스
```

---

## 3. Nullish 병합 `??` + 옵셔널 체이닝 `?.` (`logic_null.js`)

### `||` vs `??` 핵심 차이

| 연산자 | 기본값 사용 조건 | 0, "" 처리 |
|-------|---------------|-----------|
| `\|\|` | Falsy 값 전체 | 기본값으로 대체 |
| `??` | `null` 또는 `undefined` 만 | 유효한 값으로 유지 |

```js
0  || '기본값'   // '기본값' ← 0을 Falsy로 취급
0  ?? '기본값'   // 0        ← 0은 null/undefined 아님, 유효한 값

'' || '기본값'   // '기본값' ← 빈 문자열을 Falsy로 취급
'' ?? '기본값'   // ''       ← 빈 문자열도 유효한 값
```

### `??` 우선순위 체인

```js
// 사용자 설정 → 저장된 설정 → 기본값 순서로
const theme = userSetting ?? savedSetting ?? 'light';
```

### 옵셔널 체이닝 `?.`

`null`/`undefined`에 접근할 때 발생하는 TypeError를 방지합니다.

```js
const user = null;

// ❌ 에러 발생
user.name               // TypeError!

// ✅ ?. 사용 — null/undefined면 undefined 반환 (에러 없음)
user?.name              // undefined
user?.address?.city     // undefined (중첩도 가능)
user?.greet?.()         // undefined (메서드 호출도 가능)
arr?.[0]                // undefined (배열 접근도 가능)
```

### `?.` + `??` 조합 패턴

```js
// 가장 많이 쓰는 실무 패턴: 안전하게 접근 + 기본값
const city = user?.address?.city ?? '도시 정보 없음';
```

```
흐름:
  user가 null → ?. 로 undefined 반환 → ?? 로 '도시 정보 없음' 반환
  user가 있음 → address 접근 → city 없음 → ?? 로 '도시 정보 없음' 반환
  user가 있음 → address 있음 → city = 'Seoul' → ?? 불필요, 'Seoul' 반환
```

### 논리 할당 연산자 (ES2021)

```js
a ??= '기본값'  // a가 null/undefined 일 때만 할당
b ||= '기본값'  // b가 Falsy 일 때만 할당
c &&= '새값'    // c가 Truthy 일 때만 할당
```

---

## 4. 파일 구조

```
ch02_type/
├── ref_type.js    ← 원시 vs 참조 타입, 얕은/깊은 복사, 원본 보호 패턴
├── abref.js       ← 단축 평가(||, &&), Truthy/Falsy, 형 변환, == vs ===
├── logic_null.js  ← ?? vs ||, 옵셔널 체이닝 ?., 논리 할당 연산자
└── README.md      ← 이 문서
```

## 5. 실행 방법

```bash
node ref_type.js
node abref.js
node logic_null.js
```

---

## 핵심 요약

```
원시 타입 복사 → 독립적 (값 복사)
참조 타입 복사 → 연결됨 (주소 복사) → 원본 보호 시 {...obj} 또는 structuredClone()

기본값 설정:
  0, ""도 유효한 값이면 → ??  사용
  0, ""도 기본값으로 대체해도 되면 → || 사용

null/undefined 안전 접근 → ?.  (옵셔널 체이닝)
비교 연산자 → 항상 === 사용 (== 는 사용 금지)
```
