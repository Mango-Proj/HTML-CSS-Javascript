// ============================================================
// reduce.js — Array.prototype.reduce 완전 정복
//
// reduce: 배열의 각 요소를 누산기(accumulator)에 누적해
// 하나의 결과값으로 줄여(reduce) 나갑니다.
//
// 구조: array.reduce((누산기, 현재값, 인덱스, 배열) => { ... }, 초기값)
//
// 초기값을 항상 명시하는 것을 권장합니다.
// 빈 배열에서 초기값 없이 호출하면 TypeError가 발생합니다.
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. reduce 기본 — 합계 구하기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. reduce 기본 — 합계 / 곱 =====');

const numbers = [1, 2, 3, 4, 5];

// 합계: 초기값 0 에서 시작해 각 요소를 더함
//   단계: acc=0  curr=1 → 1
//         acc=1  curr=2 → 3
//         acc=3  curr=3 → 6
//         acc=6  curr=4 → 10
//         acc=10 curr=5 → 15
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('합계:', sum); // 15

// 10부터 시작하는 합계 (초기값 변경)
const sumFrom10 = numbers.reduce((acc, curr) => acc + curr, 10);
console.log('10부터 합계:', sumFrom10); // 25

// 곱: 초기값 1 에서 시작
const product = numbers.reduce((acc, curr) => acc * curr, 1);
console.log('곱:', product); // 120 (1×2×3×4×5)

// 최댓값 (Math.max 대신 reduce로)
const max = numbers.reduce((acc, curr) => (curr > acc ? curr : acc), -Infinity);
console.log('최댓값:', max); // 5

// 최솟값
const min = numbers.reduce((acc, curr) => (curr < acc ? curr : acc), Infinity);
console.log('최솟값:', min); // 1


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. 객체 배열 집계 — 실무 핵심
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. 객체 배열 집계 =====');

const products = [
  { name: '노트북',  price: 1200000, qty: 2, category: '전자기기' },
  { name: '마우스',  price:   35000, qty: 5, category: '전자기기' },
  { name: '책상',    price:  250000, qty: 1, category: '가구'     },
  { name: '의자',    price:  180000, qty: 3, category: '가구'     },
  { name: '키보드',  price:   85000, qty: 4, category: '전자기기' },
];

// 총 금액 (가격 × 수량 합산)
const totalAmount = products.reduce((acc, { price, qty }) => acc + price * qty, 0);
console.log('총 금액:', totalAmount.toLocaleString() + '원');
// 노트북 2400000 + 마우스 175000 + 책상 250000 + 의자 540000 + 키보드 340000

// 가장 비싼 상품 찾기
const mostExpensive = products.reduce((max, curr) =>
  curr.price > max.price ? curr : max
);
console.log('가장 비싼 상품:', mostExpensive.name, mostExpensive.price.toLocaleString() + '원');

// 수량 총합
const totalQty = products.reduce((acc, p) => acc + p.qty, 0);
console.log('총 수량:', totalQty, '개');


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. 그룹화 — 카테고리별 분류
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. 그룹화 (groupBy 패턴) =====');

// 초기값을 {} 로 시작해 키-배열 구조의 객체를 만듭니다.
// { 카테고리: [상품, 상품, ...] } 형태로 분류

const grouped = products.reduce((acc, product) => {
  const { category } = product;

  // 해당 카테고리 키가 없으면 빈 배열로 초기화
  if (!acc[category]) {
    acc[category] = [];
  }

  acc[category].push(product.name);
  return acc;
}, {});

console.log('카테고리별 그룹:', grouped);
// { '전자기기': ['노트북', '마우스', '키보드'], '가구': ['책상', '의자'] }

// 카테고리별 합계 금액
const categoryTotal = products.reduce((acc, { category, price, qty }) => {
  acc[category] = (acc[category] ?? 0) + price * qty;
  return acc;
}, {});

console.log('카테고리별 금액:');
Object.entries(categoryTotal).forEach(([cat, total]) =>
  console.log(`  ${cat}: ${total.toLocaleString()}원`)
);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. 중복 제거 / 빈도 카운트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. 빈도 카운트 =====');

