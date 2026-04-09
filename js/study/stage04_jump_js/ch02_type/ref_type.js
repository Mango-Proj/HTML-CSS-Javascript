// ============================================================
// ref_type.js — 원시 타입 vs 참조 타입
//
// 자바스크립트의 모든 데이터는 두 가지 방식으로 저장됩니다.
//   원시 타입: 값 자체를 변수에 직접 저장
//   참조 타입: 값이 저장된 메모리 주소(참조)를 변수에 저장
// ============================================================


console.log('===== 1. 원시 타입 (Primitive Type) =====');

// 원시 타입 종류: number, string, boolean, null, undefined, symbol, bigint
// 특징: 값을 복사하면 완전히 독립적인 복사본이 생깁니다.

let a = 10;
let b = a;   // a의 값(10)을 b에 복사 → b는 독립적인 10

b = 20;      // b를 바꿔도 a에는 영향 없음

console.log('a:', a); // 10 — 변하지 않음
console.log('b:', b); // 20

// 메모리 관점:
// a → [10]   (독립적인 저장 공간)
// b → [20]   (독립적인 저장 공간 — a와 연결 없음)

let str1 = 'hello';
let str2 = str1; // 문자열도 값 복사
str2 = 'world';
console.log('str1:', str1); // 'hello' — 변하지 않음
console.log('str2:', str2); // 'world'


console.log('\n===== 2. 참조 타입 (Reference Type) =====');

// 참조 타입 종류: object, array, function
// 특징: 변수에는 실제 데이터가 아닌 메모리 주소가 저장됩니다.
// 복사하면 같은 주소를 공유하므로, 한쪽을 바꾸면 다른 쪽도 바뀝니다.

const objA = { name: 'Kim', age: 25 };
const objB = objA; // objA의 '주소'를 복사 → 같은 객체를 가리킴

objB.name = 'Lee'; // objB를 통해 수정했지만...

console.log('objA.name:', objA.name); // 'Lee' — objA도 바뀜!
console.log('objB.name:', objB.name); // 'Lee'

// 메모리 관점:
// objA → [주소 #100] ─┐
//                      └→ { name: 'Lee', age: 25 }  (실제 데이터)
// objB → [주소 #100] ─┘

// 배열도 마찬가지
const arr1 = [1, 2, 3];
const arr2 = arr1;      // 같은 배열을 가리킴

arr2.push(4);
console.log('arr1:', arr1); // [1, 2, 3, 4] — arr1도 바뀜!
console.log('arr2:', arr2); // [1, 2, 3, 4]


console.log('\n===== 3. 참조 타입 복사 — 얕은 복사 (Shallow Copy) =====');

// 얕은 복사: 최상위 속성만 새로 복사하는 방식
// → 1단계 속성은 독립적이지만, 중첩된 객체/배열은 여전히 주소를 공유

// 방법 1: 스프레드 연산자 { ...obj }
const original = { name: 'Kim', age: 25 };
const copy1 = { ...original }; // 새로운 객체 생성 후 속성 복사

copy1.name = 'Park'; // 복사본 수정
console.log('original.name:', original.name); // 'Kim' — 영향 없음
console.log('copy1.name:', copy1.name);       // 'Park'

// 방법 2: Object.assign({}, obj)
const copy2 = Object.assign({}, original);
copy2.age = 30;
console.log('original.age:', original.age); // 25 — 영향 없음
console.log('copy2.age:', copy2.age);       // 30

// 배열 얕은 복사: [...arr] 또는 arr.slice()
const arrOrig = [1, 2, 3];
const arrCopy = [...arrOrig];
arrCopy.push(99);
console.log('arrOrig:', arrOrig); // [1, 2, 3] — 영향 없음
console.log('arrCopy:', arrCopy); // [1, 2, 3, 99]


console.log('\n===== 4. 얕은 복사의 한계 — 중첩 객체 =====');

// 얕은 복사는 1단계 속성만 복사합니다.
// 중첩된 객체는 여전히 같은 주소를 가리킵니다.

const user = {
  name: 'Kim',
  address: { city: 'Seoul' } // 중첩 객체
};

const shallowCopy = { ...user };
shallowCopy.name = 'Lee';                  // 1단계 → 독립적
shallowCopy.address.city = 'Busan';        // 중첩 → 원본도 영향받음!

console.log('user.name:', user.name);              // 'Kim' — 1단계는 독립
console.log('user.address.city:', user.address.city); // 'Busan' — 중첩은 공유!


console.log('\n===== 5. 깊은 복사 (Deep Copy) =====');

// 깊은 복사: 중첩 구조까지 모두 새로 복사 → 완전 독립
// 방법 1: JSON.parse(JSON.stringify(obj)) — 간단하지만 함수·Date 등은 복사 불가
const deepUser = {
  name: 'Kim',
  address: { city: 'Seoul' }
};

const deepCopy = JSON.parse(JSON.stringify(deepUser));
deepCopy.address.city = 'Busan';

console.log('deepUser.address.city:', deepUser.address.city); // 'Seoul' — 변하지 않음
console.log('deepCopy.address.city:', deepCopy.address.city); // 'Busan'

// 방법 2: structuredClone() — ES2022, 함수 제외 대부분 복사 가능
const deepCopy2 = structuredClone(deepUser);
deepCopy2.address.city = 'Incheon';
console.log('deepUser.address.city:', deepUser.address.city); // 'Seoul' — 변하지 않음


console.log('\n===== 6. 함수에서의 참조 타입 — 원본 보호 패턴 =====');

// 원시 타입은 함수에 전달해도 원본이 변하지 않습니다 (값 복사).
// 참조 타입은 함수에 전달하면 원본이 변할 수 있습니다 (주소 복사).

// ❌ 원본이 변하는 경우
function addJobBad(person) {
  person.job = 'Developer'; // 전달받은 주소의 실제 객체를 수정!
  return person;
}

const personA = { name: 'Kim' };
addJobBad(personA);
console.log('personA.job:', personA.job); // 'Developer' — 원본이 바뀜!

// ✅ 원본을 보호하는 패턴: 스프레드로 복사본을 만들어 작업
function updateName(person) {
  const newPerson = { ...person }; // 복사본 생성
  newPerson.name = 'Lee';
  return newPerson;
}

const original2 = { name: 'Kim' };
const updated = updateName(original2);

console.log('original2.name:', original2.name); // 'Kim' — 원본 유지
console.log('updated.name:', updated.name);     // 'Lee'
