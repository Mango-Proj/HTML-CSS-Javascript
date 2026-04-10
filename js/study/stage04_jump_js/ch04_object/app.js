// ============================================================
// app.js — 자바스크립트 객체(Object) 완전 정복
//
// 객체는 자바스크립트의 핵심 자료구조입니다.
// "속성(property) = 키(key) + 값(value)" 의 쌍을 묶어 관련 데이터와
// 동작(메서드)을 하나로 표현합니다.
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. 객체 생성과 기본 조작
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. 객체 생성과 기본 조작 =====');

// 객체 리터럴: 가장 일반적인 방식
const user = {
  name: 'Kim',
  age: 25,
  isAdmin: false,
};

// 속성 접근: 점 표기법 (권장)
console.log(user.name);   // 'Kim'

// 속성 접근: 대괄호 표기법 (변수로 키를 동적으로 지정할 때 필수)
const key = 'age';
console.log(user[key]);   // 25

// 속성 추가
user.email = 'kim@example.com';

// 속성 수정
user.age = 26;

// 속성 삭제
delete user.isAdmin;

console.log(user);
// { name: 'Kim', age: 26, email: 'kim@example.com' }

// 속성 존재 여부 확인
console.log('name' in user);   // true
console.log('phone' in user);  // false


console.log('\n===== 2. ES6 단축 문법 =====');

// ── 2-1. 단축 프로퍼티 (Shorthand Property) ──────────────
// 변수명과 키 이름이 같으면 하나로 줄일 수 있습니다.

const productName = '노트북';
const price = 1500000;

// ❌ 이전 방식
const product1 = { productName: productName, price: price };

// ✅ 단축 표현 (변수명이 곧 키 이름)
const product2 = { productName, price };

console.log(product1); // { productName: '노트북', price: 1500000 }
console.log(product2); // { productName: '노트북', price: 1500000 }

// ── 2-2. 단축 메서드 (Method Shorthand) ──────────────────
const calc = {
  value: 10,

  // ❌ 이전 방식: function 키워드 필요
  double1: function () {
    return this.value * 2;
  },

  // ✅ 단축 메서드: function 키워드 생략
  double2() {
    return this.value * 2;
  }
};

console.log(calc.double1()); // 20
console.log(calc.double2()); // 20

// ── 2-3. 계산된 프로퍼티 키 (Computed Property Names) ────
// [] 안에 변수나 표현식을 쓰면 동적으로 키 이름을 정할 수 있습니다.

const prefix = 'btn';
const buttons = {
  [`${prefix}_confirm`]: '확인',  // 'btn_confirm'
  [`${prefix}_cancel`]:  '취소',  // 'btn_cancel'
};
console.log(buttons); // { btn_confirm: '확인', btn_cancel: '취소' }

// 동적 키 생성 예시: 서버 응답을 객체로 변환
function makeConfig(keys, defaultVal) {
  const result = {};
  keys.forEach(k => { result[k] = defaultVal; });
  return result;
}
console.log(makeConfig(['debug', 'verbose', 'silent'], false));
// { debug: false, verbose: false, silent: false }


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. Object 유틸리티 메서드
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. Object 유틸리티 메서드 =====');

const scores = { Alice: 95, Bob: 87, Charlie: 92 };

// Object.keys()   → 키 배열
// Object.values() → 값 배열
// Object.entries()→ [키, 값] 쌍의 배열
console.log(Object.keys(scores));    // ['Alice', 'Bob', 'Charlie']
console.log(Object.values(scores));  // [95, 87, 92]
console.log(Object.entries(scores)); // [['Alice',95], ['Bob',87], ['Charlie',92]]

// 활용: 점수 합계 구하기
const total = Object.values(scores).reduce((sum, s) => sum + s, 0);
console.log('합계:', total);  // 274

// 활용: 점수 80점 이상만 필터
const passed = Object.fromEntries(
  Object.entries(scores).filter(([, score]) => score >= 90)
);
console.log('90점 이상:', passed); // { Alice: 95, Charlie: 92 }

// Object.fromEntries(): [키, 값] 배열 → 객체 변환 (entries의 역방향)
const pairs = [['x', 1], ['y', 2], ['z', 3]];
console.log(Object.fromEntries(pairs)); // { x: 1, y: 2, z: 3 }

