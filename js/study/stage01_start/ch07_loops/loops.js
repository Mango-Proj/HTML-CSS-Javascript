// ============================================================
// loops.js — 자바스크립트 반복문(Loop) 완전 정복
//
// 반복문: 동일한 코드를 조건이 참인 동안 반복 실행하는 제어문입니다.
// 직접 코드를 N번 나열하는 대신, 반복문으로 간결하게 처리합니다.
//
// 종류:
//   for          — 반복 횟수가 명확할 때
//   while        — 조건 기반 반복 (횟수 불명확)
//   do...while   — 최소 1회 실행 보장
//   for...of     — 이터러블(배열·문자열·Map·Set) 순회
//   for...in     — 객체 키 순회
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. for 문 — 횟수가 명확한 반복
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. for 문 =====');

// 구조: for (초기식; 조건식; 증감식) { 실행 코드 }
//
// 초기식: for 시작 전 딱 한 번 실행 (주로 제어 변수 선언)
// 조건식: 매 반복 전에 평가 → false 이면 즉시 종료
// 증감식: 매 반복이 끝난 후 실행 (제어 변수 업데이트)
//
// 실행 흐름:
//   초기식 → (조건식 → 실행 코드 → 증감식) × N → 조건식 false → 종료

// 기본 예시 — 1부터 5까지 출력
for (let n = 1; n <= 5; n++) {
    console.log(`${n}번째 손님, 안녕하세요!`);
}

// 역순으로 카운트다운
console.log('\n--- 카운트다운 ---');
for (let i = 5; i >= 1; i--) {
    console.log(`${i}...`);
}
console.log('발사!');

// 증감 단위 변경 — 짝수만 출력 (2씩 증가)
console.log('\n--- 짝수 (i += 2) ---');
for (let i = 2; i <= 10; i += 2) {
    process.stdout.write(i + ' '); // 줄바꿈 없이 이어서 출력
}
console.log();

// ── 1-1. 배열과 for 문 ───────────────────────────────────────

console.log('\n--- 배열 순회 ---');

const fruits = ['사과', '바나나', '체리', '딸기', '포도'];

// 인덱스와 값 모두 필요할 때
for (let i = 0; i < fruits.length; i++) {
    console.log(`[${i}] ${fruits[i]}`);
}

// 배열의 합산
const prices = [1200, 3500, 800, 4200, 1500];
let total = 0;
for (let i = 0; i < prices.length; i++) {
    total += prices[i];
}
console.log('\n가격 합계:', total.toLocaleString() + '원'); // 11,200원


// ── 1-2. 중첩 for 문 ─────────────────────────────────────────

console.log('\n--- 중첩 for (구구단 3~4단) ---');

// 바깥 반복(단) × 안쪽 반복(곱수) → 2차원 구조 표현
for (let dan = 3; dan <= 4; dan++) {
    for (let num = 1; num <= 9; num++) {
        console.log(`  ${dan} × ${num} = ${dan * num}`);
    }
    console.log(); // 단 사이 빈 줄
}

// 별 삼각형 출력 — 중첩 반복 활용
console.log('--- 별 삼각형 ---');
for (let row = 1; row <= 5; row++) {
    let line = '';
    for (let col = 1; col <= row; col++) {
        line += '★ ';
    }
    console.log(line.trim());
}
// ★
// ★ ★
// ★ ★ ★
// ★ ★ ★ ★
// ★ ★ ★ ★ ★


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. break — 반복문 즉시 종료
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. break =====');

// break: 반복문을 즉시 탈출합니다.
// 조건 충족 시 더 이상 반복할 필요가 없을 때 사용합니다.

// 예시 1: 5번째 손님에서 중단
for (let n = 1; n <= 10; n++) {
    if (n === 5) {
        console.log(`${n}번째 손님 — 만석! 입장 중단.`);
        break; // 남은 반복(6~10) 실행 안 하고 즉시 종료
    }
    console.log(`${n}번째 손님 입장`);
}
console.log('반복문 종료');

// 예시 2: 배열에서 조건에 맞는 첫 번째 값 찾기
console.log('\n--- 배열에서 찾기 ---');
const scores = [72, 58, 91, 63, 87, 95, 44];
let firstHigh = -1;

