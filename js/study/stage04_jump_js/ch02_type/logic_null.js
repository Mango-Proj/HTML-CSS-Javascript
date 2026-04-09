// ============================================================
// logic_null.js — Nullish 병합 연산자 (??) + 옵셔널 체이닝 (?.)
//
// || 연산자가 가진 "0과 빈 문자열까지 기본값으로 대체해버리는" 문제를
// 해결하기 위해 ES2020에서 ?? 와 ?. 가 등장했습니다.
// ============================================================


console.log('===== 1. || vs ?? 핵심 차이 =====');

// || (OR): Falsy 값(false, 0, "", null, undefined, NaN)이면 오른쪽 반환
// ??       : null 또는 undefined 일 때만 오른쪽 반환
//            → 0이나 ""도 유효한 값으로 인정!

console.log('--- || 연산자 ---');
console.log(null      || '기본값'); // '기본값'
console.log(undefined || '기본값'); // '기본값'
console.log(0         || '기본값'); // '기본값' ← 0을 유효한 값으로 쓰고 싶어도 덮어씌워짐
console.log(''        || '기본값'); // '기본값' ← 빈 문자열도 덮어씌워짐
console.log(false     || '기본값'); // '기본값'

console.log('\n--- ?? 연산자 ---');
console.log(null      ?? '기본값'); // '기본값'
console.log(undefined ?? '기본값'); // '기본값'
console.log(0         ?? '기본값'); // 0         ← 0은 유효한 값으로 인정
console.log(''        ?? '기본값'); // ''        ← 빈 문자열도 유효한 값으로 인정
console.log(false     ?? '기본값'); // false     ← false도 유효한 값으로 인정


console.log('\n===== 2. ?? 실무 활용 — setupUser =====');

function setupUser(name, age, score) {
  // || 사용: 빈 문자열("")도 Falsy → 'Guest'로 대체됨
  const displayName = name || 'Guest';

  // ?? 사용: null/undefined만 대체 → 0도 유효한 점수로 유지
  const displayAge   = age   ?? '나이 미입력';
  const displayScore = score ?? '점수 없음';

  console.log(`이름: ${displayName}, 나이: ${displayAge}, 점수: ${displayScore}`);
}

setupUser('Kim', 25, 100); // 이름: Kim, 나이: 25, 점수: 100
setupUser('', 0, 0);
// 이름: Guest   ← 빈 문자열은 || 에서 Falsy
// 나이: 0       ← 0은 ?? 에서 유효한 값 (null/undefined 아님)
// 점수: 0       ← 동일

setupUser(null, null, null);
// 이름: Guest, 나이: 나이 미입력, 점수: 점수 없음


console.log('\n===== 3. ?? 활용 — 설정값 우선순위 =====');

// 사용자 설정 → 저장된 설정 → 기본값 순으로 우선순위 적용
function getTheme(userSetting, savedSetting) {
  return userSetting ?? savedSetting ?? 'light';
}

console.log(getTheme('dark', 'blue'));       // 'dark'  — 사용자 설정 우선
console.log(getTheme(null, 'blue'));         // 'blue'  — 사용자 없으면 저장값
console.log(getTheme(null, undefined));      // 'light' — 둘 다 없으면 기본값
console.log(getTheme(undefined, null));      // 'light'
console.log(getTheme('', null));             // ''      ← 빈 문자열도 유효한 설정으로 인정


console.log('\n===== 4. 옵셔널 체이닝 ?. =====');

// ?. 는 좌측 값이 null 또는 undefined면 즉시 undefined를 반환합니다.
// null/undefined의 속성에 접근할 때 발생하는 TypeError를 방지합니다.

// ❌ 문제: null인 객체에 접근하면 에러 발생
const user1 = null;
// console.log(user1.name); // TypeError: Cannot read properties of null

// ✅ 해결 1: if 문으로 체크 (전통적 방법, 코드가 길어짐)
if (user1 && user1.address && user1.address.city) {
  console.log(user1.address.city);
}

// ✅ 해결 2: ?. 옵셔널 체이닝 (간결!)
const user2 = null;
console.log(user2?.name);               // undefined (에러 없음)
console.log(user2?.address?.city);      // undefined (에러 없음)

// 값이 있을 때는 정상 접근
const user3 = {
  name: 'Kim',
  address: {
    city: 'Seoul',
    detail: { street: '테헤란로' }
  }
};
console.log(user3?.name);                          // 'Kim'
console.log(user3?.address?.city);                 // 'Seoul'
console.log(user3?.address?.detail?.street);       // '테헤란로'
console.log(user3?.phone?.number);                 // undefined (phone이 없음)


console.log('\n===== 5. ?. 와 ?? 조합 — 실무 패턴 =====');

// 접근 실패(undefined)면 기본값을 제공하는 가장 깔끔한 패턴
const config = {
  theme: 'dark',
  user: null
};

// config.user가 null이면 ?. 로 undefined 반환 → ?? 로 기본값 적용
const userName = config.user?.name ?? '비로그인';
const userRole = config.user?.role ?? 'guest';

console.log('userName:', userName); // '비로그인'
console.log('userRole:', userRole); // 'guest'

// API 응답처럼 구조가 불확실한 데이터 처리
function getUserCity(apiResponse) {
  // 중첩 접근이 실패해도 에러 없이 기본값 반환
  return apiResponse?.data?.user?.address?.city ?? '도시 정보 없음';
}

console.log(getUserCity(null));                           // '도시 정보 없음'
console.log(getUserCity({ data: null }));                 // '도시 정보 없음'
console.log(getUserCity({ data: { user: { address: { city: 'Busan' } } } })); // 'Busan'


console.log('\n===== 6. ?. 로 메서드 호출 =====');

// 메서드가 존재할 때만 호출하는 패턴
const obj = {
  greet: () => console.log('안녕하세요!')
};

obj.greet?.();        // '안녕하세요!' — 메서드 존재
obj.sayBye?.();       // 아무것도 안 함 (sayBye가 없어 undefined, 에러 없음)
// obj.sayBye();      // TypeError: obj.sayBye is not a function

// 배열 요소 접근에도 사용
const arr = [1, 2, 3];
const emptyArr = null;

console.log(arr?.[0]);       // 1
console.log(emptyArr?.[0]);  // undefined (에러 없음)


console.log('\n===== 7. 논리 할당 연산자 — ||=, &&=, ??= =====');

// ES2021에서 추가된 단축 할당 연산자

let a = null;
let b = 'existing';
let c = 0;

// ??= : 좌측이 null/undefined 일 때만 우측 값 할당
a ??= '기본값';
b ??= '기본값';
console.log('a:', a); // '기본값' (null이었으므로)
console.log('b:', b); // 'existing' (null/undefined 아니므로 유지)

// ||= : 좌측이 Falsy 일 때만 우측 값 할당
c ||= 10;
console.log('c:', c); // 10 (0은 Falsy이므로 10 할당)

// &&= : 좌측이 Truthy 일 때만 우측 값 할당
let d = 'hello';
let e = null;
d &&= 'world'; // d가 Truthy → 'world'로 교체
e &&= 'world'; // e가 Falsy  → 유지
console.log('d:', d); // 'world'
console.log('e:', e); // null
