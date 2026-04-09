// ============================================================
// hoisting.js — 호이스팅 (Hoisting) 완전 이해
//
// 호이스팅이란?
// 자바스크립트 엔진이 코드를 실행하기 전에 준비(파싱) 단계에서
// 변수 선언과 함수 선언을 해당 스코프의 맨 위로 끌어올리는 현상입니다.
//
// "끌어올린다"는 것은 실제로 코드가 이동하는 것이 아니라,
// 자바스크립트 엔진이 그렇게 동작한다는 의미입니다.
// ============================================================


console.log('===== 1. 함수 선언문 호이스팅 =====');

// 함수 선언문(function 키워드로 시작)은 함수 전체가 호이스팅됩니다.
// 선언 전에 호출해도 정상 작동합니다.

sayHello(); // ← 선언 전에 호출했지만 정상 작동! "Hello!" 출력

function sayHello() {
  console.log('Hello! 저는 함수 선언문입니다.');
}

sayHello(); // 선언 후 호출도 당연히 가능

// 이렇게 동작하는 이유:
// 자바스크립트 엔진은 코드를 위에서 아래로 실행하기 전에,
// 먼저 전체 코드를 훑어보며 함수 선언문을 메모리에 등록합니다.
// 그래서 선언 전에 호출해도 이미 등록되어 있어 작동합니다.


console.log('\n===== 2. var 변수 호이스팅 =====');

// var 변수는 선언만 호이스팅되고, 초기화(값 할당)는 제자리에 남습니다.
// 선언 전에 접근하면 에러 없이 undefined가 반환됩니다.

// 아래 코드의 실제 동작 순서:
// [1단계: 호이스팅] var score; ← 선언이 자동으로 최상단으로 이동
// [2단계: 실행]     console.log(score); → undefined (선언O, 초기화X)
// [3단계: 실행]     score = 100; ← 여기서 초기화

console.log('선언 전 score:', score); // undefined (에러 아님!)
var score = 100;
console.log('선언 후 score:', score); // 100

// 이 동작이 문제인 이유:
// "왜 undefined가 나오지?"라는 버그를 찾기 매우 어렵습니다.
// 에러가 발생하지 않으니 문제가 있다는 것도 모르고 넘어갈 수 있습니다.


console.log('\n===== 3. let / const 호이스팅 — TDZ =====');

// let과 const도 호이스팅이 일어나지만,
// 선언문에 도달하기 전까지 변수에 접근하면 ReferenceError가 발생합니다.
// 이 구간을 TDZ(Temporal Dead Zone, 일시적 사각지대)라고 합니다.

// console.log(city); // ReferenceError: Cannot access 'city' before initialization
//                    ← 이 줄이 TDZ 구간에 있어서 에러 발생
let city = 'Seoul';
console.log('city:', city); // 'Seoul' ← 선언 이후에는 정상 접근 가능

// TDZ가 있는 이유:
// var처럼 "선언 전에 undefined 반환"하는 것보다
// "에러를 즉시 발생"시키는 것이 버그를 빨리 찾는 데 도움이 됩니다.

// var와 let의 호이스팅 비교:
// var  선언 전 접근 → undefined (조용히 넘어감)
// let  선언 전 접근 → ReferenceError (즉시 오류 발생)
// const 선언 전 접근 → ReferenceError (동일)


console.log('\n===== 4. 함수 표현식의 호이스팅 =====');

// 함수 표현식(변수에 함수를 할당)은 변수의 호이스팅 규칙을 따릅니다.
// → var에 할당: 선언 전 접근 시 undefined (TypeError 발생)
// → let/const에 할당: 선언 전 접근 시 ReferenceError

// printBye(); // TypeError: printBye is not a function
//             ← var로 선언되어 호이스팅 시 printBye = undefined
//               undefined를 함수처럼 호출하려 해서 TypeError 발생

var printBye = function () {
  console.log('Bye!');
};
printBye(); // 선언 이후에는 정상 작동

// const로 선언한 함수 표현식
// greetUser(); // ReferenceError: Cannot access 'greetUser' before initialization
const greetUser = function () {
  console.log('안녕하세요!');
};
greetUser(); // 선언 이후에는 정상 작동

// 화살표 함수도 함수 표현식이므로 같은 규칙이 적용됩니다
// add(1, 2); // ReferenceError
const add = (a, b) => a + b;
console.log('add(3, 4):', add(3, 4)); // 7


console.log('\n===== 5. 호이스팅 정리 =====');

// ┌──────────────────┬──────────────────┬────────────────────────┐
// │   선언 방식       │   호이스팅 여부   │   선언 전 접근 결과     │
// ├──────────────────┼──────────────────┼────────────────────────┤
// │ var 변수          │       O          │   undefined            │
// │ let 변수          │       O (TDZ)    │   ReferenceError       │
// │ const 변수        │       O (TDZ)    │   ReferenceError       │
// │ 함수 선언문        │       O (전체)   │   정상 작동             │
// │ 함수 표현식(var)   │       O (undefined)│ TypeError            │
// │ 함수 표현식(const) │       O (TDZ)    │   ReferenceError       │
// └──────────────────┴──────────────────┴────────────────────────┘

// 실무 권장 방식:
// 함수는 항상 선언 후 사용하는 습관을 들이면 호이스팅 문제를 예방할 수 있습니다.
// 특히 함수 표현식(const fn = ...)은 선언 전에 절대 사용하지 않습니다.

console.log('\n호이스팅 학습 완료!');
