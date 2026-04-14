// ============================================================
// methods.js — 자바스크립트 함수(Function) 완전 정복
//
// 함수: 특정 작업을 수행하는 재사용 가능한 코드 블록.
// 필요할 때마다 호출하여 사용하므로 코드의 재사용성과 유지보수성을 높입니다.
//
// 선언 방식:
//   함수 선언식  — function 키워드, 호이스팅 O
//   함수 표현식  — 변수에 할당, 호이스팅 X (TDZ)
//   화살표 함수  — ES6, 간결한 문법, this 바인딩 없음
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. 함수 선언식 (Function Declaration)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. 함수 선언식 =====');

// function 키워드 + 함수명 + 매개변수 목록 + 함수 본문
// 매개변수(Parameter): 함수가 받을 값의 이름 (선언부의 변수명)
// 인수(Argument):      실제로 전달하는 값 (호출부의 값)

// ① 매개변수 없는 함수 — 항상 동일한 동작
function printGreeting() {
    console.log('안녕하세요! 방문해 주셔서 감사합니다.');
}

printGreeting(); // 함수 이름 + () 로 호출

// ② 매개변수 있는 함수 — 전달된 값에 따라 결과가 달라짐
function showMessage(eventName, receiver) {
    console.log(`행복한 ${eventName} 되세요, ${receiver}님!`);
}

showMessage('생일',    '홍길동'); // 행복한 생일 되세요, 홍길동님!
showMessage('새해',    '김영희'); // 행복한 새해 되세요, 김영희님!
showMessage('크리스마스'); // 두 번째 인수 없음 → receiver = undefined

// ③ 반환값 있는 함수 — 결과를 변수에 받아 재사용 가능
function add(a, b) {
    return a + b; // 계산 결과를 호출한 쪽으로 돌려줌
}

const result1 = add(5, 7);   // 12
const result2 = add(10, 20); // 30
console.log(`5 + 7 = ${result1}`);
console.log(`10 + 20 = ${result2}`);
console.log(`합계: ${add(result1, result2)}`); // 함수 호출을 직접 인수로 전달


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. 호이스팅 (Hoisting)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. 호이스팅 =====');

// 호이스팅: 자바스크립트 엔진이 코드를 실행하기 전에
// 함수·변수 선언을 코드 상단으로 끌어올리는 동작.

// ① 함수 선언식은 호이스팅 됨 — 선언 전에 호출해도 동작
console.log(multiplyHoisted(3, 4)); // 12 — 선언 전이지만 정상 작동!

function multiplyHoisted(a, b) {
    return a * b;
}

// ② 함수 표현식(const/let)은 호이스팅 안 됨 — 선언 전 호출 시 에러
// console.log(multiplyExpr(3, 4)); // ❌ ReferenceError: Cannot access before initialization

const multiplyExpr = function (a, b) {
    return a * b;
};

console.log(multiplyExpr(3, 4)); // 12 — 선언 이후 호출은 정상

// ③ 호이스팅을 의존하는 코드는 가독성이 낮아짐 → 선언 후 호출을 권장
console.log('호이스팅은 가능하지만, 선언 후 호출하는 습관을 권장합니다.');


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. return 문 — 반환값과 함수 종료
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. return 문 =====');

// return 의 두 가지 역할:
//   1) 값을 호출한 쪽으로 돌려줌
//   2) 함수 실행을 즉시 종료 (이후 코드 실행 안 됨)

// ① 조건에 따른 다중 return
function checkAge(age) {
    if (age >= 20) {
        return '성인입니다.'; // 여기서 함수 종료
    }
    return '보호자의 동의가 필요합니다.'; // 위 조건 불만족 시 실행
}

console.log(checkAge(25)); // 성인입니다.
console.log(checkAge(16)); // 보호자의 동의가 필요합니다.

// ② return 이 없으면 undefined 반환
function noReturn() {
    console.log('반환값 없음');
    // return 문 없음
}

const value = noReturn(); // 'return값 없음' 출력
console.log('반환값:', value); // undefined

