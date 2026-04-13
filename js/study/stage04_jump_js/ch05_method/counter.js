// ============================================================
// counter.js — 클로저 / 콜백 함수 / 실전 활용 패턴
//
// 클로저(Closure): 함수가 선언된 시점의 렉시컬 환경(Lexical Environment)을
// 기억하는 현상입니다.
// 함수가 종료된 후에도 내부 변수를 계속 참조할 수 있어
// "private 변수"처럼 활용할 수 있습니다.
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. 클로저 기본 개념
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. 클로저란? — 렉시컬 환경 기억 =====');

// 아래 코드에서 outer 함수가 종료된 후에도
// inner 함수는 outer의 변수 outerVar를 계속 참조합니다.
// 이것이 "클로저"입니다.

function outer() {
  const outerVar = '나는 outer의 변수'; // outer 실행 컨텍스트의 변수

  function inner() {
    // inner는 자신이 선언된 시점의 환경(outer 스코프)을 기억합니다.
    console.log(outerVar); // outer가 종료되어도 참조 가능
  }

  return inner; // inner 함수 자체를 반환
}

const closureFn = outer(); // outer 실행 후 종료. 하지만 inner는 outerVar를 기억
closureFn(); // '나는 outer의 변수' — 클로저 동작!

// 렉시컬 환경 이해:
// 함수는 선언될 때 "어디서 만들어졌는가"를 기억합니다.
// 실행 위치가 아닌 선언 위치의 스코프를 참조합니다.


console.log('\n===== 2. 카운터 — private 변수 패턴 =====');

// count 변수는 createCounter 함수 내부에만 존재합니다.
// 반환된 함수들만이 count에 접근할 수 있어 외부 조작이 불가능합니다.

function createCounter(initialValue = 0) {
  let count = initialValue; // 외부에서 직접 접근 불가 (private)

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    reset() {
      count = initialValue; // 초기값으로 리셋
      return count;
    },
    getCount() {
      return count; // 현재 값 읽기 (값만 반환, 수정 불가)
    }
  };
}

const counter1 = createCounter();
console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2
console.log(counter1.increment()); // 3
console.log(counter1.decrement()); // 2
console.log(counter1.reset());     // 0

// 별도 클로저 — counter1과 독립적인 count를 가집니다.
const counter2 = createCounter(10); // 초기값 10
console.log(counter2.increment()); // 11
console.log(counter1.getCount());  // 0 — counter1과 무관


console.log('\n===== 3. 클로저로 private 속성 구현 =====');

// 자바스크립트 클래스의 # private field 가 없던 시절,
// 클로저로 private 데이터를 보호하는 패턴을 많이 사용했습니다.

function createBankAccount(ownerName, initialBalance) {
  // 클로저 변수 — 외부에서 직접 접근/수정 불가
  let balance = initialBalance;
  const owner = ownerName;
  const transactions = [];

  function log(type, amount) {
    transactions.push({ type, amount, balance, date: new Date().toLocaleDateString() });
  }

  return {
    // 입금: 양수만 허용
    deposit(amount) {
      if (amount <= 0) return console.log('양수 금액을 입력하세요.');
      balance += amount;
      log('입금', amount);
      console.log(`${owner}님 입금: ${amount.toLocaleString()}원 → 잔액: ${balance.toLocaleString()}원`);
    },
    // 출금: 잔액 이상 출금 불가
    withdraw(amount) {
      if (amount > balance) return console.log('잔액이 부족합니다.');
      balance -= amount;
      log('출금', amount);
      console.log(`${owner}님 출금: ${amount.toLocaleString()}원 → 잔액: ${balance.toLocaleString()}원`);
    },
    // 잔액 조회만 가능 (직접 수정 불가)
    getBalance() { return balance; },
    getHistory() { return [...transactions]; } // 복사본 반환 (원본 보호)
  };
}

const account = createBankAccount('Kim', 100000);
account.deposit(50000);   // Kim님 입금: 50,000원 → 잔액: 150,000원
account.withdraw(30000);  // Kim님 출금: 30,000원 → 잔액: 120,000원
account.withdraw(200000); // 잔액이 부족합니다.
console.log('최종 잔액:', account.getBalance()); // 120000

// balance 에 직접 접근 불가
// console.log(account.balance); // undefined — 캡슐화 성공!


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. 콜백 함수 (Callback Function)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. 콜백 함수 기본 =====');

// 콜백: 다른 함수에 인수로 전달되어 특정 시점에 실행되는 함수
// "나중에 이 함수를 불러줘(call back)" 라는 의미

// 가장 단순한 콜백 예시
function doTask(task, callback) {
  console.log(`작업 시작: ${task}`);
  const result = `${task} 완료!`;
  callback(result); // 작업 완료 후 콜백 호출
}

doTask('파일 저장', (result) => console.log('콜백 수신:', result));
// 작업 시작: 파일 저장
// 콜백 수신: 파일 저장 완료!


console.log('\n===== 5. 콜백을 활용한 반복 추상화 =====');

// 배열 고차 메서드(forEach, map, filter)도 콜백을 받는 함수입니다.
// 반복 로직은 내부에 숨기고, "각 요소에서 무엇을 할지"만 콜백으로 전달합니다.

const items = ['사과', '바나나', '체리'];

// forEach: 반환값 없이 순회만 (부수 효과 목적)
items.forEach((item, index) => {
  console.log(`${index + 1}번: ${item}`);
});

