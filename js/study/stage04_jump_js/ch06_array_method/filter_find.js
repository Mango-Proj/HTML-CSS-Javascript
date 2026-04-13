// ============================================================
// filter_find.js — filter / find / findIndex / some / every
//
// 배열에서 원하는 요소를 찾거나 조건 충족 여부를 검사하는 메서드들입니다.
//
// filter     : 조건을 만족하는 모든 요소 → 새 배열
// find       : 조건을 만족하는 첫 번째 요소 하나
// findIndex  : 조건을 만족하는 첫 번째 요소의 인덱스
// findLast   : 조건을 만족하는 마지막 요소 하나 (ES2023)
// some       : 하나라도 조건을 만족하면 true
// every      : 전부 조건을 만족해야 true
// includes   : 특정 값이 배열에 있으면 true
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. filter — 조건에 맞는 요소만 추출
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. filter 기본 =====');

// filter(콜백): 콜백이 true를 반환하는 요소만 모아 새 배열을 만듭니다.
// 조건을 만족하는 요소가 없으면 빈 배열 [] 을 반환합니다.

const numbers = [5, 12, 8, 130, 44, 3, 99, 21];

// 10보다 큰 수만 추출
const overTen = numbers.filter((n) => n > 10);
console.log('10 초과:', overTen); // [12, 130, 44, 99, 21]

// 짝수만 추출
const evens = numbers.filter((n) => n % 2 === 0);
console.log('짝수:', evens); // [12, 8, 130, 44]

// 원본 보존 확인
console.log('원본 유지:', numbers); // 변경 없음


console.log('\n===== 2. 객체 배열 filter =====');

const products = [
  { id: 1, name: '노트북',  price: 1200000, category: '전자기기', inStock: true  },
  { id: 2, name: '마우스',  price:   35000, category: '전자기기', inStock: true  },
  { id: 3, name: '책상',    price:  250000, category: '가구',     inStock: false },
  { id: 4, name: '키보드',  price:   85000, category: '전자기기', inStock: true  },
  { id: 5, name: '의자',    price:  180000, category: '가구',     inStock: true  },
  { id: 6, name: '모니터',  price:  450000, category: '전자기기', inStock: false },
];

// 재고 있는 상품만
const inStock = products.filter((p) => p.inStock);
console.log('재고 있음:', inStock.map((p) => p.name));
// ['노트북', '마우스', '키보드', '의자']

// 전자기기 중 10만 원 이하
const cheapElec = products.filter(
  (p) => p.category === '전자기기' && p.price <= 100000
);
console.log('전자기기 10만 원 이하:', cheapElec.map((p) => p.name));
// ['마우스', '키보드']

// 재고 없는 상품 제거 (일반적인 목록 필터링)
const available = products.filter((p) => p.inStock);
console.log(`이용 가능 상품: ${available.length}개`);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. find / findIndex — 첫 번째 일치 요소
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. find / findIndex =====');

// find(콜백): 조건을 만족하는 첫 번째 요소를 반환합니다.
//   - 찾는 즉시 순회를 멈춥니다 (성능 효율적)
//   - 없으면 undefined 반환

const found = numbers.find((n) => n > 10);
console.log('10 초과 첫 번째:', found); // 12

const notFound = numbers.find((n) => n > 1000);
console.log('1000 초과 (없음):', notFound); // undefined

// findIndex(콜백): 조건을 만족하는 첫 번째 요소의 인덱스를 반환합니다.
//   - 없으면 -1 반환 (indexOf와 동일한 규칙)

const idx = numbers.findIndex((n) => n > 10);
console.log('10 초과 첫 번째 인덱스:', idx); // 1 (12의 위치)

const notFoundIdx = numbers.findIndex((n) => n > 1000);
console.log('없을 때 인덱스:', notFoundIdx); // -1

// 객체 배열에서 ID로 특정 항목 찾기 (실무 빈출 패턴)
const targetProduct = products.find((p) => p.id === 3);
console.log('\nID 3 상품:', targetProduct?.name); // '책상'

// 항목 존재 여부 확인 후 처리
const keyboard = products.find((p) => p.name === '키보드');
if (keyboard) {
  console.log(`${keyboard.name}: ${keyboard.price.toLocaleString()}원`);
}


console.log('\n===== 4. findLast / findLastIndex (ES2023) =====');