// ③ return 으로 조기 종료 — 가드 패턴
function divide(a, b) {
    if (b === 0) {
        console.log('오류: 0으로 나눌 수 없습니다.');
        return; // undefined 반환하며 종료
    }
    return a / b; // b가 0이 아닐 때만 실행
}

console.log(divide(10, 2)); // 5
console.log(divide(10, 0)); // 오류 메시지 출력, undefined 반환

// ④ return 이 있는 함수와 없는 함수의 차이
// 값을 계산해 돌려주는 함수 → return 필수
// 화면 출력·상태 변경 등 부수 효과가 목적인 함수 → return 선택


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. 매개변수 심화
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. 매개변수 심화 =====');

// ── 4-1. 기본값 매개변수 (Default Parameters, ES6) ───────────

// 인수가 전달되지 않거나 undefined 일 때 기본값이 사용됩니다.
function orderCoffee(type = '아메리카노', size = 'Tall') {
    console.log(`${type}, ${size} 사이즈로 주문하셨습니다.`);
}

orderCoffee();                    // 아메리카노, Tall 사이즈
orderCoffee('라떼');              // 라떼, Tall 사이즈
orderCoffee('카푸치노', 'Grande'); // 카푸치노, Grande 사이즈
orderCoffee(undefined, 'Venti'); // 첫 번째 undefined → 기본값 '아메리카노' 사용

// 기본값에 표현식도 사용 가능
function createId(prefix = 'user', timestamp = Date.now()) {
    return `${prefix}_${timestamp}`;
}
console.log(createId());          // user_<timestamp>
console.log(createId('admin'));   // admin_<timestamp>


// ── 4-2. 나머지 매개변수 (Rest Parameters, ES6) ────────────

// ...변수명 — 정해지지 않은 수의 인수를 배열로 받습니다.
// 반드시 매개변수 목록의 마지막에 위치해야 합니다.

function sumAll(...numbers) { // 모든 인수를 배열로 받음
    let total = 0;
    for (const n of numbers) {
        total += n;
    }
    return total;
}

console.log(sumAll(1, 2, 3));          // 6
console.log(sumAll(10, 20, 30, 40));   // 100
console.log(sumAll(5));                // 5

// 앞 매개변수와 혼합 사용
function introduce(name, age, ...hobbies) {
    console.log(`이름: ${name}, 나이: ${age}`);
    console.log(`취미: ${hobbies.join(', ')}`);
}

introduce('홍길동', 28, '독서', '여행', '요리');
// 이름: 홍길동, 나이: 28
// 취미: 독서, 여행, 요리


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. 함수 표현식 (Function Expression)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. 함수 표현식 =====');

// 함수를 값처럼 변수에 저장합니다.
// 익명 함수 또는 기명 함수 표현식 모두 사용 가능.

// ① 익명 함수 표현식 (가장 일반적)
const square = function (n) {
    return n * n;
};

console.log(square(5));  // 25
console.log(square(9));  // 81

// ② 기명 함수 표현식 — 외부에서는 변수명으로만 호출 가능
// 함수 내부에서 자기 자신을 재귀 호출할 때 이름을 사용할 수 있습니다.
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1); // 내부에서 'fact' 로 재귀 호출 가능
};

console.log(factorial(5)); // 120 (5 × 4 × 3 × 2 × 1)
// fact(5); // ❌ ReferenceError — 외부에서는 'fact' 이름 사용 불가

// ③ 함수를 변수처럼 전달 — 함수도 값(일급 객체)
function applyTwice(fn, value) {
    return fn(fn(value)); // fn 을 두 번 적용
}

const double = function (x) { return x * 2; };
console.log(applyTwice(double, 3)); // 12 (3 → 6 → 12)


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. 화살표 함수 (Arrow Function, ES6)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. 화살표 함수 =====');

// (매개변수) => 표현식  or  (매개변수) => { 본문; return 값; }
// 익명 함수이므로 보통 변수에 할당하여 사용합니다.

// ① 기본 형태 — 중괄호 + return
const multiply = (a, b) => {
    return a * b;
};
console.log(multiply(3, 7)); // 21

// ② 본문이 단일 표현식 — 중괄호·return 생략 (묵시적 반환)
const addArrow = (a, b) => a + b;
console.log(addArrow(4, 6)); // 10

