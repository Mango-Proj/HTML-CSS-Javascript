// ============================================================
// spread.js — 스프레드 연산자 (...) + 나머지 매개변수 + 구조 분해 할당
//
// 스프레드(spread): 이터러블/객체를 낱개로 "펼칩니다"
// 나머지(rest):     낱개를 하나로 "모읍니다" (스프레드의 반대)
// 구조분해(destructuring): 배열/객체에서 값을 변수로 추출합니다
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// [Part 1] 스프레드 연산자 (...)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. 배열 복사 / 합치기 =====');

// 배열 복사 — 얕은 복사 (새 배열, 독립적)
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // arr1 의 원소를 펼쳐서 새 배열 생성
arr2.push(4);
console.log(arr1); // [1, 2, 3] — 원본 유지
console.log(arr2); // [1, 2, 3, 4]

// 배열 합치기
const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b];
console.log(merged); // [1, 2, 3, 4]

// 중간에 삽입
const withExtra = [...a, 99, ...b];
console.log(withExtra); // [1, 2, 99, 3, 4]


console.log('\n===== 2. 객체 복사 / 속성 업데이트 =====');

// 객체 복사
const original = { name: '홍길동', hobby: '코딩' };
const copy = { ...original };
copy.hobby = '독서';
console.log(original); // { name: '홍길동', hobby: '코딩' } — 원본 유지
console.log(copy);     // { name: '홍길동', hobby: '독서' }

// 특정 속성만 덮어쓰기 (나중에 온 속성이 앞을 덮어씁니다)
const updated = { ...original, hobby: '글쓰기' };
console.log(updated); // { name: '홍길동', hobby: '글쓰기' }

// 여러 객체 병합
const defaults = { theme: 'light', lang: 'ko', fontSize: 14 };
const userConfig = { theme: 'dark', fontSize: 16 };
const config = { ...defaults, ...userConfig }; // userConfig 가 defaults 덮어씀
console.log(config); // { theme: 'dark', lang: 'ko', fontSize: 16 }


console.log('\n===== 3. 함수 인수로 펼치기 =====');

// Math.max() 는 개별 숫자를 인수로 받습니다.
// 배열을 스프레드로 펼쳐서 전달합니다.

const numbers = [5, 1, 9, 3, 7];
console.log(Math.max(...numbers));  // 9  — spread로 펼쳐서 전달
console.log(Math.min(...numbers));  // 1

// 배열을 다른 배열 안으로 push 할 때도 활용
const dest = [0];
dest.push(...numbers); // push(5, 1, 9, 3, 7)과 동일
console.log(dest); // [0, 5, 1, 9, 3, 7]


console.log('\n===== 4. 문자열을 배열로 펼치기 =====');

// 문자열도 이터러블이므로 스프레드로 문자 배열을 만들 수 있습니다.
const str = 'Hello';
const chars = [...str];
console.log(chars); // ['H', 'e', 'l', 'l', 'o']

// 이모지도 정확하게 처리
const emoji = [...'🍎🍊🍋'];
console.log(emoji); // ['🍎', '🍊', '🍋']


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// [Part 2] 나머지 매개변수 (Rest Parameters)
// 스프레드와 같은 ... 기호를 쓰지만, "모으는" 역할을 합니다.
// 함수 선언 시 마지막 매개변수에만 사용할 수 있습니다.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. 나머지 매개변수 (...rest) =====');

// 인수의 수가 정해지지 않을 때 배열로 모아서 받습니다.
function sum(...nums) {
  // nums는 전달된 인수들이 담긴 배열
  return nums.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3));          // 6
console.log(sum(10, 20, 30, 40));   // 100
console.log(sum());                 // 0 — 빈 배열, reduce 초기값 반환

// 첫 번째 인수는 따로 받고, 나머지를 배열로 모으기
function introduce(first, ...rest) {
  console.log('첫 번째:', first);
  console.log('나머지:', rest);
}

introduce('Alice', 'Bob', 'Charlie', 'Dave');
// 첫 번째: Alice
// 나머지: ['Bob', 'Charlie', 'Dave']


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// [Part 3] 구조 분해 할당 (Destructuring Assignment)
// 배열/객체에서 필요한 값을 변수로 간편하게 추출합니다.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. 배열 구조 분해 =====');

// 기존 방식
const rgb = [255, 128, 0];
const r1 = rgb[0], g1 = rgb[1], b1 = rgb[2];

// 구조 분해
const [r, g, bl] = rgb;
console.log(r, g, bl); // 255 128 0

// 일부만 추출 (건너뛰기)
const [first, , third] = [10, 20, 30]; // 두 번째는 , , 로 건너뜀
console.log(first, third); // 10 30

// 기본값 설정
const [x = 0, y = 0, z = 0] = [1, 2];
console.log(x, y, z); // 1 2 0 — z는 undefined이므로 기본값 0

// 나머지 요소 모으기
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// 두 변수 값 교환 (고전적인 swap)
let m = 'a', n = 'b';
[m, n] = [n, m]; // 임시 변수 없이 교환
console.log(m, n); // b a


console.log('\n===== 7. 객체 구조 분해 =====');

const user = { name: 'Kim', age: 25, role: 'admin' };

// 키 이름으로 추출
const { name: uName, age } = user;
console.log(uName, age); // Kim 25

// 다른 변수명으로 받기 (콜론 뒤에 새 이름)
const { name: userName, role: userRole } = user;
console.log(userName, userRole); // Kim admin

// 기본값 설정
const { name: nm, score = 100 } = user; // score 키가 없으므로 기본값 100
console.log(nm, score); // Kim 100

// 함수 매개변수에서 바로 구조 분해
function showUser({ name, age, role = 'guest' }) {
  console.log(`이름: ${name}, 나이: ${age}, 역할: ${role}`);
}
showUser(user); // 이름: Kim, 나이: 25, 역할: admin
showUser({ name: 'Lee', age: 30 }); // 이름: Lee, 나이: 30, 역할: guest


console.log('\n===== 8. 중첩 객체 구조 분해 =====');

const order = {
  id: 'ORD-001',
  product: {
    name: '노트북',
    price: 1500000
  },
  buyer: {
    name: 'Park',
    address: { city: 'Seoul' }
  }
};

// 중첩 구조를 한 번에 추출
const { product: { name: productName, price }, buyer: { address: { city } } } = order;
console.log(productName, price, city); // 노트북 1500000 Seoul


console.log('\n===== 9. 실무 패턴 — API 응답 처리 =====');

// API에서 받은 데이터에서 필요한 필드만 추출하는 패턴
const apiResponse = {
  status: 200,
  data: {
    users: [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob',   email: 'bob@example.com' }
    ],
    total: 2
  }
};

const { data: { users, total } } = apiResponse;
console.log(`전체 ${total}명`);

// 배열 구조 분해로 각 유저 처리
for (const { id, name } of users) {
  console.log(`[${id}] ${name}`);
}
// [1] Alice
// [2] Bob
