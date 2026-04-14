// ============================================================
// variables.js — 변수와 상수 완전 정복
//
// 변수(Variable): 데이터를 저장하는 이름 붙은 메모리 공간입니다.
// 실제 메모리 주소 대신 이름으로 값에 접근하고 관리할 수 있습니다.
//
// 선언 키워드 3가지:
//   var   — 함수 스코프, 호이스팅, 재선언·재할당 가능 (구식, 비권장)
//   let   — 블록 스코프, 재할당 가능                  (값이 바뀔 때)
//   const — 블록 스코프, 재할당 불가                  (값이 고정될 때)
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. var — 구식 선언 (알아두되 사용 비권장)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. var =====');

// var 는 ES6(2015) 이전에 변수를 선언하던 방식입니다.
// 세 가지 문제가 있어 현재는 let / const 를 대신 사용합니다.

// 문제 1: 재선언 가능 — 같은 이름을 실수로 다시 선언해도 오류 없음
var city = '서울';
var city = '부산'; // ❌ 재선언해도 에러가 발생하지 않음 → 버그 원인
console.log('var 재선언:', city); // '부산'

// 문제 2: 함수 스코프 — 블록 {} 내에서 선언해도 블록 밖에서 접근 가능
{
    var blockVar = '블록 안에서 선언';
}
console.log('블록 밖에서 접근:', blockVar); // '블록 안에서 선언' — 의도치 않은 접근

// 문제 3: 호이스팅(Hoisting) — 선언이 코드 최상단으로 끌어올려짐
// (hoisting 은 hoisting.js 에서 자세히 다룹니다)
console.log('선언 전 var 접근:', hoistedVar); // undefined (에러 없음 — 위험!)
var hoistedVar = '나중에 선언됨';


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. let — 재할당 가능한 변수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. let =====');

// ① 선언만 하기 (값 없음)
// 값을 할당하지 않으면 JS 엔진이 자동으로 undefined 를 넣습니다.
// undefined: "선언은 됐지만 아직 값이 없다"는 의미의 특수값
let userName;
console.log('선언만 한 변수:', userName); // undefined

// ② 초기화 (처음으로 값 할당)
userName = '홍길동';
console.log('초기화 후:', userName); // '홍길동'

// ③ 재할당 (값 변경)
userName = '고길동';
console.log('재할당 후:', userName); // '고길동'

// ④ 선언과 초기화를 한 줄에
let userAge = 28;
console.log('나이:', userAge); // 28

// ⑤ 블록 스코프 — {} 안에서 선언한 변수는 밖에서 접근 불가
{
    let blockLet = '블록 안 변수';
    console.log('블록 안:', blockLet); // '블록 안 변수'
}
// console.log(blockLet); // ❌ ReferenceError: blockLet is not defined

// ⑥ 재선언 불가 — var 의 문제 해결
let score = 100;
// let score = 200; // ❌ SyntaxError: Identifier 'score' has already been declared

score = 90; // 재할당은 가능
console.log('점수:', score);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. const — 상수 (재할당 불가)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. const =====');

// 상수(Constant): 한 번 정해지면 변하지 않는 값
// const 는 선언할 때 반드시 값을 할당해야 합니다.

// ① 기본 사용 — 선언과 동시에 초기화 (필수)
const MAX_SCORE = 100;          // 관례: 불변 상수는 대문자+언더스코어
const PI = 3.14159265358979;
const SITE_NAME = '자바스크립트 스터디';

console.log('MAX_SCORE:', MAX_SCORE); // 100
console.log('PI:', PI);
console.log('사이트명:', SITE_NAME);

// ② 재할당 시 TypeError 발생
// MAX_SCORE = 200; // ❌ TypeError: Assignment to constant variable.

// ③ 선언만 하면 SyntaxError 발생 (let 과 다른 점)
// const discountRate; // ❌ SyntaxError: Missing initializer in const declaration

// ④ 일반 변수에도 const 우선 사용 — 값이 바뀔 필요가 없으면 const
const birthYear = 1995;
const language = 'JavaScript';
console.log(`${language} 탄생 연도: ${birthYear}`);

// ⑤ const + 객체/배열 — 참조는 고정, 내부 값은 변경 가능
// (참조 타입의 const 는 ref_type.js 에서 자세히 다룹니다)
const user = { name: '김철수', age: 25 };
user.name = '이영희'; // ✅ 내부 속성 변경은 가능
console.log('user:', user); // { name: '이영희', age: 25 }
// user = {}; // ❌ 참조 자체를 다시 할당하는 것은 불가


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. 변수 명명 규칙
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. 명명 규칙 =====');

