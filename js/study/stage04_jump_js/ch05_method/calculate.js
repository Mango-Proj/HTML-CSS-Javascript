// ============================================================
// calculate.js — 함수 심화: 정의 방식 / this / 고차 함수 / 배열 메서드
//
// 자바스크립트에서 함수는 "일급 객체(First-class Object)"입니다.
// → 변수에 담을 수 있고, 인수로 전달하고, 반환값으로 쓸 수 있습니다.
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. 함수 정의 방식 4가지
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. 함수 선언문 =====');

// 함수 선언문: function 키워드로 시작하는 이름 있는 함수
// 특징: 호이스팅으로 선언 전에 호출 가능
greet('World'); // 선언 전에 호출해도 정상 동작

function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet('Kim')); // Hello, Kim!


console.log('\n===== 2. 함수 표현식 =====');

// 함수 표현식: 변수에 함수를 할당하는 방식
// 특징: 호이스팅 안 됨 (선언 전 호출 시 에러 발생)
// 함수를 값처럼 다루거나, 조건부로 함수를 정의할 때 유용

const add = function (a, b) {
  return a + b;
};
console.log(add(3, 4)); // 7

// 조건에 따라 다른 함수 할당
const isEven = true;
const checkNum = isEven
  ? function (n) { return n % 2 === 0; }
  : function (n) { return n % 2 !== 0; };

console.log(checkNum(4)); // true


console.log('\n===== 3. 화살표 함수 (Arrow Function) =====');

// 화살표 함수: => 를 사용해 간결하게 표현
// 특징 1: 본문이 한 줄이면 return 과 {} 생략 가능
// 특징 2: 자신만의 this 를 갖지 않음 (중요! Section 4 참고)

// 기본 형태
const multiply = (a, b) => a * b;

// 매개변수가 하나이면 () 생략 가능
const square = n => n * n;

// 본문이 여러 줄이면 {} 와 return 명시
const getGrade = score => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  return 'F';
};

console.log(multiply(3, 5)); // 15
console.log(square(7));      // 49
console.log(getGrade(85));   // B

// 객체를 반환할 때는 () 로 감싸야 {}가 블록이 아닌 객체로 인식됨
const makeUser = (name, age) => ({ name, age });
console.log(makeUser('Kim', 25)); // { name: 'Kim', age: 25 }


console.log('\n===== 4. IIFE (즉시 실행 함수) =====');

// Immediately Invoked Function Expression
// 정의하자마자 즉시 실행되는 함수 패턴
// 활용: 변수를 전역 스코프에 노출하지 않을 때, 초기화 코드를 격리할 때

const result = (function () {
  const localVar = '외부에서 접근 불가';
  return localVar.toUpperCase();
})();

console.log(result); // '외부에서 접근 불가'
// console.log(localVar); // ReferenceError — 외부 접근 불가

// 화살표 함수로도 작성 가능
const initValue = (() => {
  const base = 100;
  return base * 2;
})();
console.log(initValue); // 200


console.log('\n===== 5. 매개변수 기본값과 나머지 매개변수 =====');

// 기본값 매개변수 (Default Parameter)
// 인수가 전달되지 않거나 undefined 일 때 사용할 값을 지정합니다.
function createTag(tag, content, className = '') {
  const classAttr = className ? ` class="${className}"` : '';
  return `<${tag}${classAttr}>${content}</${tag}>`;
}

console.log(createTag('p', '안녕하세요'));              // <p>안녕하세요</p>
console.log(createTag('p', '안녕하세요', 'highlight')); // <p class="highlight">안녕하세요</p>

// 나머지 매개변수 (...rest)
// 정해지지 않은 수의 인수를 배열로 받습니다.
// 반드시 마지막 매개변수여야 합니다.
function sum(first, ...rest) {
  // rest는 두 번째 이후 인수들의 배열
  const restSum = rest.reduce((acc, n) => acc + n, 0);
  return first + restSum;
}

console.log(sum(1));          // 1
console.log(sum(1, 2, 3));    // 6
console.log(sum(10, 20, 30, 40)); // 100


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. this 바인딩
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. this — 일반 함수 vs 화살표 함수 =====');

