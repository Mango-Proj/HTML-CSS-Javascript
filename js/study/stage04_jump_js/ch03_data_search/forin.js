// ============================================================
// forin.js — for...in 문 (객체 키 순회)
//
// for...in 은 객체의 "열거 가능한 속성 키(key)"를 순회합니다.
// 배열 인덱스도 문자열 키로 취급되어 순회되지만,
// 배열에는 for...of 또는 forEach 를 사용하는 것이 권장됩니다.
// ============================================================


console.log('===== 1. 기본 사용법 — 키 순회 =====');

const instructor = { name: '홍길동', hobby: '코딩', age: 30 };

for (const key in instructor) {
  console.log(key); // name, hobby, age
}


console.log('\n===== 2. 키와 값 함께 출력 =====');

// 객체명[키] 로 값에 접근합니다.
for (const key in instructor) {
  console.log(`${key}: ${instructor[key]}`);
}
// name: 홍길동
// hobby: 코딩
// age: 30


console.log('\n===== 3. 프로토타입 체인 주의 — hasOwnProperty =====');

// for...in 은 프로토타입 체인의 상속된 속성까지 순회합니다.
// Object.prototype에 임의로 속성을 추가하면 모든 객체 순회에 나타납니다.

// 시뮬레이션: 프로토타입에 속성 추가 (실무에서 해서는 안 되는 패턴)
const base = { shared: true };
const child = Object.create(base); // base를 프로토타입으로 하는 객체
child.own = 'mine';

console.log('--- hasOwnProperty 없이 ---');
for (const key in child) {
  console.log(key); // own, shared (상속된 shared까지 나옴)
}

console.log('--- hasOwnProperty 사용 ---');
for (const key in child) {
  // hasOwnProperty: 상속된 속성이 아닌, 자기 자신의 속성인지 확인
  if (Object.prototype.hasOwnProperty.call(child, key)) {
    console.log(key); // own (자기 것만)
  }
}


console.log('\n===== 4. 배열에 for...in 을 쓰면 안 되는 이유 =====');

const arr = ['a', 'b', 'c'];

// for...in 은 배열 인덱스를 문자열로 반환합니다.
// 또한 배열에 임의로 추가된 속성(프로토타입 등)까지 순회할 수 있습니다.
for (const key in arr) {
  console.log(typeof key, key); // string '0', string '1', string '2'
  // 숫자 인덱스가 아닌 문자열 '0', '1', '2'
}

// ✅ 배열 순회는 for...of 또는 forEach 사용
for (const val of arr) {
  console.log(typeof val, val); // string 'a' — 값이 직접 나옴
}


console.log('\n===== 5. Object 정적 메서드 — keys / values / entries =====');

// for...in 대신 Object 메서드로 배열을 먼저 얻는 방식이 더 안전합니다.
// 프로토타입 속성을 포함하지 않고 자기 속성만 반환합니다.

const product = { id: 1, name: '노트북', price: 1500000 };

// Object.keys() → 키 배열
console.log('keys :', Object.keys(product));   // ['id', 'name', 'price']

// Object.values() → 값 배열
console.log('values:', Object.values(product)); // [1, '노트북', 1500000]

// Object.entries() → [키, 값] 쌍 배열
console.log('entries:', Object.entries(product));
// [['id', 1], ['name', '노트북'], ['price', 1500000]]

// Object.entries() + for...of 조합 — 가장 권장되는 객체 순회 방식
console.log('\n--- entries + for...of 조합 ---');
for (const [key, value] of Object.entries(product)) {
  console.log(`${key}: ${value}`);
}


console.log('\n===== 6. 실무 활용 — 객체를 문자열로 직렬화 =====');

// 쿼리스트링 형태로 변환하는 예제
function toQueryString(params) {
  const parts = [];
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      parts.push(`${key}=${params[key]}`);
    }
  }
  return parts.join('&');
}

const searchParams = { keyword: '노트북', page: 2, sort: 'price' };
console.log(toQueryString(searchParams));
// keyword=노트북&page=2&sort=price