// Object.assign(): 여러 객체를 첫 번째 객체로 병합
// Object.assign(target, source1, source2, ...)
const defaults = { theme: 'light', lang: 'ko', fontSize: 14 };
const userPrefs = { theme: 'dark', fontSize: 16 };
const merged = Object.assign({}, defaults, userPrefs); // 빈 객체로 새 객체 생성
console.log(merged); // { theme: 'dark', lang: 'ko', fontSize: 16 }

// 💡 속성 정렬 순서
// 정수 키(오름차순) → 문자열 키(삽입 순) → Symbol 키(삽입 순)
const mixedKeys = { b: 2, 2: 'two', a: 1, 1: 'one', 3: 'three' };
console.log(Object.keys(mixedKeys)); // ['1', '2', '3', 'b', 'a']
//                                      정수 먼저(오름차순) → 문자열(삽입 순)


console.log('\n===== 4. getter / setter =====');

// getter: 속성처럼 읽히지만 실제로는 함수가 실행됩니다.
// setter: 속성에 값을 대입하면 함수가 실행됩니다.
// 유효성 검사, 파생 값 계산, 읽기 전용 속성 구현에 유용합니다.

const circle = {
  _radius: 5,         // 관례: _ 접두사 = 직접 접근하지 않는 내부 값

  // getter: radius 속성처럼 읽힘
  get radius() {
    return this._radius;
  },

  // setter: circle.radius = 값 으로 대입 시 실행
  set radius(value) {
    if (value < 0) {
      console.log('반지름은 음수가 될 수 없습니다.');
      return;
    }
    this._radius = value;
  },

  // getter만 있는 파생 속성 (읽기 전용)
  get area() {
    return Math.PI * this._radius ** 2;  // **는 거듭제곱 연산자
  },

  get circumference() {
    return 2 * Math.PI * this._radius;
  }
};

console.log(circle.radius);       // 5 (getter 호출)
circle.radius = 10;               // (setter 호출)
console.log(circle.radius);       // 10
console.log(circle.area.toFixed(2)); // 314.16 (getter — 계산된 값)

circle.radius = -3;               // '반지름은 음수가 될 수 없습니다.' 출력
console.log(circle.radius);       // 10 (변경 안 됨)


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. 객체 복사 — 얕은 복사 vs 깊은 복사
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. 얕은 복사 (Shallow Copy) =====');

// 얕은 복사: 1단계 속성은 독립적으로 복사되지만,
// 중첩된 객체/배열은 주소(참조)만 복사됩니다.

const original = {
  name: 'Kim',
  address: { city: 'Seoul' }, // 중첩 객체
  tags: ['js', 'css']         // 중첩 배열
};

// 방법 1: 스프레드 연산자
const spread = { ...original };

// 방법 2: Object.assign()
const assigned = Object.assign({}, original);

// 1단계 속성: 독립적으로 복사됨
spread.name = 'Lee';
console.log(original.name); // 'Kim' — 원본 영향 없음

// 중첩 객체: 참조를 공유하므로 한쪽 수정 시 모두 반영
spread.address.city = 'Busan';
console.log(original.address.city); // 'Busan' — 원본도 바뀜!
console.log(assigned.address.city); // 'Busan' — 동일한 주소를 공유


console.log('\n===== 6. 깊은 복사 (Deep Copy) =====');

// 깊은 복사: 중첩 구조 전체를 새로운 메모리에 복사 → 완전히 독립

// ── 방법 1: JSON.parse(JSON.stringify()) ─────────────────
// 장점: 간단, 빠름
// 단점: function, undefined, Date, Symbol, 순환 참조 → 복사 불가

const jsonCopy = JSON.parse(JSON.stringify(original));
jsonCopy.address.city = 'Incheon';
console.log(original.address.city); // 'Busan' — 원본 영향 없음 ✅

// ── 방법 2: structuredClone() (ES2022 권장) ──────────────
// 장점: Date, RegExp, Map, Set, ArrayBuffer 등 복사 가능
// 단점: function, Symbol, DOM Node 복사 불가 (거의 모든 일반 데이터는 OK)

const original2 = {
  name: 'Park',
  scores: [90, 80],
  joinDate: new Date('2024-01-01'), // Date 객체 포함
};