for (let i = 0; i < scores.length; i++) {
    if (scores[i] >= 90) {
        firstHigh = scores[i];
        console.log(`90점 이상 첫 번째 발견: [${i}] = ${firstHigh}`);
        break; // 찾았으므로 더 이상 탐색 불필요
    }
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. continue — 현재 반복 건너뛰기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. continue =====');

// continue: 현재 회차의 남은 코드를 건너뛰고 다음 반복으로 넘어갑니다.
// 반복 자체는 계속됩니다 (break 와 다른 점).

// 예시 1: 짝수만 건너뛰기
console.log('홀수만 출력:');
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) continue; // 짝수면 건너뜀
    process.stdout.write(i + ' ');
}
console.log();

// 예시 2: 특정 조건의 항목 제외
console.log('\n--- 품절 제외 출력 ---');
const products = [
    { name: '노트북',  price: 1200000, inStock: true  },
    { name: '마우스',  price:   35000, inStock: false },
    { name: '키보드',  price:   85000, inStock: true  },
    { name: '모니터',  price:  450000, inStock: false },
    { name: '웹캠',    price:   75000, inStock: true  },
];

for (let i = 0; i < products.length; i++) {
    if (!products[i].inStock) continue; // 품절 상품 건너뜀
    console.log(`✅ ${products[i].name}: ${products[i].price.toLocaleString()}원`);
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. while 문 — 조건 기반 반복
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. while 문 =====');

// 구조: while (조건식) { 실행 코드 }
//
// 매 반복 전에 조건식을 평가 → true 이면 실행, false 이면 종료
// 반복 횟수가 불명확하거나 조건이 복잡할 때 for 보다 가독성이 좋습니다.
// ⚠️ 반드시 조건을 false 로 만드는 로직이 내부에 있어야 무한 루프를 피합니다.

// 기본 예시 — 1부터 5까지
let n = 1; // 제어 변수 — while 문 밖에서 선언
while (n <= 5) {
    console.log(`${n}번째 손님 안녕하세요~`);
    n++; // 증감식 — 없으면 무한 루프!
}

// 예시 2: 목표 금액에 도달할 때까지 저축
console.log('\n--- 저축 시뮬레이션 ---');
let savings = 0;
const goal = 100000;
const monthlyDeposit = 30000;
let month = 0;

while (savings < goal) {
    month++;
    savings += monthlyDeposit;
    console.log(`${month}개월 후 저축액: ${savings.toLocaleString()}원`);
}
console.log(`목표 달성! ${month}개월 소요`);

// 예시 3: 숫자를 자릿수로 분해 (반복 횟수 미리 알 수 없음)
console.log('\n--- 자릿수 분해 ---');
let num = 12345;
const digits = [];

while (num > 0) {
    digits.unshift(num % 10); // 마지막 자리 추출
    num = Math.floor(num / 10); // 마지막 자리 제거
}
console.log('12345의 자릿수:', digits); // [1, 2, 3, 4, 5]


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. do...while 문 — 최소 1회 실행 보장
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. do...while 문 =====');

// 구조: do { 실행 코드 } while (조건식);
//
// 코드를 먼저 실행한 뒤 조건을 평가합니다.
// 조건이 처음부터 false 여도 최소 한 번은 반드시 실행됩니다.
// → "입력 검증", "메뉴 처음 표시" 등에 유용합니다.

// 기본 예시
let count = 0;
do {
    count++;
    console.log(`${count}번째 방문자님, 안녕하세요!`);
} while (count < 5);

// while vs do...while 차이 비교
console.log('\n--- while vs do...while 차이 ---');

let val = 10; // 처음부터 조건(< 5)이 false 인 경우

// while: 조건이 처음부터 false → 한 번도 실행 안 됨
let whileCount = 0;
while (val < 5) {
    whileCount++;
}
console.log('while 실행 횟수:', whileCount); // 0

// do...while: 조건이 false 여도 최소 1회 실행
let doCount = 0;
do {
    doCount++;
} while (val < 5);
console.log('do...while 실행 횟수:', doCount); // 1

// 실전 예시: 최초 메뉴를 반드시 보여주는 패턴
console.log('\n--- 메뉴 최초 출력 패턴 ---');
let choice = '';
let tries  = 0;
const maxTries = 3;

do {
    tries++;
    choice = tries === 2 ? 'quit' : ''; // 시뮬레이션: 2번째 시도에 'quit' 입력
    console.log(`[메뉴 표시 ${tries}회] 선택: "${choice || '없음'}"`);
} while (choice !== 'quit' && tries < maxTries);

console.log('메뉴 종료');


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. for...of — 이터러블 순회
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. for...of =====');

// for...of: 이터러블(배열, 문자열, Map, Set 등)의 값을 순서대로 꺼냅니다.
// 인덱스 없이 값에만 집중하고 싶을 때 가장 간결합니다.

// ① 배열
const colors = ['빨강', '초록', '파랑', '노랑'];
for (const color of colors) {
    console.log('색상:', color);
}

// ② 문자열 — 글자 하나씩 순회
console.log('\n--- 문자열 순회 ---');
const word = 'Hello';
for (const ch of word) {
    process.stdout.write(ch + '-');
}
console.log();

// ③ 인덱스도 필요하면 entries() 사용
console.log('\n--- entries()로 인덱스 포함 ---');
for (const [index, value] of colors.entries()) {
    console.log(`  [${index}] ${value}`);
}

// ④ 객체 배열 순회 — 가장 실무에서 자주 쓰이는 패턴
console.log('\n--- 객체 배열 순회 ---');
const students = [
    { name: 'Alice', score: 92 },
    { name: 'Bob',   score: 78 },
    { name: 'Carol', score: 85 },
];

for (const student of students) {
    const grade = student.score >= 90 ? 'A' : student.score >= 80 ? 'B' : 'C';
    console.log(`  ${student.name}: ${student.score}점 (${grade})`);
}

// ⑤ Set 순회
console.log('\n--- Set 순회 ---');
const uniqueNums = new Set([3, 1, 4, 1, 5, 9, 2, 6, 5]);
for (const n of uniqueNums) {
    process.stdout.write(n + ' ');
}
console.log();

// ⑥ Map 순회
console.log('\n--- Map 순회 ---');
const capitals = new Map([
    ['한국', '서울'],
    ['일본', '도쿄'],
    ['프랑스', '파리'],
]);
for (const [country, capital] of capitals) {
    console.log(`  ${country}의 수도: ${capital}`);
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 7. for...in — 객체 키 순회
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 7. for...in =====');

// for...in: 객체의 열거 가능한 키(key)를 순서대로 꺼냅니다.
// 키를 문자열로 반환하므로, 배열의 인덱스도 문자열입니다.
// → 배열에는 for...of 또는 forEach 를 사용하는 것이 권장됩니다.

// ① 객체 키 순회
const person = { name: '홍길동', age: 28, job: '개발자', city: '서울' };

for (const key in person) {
    console.log(`  ${key}: ${person[key]}`);
}

// ② hasOwnProperty 로 상속 속성 제외 (안전한 패턴)
console.log('\n--- hasOwnProperty 패턴 ---');
for (const key in person) {
    if (person.hasOwnProperty(key)) { // 직접 정의한 속성만
        console.log(`  [직접] ${key}: ${person[key]}`);
    }
}

// ③ 배열에 for...in 을 쓰면 안 되는 이유
console.log('\n--- 배열에 for...in (비권장) ---');
const arr = ['a', 'b', 'c'];
for (const i in arr) {
    console.log(`  typeof i: ${typeof i}, arr[${i}]: ${arr[i]}`);
    // i 는 문자열 '0', '1', '2' → 연산에 사용하면 오류 가능
}
// → 배열은 for, for...of, forEach 를 사용하세요


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 8. 레이블(Label) — 중첩 반복문 제어
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 8. 레이블 (중첩 반복문 제어) =====');

// 레이블: 반복문 앞에 이름을 붙여 break/continue 의 대상을 지정합니다.
// 중첩 반복문에서 안쪽 루프의 break 가 바깥 루프를 종료하고 싶을 때 사용합니다.

// 레이블 없이 break → 가장 안쪽 루프만 종료
console.log('--- 레이블 없이 (안쪽 루프만 종료) ---');
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (j === 1) break; // i 루프는 계속 돔
        console.log(`  i=${i}, j=${j}`);
    }
}
// i=0,j=0 / i=1,j=0 / i=2,j=0 (j는 0만 출력됨)

