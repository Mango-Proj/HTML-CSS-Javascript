// ============================================================
// arrays.js — 자바스크립트 배열(Array) 기초
//
// 배열: 순서가 있는 데이터를 연속해서 저장하는 자료구조.
// 인덱스(0부터 시작)로 각 요소에 접근합니다.
// 배열도 내부적으로 특수한 형태의 객체입니다.
//
// 특징:
//   - 여러 타입을 하나의 배열에 담을 수 있습니다.
//   - 길이가 동적으로 늘고 줄어듭니다.
//   - typeof [] 는 'object' 이며, Array.isArray() 로 구분합니다.
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. 배열 생성과 인덱싱
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. 배열 생성과 인덱싱 =====');

// ① 배열 리터럴 방식 (권장) — [] 안에 요소를 쉼표로 구분
const seasons   = ['spring', 'summer', 'autumn', 'winter'];
const numbers   = [1, 2, 3, 4, 5];
const mixed     = ['Hello', 42, true, null, { name: 'John' }]; // 혼합 타입 가능
const emptyArr  = []; // 빈 배열

console.log('seasons:', seasons);
console.log('mixed:', mixed);

// ② 생성자 방식 (거의 사용 안 함)
const arr2 = new Array(3);         // 길이 3인 빈 배열 [empty × 3]
const arr3 = new Array(1, 2, 3);   // [1, 2, 3]
console.log('new Array(3):', arr2);
console.log('new Array(1,2,3):', arr3);

// 인덱스로 요소 접근 — 0부터 시작
console.log('\n인덱싱:');
console.log('첫 번째(0):', seasons[0]);  // 'spring'
console.log('두 번째(1):', seasons[1]);  // 'summer'
console.log('마지막(3):', seasons[3]);   // 'winter'

// 마지막 요소 접근: 길이 - 1
console.log('마지막(length-1):', seasons[seasons.length - 1]); // 'winter'
// at(-1): ES2022, 음수 인덱스로 끝에서부터 접근
console.log('마지막(at -1):', seasons.at(-1));   // 'winter'
console.log('끝에서 두번째:', seasons.at(-2));   // 'autumn'

// 범위 밖 인덱스 → undefined
console.log('범위 밖(10):', seasons[10]);  // undefined

// 배열 여부 확인 — typeof 가 아닌 Array.isArray() 사용
console.log('\nArray.isArray([]):', Array.isArray(seasons)); // true
console.log('typeof []:', typeof seasons);                  // 'object'


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. length — 배열 길이
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. length =====');

const nums = [7, 11, 12, 21, 35];

// length: 배열에 담긴 요소의 개수
console.log('길이:', nums.length); // 5

// length 를 직접 줄이면 뒤 요소가 삭제됨
const numsA = [7, 11, 12, 21];
numsA.length = 2;
console.log('length=2 로 축소:', numsA); // [7, 11]

// length 를 늘리면 빈 슬롯이 생김 (undefined 로 채워짐)
numsA.length = 4;
console.log('length=4 로 확대:', numsA); // [7, 11, <2 empty items>]
console.log('빈 슬롯 접근:', numsA[3]);  // undefined

// 배열이 비었는지 확인
const empty = [];
console.log('비어있는가:', empty.length === 0); // true


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. 요소 추가 — push / unshift
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. 요소 추가 =====');

// push(값, ...) — 배열 끝에 요소 추가, 새 length 반환
const fruits = ['apple', 'lemon'];
const newLen = fruits.push('mango');   // 끝에 추가
console.log('push 후:', fruits);       // ['apple', 'lemon', 'mango']
console.log('반환(length):', newLen);  // 3

fruits.push('grape', 'banana');        // 여러 개 한 번에 추가
console.log('여러 개 push:', fruits);  // ['apple', 'lemon', 'mango', 'grape', 'banana']

// unshift(값, ...) — 배열 앞에 요소 추가, 새 length 반환
const chars = ['e', 'f'];
chars.unshift('c', 'd');               // 앞에 추가 (전달 순서대로 삽입됨)
console.log('unshift 후:', chars);     // ['c', 'd', 'e', 'f']

chars.unshift('a', 'b');
console.log('unshift 추가:', chars);   // ['a', 'b', 'c', 'd', 'e', 'f']

// 인덱스로 직접 추가 (권장하지 않음)
const direct = ['x', 'y'];
direct[2] = 'z';          // length 바로 다음 인덱스
console.log('인덱스 직접:', direct);   // ['x', 'y', 'z']

direct[5] = 'w';          // ⚠️ 중간에 빈 슬롯 발생
console.log('빈 슬롯 발생:', direct);  // ['x', 'y', 'z', <2 empty>, 'w']


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. 요소 제거 — pop / shift / splice
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. 요소 제거 =====');