const structured = structuredClone(original2);
structured.scores.push(100);
structured.joinDate.setFullYear(2025);

console.log(original2.scores);   // [90, 80] — 원본 유지
console.log(original2.joinDate.getFullYear()); // 2024 — 원본 유지

// ── 방법 3: 재귀 deepClone 함수 (원본 코드 유지·확장) ────
// 직접 제어가 필요하거나 커스텀 복사 로직이 필요할 때 사용

function deepClone(obj) {
  // 원시 값이거나 null이면 그대로 반환 (더 이상 내려갈 구조 없음)
  if (obj === null || typeof obj !== 'object') return obj;

  // Date 객체 처리 (structuredClone 없는 환경 대비)
  if (obj instanceof Date) return new Date(obj.getTime());

  // 배열인 경우: 각 요소를 재귀로 복사
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  // 일반 객체: 각 값을 재귀로 복사
  const cloned = {};
  for (const [key, value] of Object.entries(obj)) {
    cloned[key] = deepClone(value); // 값도 재귀로 깊은 복사
  }
  return cloned;
}

const original3 = {
  data: [1, 2, 3],
  info: { id: 1, tags: ['a', 'b'] },
  greet() { console.log('Hi'); } // 함수는 원본 참조 유지 (복사 안 됨)
};

const clone = deepClone(original3);
original3.info.id = 99;
original3.data.push(4);

console.log(clone.info.id);  // 1 — 원본 수정에 영향받지 않음 ✅
console.log(clone.data);     // [1, 2, 3] — 독립적으로 유지 ✅


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. 객체 불변성
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 7. 객체 불변성 — freeze / seal =====');

// ── Object.freeze() ───────────────────────────────────────
// 객체를 완전히 동결: 속성 추가·수정·삭제 모두 불가
// (strict mode에서는 에러 발생, 일반 모드에서는 조용히 무시)

const config = Object.freeze({
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000,
  VERSION: '1.0.0'
});

config.API_URL = 'https://hacked.com'; // 무시됨 (에러 없음)
config.newProp = 'added';             // 무시됨
delete config.TIMEOUT;                // 무시됨

console.log(config.API_URL); // 'https://api.example.com' — 변경 안 됨
console.log(Object.isFrozen(config)); // true

// ⚠️ freeze는 얕게만 동결 (중첩 객체는 동결 안 됨)
const partial = Object.freeze({ nested: { value: 1 } });
partial.nested.value = 99; // 중첩 객체는 동결 안 됨!
console.log(partial.nested.value); // 99

// ── Object.seal() ─────────────────────────────────────────
// 봉인: 속성 추가·삭제는 불가, 기존 속성 수정은 가능

const sealedUser = Object.seal({ name: 'Kim', age: 25 });
sealedUser.name = 'Lee';  // ✅ 수정 가능
sealedUser.email = 'x';   // ❌ 추가 불가 (무시됨)
delete sealedUser.age;    // ❌ 삭제 불가 (무시됨)

console.log(sealedUser); // { name: 'Lee', age: 25 }
console.log(Object.isSealed(sealedUser)); // true


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. 옵셔널 체이닝과 console 객체
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 8. 옵셔널 체이닝 — 객체 안전 접근 =====');

// ?. 는 좌측이 null/undefined 이면 즉시 undefined 를 반환합니다.
// 깊게 중첩된 객체 접근 시 매 단계마다 && 로 검사하는 수고를 덜어줍니다.

const apiResponse = {
  data: {
    user: {
      profile: { theme: 'dark' }
    }
  }
};

// ❌ 이전 방식: 매 단계 null 체크 필요
const themeOld =
  apiResponse &&
  apiResponse.data &&
  apiResponse.data.user &&
  apiResponse.data.user.profile &&
  apiResponse.data.user.profile.theme;

// ✅ 옵셔널 체이닝: 한 줄로 안전하게
const theme = apiResponse?.data?.user?.profile?.theme ?? 'light';
console.log(theme); // 'dark'

// 없는 경로 접근 → 에러 없이 undefined
const missing = apiResponse?.data?.settings?.fontSize ?? 14;
console.log(missing); // 14 (기본값)

