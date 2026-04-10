// ============================================================
// set.js — Set과 Map: 현대적인 자료구조
//
// Set: 중복 없는 값들의 집합
// Map: 모든 타입을 키로 쓸 수 있는 키-값 저장소
//
// 기존 배열/객체로는 불편했던 상황을 깔끔하게 해결해 줍니다.
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// [Part 1] Set
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. Set 기본 — 중복 없는 집합 =====');

// Set은 중복된 값을 자동으로 제거합니다.
// 같은 값을 여러 번 추가해도 한 번만 저장됩니다.
const s = new Set([1, 2, 2, 3, 3, 3]);
console.log(s);        // Set(3) { 1, 2, 3 }
console.log(s.size);   // 3 — 고유한 값의 개수


console.log('\n===== 2. Set 주요 메서드 =====');

const tagSet = new Set();

// add(value): 값 추가 (중복은 무시)
tagSet.add('JavaScript');
tagSet.add('Python');
tagSet.add('JavaScript'); // 중복 → 무시됨
tagSet.add('CSS');

console.log(tagSet);       // Set(3) { 'JavaScript', 'Python', 'CSS' }
console.log(tagSet.size);  // 3

// has(value): 포함 여부 확인 → boolean 반환
console.log(tagSet.has('Python'));    // true
console.log(tagSet.has('Java'));      // false

// delete(value): 특정 값 제거
tagSet.delete('Python');
console.log(tagSet); // Set(2) { 'JavaScript', 'CSS' }

// clear(): 전체 비우기
// tagSet.clear(); // Set(0) {}


console.log('\n===== 3. Set 순회 =====');

const numSet = new Set([10, 20, 30]);

// for...of 로 순회
for (const val of numSet) {
  console.log(val); // 10, 20, 30 (삽입 순서 보장)
}

// forEach 로 순회
numSet.forEach(val => process.stdout.write(val + ' ')); // 10 20 30
console.log();

// 배열로 변환
const arr = [...numSet];
console.log(arr); // [10, 20, 30]


console.log('\n===== 4. Set 실무 활용 — 배열 중복 제거 =====');

// 가장 많이 쓰이는 활용: 배열의 중복값을 한 줄에 제거
const rawTags = ['react', 'css', 'react', 'javascript', 'css', 'react'];
const uniqueTags = [...new Set(rawTags)];
console.log(uniqueTags); // ['react', 'css', 'javascript']

// 방문한 페이지 기록 (중복 방문 무시)
const visited = new Set();
visited.add('/home');
visited.add('/about');
visited.add('/home'); // 이미 방문 → 무시
console.log(visited.size); // 2


console.log('\n===== 5. Set으로 집합 연산 =====');

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// 합집합: A ∪ B (두 집합의 모든 원소)
const union = new Set([...setA, ...setB]);
console.log('합집합:', [...union]); // [1, 2, 3, 4, 5, 6]

// 교집합: A ∩ B (둘 다 포함된 원소)
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log('교집합:', [...intersection]); // [3, 4]

// 차집합: A - B (A에만 있는 원소)
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log('차집합:', [...difference]); // [1, 2]


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// [Part 2] Map
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n\n===== 6. Map 기본 — 유연한 키-값 저장소 =====');

// Map은 일반 객체와 비슷하지만 두 가지 큰 차이가 있습니다.
// 1. 키로 어떤 타입이든 사용 가능 (숫자, 객체, 함수 등)
// 2. 삽입 순서가 보장됩니다.

const scoreMap = new Map();

// set(키, 값): 데이터 추가
scoreMap.set('Alice', 95);
scoreMap.set('Bob', 87);
scoreMap.set('Charlie', 92);

// get(키): 값 조회
console.log(scoreMap.get('Alice')); // 95
console.log(scoreMap.get('Dave'));  // undefined (없는 키)

// has(키): 포함 여부
console.log(scoreMap.has('Bob'));   // true

// size: 항목 개수
console.log(scoreMap.size); // 3

// delete(키): 제거
scoreMap.delete('Bob');
console.log(scoreMap.size); // 2


console.log('\n===== 7. Map — 숫자·객체를 키로 사용 =====');

// 일반 객체는 키가 항상 문자열로 변환됩니다.
// Map은 원래 타입 그대로 키로 사용합니다.

const objKeyMap = new Map();
const keyObj = { id: 1 };
const keyFn  = () => {};

objKeyMap.set(1, '숫자 키');
objKeyMap.set(keyObj, '객체 키');
objKeyMap.set(keyFn, '함수 키');
objKeyMap.set(true, '불리언 키');

console.log(objKeyMap.get(1));      // '숫자 키'
console.log(objKeyMap.get(keyObj)); // '객체 키'
console.log(objKeyMap.get(true));   // '불리언 키'


console.log('\n===== 8. Map 순회 =====');

const fruitPrices = new Map([
  ['사과', 1500],
  ['바나나', 800],
  ['포도', 3000]
]);

// for...of → [키, 값] 구조분해
for (const [fruit, price] of fruitPrices) {
  console.log(`${fruit}: ${price.toLocaleString()}원`);
}

// keys(), values(), entries()
console.log([...fruitPrices.keys()]);   // ['사과', '바나나', '포도']
console.log([...fruitPrices.values()]); // [1500, 800, 3000]


console.log('\n===== 9. Map vs 일반 객체 비교 =====');

// 일반 객체의 한계
const objStore = {};
const numKey = 42;
objStore[numKey] = '값';
console.log(Object.keys(objStore)); // ['42'] ← 숫자가 문자열로 변환됨

// Map은 타입 유지
const mapStore = new Map();
mapStore.set(numKey, '값');
console.log([...mapStore.keys()]); // [42] ← 숫자 그대로


console.log('\n===== 10. 실무 활용 — 캐시 구현 =====');

// 비용이 큰 연산 결과를 Map에 저장해 두는 캐시 패턴
const cache = new Map();

function expensiveCalc(n) {
  if (cache.has(n)) {
    console.log(`캐시 히트: ${n}`);
    return cache.get(n); // 이미 계산된 값 반환
  }
  // 실제 계산 (여기서는 단순 곱셈으로 시뮬레이션)
  const result = n * n;
  cache.set(n, result);
  console.log(`새로 계산: ${n} → ${result}`);
  return result;
}

expensiveCalc(5);  // 새로 계산: 5 → 25
expensiveCalc(5);  // 캐시 히트: 5
expensiveCalc(10); // 새로 계산: 10 → 100