// [필수 규칙]
// ✅ 영문자, 숫자, _, $ 만 사용 가능
// ✅ 숫자로 시작할 수 없음
// ✅ 예약어(let, const, if, for ...) 사용 불가
// ✅ 대소문자 구분 — userName ≠ Username ≠ username

// ❌ 잘못된 예시 (주석으로만 표시)
// let 123abc;    // 숫자로 시작
// let my-name;   // 하이픈 사용
// let let;       // 예약어

// ✅ 올바른 예시
let _privateVar = '언더스코어로 시작 가능';
let $jqueryStyle = '달러로 시작 가능';

// [관례: 네이밍 스타일]

// 1) camelCase — 자바스크립트 변수·함수 기본 스타일
let firstName = '길동';
let lastName = '홍';
let totalItemCount = 5;
let isLoggedIn = true;
let getUserInfo = function () {}; // 함수 이름도 camelCase

console.log('camelCase:', firstName, lastName);

// 2) PascalCase — 클래스, 생성자 함수 이름에 사용
// class UserProfile { ... }
// function Person() { ... }

// 3) SCREAMING_SNAKE_CASE — 변경되지 않는 전역 상수
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_TIMEOUT_MS = 5000;

console.log('상수:', MAX_RETRY_COUNT, API_BASE_URL);

// 4) boolean 변수 — is / has / can 접두사 관례
let isVisible = true;
let hasPermission = false;
let canEdit = true;

console.log('isVisible:', isVisible);
console.log('hasPermission:', hasPermission);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. 기본 데이터 타입 — 변수에 담기는 값의 종류
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. 기본 데이터 타입 =====');

// 자바스크립트는 동적 타입 언어입니다.
// 변수를 선언할 때 타입을 지정하지 않아도 되며,
// 같은 변수에 다른 타입의 값을 나중에 다시 할당할 수 있습니다.

// ── 원시 타입 (Primitive Type) ──────────────────────────────
// 값 자체가 저장됩니다. 불변(immutable)입니다.

// 1) number — 정수와 실수 모두 포함 (64비트 부동소수점)
let integer = 42;
let float = 3.14;
let negative = -100;
let infinity = Infinity;    // 무한대
let notANum = NaN;          // Not a Number (숫자 연산 실패 시 반환)

console.log('number:', integer, float, negative);
console.log('Infinity:', infinity);     // Infinity
console.log('NaN:', notANum);           // NaN
console.log('NaN 타입:', typeof notANum); // 'number' ← NaN도 number 타입

// 2) string — 문자열 (따옴표로 감싸기: '', "", `` 모두 가능)
let single = '작은따옴표';
let double = "큰따옴표";
let template = `백틱(템플릿 리터럴)`;
let greeting = `안녕하세요, ${firstName}님!`; // 표현식 삽입 가능

console.log('string:', single, double, template);
console.log('템플릿 리터럴:', greeting); // '안녕하세요, 길동님!'

// 3) boolean — true / false 두 값만 존재
let isActive = true;
let isMember = false;
let comparison = 10 > 5; // 비교 연산 결과도 boolean
console.log('boolean:', isActive, isMember, comparison);

// 4) undefined — 선언만 하고 값이 없을 때 자동 부여되는 값
let notAssigned;
console.log('undefined:', notAssigned);          // undefined
console.log('타입:', typeof notAssigned);         // 'undefined'

// 5) null — "값이 없음"을 의도적으로 나타낼 때 명시적으로 할당
let emptyValue = null;
console.log('null:', emptyValue);
console.log('타입:', typeof emptyValue); // 'object' ← JS 초기 버그, 지금도 유지됨

// undefined vs null 차이
// undefined: JS 엔진이 자동으로 넣는 값 → "아직 값이 없다"
// null:      개발자가 의도적으로 넣는 값 → "값이 없음을 명시"

// 6) bigint — 매우 큰 정수 (숫자 끝에 n 표기, ES2020)
const bigNumber = 9007199254740991n; // Number.MAX_SAFE_INTEGER 초과
const huge = 123456789012345678901234567890n;
console.log('bigint:', bigNumber);
console.log('타입:', typeof bigNumber); // 'bigint'