// findLast: 배열을 끝에서부터 탐색해 조건을 만족하는 마지막 요소를 반환
// findLastIndex: 마지막으로 조건을 만족하는 요소의 인덱스를 반환

const temps = [15, 28, 32, 19, 35, 22, 18];

const lastHot = temps.findLast((t) => t > 30);
console.log('마지막으로 30도 초과:', lastHot); // 35

const lastHotIdx = temps.findLastIndex((t) => t > 30);
console.log('마지막으로 30도 초과 인덱스:', lastHotIdx); // 4


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. some / every — 조건 충족 여부 검사
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. some / every =====');

// some(콜백):  하나라도 조건을 만족하면 true (OR 검사)
//              true를 찾는 즉시 순회 종료 → 효율적
// every(콜백): 모든 요소가 조건을 만족해야 true (AND 검사)
//              false를 찾는 즉시 순회 종료 → 효율적

const scores = [72, 85, 91, 60, 78];

const hasHighScore = scores.some((s) => s >= 90);
console.log('90점 이상 있음:', hasHighScore); // true (91이 있음)

const allPassed = scores.every((s) => s >= 60);
console.log('전원 60점 이상:', allPassed); // true

const allHigh = scores.every((s) => s >= 80);
console.log('전원 80점 이상:', allHigh); // false (72, 60, 78 있음)

// 실무 예시: 장바구니 검증
const cart = [
  { name: '노트북', qty: 1, price: 1200000 },
  { name: '마우스', qty: 2, price:   35000 },
  { name: '키보드', qty: 0, price:   85000 }, // 수량 0
];

const hasOutOfQty = cart.some((item) => item.qty === 0);
console.log('\n수량 0인 상품 있음:', hasOutOfQty); // true → 결제 전 경고 필요

const allValid = cart.every((item) => item.qty > 0 && item.price > 0);
console.log('모든 상품 유효:', allValid); // false

// 권한 검사 패턴
const userRoles = ['viewer', 'editor'];
const canEdit   = userRoles.some((r) => r === 'editor' || r === 'admin');
const canDelete = userRoles.some((r) => r === 'admin');
console.log('\n편집 권한:', canEdit);   // true
console.log('삭제 권한:', canDelete);  // false


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. includes — 값 포함 여부 (단순 비교)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. includes =====');

// includes(값): 배열에 해당 값이 존재하면 true
// 객체 비교는 참조값 기준이므로, 객체 배열에서는 find 를 사용하세요.

const colors = ['red', 'green', 'blue', 'yellow'];
console.log(colors.includes('green')); // true
console.log(colors.includes('purple')); // false

// NaN 처리 — indexOf는 NaN 못 찾지만 includes는 가능
const mixed = [1, NaN, 3];
console.log('includes NaN:', mixed.includes(NaN));    // true
console.log('indexOf NaN:', mixed.indexOf(NaN));      // -1 (못 찾음)

// 화이트리스트 필터링
const allowedCategories = ['전자기기', '도서', '스포츠'];
const validProducts = products.filter((p) =>
  allowedCategories.includes(p.category)
);
console.log('허용 카테고리 상품 수:', validProducts.length);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. filter vs find — 목적별 선택
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 7. filter vs find 정리 =====');

// 질문: "조건에 맞는 것이 여럿인가, 하나인가?"
//
// 여럿 필요 → filter (새 배열 반환)
// 첫 번째 하나만 → find (요소 자체 반환)
// 존재 여부만 → some (boolean)
// 인덱스 필요 → findIndex (숫자)

const users = [
  { id: 1, name: 'Alice', active: true  },
  { id: 2, name: 'Bob',   active: false },
  { id: 3, name: 'Carol', active: true  },
  { id: 4, name: 'Dave',  active: true  },
];

// 활성 유저 목록이 필요 → filter
const activeUsers = users.filter((u) => u.active);
console.log('활성 유저:', activeUsers.map((u) => u.name));
// ['Alice', 'Carol', 'Dave']

// ID로 특정 유저 하나만 찾기 → find
const user = users.find((u) => u.id === 3);
console.log('ID 3:', user?.name); // 'Carol'

// 비활성 유저가 존재하는지만 확인 → some
const hasInactive = users.some((u) => !u.active);
console.log('비활성 유저 있음:', hasInactive); // true