// ③ 매개변수가 1개 — 괄호 생략 가능
const double2 = n => n * 2;
console.log(double2(8)); // 16

// ④ 매개변수 없음 — 빈 괄호 필수
const sayHi = () => console.log('Hi!');
sayHi();

// ⑤ 객체 리터럴 반환 — 괄호로 감싸야 함 (중괄호와 구분)
const makeUser = (name, age) => ({ name, age }); // ({ ... }) 로 감쌈
console.log(makeUser('Alice', 30)); // { name: 'Alice', age: 30 }

// ⑥ 여러 줄 본문 — 중괄호 + return 필수
const calcBMI = (weight, height) => {
    const bmi = weight / (height * height);
    return bmi.toFixed(1);
};
console.log('BMI:', calcBMI(70, 1.75)); // BMI: 22.9


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 7. 함수 선언식 vs 표현식 vs 화살표 함수 비교
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 7. 세 가지 방식 비교 =====');

// 동일한 기능을 세 가지 방식으로 작성

// 함수 선언식
function greetDecl(name) {
    return `안녕하세요, ${name}님!`;
}

// 함수 표현식
const greetExpr = function (name) {
    return `안녕하세요, ${name}님!`;
};

// 화살표 함수
const greetArrow = (name) => `안녕하세요, ${name}님!`;

console.log(greetDecl('철수'));  // 안녕하세요, 철수님!
console.log(greetExpr('영희'));  // 안녕하세요, 영희님!
console.log(greetArrow('민준')); // 안녕하세요, 민준님!

// 배열 메서드와 함께 사용할 때 화살표 함수가 가장 간결
const nums = [1, 2, 3, 4, 5];

const doubled    = nums.map(n => n * 2);          // [2, 4, 6, 8, 10]
const evens      = nums.filter(n => n % 2 === 0); // [2, 4]
const total      = nums.reduce((acc, n) => acc + n, 0); // 15

console.log('두 배:', doubled);
console.log('짝수:', evens);
console.log('합계:', total);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 8. 스코프 (Scope) — 변수의 유효 범위
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 8. 스코프 =====');

// 스코프: 변수에 접근할 수 있는 유효 범위.
// 전역 스코프: 함수 밖에서 선언 → 어디서든 접근 가능
// 지역 스코프: 함수 안에서 선언 → 함수 내부에서만 접근 가능

const globalVar = '전역 변수'; // 전역 스코프

function scopeDemo() {
    const localVar = '지역 변수'; // 지역 스코프 (함수 내부에서만 유효)
    console.log('함수 내부:', globalVar); // 전역 변수 접근 가능
    console.log('함수 내부:', localVar);  // 지역 변수 접근 가능
}

scopeDemo();
console.log('함수 외부:', globalVar); // 접근 가능
// console.log(localVar); // ❌ ReferenceError — 지역 변수는 외부에서 접근 불가

// 블록 스코프 — let/const 는 {} 블록 내에서만 유효
{
    const blockVar = '블록 변수';
    console.log('블록 내부:', blockVar); // 접근 가능
}
// console.log(blockVar); // ❌ ReferenceError

// 변수 쉐도잉 — 안쪽 스코프에서 같은 이름 사용 시 안쪽 값이 우선
const shadow = '전역';
function shadowDemo() {
    const shadow = '지역'; // 전역 shadow 를 가리지만, 전역 값은 변하지 않음
    console.log('함수 내부 shadow:', shadow); // '지역'
}
shadowDemo();
console.log('전역 shadow:', shadow); // '전역' — 변하지 않음


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 9. 콜백 함수 (Callback Function)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 9. 콜백 함수 =====');

// 콜백: 다른 함수에 인수로 전달되어 나중에 호출되는 함수.
// 배열 메서드(forEach, map, filter 등)가 대표적인 콜백 활용 사례.

// ① 함수를 인수로 전달 — 직접 정의한 콜백
function processData(data, callback) {
    const result = callback(data); // 전달받은 함수(callback)를 실행
    console.log('처리 결과:', result);
}

function toUpperCase(str) {
    return str.toUpperCase();
}

