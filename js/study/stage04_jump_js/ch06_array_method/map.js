// ============================================================
// map.js — Array.prototype.map 완전 정복
//
// map: 배열의 모든 요소를 콜백으로 변환해 같은 길이의 새 배열을 반환합니다.
// 원본 배열은 변경되지 않습니다 (순수 함수적 동작).
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. map 기본 문법
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. map 기본 =====');

// 콜백 매개변수: (현재 요소, 인덱스, 원본 배열)
// 반환값: 콜백이 반환한 값들로 만든 새 배열 (길이 동일)

const numbers = [1, 2, 3, 4, 5];

// 각 요소를 2배로 변환
const doubled = numbers.map((n) => n * 2);
console.log('원본:', numbers); // [1, 2, 3, 4, 5] — 변경 없음
console.log('2배:', doubled);  // [2, 4, 6, 8, 10]

// 제곱 변환
const squared = numbers.map((n) => n ** 2);
console.log('제곱:', squared); // [1, 4, 9, 16, 25]

// 인덱스 활용 — 순번 붙이기
const indexed = numbers.map((n, i) => `${i + 1}번째: ${n}`);
console.log('순번:', indexed);
// ['1번째: 1', '2번째: 2', ...]


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. 문자열 배열 변환
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. 문자열 변환 =====');

const fruits = ['apple', 'banana', 'cherry', 'date'];

// 대문자로 변환
const upper = fruits.map((f) => f.toUpperCase());
console.log(upper); // ['APPLE', 'BANANA', 'CHERRY', 'DATE']

// 첫 글자만 대문자 (capitalize)
const capitalized = fruits.map((f) => f[0].toUpperCase() + f.slice(1));
console.log(capitalized); // ['Apple', 'Banana', 'Cherry', 'Date']

// 글자 수로 변환
const lengths = fruits.map((f) => f.length);
console.log('글자 수:', lengths); // [5, 6, 6, 4]


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. 객체 배열 변환 — 실무 핵심 패턴
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. 객체 배열 변환 =====');

const users = [
  { id: 1, firstName: 'Alice', lastName: 'Kim',  age: 28, score: 92 },
  { id: 2, firstName: 'Bob',   lastName: 'Lee',  age: 35, score: 78 },
  { id: 3, firstName: 'Carol', lastName: 'Park', age: 22, score: 85 },
];

// 필요한 필드만 추출 (API 응답 가공에 자주 쓰임)
const names = users.map(({ firstName, lastName }) => `${firstName} ${lastName}`);
console.log('이름 목록:', names);
// ['Alice Kim', 'Bob Lee', 'Carol Park']

// 새 속성 추가
const withFullName = users.map((user) => ({
  ...user,                                       // 기존 필드 유지
  fullName: `${user.firstName} ${user.lastName}`, // 새 필드 추가
  isAdult: user.age >= 30,                        // 파생 필드
}));
console.log('fullName 추가:');
withFullName.forEach(({ fullName, isAdult }) =>
  console.log(`  ${fullName} — 30대 이상: ${isAdult}`)
);

// 객체 형태 자체를 바꾸기 (정규화)
const normalized = users.map(({ id, firstName, score }) => ({
  userId:    id,
  label:     firstName,
  passed:    score >= 80,
}));
console.log('\n정규화:');
console.table(normalized);

// ID만 추출 (배열 → 숫자 배열)
const ids = users.map((u) => u.id);
console.log('ID 목록:', ids); // [1, 2, 3]


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. map 체이닝 — filter/sort와 조합
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. map 체이닝 =====');

const products = [
  { name: '노트북',  price: 1200000, category: '전자기기' },
  { name: '마우스',  price:   35000, category: '전자기기' },
  { name: '책상',    price:  250000, category: '가구'     },
  { name: '의자',    price:  180000, category: '가구'     },
  { name: '키보드',  price:   85000, category: '전자기기' },
];

// 전자기기만 → 이름과 가격 문자열로 변환
const electronicLabels = products
  .filter((p) => p.category === '전자기기') // 1단계: 조건 필터링
  .map((p) => `${p.name} (${p.price.toLocaleString()}원)`); // 2단계: 변환

console.log('전자기기:', electronicLabels);

// 가격에 부가세(10%) 포함 → 10만 원 이상 → 이름만 추출
const premiumNames = products
  .map((p) => ({ ...p, priceWithTax: Math.round(p.price * 1.1) })) // 부가세 추가
  .filter((p) => p.priceWithTax >= 100000)                          // 필터
  .map((p) => p.name);                                              // 이름만

console.log('10만 원 이상(부가세 포함):', premiumNames);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. map vs forEach 명확한 구분
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. map vs forEach =====');

// map   → 변환된 새 배열이 필요할 때
// forEach → 부수 효과만 필요할 때 (출력, 외부 변수 수정 등)

const temps = [0, 20, 37, 100]; // 섭씨

// ✅ map: 새 배열 생성 목적
const fahrenheit = temps.map((c) => c * 9 / 5 + 32);
console.log('화씨:', fahrenheit); // [32, 68, 98.6, 212]

// ✅ forEach: 출력이 목적 — 반환값 불필요
temps.forEach((c) => console.log(`${c}°C = ${c * 9 / 5 + 32}°F`));

// ❌ 잘못된 패턴 — forEach로 새 배열 만들려고 push 사용
const bad = [];
temps.forEach((c) => bad.push(c * 9 / 5 + 32)); // 동작은 하지만 map을 써야 함
// → 이 경우는 반드시 map 을 사용하세요


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. flatMap — map + 1단계 flat
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. flatMap =====');

// flatMap: 각 요소를 배열로 변환 후, 1단계 평탄화(flat)까지 수행
// map().flat(1) 와 동일하지만 더 간결하고 성능도 좋습니다.

const sentences = ['Hello World', '자바스크립트 공부', 'foo bar baz'];

// map: 2차원 배열이 됨
const nested = sentences.map((s) => s.split(' '));
console.log('map 결과:', nested);
// [['Hello','World'], ['자바스크립트','공부'], ['foo','bar','baz']]

// flatMap: 1차원으로 펼쳐짐
const words = sentences.flatMap((s) => s.split(' '));
console.log('flatMap 결과:', words);
// ['Hello', 'World', '자바스크립트', '공부', 'foo', 'bar', 'baz']

// 활용: 조건에 따라 0개 또는 여러 개 반환
const evenDoubled = [1, 2, 3, 4, 5].flatMap((n) =>
  n % 2 === 0 ? [n, n * 2] : [] // 짝수면 [원본, 2배], 홀수면 빈 배열(제거)
);
console.log('짝수만 원본+2배:', evenDoubled); // [2, 4, 4, 8]