// pop() — 배열 끝 요소를 제거하고 반환
const stack = ['a', 'b', 'c', 'd'];
const last = stack.pop();              // 끝에서 제거
console.log('pop 한 값:', last);       // 'd'
console.log('pop 후:', stack);         // ['a', 'b', 'c']

// shift() — 배열 앞 요소를 제거하고 반환
const queue = ['first', 'second', 'third'];
const first = queue.shift();           // 앞에서 제거
console.log('shift 한 값:', first);   // 'first'
console.log('shift 후:', queue);       // ['second', 'third']

// splice(시작인덱스, 제거개수, 추가요소...) — 원하는 위치에서 제거·추가
const animals = ['dog', 'cat', 'bird', 'fish', 'hamster'];

// 제거만 — 인덱스 1부터 2개 제거
const removed = animals.splice(1, 2);
console.log('\nsplice 제거:', animals);   // ['dog', 'fish', 'hamster']
console.log('제거된 요소:', removed);    // ['cat', 'bird']

// 추가만 — 인덱스 1에 0개 제거 후 'rabbit', 'turtle' 삽입
animals.splice(1, 0, 'rabbit', 'turtle');
console.log('splice 추가:', animals);    // ['dog', 'rabbit', 'turtle', 'fish', 'hamster']

// 교체 — 인덱스 2의 요소 1개를 제거하고 'penguin' 삽입
animals.splice(2, 1, 'penguin');
console.log('splice 교체:', animals);    // ['dog', 'rabbit', 'penguin', 'fish', 'hamster']


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. 탐색 — indexOf / includes / find
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. 탐색 =====');

const colors = ['red', 'green', 'blue', 'green', 'yellow'];

// indexOf(값) — 처음 발견된 인덱스, 없으면 -1
console.log('indexOf green:', colors.indexOf('green'));     // 1 (첫 번째)
console.log('indexOf purple:', colors.indexOf('purple'));   // -1 (없음)

// lastIndexOf(값) — 마지막으로 발견된 인덱스
console.log('lastIndexOf green:', colors.lastIndexOf('green')); // 3 (마지막)

// includes(값) — 포함 여부 (boolean)
console.log('includes blue:', colors.includes('blue'));    // true
console.log('includes pink:', colors.includes('pink'));    // false

// 존재 여부 확인 패턴 — indexOf vs includes
const target = 'blue';
if (colors.indexOf(target) !== -1) {
    console.log('indexOf 로 확인: 있음');
}
if (colors.includes(target)) {
    console.log('includes 로 확인: 있음'); // 더 간결, 권장
}

// findIndex(콜백) — 조건을 만족하는 첫 번째 인덱스
const scores = [72, 85, 91, 60, 88];
const highScoreIdx = scores.findIndex((s) => s >= 90);
console.log('\n90점 이상 첫 번째 인덱스:', highScoreIdx); // 2

// find(콜백) — 조건을 만족하는 첫 번째 요소 자체
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Carol' },
];
const found = users.find((u) => u.id === 2);
console.log('find 결과:', found); // { id: 2, name: 'Bob' }


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. 추출 / 병합 — slice / concat / spread
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. 추출 / 병합 =====');

const alpha = ['a', 'b', 'c', 'd', 'e'];

// slice(시작, 끝) — 원본 유지, 일부를 추출해 새 배열 반환 (끝 인덱스 미포함)
console.log('slice(1,3):', alpha.slice(1, 3));  // ['b', 'c']
console.log('slice(2):', alpha.slice(2));        // ['c', 'd', 'e'] (끝까지)
console.log('slice(-2):', alpha.slice(-2));      // ['d', 'e'] (끝에서 2개)
console.log('원본 유지:', alpha);                // 변경 없음

// concat(배열, ...) — 배열을 이어 붙여 새 배열 반환
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

const merged1 = arr1.concat(arr2);
console.log('\nconcat:', merged1);        // [1, 2, 3, 4, 5, 6]

const merged2 = arr1.concat(arr2, arr3);
console.log('concat 여러개:', merged2);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 스프레드 연산자(...)로 병합 — 더 간결, 권장
const spreadMerged = [...arr1, ...arr2, ...arr3];
console.log('스프레드 병합:', spreadMerged); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 배열 복사 — 스프레드로 얕은 복사
const original = [1, 2, 3];
const copy = [...original];   // 새 배열
copy.push(4);
console.log('\n원본:', original); // [1, 2, 3] — 영향 없음
console.log('복사본:', copy);    // [1, 2, 3, 4]


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 7. 정렬과 뒤집기 — sort / reverse
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 7. 정렬과 뒤집기 =====');

