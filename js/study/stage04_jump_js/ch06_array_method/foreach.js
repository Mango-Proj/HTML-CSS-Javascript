// ============================================================
// foreach.js — forEach / 순회 메서드 완전 정복
//
// forEach: 배열의 각 요소를 순서대로 방문하며 콜백을 실행합니다.
// 반환값이 없는(undefined) "부수 효과(side effect)" 전용 메서드입니다.
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. forEach 기본 문법
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. forEach 기본 =====');

// 콜백 매개변수: (현재 요소, 인덱스, 원본 배열)
// 인덱스와 원본 배열은 필요할 때만 사용 (생략 가능)

const languages = ['JavaScript', 'Rust', 'Go', 'Python', 'TypeScript'];

// 요소만 사용
languages.forEach((language) => console.log(language));

console.log('--- 인덱스 포함 ---');

// 요소 + 인덱스 사용 (번호 붙이기)
languages.forEach((language, i) => {
  console.log(`${i + 1}번: ${language}`);
});
// 1번: JavaScript
// 2번: Rust
// ...

console.log('--- 원본 배열 참조 ---');

// 세 번째 매개변수: 배열 자체 참조
// 마지막 요소 뒤에 구분자를 붙이지 않는 패턴 등에 활용
languages.forEach((language, i, arr) => {
  const sep = i < arr.length - 1 ? ' | ' : '';
  process.stdout.write(language + sep); // 줄바꿈 없이 이어쓰기
});
console.log(); // 마지막 줄바꿈


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. forEach vs for...of 선택 기준
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. forEach vs for...of =====');

// forEach의 특성:
// - 반환값 없음 (undefined) → 값 변환에는 사용 X
// - break / continue 사용 불가 — 반복을 중단할 수 없음
// - 비동기(async/await)와 조합 시 주의 필요

// for...of의 특성:
// - break / continue 사용 가능 → 조기 종료 필요 시 선택
// - await 와 함께 사용 가능

const scores = [70, 55, 90, 40, 85];

// forEach — 모든 요소를 순회하며 출력 (중단 불가)
console.log('[forEach] 전체 순회:');
scores.forEach((score) => {
  console.log(score);
  // break; ← SyntaxError! forEach 안에서는 break 불가
});

// for...of — 60점 미만이면 즉시 중단
console.log('[for...of] 60점 미만 발견 시 중단:');
for (const score of scores) {
  if (score < 60) {
    console.log(`낙제 점수 발견: ${score} — 순회 중단`);
    break; // for...of 에서는 break 정상 동작
  }
  console.log(score);
}

// ✅ 결론:
// 단순 출력·외부 변수 수정 → forEach
// 중간에 멈춰야 하는 경우  → for...of
// 값을 변환해 새 배열 필요 → map


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. 외부 변수 누적 (부수 효과 패턴)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. 외부 변수 누적 =====');

// forEach는 반환값이 없으므로, 결과를 외부 변수에 쌓는 패턴으로 사용합니다.
// (단, 이런 목적에는 reduce가 더 명시적입니다 — reduce.js 참고)

const products = [
  { name: '노트북',   price: 1200000, inStock: true  },
  { name: '마우스',   price:   35000, inStock: true  },
  { name: '키보드',   price:   85000, inStock: false },
  { name: '모니터',   price:  450000, inStock: true  },
  { name: '웹캠',     price:   75000, inStock: false },
];

// 재고 있는 상품만 총 가격 합산
let totalPrice = 0;
let inStockCount = 0;

products.forEach(({ name, price, inStock }) => {
  if (inStock) {
    totalPrice += price;
    inStockCount++;
    console.log(`✅ ${name}: ${price.toLocaleString()}원`);
  } else {
    console.log(`❌ ${name}: 품절`);
  }
});

console.log(`\n재고 상품 수: ${inStockCount}개`);
console.log(`재고 상품 합계: ${totalPrice.toLocaleString()}원`);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. 객체 배열 순회 — 테이블 출력
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. 객체 배열 — 간단한 테이블 출력 =====');

const students = [
  { name: 'Alice', score: 92, grade: 'A' },
  { name: 'Bob',   score: 78, grade: 'B' },
  { name: 'Carol', score: 85, grade: 'B' },
  { name: 'Dave',  score: 61, grade: 'D' },
];

// console.table 로 한번에 확인하는 것도 좋습니다
console.table(students);

// forEach 로 직접 출력
console.log('\n이름\t\t점수\t등급');
console.log('─'.repeat(28));
students.forEach(({ name, score, grade }) => {
  console.log(`${name.padEnd(8)}\t${score}\t${grade}`);
});


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. forEach 반환값 주의사항
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. forEach 반환값 주의사항 =====');

const nums = [1, 2, 3, 4, 5];

// ❌ 잘못된 사용 — forEach의 return은 콜백 함수를 종료할 뿐,
//    배열 순회 자체를 멈추지 않습니다.
console.log('return 해도 순회는 계속됩니다:');
nums.forEach((n) => {
  if (n === 3) return; // 이 콜백 호출만 종료. 4, 5는 여전히 실행됨.
  console.log(n); // 1, 2, 4, 5 출력 (3은 건너뜀)
});
// continue처럼 현재 항목을 건너뛰는 효과지만, break처럼 전체 중단은 불가

// ❌ 또 다른 주의 — forEach 결과를 변수에 받아봤자 undefined
const result = nums.forEach((n) => n * 2);
console.log('forEach 반환값:', result); // undefined
// → 값 변환이 필요하면 map 을 사용하세요


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. 유사 배열 / NodeList 에서 forEach
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. Array.from + forEach =====');

// 문자열, Set, Map 등 이터러블을 배열로 변환 후 forEach 사용
const sentence = 'Hello';
const chars = Array.from(sentence); // ['H','e','l','l','o']
chars.forEach((ch, i) => console.log(`[${i}] '${ch}'`));

// Set 을 배열로 변환
const uniqueNums = new Set([3, 1, 4, 1, 5, 9, 2, 6]);
Array.from(uniqueNums).forEach((n) => process.stdout.write(n + ' '));
console.log();

// 브라우저 환경에서 NodeList.forEach 예시 (참고)
// document.querySelectorAll('li').forEach((el, i) => {
//   el.textContent = `${i + 1}. ${el.textContent}`;
// });