// 7) symbol — 유일한 식별자 (고급 주제, 나중에 자세히 학습)
const sym1 = Symbol('id');
const sym2 = Symbol('id');
console.log('symbol 비교:', sym1 === sym2); // false — 항상 유일
console.log('타입:', typeof sym1); // 'symbol'


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. typeof — 타입 확인 연산자
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. typeof =====');

// typeof 연산자는 값의 타입을 문자열로 반환합니다.
// 변수에 어떤 타입의 값이 들어있는지 확인할 때 사용합니다.

console.log(typeof 42);          // 'number'
console.log(typeof 3.14);        // 'number'
console.log(typeof 'hello');     // 'string'
console.log(typeof true);        // 'boolean'
console.log(typeof undefined);   // 'undefined'
console.log(typeof null);        // 'object'  ← 역사적 버그
console.log(typeof {});          // 'object'
console.log(typeof []);          // 'object'  ← 배열도 object
console.log(typeof function(){}); // 'function'
console.log(typeof Symbol());    // 'symbol'
console.log(typeof 1n);          // 'bigint'

// 타입에 따라 다른 처리를 할 때
function printValue(val) {
    if (typeof val === 'string') {
        console.log(`문자열: "${val}"`);
    } else if (typeof val === 'number') {
        console.log(`숫자: ${val}`);
    } else if (typeof val === 'boolean') {
        console.log(`불리언: ${val}`);
    } else {
        console.log(`기타 타입: ${typeof val}`);
    }
}

printValue('안녕');    // 문자열: "안녕"
printValue(100);      // 숫자: 100
printValue(true);     // 불리언: true
printValue(null);     // 기타 타입: object


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 7. 템플릿 리터럴 — 문자열 조합
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 7. 템플릿 리터럴 =====');

// 템플릿 리터럴: 백틱(`)으로 감싸며 ${표현식}으로 값을 삽입합니다.
// 기존 문자열 연결(+) 방식보다 가독성이 훨씬 좋습니다.

const productName = '노트북';
const price = 1200000;
const qty = 2;

// 기존 방식 — 문자열 + 연산자로 연결 (가독성 낮음)
const msgOld = '상품: ' + productName + ', 가격: ' + price + '원, 수량: ' + qty + '개';
console.log('기존 방식:', msgOld);

// 템플릿 리터럴 — ${} 안에 변수나 표현식 직접 삽입
const msgNew = `상품: ${productName}, 가격: ${price.toLocaleString()}원, 수량: ${qty}개`;
console.log('템플릿 리터럴:', msgNew);

// ${} 안에는 모든 JS 표현식을 쓸 수 있습니다
const a = 10;
const b = 20;
console.log(`${a} + ${b} = ${a + b}`);           // 10 + 20 = 30
console.log(`총 금액: ${(price * qty).toLocaleString()}원`); // 2,400,000원
console.log(`할인 적용: ${price > 1000000 ? '가능' : '불가'}`); // 삼항 연산자도 가능

// 여러 줄 문자열 — 백틱은 줄바꿈을 그대로 유지합니다
const multiLine = `
  이름: ${firstName} ${lastName}
  나이: ${userAge}세
  로그인: ${isLoggedIn ? '완료' : '미완료'}
`;
console.log(multiLine);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 8. let vs const 선택 기준
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 8. let vs const 선택 기준 =====');

// 원칙: 기본적으로 const 를 사용하고, 재할당이 필요한 경우에만 let 을 사용합니다.
// const 를 기본으로 쓰면 코드의 의도가 명확해지고 실수를 줄일 수 있습니다.

// ✅ const — 재할당이 없는 경우 (대부분)
const TAX_RATE = 0.1;
const MAX_LOGIN_ATTEMPTS = 5;
const appVersion = '1.0.0';
const API_URL = 'https://api.example.com/v1';

// ✅ let — 값이 바뀌어야 하는 경우
let loginAttempts = 0;
let currentScore = 0;
let isLoading = false;

// 카운터 — 반드시 let
for (let i = 0; i < 3; i++) {
    loginAttempts++;
    console.log(`로그인 시도 ${i + 1}회`);
}

// 누적 계산 — let
const items = [1000, 2000, 3000];
let total = 0;
items.forEach((item) => {
    total += item; // 누적이므로 let 필요
});
console.log('합계:', total); // 6000

// 구분 기준
console.log('\n[const 사용]:', appVersion, TAX_RATE);
console.log('[let 사용]:', loginAttempts, currentScore);
