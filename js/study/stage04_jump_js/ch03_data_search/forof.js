// ============================================================
// forof.js — for...of 문 (이터러블 값 순회)
//
// for...of 는 이터러블(iterable) 객체의 "값(value)"을 순회합니다.
// 이터러블이란 Symbol.iterator 메서드를 가진 객체로,
// 배열, 문자열, Map, Set, arguments 등이 해당됩니다.
// 일반 객체({})는 이터러블이 아니므로 for...of 를 사용할 수 없습니다.
// ============================================================


console.log('===== 1. 배열 순회 =====');

const fruits = ['🍒', '🍓', '🍉'];

for (const fruit of fruits) {
  console.log(fruit); // 🍒, 🍓, 🍉 순서대로 출력
}

// const: 루프마다 새 변수가 생성되므로 const 사용 가능
// let:   값을 루프 안에서 바꿔야 할 때 사용


console.log('\n===== 2. 인덱스도 함께 얻기 — entries() =====');

// 배열.entries() → [인덱스, 값] 쌍의 이터러블 반환
// 구조 분해 할당으로 [index, value] 를 한 번에 받습니다.
const colors = ['red', 'green', 'blue'];

for (const [index, color] of colors.entries()) {
  console.log(`${index}번: ${color}`);
}
// 0번: red
// 1번: green
// 2번: blue


console.log('\n===== 3. 문자열 순회 =====');

// 문자열도 이터러블 — 글자 하나씩 순회합니다.
const word = 'Hello';

for (const char of word) {
  process.stdout.write(char + ' '); // H e l l o
}
console.log();

// 이모지(복합 문자)도 정확하게 처리합니다 (for...i 방식과 차이)
const emoji = '🍎🍊🍋';
for (const e of emoji) {
  process.stdout.write(e + ' '); // 🍎 🍊 🍋
}
console.log();


console.log('\n===== 4. Map 순회 =====');

// Map은 이터러블 — [키, 값] 쌍을 순서대로 순회합니다.
const scoreMap = new Map([
  ['Alice', 95],
  ['Bob', 87],
  ['Charlie', 92]
]);

for (const [name, score] of scoreMap) {
  console.log(`${name}: ${score}점`);
}


console.log('\n===== 5. Set 순회 =====');

// Set도 이터러블 — 삽입 순서대로 값을 순회합니다.
const tagSet = new Set(['JavaScript', 'CSS', 'HTML', 'JavaScript']); // 중복 제거됨

for (const tag of tagSet) {
  console.log(tag);
}
// JavaScript, CSS, HTML (중복된 JavaScript는 한 번만)


console.log('\n===== 6. 일반 객체는 for...of 불가 =====');

// 일반 객체({})는 이터러블이 아니라 for...of 를 사용할 수 없습니다.
// → for...in 또는 Object.entries() + for...of 를 사용합니다.

const person = { name: 'Kim', age: 25 };

// for (const val of person) { } // TypeError: person is not iterable

// ✅ 객체를 for...of 로 순회하려면 Object.entries() 사용
for (const [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}
// name: Kim
// age: 25


console.log('\n===== 7. for...of vs for...in 한눈에 비교 =====');

const arr = ['a', 'b', 'c'];

// for...of → 값
console.log('for...of (값):');
for (const v of arr) process.stdout.write(v + ' '); // a b c
console.log();

// for...in → 인덱스(키)
console.log('for...in (키):');
for (const k in arr) process.stdout.write(k + ' '); // 0 1 2
console.log();