// 레이블로 바깥 루프까지 한 번에 종료
console.log('\n--- 레이블로 바깥 루프 종료 ---');
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            console.log(`  i=${i}, j=${j} — 여기서 outer 루프 전체 종료`);
            break outer; // outer 레이블이 붙은 루프를 종료
        }
        console.log(`  i=${i}, j=${j}`);
    }
}
console.log('outer 루프 종료 후');


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 9. 무한 루프와 주의사항
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 9. 무한 루프 주의 =====');

// 무한 루프: 조건이 항상 true 여서 반복이 끝나지 않는 상태.
// 프로그램을 멈춰버리거나 서버 부하를 일으키므로 반드시 방지해야 합니다.

// ❌ 무한 루프 예시 (절대 실행 금지 — 주석 처리)
// while (true) {
//     console.log('무한 반복!'); // break 없으면 프로그램이 멈춤
// }

// for (let i = 0; i >= 0; i++) { // 조건이 항상 true
//     console.log(i);
// }

// ✅ 의도적 무한 루프 — 반드시 break 조건이 있어야 합니다
console.log('의도적 무한 루프 + break:');
let attempt = 0;
while (true) { // 의도적으로 무한 루프
    attempt++;
    if (attempt >= 3) {
        console.log(`${attempt}번 시도 — 최대 횟수 초과, 종료`);
        break; // ← 반드시 탈출 조건!
    }
    console.log(`${attempt}번 시도 중...`);
}