const votes = ['Alice', 'Bob', 'Alice', 'Carol', 'Bob', 'Alice', 'Dave', 'Bob'];

// 이름별 득표 수 집계
const tally = votes.reduce((acc, name) => {
  acc[name] = (acc[name] ?? 0) + 1; // 없으면 0, 있으면 +1
  return acc;
}, {});

console.log('득표 수:', tally);
// { Alice: 3, Bob: 3, Carol: 1, Dave: 1 }

// 최다 득표자 찾기
const winner = Object.entries(tally).reduce(
  (max, [name, count]) => (count > max.count ? { name, count } : max),
  { name: '', count: 0 }
);
console.log('최다 득표:', winner.name, `(${winner.count}표)`);

// 단어 길이별 그룹화
const wordList = ['cat', 'dog', 'elephant', 'ant', 'bee', 'giraffe', 'ox'];
const byLength = wordList.reduce((acc, word) => {
  const len = word.length;
  acc[len] = acc[len] ? [...acc[len], word] : [word];
  return acc;
}, {});
console.log('\n길이별 단어:', byLength);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. 중첩 배열 평탄화
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. 중첩 배열 평탄화 =====');

const nested = [[1, 2], [3, 4], [5, 6], [7]];

// reduce로 flat 구현 (flat 메서드가 없던 시절 패턴)
const flattened = nested.reduce((acc, curr) => acc.concat(curr), []);
console.log('평탄화:', flattened); // [1, 2, 3, 4, 5, 6, 7]

// 현대적 방법 — Array.flat() 사용 권장
const flatModern = nested.flat();
console.log('flat():', flatModern); // 동일

// 2단계 중첩
const deep = [[1, [2, 3]], [4, [5, 6]]];
console.log('flat(2):', deep.flat(2));    // [1, 2, 3, 4, 5, 6]
console.log('flat(Infinity):', deep.flat(Infinity)); // 깊이 관계없이 전부 평탄화


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. reduce로 map / filter 구현 (원리 이해용)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. reduce로 map·filter 직접 구현 =====');

// reduce는 map·filter·find 등 모든 배열 메서드를 구현할 수 있는 기반 연산입니다.
// (실무에서는 map·filter를 쓰되, 원리 파악용으로 이해하세요)

const data = [1, 2, 3, 4, 5, 6, 7, 8];

// map 구현: 각 요소를 변환해 새 배열
const mapResult = data.reduce((acc, n) => {
  acc.push(n * 2); // 변환 후 push
  return acc;
}, []);
console.log('reduce로 map:', mapResult); // [2,4,6,8,10,12,14,16]

// filter 구현: 조건을 만족하는 요소만 새 배열
const filterResult = data.reduce((acc, n) => {
  if (n % 2 === 0) acc.push(n); // 조건 충족 시에만 push
  return acc;
}, []);
console.log('reduce로 filter:', filterResult); // [2,4,6,8]

// map + filter 한 번에 처리 (한 번만 순회)
const combined = data.reduce((acc, n) => {
  if (n % 2 === 0) acc.push(n * 10); // 짝수만 10배
  return acc;
}, []);
console.log('짝수만 10배 (한 번 순회):', combined); // [20,40,60,80]
// 위는 .filter().map() 과 동일하나, 순회를 한 번만 수행합니다.


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 7. 배열 → 객체 변환
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 7. 배열 → 객체 변환 =====');

// ID를 키로 하는 조회 맵(lookup map) 생성 — O(1) 검색 가능
const userList = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob'   },
  { id: 3, name: 'Carol' },
];

const userMap = userList.reduce((acc, user) => {
  acc[user.id] = user; // { 1: {id:1,name:'Alice'}, ... }
  return acc;
}, {});

console.log('ID로 조회:', userMap[2]?.name); // 'Bob'
console.log('전체 맵:', userMap);

// Object.fromEntries + map 으로 더 간결하게 작성 가능
const userMapV2 = Object.fromEntries(userList.map((u) => [u.id, u]));
console.log('fromEntries 버전:', userMapV2[3]?.name); // 'Carol'