// this는 함수를 "어떻게 호출하느냐"에 따라 가리키는 값이 달라집니다.
// 일반 함수: 호출 방식에 따라 동적으로 결정
// 화살표 함수: 선언된 위치의 바깥 this를 그대로 사용 (자신의 this 없음)

const timer = {
  name: 'MyTimer',
  seconds: 0,

  // ❌ 일반 함수: setInterval 콜백 안의 this는 undefined (strict) 또는 전역
  startBad() {
    // setTimeout(() => {
    //   this.seconds++; ← this가 timer가 아님!
    // }, 1000);
  },

  // ✅ 화살표 함수: 바깥(startGood 메서드)의 this = timer 객체를 그대로 사용
  startGood() {
    const tick = () => {
      this.seconds++; // this = timer (화살표 함수는 선언 위치의 this 사용)
    };
    tick();
    tick();
    tick();
  }
};

timer.startGood();
console.log(timer.seconds); // 3 — this.seconds가 정상적으로 증가

// 메서드에서 this는 점(.) 앞의 객체
const person = {
  name: 'Kim',
  greet() {
    return `안녕하세요, 저는 ${this.name}입니다.`;
  }
};
console.log(person.greet()); // '안녕하세요, 저는 Kim입니다.'

// 메서드를 변수에 할당하면 this를 잃어버림
const fn = person.greet;
// console.log(fn()); // this.name이 undefined — this를 잃음


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. 고차 함수 (Higher-order Function)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 7. 고차 함수 — 함수를 반환하는 함수 =====');

// 고차 함수: 함수를 인수로 받거나, 함수를 반환하는 함수
// 함수가 일급 객체이기 때문에 가능합니다.

// ── 커링 (Currying): 여러 인수를 하나씩 받는 함수 체인 ──────
// makeMultiplier(n)은 n을 기억하는 새 함수를 반환합니다.
const makeMultiplier = (n) => (value) => n * value;

const double = makeMultiplier(2);  // n=2를 기억하는 함수
const triple = makeMultiplier(3);  // n=3을 기억하는 함수
const tenTimes = makeMultiplier(10);

console.log(double(5));    // 10
console.log(triple(5));    // 15
console.log(tenTimes(7));  // 70

// ── 함수 팩토리 패턴 ─────────────────────────────────────────
// 공통 로직을 공유하면서 세부 동작만 다른 함수를 여러 개 만들 때

function makeValidator(min, max) {
  return function (value) {
    if (value < min) return `${min} 이상이어야 합니다.`;
    if (value > max) return `${max} 이하이어야 합니다.`;
    return '유효한 값입니다.';
  };
}

const validateAge   = makeValidator(0, 150);
const validateScore = makeValidator(0, 100);
const validateTemp  = makeValidator(-50, 60);

console.log(validateAge(25));    // 유효한 값입니다.
console.log(validateAge(-1));    // 0 이상이어야 합니다.
console.log(validateScore(105)); // 100 이하이어야 합니다.

// ── 함수 합성 (Function Composition) ────────────────────────
// 여러 함수를 연결해 하나의 파이프라인처럼 처리

const pipe = (...fns) => (value) => fns.reduce((v, fn) => fn(v), value);

const trim    = str => str.trim();
const toLower = str => str.toLowerCase();
const removeSpaces = str => str.replace(/\s+/g, '-');

const slugify = pipe(trim, toLower, removeSpaces);

console.log(slugify('  Hello World  ')); // 'hello-world'
console.log(slugify('  자바스크립트 공부  ')); // '자바스크립트-공부'


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. 배열 고차 메서드 — map / filter / reduce / 체이닝
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 8. map — 변환 =====');

// map(callback): 각 요소를 콜백으로 변환한 새 배열 반환
// 원본 배열은 변경하지 않습니다.

const prices = [1000, 2500, 4000, 8000];

// 10% 할인 가격 배열 생성
const discounted = prices.map(price => Math.floor(price * 0.9));
console.log(discounted); // [900, 2250, 3600, 7200]