// sort() — 원본 배열 직접 정렬 (in-place)
// ⚠️ 비교 함수 없으면 요소를 문자열로 변환 후 유니코드 순 정렬

const fruits2 = ['banana', 'apple', 'cherry', 'date'];
fruits2.sort();
console.log('문자열 sort:', fruits2); // ['apple', 'banana', 'cherry', 'date']

// 숫자 정렬 — 반드시 비교 함수 필요
const numArr = [10, 5, 80, 2, 100, 25];
console.log('비교함수 없음:', [...numArr].sort()); // 문자열 정렬: [10, 100, 2, 25, 5, 80]
numArr.sort((a, b) => a - b);  // 오름차순: (a-b) 가 음수면 a가 앞
console.log('오름차순:', numArr); // [2, 5, 10, 25, 80, 100]

numArr.sort((a, b) => b - a);  // 내림차순
console.log('내림차순:', numArr); // [100, 80, 25, 10, 5, 2]

// reverse() — 순서 뒤집기 (원본 변경)
const letters = ['a', 'b', 'c', 'd'];
letters.reverse();
console.log('reverse:', letters); // ['d', 'c', 'b', 'a']

// 원본 보존하며 뒤집기 — 스프레드로 복사 후 reverse
const original2 = [1, 2, 3, 4, 5];
const reversed = [...original2].reverse();
console.log('원본:', original2);     // [1, 2, 3, 4, 5]
console.log('뒤집은 복사:', reversed); // [5, 4, 3, 2, 1]


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 8. 변환 — join / split
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 8. join / split =====');

// join(구분자) — 배열 → 문자열 (구분자 기본값: ',')
const words = ['Hello', 'World', 'JavaScript'];
console.log('join(" "):', words.join(' '));    // 'Hello World JavaScript'
console.log('join("-"):', words.join('-'));    // 'Hello-World-JavaScript'
console.log('join(""):', words.join(''));      // 'HelloWorldJavaScript'

// split(구분자) — 문자열 → 배열 (join 의 역연산)
const sentence = 'apple,banana,cherry';
console.log('split(","):', sentence.split(','));  // ['apple', 'banana', 'cherry']

const path = '/api/v1/users/123';
console.log('경로 분리:', path.split('/').filter(Boolean)); // ['api','v1','users','123']

// URL 조합 패턴
const segments = ['api', 'v1', 'products', '42'];
console.log('URL 조합:', '/' + segments.join('/')); // '/api/v1/products/42'


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 9. 순회 — for / forEach / for...of
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 9. 배열 순회 =====');

const items = ['사과', '바나나', '체리', '딸기'];

// ① 전통 for 문 — 인덱스 직접 제어 가능
console.log('[for 문]');
for (let i = 0; i < items.length; i++) {
    console.log(`  [${i}] ${items[i]}`);
}

// ② forEach(콜백) — 각 요소를 순서대로 방문 (반환값 없음)
console.log('[forEach]');
items.forEach((item, index) => {
    console.log(`  ${index + 1}번: ${item}`);
});

// ③ for...of — break 가 필요할 때
console.log('[for...of]');
for (const item of items) {
    if (item === '체리') break; // 체리에서 중단
    console.log(' ', item);
}

// ④ for...in — 객체 키 순회 (배열에서는 비권장)
// 인덱스가 문자열로 반환되고, 상속 속성까지 포함될 수 있어 배열에는 비권장
console.log('[for...in 비권장]');
for (const i in items) {
    console.log(`  타입: ${typeof i}, 값: ${items[i]}`); // i 는 문자열 '0','1',...
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 10. 배열 구조 분해 (Destructuring)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 10. 배열 구조 분해 =====');

// 배열의 요소를 변수에 한 번에 할당하는 문법
const rgb = [255, 128, 0];

// 기본 구조 분해
const [r, g, b] = rgb;
console.log(`R:${r}, G:${g}, B:${b}`); // R:255, G:128, B:0

// 일부 요소 건너뛰기 (쉼표로 자리 비움)
const [first, , third] = ['A', 'B', 'C'];
console.log('first:', first, 'third:', third); // 'A', 'C'

// 기본값 설정
const [x = 0, y = 0, z = 0] = [10, 20];
console.log(`x:${x}, y:${y}, z:${z}`); // 10, 20, 0

// 나머지 요소 수집 — rest 패턴
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log('head:', head);  // 1
console.log('tail:', tail);  // [2, 3, 4, 5]

// 두 변수 값 교환 — 임시 변수 없이 간결하게
let swap1 = '사과';
let swap2 = '바나나';
[swap1, swap2] = [swap2, swap1];
console.log('교환 후:', swap1, swap2); // '바나나', '사과'
