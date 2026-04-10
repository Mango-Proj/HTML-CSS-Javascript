// ============================================================
// symbol.js — Symbol: 고유한 식별자
//
// Symbol은 ES6에서 추가된 원시 타입(primitive type)입니다.
// 호출할 때마다 절대로 겹치지 않는 고유한 값을 만듭니다.
// 주로 객체의 "숨겨진 프로퍼티 키"나 "전역 상수"로 사용됩니다.
// ============================================================


console.log('===== 1. Symbol 기본 — 고유성 보장 =====');

// Symbol() 은 호출마다 완전히 고유한 값을 만듭니다.
// 설명 문자열(description)을 넣어도 값이 같아지지 않습니다.
const sym1 = Symbol('id');
const sym2 = Symbol('id');

console.log(sym1);          // Symbol(id)
console.log(sym2);          // Symbol(id) — 출력은 같아 보이지만
console.log(sym1 === sym2); // false — 완전히 다른 값!
console.log(typeof sym1);   // 'symbol'

// 설명(description) 읽기
console.log(sym1.description); // 'id'


console.log('\n===== 2. 객체의 숨겨진 프로퍼티 키 =====');

// Symbol을 키로 사용하면 외부에서 쉽게 접근/수정하기 어렵습니다.
// for...in, Object.keys() 에 나타나지 않아 "숨겨진" 속성이 됩니다.

const secretId = Symbol('id');

const user = {
  name: 'John',
  [secretId]: 99   // 계산된 프로퍼티 문법: [] 안에 변수/표현식 사용
};

// Symbol 키로만 정확히 접근 가능
console.log(user[secretId]); // 99
console.log(user.id);        // undefined — 문자열 'id' 로는 접근 불가

// for...in 에 나타나지 않음
console.log('for...in 으로 보이는 키:');
for (const key in user) {
  console.log(key); // name 만 출력 (secretId 안 보임)
}

// Object.keys()에도 나타나지 않음
console.log('Object.keys():', Object.keys(user)); // ['name']

// Symbol 키만 얻으려면 별도 메서드 사용
console.log('Symbol 키:', Object.getOwnPropertySymbols(user)); // [Symbol(id)]


console.log('\n===== 3. 충돌 없는 상수 정의 =====');

// 문자열 상수는 값이 같으면 충돌 가능성이 있습니다.
// Symbol을 상수로 쓰면 절대 겹치지 않습니다.

// ❌ 문자열 상수: 다른 코드와 값이 우연히 겹칠 수 있음
const DIRECTION_UP_STR = 'UP';
const DIRECTION_DOWN_STR = 'UP'; // 실수로 같은 값 → 버그 가능

// ✅ Symbol 상수: 값이 달라 보여도(설명이 같아도) 절대 같지 않음
const DIRECTION_UP    = Symbol('UP');
const DIRECTION_DOWN  = Symbol('DOWN');
const DIRECTION_LEFT  = Symbol('LEFT');
const DIRECTION_RIGHT = Symbol('RIGHT');

function move(direction) {
  if (direction === DIRECTION_UP)    return '위로 이동';
  if (direction === DIRECTION_DOWN)  return '아래로 이동';
  if (direction === DIRECTION_LEFT)  return '왼쪽으로 이동';
  if (direction === DIRECTION_RIGHT) return '오른쪽으로 이동';
  return '알 수 없는 방향';
}

console.log(move(DIRECTION_UP));   // '위로 이동'
console.log(move(DIRECTION_LEFT)); // '왼쪽으로 이동'
console.log(move(Symbol('UP')));   // '알 수 없는 방향' — 새로 만든 Symbol은 다름


console.log('\n===== 4. Symbol.for() — 전역 공유 심볼 =====');

// Symbol()은 호출마다 새 값을 만들지만,
// Symbol.for(key)는 전역 레지스트리에서 같은 key면 같은 Symbol을 반환합니다.
// 여러 파일/모듈에서 같은 Symbol을 공유해야 할 때 사용합니다.

const s1 = Symbol.for('sharedKey');
const s2 = Symbol.for('sharedKey');

console.log(s1 === s2); // true — 같은 전역 Symbol

// Symbol.keyFor(): 전역 Symbol의 키 이름 조회
console.log(Symbol.keyFor(s1)); // 'sharedKey'

// 일반 Symbol.for가 아닌 Symbol()은 keyFor에서 undefined
const localSym = Symbol('local');
console.log(Symbol.keyFor(localSym)); // undefined


console.log('\n===== 5. Well-known Symbols — 내장 동작 커스터마이징 =====');

// 자바스크립트 엔진이 내부적으로 사용하는 Symbol들이 있습니다.
// 이것들을 오버라이드해서 객체의 기본 동작을 바꿀 수 있습니다.

// Symbol.iterator: for...of 동작을 정의합니다.
// 아래는 1부터 max까지 순회하는 커스텀 이터러블 객체입니다.
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {         // for...of 가 호출하는 메서드
    let current = this.from;
    const last = this.to;
    return {
      next() {                  // 다음 값을 반환하는 메서드
        if (current <= last) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true }; // 순회 종료
      }
    };
  }
};

// for...of 로 사용 가능
for (const num of range) {
  process.stdout.write(num + ' '); // 1 2 3 4 5
}
console.log();

// 스프레드도 Symbol.iterator 를 사용합니다
console.log([...range]); // [1, 2, 3, 4, 5]


console.log('\n===== 6. Symbol.toPrimitive — 형 변환 커스터마이징 =====');

// Symbol.toPrimitive 를 정의하면 객체가 원시값으로 변환될 때의 동작을 지정합니다.
const money = {
  amount: 1000,
  currency: 'KRW',
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this.amount;       // 숫자 변환 시
    if (hint === 'string') return `${this.amount}${this.currency}`; // 문자열 변환 시
    return this.amount; // 기본(default)
  }
};

console.log(+money);          // 1000 (숫자 변환)
console.log(`${money}`);      // '1000KRW' (문자열 변환)
console.log(money + 500);     // 1500 (기본 → 숫자)