// 객체 배열 변환
const users = [
  { id: 1, name: 'Alice', score: 95 },
  { id: 2, name: 'Bob',   score: 82 },
  { id: 3, name: 'Charlie', score: 70 }
];

// id와 이름만 추출
const summaries = users.map(({ id, name }) => ({ id, name }));
console.log(summaries);
// [{ id:1, name:'Alice' }, { id:2, name:'Bob' }, { id:3, name:'Charlie' }]


console.log('\n===== 9. filter — 조건 추출 =====');

// filter(callback): 콜백이 true를 반환한 요소만 모은 새 배열 반환

const highScorers = users.filter(user => user.score >= 80);
console.log(highScorers.map(u => u.name)); // ['Alice', 'Bob']

// 숫자 배열에서 짝수만
const nums = [1, 2, 3, 4, 5, 6, 7, 8];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8]


console.log('\n===== 10. reduce — 축약 =====');

// reduce(callback, initialValue): 배열을 순회하며 누적값을 만들어 최종 하나의 값을 반환
// callback(accumulator, currentValue) → 다음 accumulator

// 합계
const total = nums.reduce((acc, n) => acc + n, 0);
console.log('합계:', total); // 36

// 최댓값
const max = nums.reduce((acc, n) => (n > acc ? n : acc), -Infinity);
console.log('최댓값:', max); // 8

// 배열 → 객체로 변환 (id를 키로 사용)
const userMap = users.reduce((acc, user) => {
  acc[user.id] = user; // acc['1'] = { id:1, ... }
  return acc;
}, {});
console.log(userMap[1].name); // 'Alice'

// 카운팅 (값 빈도 집계)
const fruits = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, cherry: 1 }


console.log('\n===== 11. 기타 고차 메서드 =====');

// find: 조건을 만족하는 첫 번째 요소 반환 (없으면 undefined)
const found = users.find(u => u.score === 82);
console.log(found?.name); // 'Bob'

// findIndex: 조건을 만족하는 첫 번째 인덱스 반환 (없으면 -1)
const idx = users.findIndex(u => u.id === 3);
console.log(idx); // 2

// some: 하나라도 조건 만족 → true
console.log(users.some(u => u.score >= 90));  // true (Alice)

// every: 모두 조건 만족 → true
console.log(users.every(u => u.score >= 70)); // true

// flat: 중첩 배열을 펼침
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6]

// flatMap: map + flat(1) 결합
const sentences = ['Hello World', 'Foo Bar'];
const words = sentences.flatMap(s => s.split(' '));
console.log(words); // ['Hello', 'World', 'Foo', 'Bar']


console.log('\n===== 12. 메서드 체이닝 — 실무 패턴 =====');

// 배열 고차 메서드는 새 배열을 반환하므로 연속으로 연결할 수 있습니다.

const products = [
  { name: '노트북',  price: 1500000, stock: 3,  category: 'IT'   },
  { name: '마우스',  price:   35000, stock: 0,  category: 'IT'   },
  { name: '책상',    price:  250000, stock: 5,  category: '가구'  },
  { name: '의자',    price:  180000, stock: 2,  category: '가구'  },
  { name: '모니터',  price:  450000, stock: 7,  category: 'IT'   },
  { name: '키보드',  price:   80000, stock: 0,  category: 'IT'   },
];

// "재고 있는 IT 제품을 가격 오름차순으로 정렬하고 이름과 가격만 추출"
const chainResult = products
  .filter(p => p.category === 'IT' && p.stock > 0)     // IT + 재고 있음
  .sort((a, b) => a.price - b.price)                   // 가격 오름차순
  .map(({ name, price }) => ({                          // 필요한 필드만
    name,
    price: `${price.toLocaleString()}원`
  }));

console.log(chainResult);
// [
//   { name: '모니터', price: '450,000원' },
//   { name: '노트북', price: '1,500,000원' }
// ]

// 총 재고 금액 (가격 × 재고 합계)
const totalValue = products
  .filter(p => p.stock > 0)
  .reduce((sum, p) => sum + p.price * p.stock, 0);
console.log('총 재고 금액:', totalValue.toLocaleString() + '원');
