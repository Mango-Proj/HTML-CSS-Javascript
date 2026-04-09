// ============================================================
// let_const.js — let / const 키워드의 특징
//
// ES6(2015)에서 var의 문제를 해결하기 위해 등장했습니다.
// 현대 자바스크립트에서는 var 대신 let/const를 사용합니다.
// ============================================================

console.log('===== 1. let — 재할당 가능, 중복 선언 불가 =====');

// let은 같은 스코프에서 같은 이름으로 다시 선언하면 에러 발생
let hobby = 'Coding';
console.log(hobby); // 'Coding'

// let hobby = 'Writing'; // SyntaxError: Identifier 'hobby' has already been declared

// 단, 재할당(값 변경)은 가능합니다
hobby = 'Writing'; // 재할당은 OK
console.log(hobby); // 'Writing'


console.log('\n===== 2. const — 재할당 불가 (상수) =====');

// const는 선언과 동시에 반드시 초기화해야 하며, 이후 재할당이 불가능합니다.
const PI = 3.14159;
console.log('PI:', PI);

// PI = 3; // TypeError: Assignment to constant variable.

// 상수 이름은 관례적으로 대문자와 밑줄로 표기합니다 (SCREAMING_SNAKE_CASE)
const MAX_SIZE = 100;
const BASE_URL = 'https://api.example.com';
console.log('MAX_SIZE:', MAX_SIZE);


console.log('\n===== 3. const와 객체/배열 — 참조는 고정, 내용은 변경 가능 =====');

// const는 "변수가 가리키는 주소(참조)"를 고정합니다.
// 객체나 배열의 내부 내용은 변경 가능합니다.

const user = { name: 'Kim', age: 25 };
console.log('초기 user:', user);

user.name = 'Lee';   // 객체 속성 변경 → OK
user.job = 'Dev';    // 속성 추가 → OK
console.log('수정 후 user:', user); // { name: 'Lee', age: 25, job: 'Dev' }

// user = { name: 'Park' }; // TypeError: 객체 자체를 교체하는 건 불가

// 배열도 마찬가지
const fruits = ['apple', 'banana'];
fruits.push('cherry'); // 배열 내용 변경 → OK
console.log('fruits:', fruits); // ['apple', 'banana', 'cherry']

// fruits = ['mango']; // TypeError: 배열 자체를 교체하는 건 불가

// 핵심 개념:
// const는 '값'이 아니라 '참조(메모리 주소)'를 고정합니다.
// 원시값(숫자, 문자열, boolean)은 값 자체가 고정되지만,
// 객체/배열은 내부 내용을 바꿔도 주소는 그대로이므로 const로 막을 수 없습니다.


console.log('\n===== 4. 블록 스코프 (Block Scope) =====');

// let과 const는 {} 블록 안에서만 유효합니다. (var와 가장 큰 차이)

let outerVar = 'outer';

if (true) {
  let innerLet = 'inner';   // 블록 안에서 선언
  const innerConst = 'const inner';
  console.log('블록 안:', innerLet);   // 'inner'
  console.log('블록 안:', innerConst); // 'const inner'
  console.log('블록 안 outerVar:', outerVar); // 'outer' — 바깥 변수는 접근 가능
}

// console.log(innerLet);   // ReferenceError: innerLet is not defined
// console.log(innerConst); // ReferenceError: innerConst is not defined
// → 블록 밖에서는 블록 안의 변수에 접근 불가

// for문에서의 블록 스코프 — var vs let 차이
for (let j = 0; j < 3; j++) {
  // j는 반복문 블록 안에서만 유효
}
// console.log(j); // ReferenceError — j는 밖에서 접근 불가 (var와 다름)
console.log('for let 블록 스코프 확인 완료');


console.log('\n===== 5. let의 TDZ (Temporal Dead Zone) =====');

// let과 const도 호이스팅은 되지만,
// 선언 전에 접근하면 ReferenceError가 발생합니다.
// 이 "선언 전 접근 금지 구간"을 TDZ(일시적 사각지대)라고 합니다.

// console.log(city); // ReferenceError: Cannot access 'city' before initialization
//                     ← 이 줄에서 에러 발생 (var였다면 undefined였을 것)
let city = 'Seoul';
console.log('city:', city); // 'Seoul'

// var와의 차이:
// var  → 선언 전 접근 시: undefined (조용히 넘어감, 버그 숨김)
// let  → 선언 전 접근 시: ReferenceError (즉시 에러, 버그 발견 쉬움)
// const→ 선언 전 접근 시: ReferenceError (동일)


console.log('\n===== 6. var / let / const 선택 기준 =====');

// 규칙 1: 기본적으로 const를 사용합니다.
//         값이 바뀌지 않는다는 의도를 명확히 표현하고,
//         실수로 재할당하는 버그를 방지합니다.

const siteName = '내 블로그'; // 바뀌지 않는 값

// 규칙 2: 값이 바뀌어야 한다면 let을 사용합니다.
let count = 0;
count += 1;
count += 1;
console.log('count:', count); // 2

// 규칙 3: var는 사용하지 않습니다.
//         오래된 코드를 읽을 때 var가 나오면
//         "함수 스코프, 호이스팅 주의" 라고 인식하면 됩니다.

console.log('\n요약: const 우선 → 재할당 필요하면 let → var는 사용 금지');