// 정렬 콜백: sort() 에 비교 함수를 전달
const numbers = [40, 1, 5, 200, 100, 25];
const ascending  = [...numbers].sort((a, b) => a - b); // 오름차순
const descending = [...numbers].sort((a, b) => b - a); // 내림차순
console.log('오름차순:', ascending);  // [1, 5, 25, 40, 100, 200]
console.log('내림차순:', descending); // [200, 100, 40, 25, 5, 1]


console.log('\n===== 6. 동기 vs 비동기 콜백 =====');

// 동기 콜백: 즉시 실행 (Array.forEach, sort 등)
// 비동기 콜백: 나중에 실행 (setTimeout, 이벤트 리스너 등)

console.log('1. 시작');

// setTimeout: ms 후에 콜백을 비동기로 실행
// Node.js / 브라우저 모두 지원
setTimeout(() => {
  console.log('3. 1초 후 실행 (비동기 콜백)');
}, 1000);

console.log('2. setTimeout 등록 직후 — 콜백보다 먼저 실행됨');
// 출력 순서: 1 → 2 → 3


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. 실전 클로저 활용 패턴
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 7. 메모이제이션 — 계산 결과 캐싱 =====');

// 클로저로 캐시(Map)를 유지해 같은 인수의 연산을 반복하지 않습니다.
// 비용이 큰 연산(재귀, 복잡한 계산)에 특히 유용합니다.

function memoize(fn) {
  const cache = new Map(); // 클로저 변수 — 호출마다 유지

  return function (...args) {
    const key = JSON.stringify(args); // 인수를 문자열로 → 캐시 키

    if (cache.has(key)) {
      console.log(`[캐시 히트] args: ${key}`);
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    console.log(`[새로 계산] args: ${key} → ${result}`);
    return result;
  };
}

// 피보나치 수열 (재귀 — 반복 계산이 많음)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoFib = memoize(fibonacci);
memoFib(10); // [새로 계산]
memoFib(10); // [캐시 히트] — 재계산 없이 바로 반환
memoFib(5);  // [새로 계산]
memoFib(5);  // [캐시 히트]


console.log('\n===== 8. 함수 실행 횟수 제한 — once / limit =====');

// 특정 함수를 N번까지만 실행되도록 래핑하는 패턴

// once: 단 한 번만 실행
function once(fn) {
  let called = false; // 클로저 변수
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const initApp = once(() => {
  console.log('앱 초기화 (최초 1회만 실행)');
  return '초기화 완료';
});

initApp(); // '앱 초기화 (최초 1회만 실행)'
initApp(); // 아무것도 출력 안 됨 (두 번째 호출은 무시)
initApp(); // 동일

// limit: N번 이하로 실행 횟수 제한
function limit(fn, maxCount) {
  let callCount = 0;

  return function (...args) {
    if (callCount >= maxCount) {
      console.log(`최대 ${maxCount}회 초과 — 실행 차단`);
      return;
    }
    callCount++;
    console.log(`실행 ${callCount}/${maxCount}회`);
    return fn(...args);
  };
}

const limitedGreet = limit((name) => console.log(`Hello, ${name}!`), 3);
limitedGreet('Alice');  // 실행 1/3회 + Hello, Alice!
limitedGreet('Bob');    // 실행 2/3회 + Hello, Bob!
limitedGreet('Charlie');// 실행 3/3회 + Hello, Charlie!
limitedGreet('Dave');   // 최대 3회 초과 — 실행 차단


console.log('\n===== 9. 디바운스 — 입력 완료 후 한 번만 실행 =====');

// 연속으로 호출될 때 마지막 호출 후 일정 시간이 지나야 실행되는 패턴
// 활용: 검색창 자동완성, 창 크기 변경 감지, 폼 유효성 검사

function debounce(fn, delay) {
  let timerId = null; // 클로저 변수 — 이전 타이머 추적

  return function (...args) {
    // 이전 타이머가 있으면 취소 (연속 호출 시 이전 것 리셋)
    if (timerId) clearTimeout(timerId);

    // 새 타이머 등록 — delay 후 fn 실행
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}

// 사용 예: 검색창 입력 시 API 호출
const search = debounce((query) => {
  console.log(`API 호출: "${query}" 검색`);
}, 300);

// 연속 입력 시뮬레이션 (실제로는 300ms 이후 마지막 것만 실행됨)
search('자');       // 타이머 등록
search('자바');     // 이전 타이머 취소 후 새 타이머
search('자바스');   // 이전 타이머 취소 후 새 타이머
search('자바스크립트'); // 300ms 뒤 이것만 실행

// 300ms 후: API 호출: "자바스크립트" 검색


console.log('\n===== 10. 스로틀 — 일정 간격으로 실행 =====');

// 일정 시간 동안 최대 한 번만 실행되는 패턴
// 활용: 스크롤 이벤트, 버튼 연타 방지

function throttle(fn, interval) {
  let lastTime = 0; // 클로저 변수 — 마지막 실행 시각 기록

  return function (...args) {
    const now = Date.now();

    if (now - lastTime >= interval) {
      lastTime = now;
      fn(...args);
    } else {
      console.log(`[쓰로틀] ${interval - (now - lastTime)}ms 남음 — 무시`);
    }
  };
}

const onScroll = throttle(() => {
  console.log('스크롤 처리 실행');
}, 200); // 200ms 에 한 번만 실행

// 빠른 연속 호출 시뮬레이션
onScroll(); // 실행
onScroll(); // 무시 (interval 미경과)
onScroll(); // 무시
setTimeout(onScroll, 250); // 250ms 후 재실행 (interval 경과)