// 흔한 실수들
console.log('\n--- 흔한 실수 방지 ---');

// 실수 1: 조건 변수를 업데이트하지 않음
let x = 0;
while (x < 3) {
    console.log('x:', x);
    x++; // ← 이 줄이 없으면 무한 루프!
}

// 실수 2: 부동소수점 오차로 조건이 충족되지 않음
let float = 0;
let loopCount = 0;
while (float !== 1.0) {   // ⚠️ 부동소수점 비교는 위험
    float += 0.1;
    loopCount++;
    if (loopCount > 20) break; // 안전장치
}
console.log('float 값:', float.toFixed(1)); // 1.0이 안 될 수도 있음
// → 부동소수점은 float >= 1.0 처럼 범위 비교 권장


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 10. 실전 패턴
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 10. 실전 패턴 =====');

// ── 패턴 1: 누적 합산 ────────────────────────────────────────
console.log('--- 누적 합산 ---');
const salesData = [15000, 32000, 8000, 47000, 21000];
let totalSales = 0;

for (const sale of salesData) {
    totalSales += sale;
}
const avgSales = totalSales / salesData.length;

console.log('총 매출:', totalSales.toLocaleString() + '원');
console.log('평균 매출:', Math.round(avgSales).toLocaleString() + '원');


// ── 패턴 2: 최댓값·최솟값 찾기 ──────────────────────────────
console.log('\n--- 최댓값·최솟값 ---');
const temps = [18, 25, 31, 22, 29, 15, 27];
let maxTemp = temps[0]; // 첫 번째 값으로 초기화
let minTemp = temps[0];

for (const temp of temps) {
    if (temp > maxTemp) maxTemp = temp;
    if (temp < minTemp) minTemp = temp;
}
console.log('최고 온도:', maxTemp + '°C');
console.log('최저 온도:', minTemp + '°C');


// ── 패턴 3: 조건부 필터링 ─────────────────────────────────────
console.log('\n--- 조건부 필터링 ---');
const allScores = [88, 45, 92, 70, 55, 98, 63, 81];
const passed  = [];
const failed  = [];

for (const s of allScores) {
    if (s >= 70) {
        passed.push(s);
    } else {
        failed.push(s);
    }
}

console.log('합격:', passed);
console.log('불합격:', failed);
console.log(`합격률: ${(passed.length / allScores.length * 100).toFixed(1)}%`);


// ── 패턴 4: 중복 제거 (Set 활용) ────────────────────────────
console.log('\n--- 중복 제거 ---');
const tags = ['JS', 'CSS', 'JS', 'HTML', 'CSS', 'React', 'JS'];
const uniqueTags = [];

for (const tag of tags) {
    if (!uniqueTags.includes(tag)) { // 아직 없는 항목만 추가
        uniqueTags.push(tag);
    }
}
console.log('원본:', tags);
console.log('중복 제거:', uniqueTags);
// 더 간결한 방법: [...new Set(tags)]
console.log('Set 활용:', [...new Set(tags)]);


// ── 패턴 5: FizzBuzz ─────────────────────────────────────────
console.log('\n--- FizzBuzz (1~20) ---');
for (let i = 1; i <= 20; i++) {
    if (i % 15 === 0) {
        process.stdout.write('FizzBuzz ');
    } else if (i % 3 === 0) {
        process.stdout.write('Fizz ');
    } else if (i % 5 === 0) {
        process.stdout.write('Buzz ');
    } else {
        process.stdout.write(i + ' ');
    }
}
console.log();
// 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz
