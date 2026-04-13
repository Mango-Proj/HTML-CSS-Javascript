// ============================================================
// sorts.js — 배열 정렬 완전 정복
//
// sort(): 원본 배열을 직접 변경(in-place)합니다.
// toSorted(): ES2023, 원본 유지하며 정렬된 새 배열을 반환합니다.
//
// ⚠️ 기본 sort()는 요소를 문자열로 변환 후 유니코드 순으로 정렬합니다.
//    숫자 정렬에는 반드시 비교 함수를 제공해야 합니다.
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. 기본 sort — 문자열 정렬의 함정
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. 기본 sort 함정 =====');

// 비교 함수 없이 sort() → 요소를 UTF-16 문자열로 변환해 사전순 정렬
// 숫자에서 예상치 못한 결과가 나옵니다!

const nums = [10, 5, 80, 100, 2, 25];

// ❌ 비교 함수 없는 정렬 — 문자열 '100' < '2' (1 < 2)
const wrongSort = [...nums].sort();
console.log('기본 sort (잘못됨):', wrongSort); // [10, 100, 2, 25, 5, 80]

// ✅ 비교 함수 (a - b): 음수면 a가 앞, 양수면 b가 앞, 0이면 유지
const ascending = [...nums].sort((a, b) => a - b);
console.log('오름차순:', ascending); // [2, 5, 10, 25, 80, 100]

const descending = [...nums].sort((a, b) => b - a);
console.log('내림차순:', descending); // [100, 80, 25, 10, 5, 2]

// 원본 보존 확인 (스프레드로 복사했으므로 nums는 변경 없음)
console.log('원본 유지:', nums);

// 직접 정렬 시 원본이 바뀜을 주의!
const original = [3, 1, 4];
original.sort((a, b) => a - b); // ← 원본 변경
console.log('\n원본 변경됨:', original); // [1, 3, 4]


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. 문자열 배열 정렬
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. 문자열 정렬 =====');

const fruits = ['banana', 'Apple', 'cherry', 'apricot', 'Blueberry'];

// 기본 sort: 대문자(A-Z) → 소문자(a-z) 순 (유니코드 기준)
const basicSort = [...fruits].sort();
console.log('기본 sort:', basicSort);
// ['Apple', 'Blueberry', 'apricot', 'banana', 'cherry'] — 대문자가 먼저

// 대소문자 무시 정렬 (localeCompare 활용)
const caseInsensitive = [...fruits].sort((a, b) =>
  a.toLowerCase().localeCompare(b.toLowerCase())
);
console.log('대소문자 무시:', caseInsensitive);
// ['Apple', 'apricot', 'banana', 'Blueberry', 'cherry']

// localeCompare: 언어별 사전순 정렬 — 한국어, 독일어 등 다국어 지원
const korFruits = ['바나나', '사과', '딸기', '체리', '아보카도'];
const korSorted = [...korFruits].sort((a, b) => a.localeCompare(b, 'ko'));
console.log('한국어 정렬:', korSorted);
// ['딸기', '바나나', '사과', '아보카도', '체리'] (가나다 순)


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. 객체 배열 정렬
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. 객체 배열 정렬 =====');

const users = [
  { name: 'Carol', age: 22, score: 85 },
  { name: 'Alice', age: 28, score: 92 },
  { name: 'Dave',  age: 28, score: 78 },
  { name: 'Bob',   age: 35, score: 78 },
  { name: 'Eve',   age: 22, score: 91 },
];

// 나이 오름차순
const byAge = [...users].sort((a, b) => a.age - b.age);
console.log('나이 오름차순:');
byAge.forEach(({ name, age }) => console.log(`  ${name} (${age}세)`));

// 점수 내림차순 (높은 점수 먼저)
const byScore = [...users].sort((a, b) => b.score - a.score);
console.log('\n점수 내림차순:');
byScore.forEach(({ name, score }) => console.log(`  ${name}: ${score}점`));

// 이름 알파벳 순
const byName = [...users].sort((a, b) => a.name.localeCompare(b.name));
console.log('\n이름 알파벳 순:');
byName.forEach(({ name }) => console.log(`  ${name}`));


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. 다중 조건 정렬 (Multi-key Sort)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. 다중 조건 정렬 =====');

// 나이 오름차순, 나이가 같으면 점수 내림차순, 그것도 같으면 이름 오름차순

const multiSorted = [...users].sort((a, b) => {
  // 1순위: 나이 오름차순
  if (a.age !== b.age) return a.age - b.age;

  // 2순위: 점수 내림차순 (나이가 같을 때)
  if (a.score !== b.score) return b.score - a.score;

  // 3순위: 이름 사전순 (나이, 점수 모두 같을 때)
  return a.name.localeCompare(b.name);
});

console.log('나이↑ → 점수↓ → 이름↑:');
multiSorted.forEach(({ name, age, score }) =>
  console.log(`  ${name.padEnd(6)} 나이: ${age}  점수: ${score}`)
);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. toSorted — 원본 유지 정렬 (ES2023)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. toSorted (ES2023) =====');

// sort()   → 원본을 직접 변경 (mutating)
// toSorted() → 새 배열을 반환, 원본 유지 (non-mutating)

const original2 = [40, 1, 5, 200, 100, 25];

const sorted = original2.toSorted((a, b) => a - b); // 새 배열 반환
console.log('정렬된 새 배열:', sorted);    // [1, 5, 25, 40, 100, 200]
console.log('원본 유지됨:', original2);    // [40, 1, 5, 200, 100, 25]

// toReversed — reverse()의 비변경 버전 (ES2023)
const reversed = original2.toReversed();
console.log('역순 새 배열:', reversed);    // [25, 100, 200, 5, 1, 40]
console.log('원본 유지됨:', original2);    // [40, 1, 5, 200, 100, 25]

// toSpliced — splice()의 비변경 버전 (ES2023)
const splicedArr = original2.toSpliced(2, 1, 999); // 인덱스 2부터 1개 제거 후 999 삽입
console.log('toSpliced:', splicedArr);
console.log('원본 유지됨:', original2);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. 정렬 안정성 (Stable Sort)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. 정렬 안정성 =====');

// ES2019부터 Array.sort는 안정 정렬(stable sort)이 보장됩니다.
// 비교값이 동일한(0 반환) 요소들은 원래 순서가 유지됩니다.

const records = [
  { name: 'Bob',   dept: 'A', joined: 2020 },
  { name: 'Alice', dept: 'B', joined: 2019 },
  { name: 'Carol', dept: 'A', joined: 2021 },
  { name: 'Dave',  dept: 'B', joined: 2018 },
  { name: 'Eve',   dept: 'A', joined: 2022 },
];

// 부서(dept)로만 정렬 → 같은 부서 내에서 원래 순서 유지됨 (안정 정렬)
const stableSorted = [...records].sort((a, b) =>
  a.dept.localeCompare(b.dept)
);
console.log('부서별 정렬 (안정):');
stableSorted.forEach(({ name, dept, joined }) =>
  console.log(`  [${dept}] ${name} (${joined}년)`)
);
// A 그룹: Bob(2020), Carol(2021), Eve(2022) — 원래 순서 유지


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 7. 기타 배열 조작 메서드
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 7. reverse / flat / Array.from =====');

const arr = [1, 2, 3, 4, 5];

// reverse() — 배열을 뒤집음 (원본 변경)
const rev = [...arr].reverse();
console.log('reverse:', rev); // [5, 4, 3, 2, 1]

// flat(depth) — 중첩 배열 평탄화
const nested = [1, [2, 3], [4, [5, 6]]];
console.log('flat(1):', nested.flat(1));        // [1, 2, 3, 4, [5, 6]]
console.log('flat(2):', nested.flat(2));        // [1, 2, 3, 4, 5, 6]
console.log('flat(∞):', nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

// Array.from — 이터러블 또는 유사배열 → 배열
console.log('Array.from(문자열):', Array.from('hello')); // ['h','e','l','l','o']
console.log('Array.from(Set):', Array.from(new Set([1,2,2,3]))); // [1,2,3]
console.log('Array.from 생성:', Array.from({ length: 5 }, (_, i) => i + 1)); // [1,2,3,4,5]