processData('hello world', toUpperCase); // HELLO WORLD

// ② 인라인 익명 함수 콜백
processData('hello world', function (str) {
    return str.split('').reverse().join(''); // 문자열 뒤집기
});

// ③ 인라인 화살표 함수 콜백 (가장 간결)
processData('hello world', str => str.replace(/\s/g, '_'));

// ④ 배열 메서드에서의 콜백
const students = [
    { name: 'Alice', score: 88 },
    { name: 'Bob',   score: 72 },
    { name: 'Carol', score: 95 },
    { name: 'Dave',  score: 65 },
];

// 80점 이상 학생만 필터링 (filter 의 콜백)
const topStudents = students.filter(s => s.score >= 80);
console.log('상위권:', topStudents.map(s => s.name)); // ['Alice', 'Carol']

// 점수 내림차순 정렬 (sort 의 콜백)
const ranked = [...students].sort((a, b) => b.score - a.score);
console.log('순위:', ranked.map(s => `${s.name}(${s.score})`));


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 10. 실전 패턴
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 10. 실전 패턴 =====');

// ── 패턴 1: 유효성 검사 함수 ─────────────────────────────────
function isValidEmail(email) {
    // 간단한 이메일 형식 검사 (@ 포함 여부)
    return typeof email === 'string' && email.includes('@') && email.includes('.');
}

console.log(isValidEmail('user@example.com')); // true
console.log(isValidEmail('invalid-email'));     // false
console.log(isValidEmail(''));                  // false


// ── 패턴 2: 범용 계산 함수 ───────────────────────────────────
function calculate(a, b, operator = '+') {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : '0으로 나눌 수 없음';
        default:  return `알 수 없는 연산자: ${operator}`;
    }
}

console.log(calculate(10, 3, '+'));  // 13
console.log(calculate(10, 3, '-'));  // 7
console.log(calculate(10, 3, '*'));  // 30
console.log(calculate(10, 3, '/'));  // 3.333...
console.log(calculate(10, 0, '/'));  // 0으로 나눌 수 없음


// ── 패턴 3: 함수를 반환하는 함수 (팩토리 패턴) ──────────────
// 설정값을 미리 고정한 함수를 만들어 반환합니다.
function makeMultiplier(factor) {
    // factor 를 기억하는 새 함수를 반환 (클로저)
    return (n) => n * factor;
}

const triple  = makeMultiplier(3);
const tenTimes = makeMultiplier(10);

console.log(triple(5));    // 15
console.log(triple(7));    // 21
console.log(tenTimes(4));  // 40


// ── 패턴 4: 배열 데이터 처리 파이프라인 ──────────────────────
const orders = [
    { id: 1, product: '노트북',  price: 1200000, qty: 2 },
    { id: 2, product: '마우스',  price:   35000, qty: 5 },
    { id: 3, product: '키보드',  price:   85000, qty: 3 },
    { id: 4, product: '모니터',  price:  450000, qty: 1 },
];

// 각 주문의 총액 계산 → 50만원 이상만 필터 → 총액 합산
const totalRevenue = orders
    .map(o => ({ ...o, subtotal: o.price * o.qty }))    // 총액 추가
    .filter(o => o.subtotal >= 500000)                  // 고액 주문만
    .reduce((sum, o) => sum + o.subtotal, 0);            // 합산

console.log('고액 주문 합계:', totalRevenue.toLocaleString() + '원');
// 노트북(2,400,000) + 모니터(450,000) = 2,850,000원


// ── 패턴 5: 함수 합성 (조합) ─────────────────────────────────
// 여러 함수를 조합하여 새 함수를 만드는 패턴
const trim    = str => str.trim();
const lower   = str => str.toLowerCase();
const hyphen  = str => str.replace(/\s+/g, '-');

// 세 함수를 차례로 적용하는 파이프 함수
function pipe(...fns) {
    return (value) => fns.reduce((acc, fn) => fn(acc), value);
}

const toSlug = pipe(trim, lower, hyphen);

console.log(toSlug('  Hello World  ')); // 'hello-world'
console.log(toSlug('  자바스크립트 함수  ')); // '자바스크립트-함수'
