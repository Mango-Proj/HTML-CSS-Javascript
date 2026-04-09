// ============================================================
// abref.js — 단축 평가 (Short-circuit Evaluation)
//            + Truthy / Falsy + 형 변환
//
// 단축 평가란?
// 논리 연산자(&&, ||)가 결과를 확정할 수 있는 시점에서
// 나머지 식을 실행하지 않고 즉시 값을 반환하는 동작입니다.
// ============================================================


console.log('===== 1. Truthy / Falsy =====');

// 자바스크립트의 모든 값은 조건문에서 true 또는 false로 취급됩니다.
// Boolean으로 변환했을 때 false가 되는 값들 → Falsy

const falsyValues = [false, 0, -0, 0n, '', "", ``, null, undefined, NaN];
//                                                    ^ 빈 문자열 3종류

console.log('--- Falsy 값 확인 ---');
falsyValues.forEach(val => {
  console.log(`Boolean(${String(val) || "''"}) → ${Boolean(val)}`);
});

// Truthy: Falsy가 아닌 모든 값
// 주의: 빈 배열 []과 빈 객체 {}는 Truthy입니다!
console.log('\n--- 주의: 빈 배열/객체는 Truthy ---');
console.log('Boolean([])  :', Boolean([]));  // true — 빈 배열도 Truthy
console.log('Boolean({})  :', Boolean({}));  // true — 빈 객체도 Truthy
console.log('Boolean("0") :', Boolean('0')); // true — 문자열 "0"도 Truthy (숫자 0과 다름)
console.log('Boolean(-1)  :', Boolean(-1));  // true — 음수도 Truthy


console.log('\n===== 2. || 단축 평가 — 첫 번째 Truthy 값 반환 =====');

// || 는 왼쪽부터 평가하다가 Truthy 값을 만나는 순간 그 값을 반환합니다.
// 모두 Falsy이면 마지막 값을 반환합니다.

console.log(false || 'hello');   // 'hello' — false는 Falsy이므로 다음 값 반환
console.log(null || undefined);  // undefined — 둘 다 Falsy, 마지막 값 반환
console.log(0 || 'default');     // 'default' — 0은 Falsy
console.log('value' || 'back');  // 'value' — 'value'는 Truthy, 즉시 반환

// 실무 활용: 기본값(default value) 설정
function greet(msg) {
  // msg가 undefined/null/빈문자열이면 기본 메시지 사용
  const finalMsg = msg || '안녕하세요!';
  console.log(finalMsg);
}

greet('반갑습니다'); // '반갑습니다'
greet();             // '안녕하세요!' — msg가 undefined이므로

// ⚠️  || 의 함정: 0이나 빈 문자열("")도 Falsy로 취급해서 기본값을 씌워버림
function showCount(count) {
  const display = count || '카운트 없음';
  console.log(display);
}
showCount(5);  // 5
showCount(0);  // '카운트 없음' ← 0을 원했는데 기본값으로 덮어씀!
// 이 문제는 ?? 로 해결합니다 (logic_null.js 참고)


console.log('\n===== 3. && 단축 평가 — 첫 번째 Falsy 값 반환 =====');

// && 는 왼쪽부터 평가하다가 Falsy 값을 만나는 순간 그 값을 반환합니다.
// 모두 Truthy이면 마지막 값을 반환합니다.

console.log(true && 'hello');    // 'hello' — true는 Truthy, 다음 값 반환
console.log(false && 'hello');   // false — false는 Falsy, 즉시 반환
console.log(null && 'hello');    // null — null은 Falsy, 즉시 반환
console.log('a' && 'b' && 'c'); // 'c' — 모두 Truthy, 마지막 값 반환

// 실무 활용 1: 조건부 실행 (if 문 대체)
const isLoggedIn = true;
const userNickname = 'CodingMaster';

// if (isLoggedIn) { console.log(...) } 와 동일한 효과
isLoggedIn && console.log(`환영합니다, ${userNickname}님!`);

const isAdmin = false;
isAdmin && console.log('관리자 메뉴'); // isAdmin이 false → 오른쪽 실행 안 됨

// 실무 활용 2: 객체가 있을 때만 속성 접근
const userObj = { name: 'Kim', role: 'admin' };
const noUser = null;

// userObj가 Truthy이면 .name 접근, Falsy이면 userObj 자체 반환
console.log(userObj && userObj.name);  // 'Kim'
console.log(noUser && noUser.name);    // null (에러 없이 null 반환)


console.log('\n===== 4. 형 변환 (Type Conversion) =====');

// 4-1. 묵시적 형 변환: 자바스크립트가 자동으로 타입을 변환
console.log('--- 묵시적 형 변환 ---');

// + 연산자: 문자열이 하나라도 있으면 문자열 연결
console.log(1 + '2');      // '12' (숫자 + 문자열 → 문자열)
console.log('3' + 4 + 5);  // '345' (왼쪽부터 순서대로)
console.log(3 + 4 + '5');  // '75' (3+4=7, 7+'5'='75')

// - * / 연산자: 숫자로 변환 후 계산
console.log('5' - 2);   // 3
console.log('4' * '3'); // 12
console.log('10' / 2);  // 5
console.log('abc' - 1); // NaN (문자열을 숫자로 변환 실패)

// 비교 연산자
console.log(0 == false);   // true (타입 다르지만 같다고 판단 — 위험!)
console.log('' == false);  // true
console.log(null == undefined); // true
console.log(0 === false);  // false (=== 는 타입까지 비교)

// 4-2. 명시적 형 변환: 개발자가 직접 변환
console.log('\n--- 명시적 형 변환 ---');

// 숫자 변환
console.log(Number('42'));       // 42
console.log(Number(''));         // 0 — 빈 문자열은 0
console.log(Number(true));       // 1
console.log(Number(false));      // 0
console.log(Number(null));       // 0
console.log(Number(undefined));  // NaN
console.log(Number('abc'));      // NaN

console.log(parseInt('42px'));   // 42 — 숫자 부분만 추출
console.log(parseFloat('3.14m'));// 3.14

// 문자열 변환
console.log(String(42));        // '42'
console.log(String(true));      // 'true'
console.log(String(null));      // 'null'
console.log(String(undefined)); // 'undefined'
console.log((42).toString());   // '42'

// 불리언 변환
console.log(Boolean(1));    // true
console.log(Boolean(0));    // false
console.log(Boolean('hi')); // true
console.log(Boolean(''));   // false


console.log('\n===== 5. 비교 연산자 == vs === =====');

// == (동등 연산자): 타입을 자동 변환한 후 비교 → 예측하기 어려운 결과
console.log('== 비교 (타입 변환 발생):');
console.log(1 == '1');      // true  (문자열 '1'을 숫자 1로 변환)
console.log(0 == false);    // true  (false를 숫자 0으로 변환)
console.log(null == undefined); // true (특수 케이스)
console.log([] == false);   // true  (배열을 숫자 0으로 변환)

// === (일치 연산자): 타입 변환 없이 값과 타입 모두 비교 → 예측 가능
console.log('\n=== 비교 (타입 변환 없음):');
console.log(1 === '1');     // false (타입 다름)
console.log(0 === false);   // false (타입 다름)
console.log(null === undefined); // false (타입 다름)

// ✅ 실무에서는 항상 === 를 사용합니다
// == 는 예외적인 경우(null/undefined 동시 체크)에만 씁니다
const val = null;
if (val == null) {
  console.log('val은 null 또는 undefined'); // null과 undefined 모두 잡음
}