// 메서드 호출에도 사용
const users = {
  getAdmin() { return { name: 'Admin' }; }
};
console.log(users.getAdmin?.().name); // 'Admin'
console.log(users.getGuest?.()?.name); // undefined (에러 없음)


console.log('\n===== 9. console 객체 — 디버깅 도구 =====');

// console은 Node.js와 브라우저 모두에서 사용 가능한 내장 객체입니다.

// ── 기본 출력 ──────────────────────────────────────────────
console.log('일반 메시지');          // 정보 출력
console.info('정보 메시지');         // log와 동일 (브라우저에서 아이콘 다름)
console.warn('경고 메시지');         // 노란색 경고
console.error('에러 메시지');        // 빨간색 에러

// ── 여러 값 동시 출력 ──────────────────────────────────────
const a = 1, b = 'hello', c = { x: 10 };
console.log('a:', a, '/ b:', b, '/ c:', c);

// ── 포맷 문자열 ────────────────────────────────────────────
// %s=문자열, %d=정수, %f=소수, %o=객체, %c=CSS 스타일(브라우저만)
console.log('%s의 점수는 %d점입니다.', 'Alice', 95);

// ── console.table() — 배열/객체를 표로 출력 ──────────────
const students = [
  { name: 'Alice', score: 95 },
  { name: 'Bob',   score: 87 },
  { name: 'Charlie', score: 92 }
];
console.table(students);
// ┌─────────┬───────────┬───────┐
// │ (index) │   name    │ score │
// ├─────────┼───────────┼───────┤
// │    0    │  'Alice'  │  95   │
// │    1    │   'Bob'   │  87   │
// │    2    │ 'Charlie' │  92   │
// └─────────┴───────────┴───────┘

// ── console.time() / timeEnd() — 실행 시간 측정 ──────────
console.time('배열 생성');
const bigArr = Array.from({ length: 100000 }, (_, i) => i);
console.timeEnd('배열 생성'); // 배열 생성: x.xx ms

// ── console.group() — 출력 그룹화 ─────────────────────────
console.group('사용자 정보');
  console.log('이름: Alice');
  console.log('나이: 25');
  console.group('주소');
    console.log('도시: Seoul');
  console.groupEnd();
console.groupEnd();

// ── console.count() — 호출 횟수 카운트 ───────────────────
function fetchData(endpoint) {
  console.count(`API 호출: ${endpoint}`);
  // ... 실제 fetch 로직
}
fetchData('/users');  // API 호출: /users: 1
fetchData('/posts');  // API 호출: /posts: 1
fetchData('/users');  // API 호출: /users: 2

// ── console.assert() — 조건 거짓일 때만 에러 출력 ────────
const userAge = 17;
console.assert(userAge >= 18, '미성년자입니다:', userAge);
// Assertion failed: 미성년자입니다: 17


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. 실무 패턴 — 객체로 상태 관리하기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 10. 실무 패턴 — 불변 업데이트 =====');

// 리액트 등 프레임워크에서 자주 쓰는 "객체를 직접 수정하지 않고
// 새 객체를 반환"하는 불변 업데이트 패턴입니다.

const state = {
  user: { name: 'Kim', age: 25 },
  settings: { theme: 'light', lang: 'ko' },
  cart: ['item1', 'item2']
};

// ✅ 불변 업데이트: 스프레드로 새 객체를 만들며 필요한 부분만 변경
function updateTheme(currentState, newTheme) {
  return {
    ...currentState,                          // 나머지는 그대로
    settings: {                               // settings만 새 객체로
      ...currentState.settings,
      theme: newTheme                         // theme만 변경
    }
  };
}

const newState = updateTheme(state, 'dark');
console.log(state.settings.theme);    // 'light' — 원본 유지
console.log(newState.settings.theme); // 'dark'  — 새 상태
console.log(state === newState);      // false — 새 객체

// 배열 항목 추가 (불변)
function addToCart(currentState, item) {
  return {
    ...currentState,
    cart: [...currentState.cart, item]  // 기존 배열 + 새 항목
  };
}

const stateWithItem = addToCart(state, 'item3');
console.log(state.cart);        // ['item1', 'item2'] — 원본 유지
console.log(stateWithItem.cart); // ['item1', 'item2', 'item3']
