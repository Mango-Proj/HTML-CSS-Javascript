// ============================================================
// script.js — 자바스크립트 내장 객체와 메서드
//
// 자바스크립트가 기본으로 제공하는 4가지 핵심 내장 객체를 다룹니다.
//
//   String  — 문자열 가공·탐색·변환
//   Array   — 배열 조작·순회·변환
//   Date    — 날짜·시간 처리
//   Math    — 수학 연산·난수
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. String — 문자열 메서드
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. String 메서드 =====');

// 문자열은 불변(immutable) — 메서드는 원본을 바꾸지 않고 새 문자열을 반환합니다.

const str = 'Hello, JavaScript World!';

// ① length — 문자열 길이 (공백·특수문자 포함)
console.log('length:', str.length); // 24

// ② 인덱스 접근
console.log('charAt(7):', str.charAt(7));      // 'J' — 해당 인덱스 문자
console.log('at(-1):', str.at(-1));            // '!' — 음수 인덱스 (ES2022)
console.log('[0]:', str[0]);                   // 'H' — 배열처럼 접근도 가능


// ── 1-1. 대소문자 변환 ────────────────────────────────────────

console.log('\n--- 대소문자 변환 ---');

const email = '  User@Example.Com  ';
console.log(email.toUpperCase()); // '  USER@EXAMPLE.COM  '
console.log(email.toLowerCase()); // '  user@example.com  '

// 실전 패턴: 입력값 정규화 (trim + toLowerCase)
const cleanEmail = email.trim().toLowerCase();
console.log('정규화:', cleanEmail); // 'user@example.com'


// ── 1-2. 탐색 ────────────────────────────────────────────────

console.log('\n--- 탐색 ---');

const sentence = 'apple banana apple cherry apple';

console.log('indexOf:', sentence.indexOf('apple'));         // 0  — 첫 번째 위치
console.log('lastIndexOf:', sentence.lastIndexOf('apple')); // 26 — 마지막 위치
console.log('indexOf(없음):', sentence.indexOf('grape'));   // -1 — 없으면 -1

console.log('includes:', sentence.includes('banana'));      // true
console.log('startsWith:', sentence.startsWith('apple'));   // true
console.log('endsWith:', sentence.endsWith('apple'));       // true


// ── 1-3. 추출 ────────────────────────────────────────────────

console.log('\n--- 추출 ---');

const text = 'JavaScript';

// slice(시작, 끝) — 끝 인덱스 미포함, 음수 인덱스 사용 가능
console.log('slice(0, 4):', text.slice(0, 4));   // 'Java'
console.log('slice(4):', text.slice(4));          // 'Script'
console.log('slice(-6):', text.slice(-6));         // 'Script' — 뒤에서 6번째부터


// ── 1-4. 변환 ────────────────────────────────────────────────

console.log('\n--- 변환 ---');

// replace(a, b) — 첫 번째 a 를 b 로 교체
// replaceAll(a, b) — 모든 a 를 b 로 교체
const typo = 'I love cats. Cats are cute cats.';
console.log('replace:', typo.replace('cats', 'dogs'));     // 첫 번째만 교체
console.log('replaceAll:', typo.replaceAll('cats', 'dogs')); // 전부 교체
// 대소문자 구분 — 'Cats' 는 교체 안 됨

// split(구분자) — 문자열 → 배열
const csv = 'Alice,Bob,Carol,Dave';
const names = csv.split(',');
console.log('split:', names); // ['Alice', 'Bob', 'Carol', 'Dave']
console.log('split 길이:', names.length); // 4

// repeat(횟수) — 문자열 반복
console.log('repeat:', '⭐'.repeat(5)); // ⭐⭐⭐⭐⭐
console.log('구분선:', '-'.repeat(30));  // ------------------------------

// concat — 문자열 이어붙이기 (+ 연산자보다 명시적)
const a = 'Hello';
const b = 'World';
console.log('concat:', a.concat(', ', b, '!')); // 'Hello, World!'


// ── 1-5. 공백 처리 ───────────────────────────────────────────

console.log('\n--- 공백 처리 ---');

const padded = '   hello   ';
console.log('trim:', `"${padded.trim()}"`);         // 양쪽 공백 제거
console.log('trimStart:', `"${padded.trimStart()}"`); // 앞쪽 공백만 제거
console.log('trimEnd:', `"${padded.trimEnd()}"`);     // 뒤쪽 공백만 제거

// padStart / padEnd — 특정 길이가 될 때까지 채움 (숫자 자릿수 맞출 때 유용)
const num = '7';
console.log('padStart:', num.padStart(3, '0')); // '007'
console.log('padEnd:', num.padEnd(3, '0'));     // '700'


// ── 1-6. 실전 패턴: 문자열 가공 ──────────────────────────────

console.log('\n--- 실전: 슬러그(URL) 생성 ---');

function toSlug(title) {
    return title
        .trim()           // 앞뒤 공백 제거
        .toLowerCase()    // 소문자로
        .replaceAll(' ', '-'); // 공백 → 하이픈
}

console.log(toSlug('  Hello JavaScript World  ')); // 'hello-javascript-world'
console.log(toSlug('자바스크립트 기초'));               // '자바스크립트-기초'


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. Array — 배열 메서드
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. Array 메서드 =====');


// ── 2-1. 추가·제거 ────────────────────────────────────────────

console.log('--- 추가·제거 ---');

const fruits = ['바나나', '체리', '딸기'];

// push — 끝에 추가, 반환값: 새 length
const newLen = fruits.push('포도', '망고');
console.log('push 후:', fruits, '/ length:', newLen); // ['바나나','체리','딸기','포도','망고'] / 5

// pop — 끝에서 제거, 반환값: 제거된 요소
const last = fruits.pop();
console.log('pop 반환:', last); // '망고'
console.log('pop 후:', fruits);

// unshift — 앞에 추가, 반환값: 새 length
fruits.unshift('사과');
console.log('unshift 후:', fruits);

// shift — 앞에서 제거, 반환값: 제거된 요소
const first = fruits.shift();
console.log('shift 반환:', first); // '사과'
console.log('shift 후:', fruits);


// ── 2-2. 탐색 ────────────────────────────────────────────────

console.log('\n--- 탐색 ---');

const colors = ['red', 'green', 'blue', 'green', 'red'];

console.log('indexOf:', colors.indexOf('green'));         // 1 — 첫 번째
console.log('lastIndexOf:', colors.lastIndexOf('green')); // 3 — 마지막
console.log('indexOf(없음):', colors.indexOf('yellow')); // -1

console.log('includes:', colors.includes('blue')); // true

// find / findIndex — 콜백 조건 기반 탐색
const users = [
    { id: 1, name: 'Alice', age: 28 },
    { id: 2, name: 'Bob',   age: 34 },
    { id: 3, name: 'Carol', age: 22 },
];

const found      = users.find(u => u.id === 2);          // 첫 번째 일치 요소
const foundIndex = users.findIndex(u => u.name === 'Carol'); // 첫 번째 일치 인덱스

console.log('find:', found);          // { id: 2, name: 'Bob', age: 34 }
console.log('findIndex:', foundIndex); // 2


// ── 2-3. 추출·병합 ────────────────────────────────────────────

console.log('\n--- 추출·병합 ---');

const nums = [1, 2, 3, 4, 5, 6];

// slice(시작, 끝) — 원본 유지, 끝 인덱스 미포함
console.log('slice(1,4):', nums.slice(1, 4)); // [2, 3, 4]
console.log('slice(-3):', nums.slice(-3));     // [4, 5, 6]

// concat — 배열 합치기 (원본 유지)
const a1 = [1, 2, 3];
const a2 = [4, 5, 6];
console.log('concat:', a1.concat(a2, [7, 8])); // [1,2,3,4,5,6,7,8]

// 스프레드로 동일하게 병합 (권장)
console.log('spread:', [...a1, ...a2, 7, 8]);


// ── 2-4. 변환 ────────────────────────────────────────────────

console.log('\n--- 변환 ---');

const scores = [60, 80, 90, 55, 75];

// map — 각 요소 변환 → 새 배열
const doubled = scores.map(s => s * 2);
console.log('map:', doubled); // [120, 160, 180, 110, 150]

// filter — 조건을 만족하는 요소만 → 새 배열
const passing = scores.filter(s => s >= 70);
console.log('filter:', passing); // [80, 90, 75]

// reduce — 누적 계산 → 단일 값
const total = scores.reduce((acc, s) => acc + s, 0);
console.log('reduce(합계):', total); // 360
console.log('평균:', total / scores.length); // 72

// forEach — 반환값 없이 부수 효과 목적
scores.forEach((s, i) => {
    if (s < 70) console.log(`  [${i}] ${s}점 — 미달`);
});


// ── 2-5. 정렬·변환 ───────────────────────────────────────────

console.log('\n--- 정렬·기타 ---');

// sort — 원본 변경, 숫자는 비교 함수 필수
const nums2 = [10, 5, 100, 2, 50];
console.log('sort(기본):', [...nums2].sort());              // 문자열 정렬 [10,100,2,5,50]
console.log('sort(숫자):', [...nums2].sort((a, b) => a - b)); // [2,5,10,50,100]

// join — 배열 → 문자열 (구분자 지정)
const words = ['Hello', 'World', 'JavaScript'];
console.log('join:', words.join(' '));    // 'Hello World JavaScript'
console.log('join(-)', words.join('-')); // 'Hello-World-JavaScript'

// toString — 콤마로 연결
console.log('toString:', words.toString()); // 'Hello,World,JavaScript'

// flat — 중첩 배열 평탄화
const nested = [1, [2, 3], [4, [5, 6]]];
console.log('flat(1):', nested.flat());    // [1, 2, 3, 4, [5, 6]]
console.log('flat(2):', nested.flat(2));   // [1, 2, 3, 4, 5, 6]
console.log('flat(Infinity):', nested.flat(Infinity)); // 완전 평탄화


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. Date — 날짜·시간 객체
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. Date 객체 =====');

// Date 는 new Date() 로 생성합니다.
// 내부적으로 1970-01-01 00:00:00 UTC(유닉스 에포크)를 기준으로
// 경과 밀리초(ms)를 저장합니다.


// ── 3-1. Date 객체 생성 ───────────────────────────────────────

const now   = new Date();                    // 현재 날짜·시간
const d1    = new Date('2024-01-15');        // 날짜 문자열
const d2    = new Date('2024-06-10T09:30:00'); // 날짜 + 시간
const d3    = new Date(2024, 11, 25);        // 연, 월(0~11), 일 → 2024-12-25
const epoch = new Date(0);                  // 유닉스 에포크 기준시

console.log('현재:', now.toString());
console.log('d1:', d1.toDateString());       // 'Mon Jan 15 2024'
console.log('epoch:', epoch.toISOString());  // '1970-01-01T00:00:00.000Z'


// ── 3-2. Getter 메서드 ────────────────────────────────────────

console.log('\n--- Getter 메서드 ---');

const sample = new Date('2024-07-04T14:30:45');

console.log('getFullYear():', sample.getFullYear()); // 2024
console.log('getMonth():', sample.getMonth());       // 6 ← 0=1월, 6=7월 주의!
console.log('getDate():', sample.getDate());         // 4
console.log('getDay():', sample.getDay());            // 4 ← 0=일, 4=목
console.log('getHours():', sample.getHours());       // 14
console.log('getMinutes():', sample.getMinutes());   // 30
console.log('getSeconds():', sample.getSeconds());   // 45
console.log('getTime():', sample.getTime());         // 밀리초 (에포크 기준)

// getMonth()는 0부터 시작하므로 +1 해서 표시
const month = sample.getMonth() + 1; // 7
console.log('\n날짜 조합:', `${sample.getFullYear()}년 ${month}월 ${sample.getDate()}일`);


// ── 3-3. 요일 한글 표시 ───────────────────────────────────────

console.log('\n--- 요일 한글 표시 ---');

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function formatDate(date) {
    const y   = date.getFullYear();
    const m   = String(date.getMonth() + 1).padStart(2, '0'); // '07'
    const d   = String(date.getDate()).padStart(2, '0');       // '04'
    const day = WEEKDAYS[date.getDay()];
    return `${y}-${m}-${d} (${day})`;
}

console.log(formatDate(new Date('2024-07-04'))); // 2024-07-04 (목)
console.log('오늘:', formatDate(new Date()));


// ── 3-4. 날짜 계산 ────────────────────────────────────────────

console.log('\n--- 날짜 계산 ---');

// getTime() 은 밀리초 단위 — 두 날짜의 차이를 계산할 때 활용
const start  = new Date('2024-01-01');
const end    = new Date('2024-12-31');
const diffMs = end.getTime() - start.getTime();
const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // ms → 일

console.log('2024년 남은 일수:', diffDays + '일'); // 365일

// 오늘부터 D-Day 계산
function dDay(targetDateStr) {
    const target  = new Date(targetDateStr);
    const todayMs = new Date().setHours(0, 0, 0, 0); // 오늘 자정
    const diff    = Math.ceil((target - todayMs) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `D-${diff}` : diff === 0 ? 'D-Day!' : `D+${Math.abs(diff)}`;
}

console.log('크리스마스:', dDay('2025-12-25'));


// ── 3-5. 포맷팅 ──────────────────────────────────────────────

console.log('\n--- 날짜 포맷팅 ---');

const today = new Date();

// toLocaleDateString — 로케일 기반 날짜 문자열
console.log('한국식:', today.toLocaleDateString('ko-KR'));     // 2024. 7. 4.
console.log('미국식:', today.toLocaleDateString('en-US'));     // 7/4/2024

// toLocaleTimeString — 로케일 기반 시간 문자열
console.log('시간:', today.toLocaleTimeString('ko-KR'));

// toISOString — ISO 8601 형식 (API 통신, DB 저장 등에 표준)
console.log('ISO:', today.toISOString()); // 2024-07-04T05:30:00.000Z


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. Math — 수학 객체
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. Math 객체 =====');

// Math 는 new 로 생성하지 않고 Math.메서드() 형태로 바로 사용합니다.
// 모든 메서드·상수가 Math 객체에 내장되어 있습니다.


// ── 4-1. 수학 상수 ────────────────────────────────────────────

console.log('--- 수학 상수 ---');
console.log('Math.PI:', Math.PI);         // 3.14159...
console.log('Math.E:', Math.E);           // 2.71828... (자연로그 밑)
console.log('Math.SQRT2:', Math.SQRT2);   // 1.41421... (√2)


// ── 4-2. 올림·내림·반올림 ────────────────────────────────────

console.log('\n--- 올림·내림·반올림 ---');

const n = 4.7;
console.log('ceil(4.7):', Math.ceil(n));    // 5  — n 이상인 최소 정수 (올림)
console.log('floor(4.7):', Math.floor(n));  // 4  — n 이하인 최대 정수 (내림)
console.log('round(4.7):', Math.round(n));  // 5  — 반올림
console.log('trunc(4.7):', Math.trunc(n));  // 4  — 소수점 버림 (음수도 동일)

// 음수에서의 차이
console.log('\n--- 음수 비교 ---');
const neg = -4.3;
console.log('ceil(-4.3):', Math.ceil(neg));   // -4  ← 올림: -4.3 이상 최소 정수
console.log('floor(-4.3):', Math.floor(neg)); // -5  ← 내림: -4.3 이하 최대 정수
console.log('round(-4.3):', Math.round(neg)); // -4  ← 반올림
console.log('trunc(-4.3):', Math.trunc(neg)); // -4  ← 0 방향으로 버림

// 소수점 N자리 유지 — toFixed(n) 활용 (반올림, 문자열 반환)
const price = 4523.678;
console.log('\ntoFixed(2):', price.toFixed(2)); // '4523.68' (문자열)
console.log('Number(toFixed):', Number(price.toFixed(2))); // 4523.68 (숫자)


// ── 4-3. 최댓값·최솟값·절댓값 ────────────────────────────────

console.log('\n--- max·min·abs ---');

console.log('max:', Math.max(3, 1, 4, 1, 5, 9, 2, 6)); // 9
console.log('min:', Math.min(3, 1, 4, 1, 5, 9, 2, 6)); // 1

// 배열의 최댓값/최솟값 — 스프레드 사용
const values = [42, 7, 99, 13, 55];
console.log('배열 max:', Math.max(...values)); // 99
console.log('배열 min:', Math.min(...values)); // 7

console.log('abs(-15):', Math.abs(-15)); // 15
console.log('abs(15):', Math.abs(15));   // 15


// ── 4-4. 거듭제곱·제곱근 ─────────────────────────────────────

console.log('\n--- pow·sqrt·cbrt ---');

console.log('pow(2,10):', Math.pow(2, 10));  // 1024 (2^10)
console.log('2**10:', 2 ** 10);              // 1024 (**연산자도 동일)
console.log('sqrt(144):', Math.sqrt(144));   // 12 (√144)
console.log('cbrt(27):', Math.cbrt(27));     // 3 (∛27)
console.log('sign(-5):', Math.sign(-5));     // -1 (음수)
console.log('sign(0):', Math.sign(0));       // 0
console.log('sign(3):', Math.sign(3));       // 1 (양수)


// ── 4-5. 난수 (Math.random) ──────────────────────────────────

console.log('\n--- 난수 ---');

// Math.random() → 0 이상 1 미만 실수
console.log('random():', Math.random()); // 예: 0.7382...

// 정수 난수 생성 공식
// Math.floor(Math.random() * (최대 - 최소 + 1)) + 최소

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log('1~6 주사위:', randomInt(1, 6));
console.log('1~100:', randomInt(1, 100));
console.log('50~100:', randomInt(50, 100));

// 배열에서 랜덤 요소 선택
function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const menu = ['피자', '파스타', '스테이크', '샐러드', '스시'];
console.log('오늘 메뉴:', randomPick(menu));


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. 실전 활용 예제
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. 실전 활용 =====');


// ── 실전 1: 성적 통계 처리 (Array + Math) ────────────────────

console.log('--- 성적 통계 ---');

const examScores = [78, 92, 65, 88, 95, 71, 83, 60, 77, 91];

const sum      = examScores.reduce((acc, s) => acc + s, 0);
const avg      = sum / examScores.length;
const highest  = Math.max(...examScores);
const lowest   = Math.min(...examScores);
const passCount = examScores.filter(s => s >= 70).length;

console.log(`총 인원: ${examScores.length}명`);
console.log(`평균: ${avg.toFixed(1)}점`);
console.log(`최고: ${highest}점 / 최저: ${lowest}점`);
console.log(`합격(70점 이상): ${passCount}명 / 불합격: ${examScores.length - passCount}명`);


// ── 실전 2: 회원 데이터 처리 (Array + String) ─────────────────

console.log('\n--- 회원 데이터 처리 ---');

const rawUsers = [
    '  alice@example.com  ',
    'BOB@GMAIL.COM',
    '  Carol@Naver.com',
];

// 이메일 정규화: trim + toLowerCase
const normalizedUsers = rawUsers.map(email => email.trim().toLowerCase());
console.log('정규화:', normalizedUsers);

// 특정 도메인 필터링
const gmailUsers = normalizedUsers.filter(e => e.endsWith('@gmail.com'));
console.log('Gmail 사용자:', gmailUsers);

// 아이디만 추출 (@ 앞부분)
const userIds = normalizedUsers.map(e => e.split('@')[0]);
console.log('아이디:', userIds); // ['alice', 'bob', 'carol']


// ── 실전 3: 날짜 기반 인사말 (Date + String) ──────────────────

console.log('\n--- 날짜 기반 인사말 ---');

function getGreeting() {
    const hour = new Date().getHours();

    if (hour >= 6  && hour < 12) return '좋은 아침입니다! ☀️';
    if (hour >= 12 && hour < 18) return '좋은 오후입니다! 🌤';
    if (hour >= 18 && hour < 22) return '좋은 저녁입니다! 🌙';
    return '늦은 밤이네요. 푹 쉬세요! 🌟';
}

console.log(getGreeting());


// ── 실전 4: 가격 포맷팅 (Math + String) ───────────────────────

console.log('\n--- 가격 포맷팅 ---');

function formatPrice(price, currency = '원') {
    const rounded = Math.round(price); // 소수점 반올림
    return rounded.toLocaleString('ko-KR') + currency;
}

console.log(formatPrice(1234567));        // '1,234,567원'
console.log(formatPrice(9.99, 'USD'));    // '10USD'
console.log(formatPrice(4523.7));         // '4,524원'

// 할인가 계산
function calcDiscount(originalPrice, discountRate) {
    const discountAmount = Math.floor(originalPrice * discountRate / 100);
    const finalPrice     = originalPrice - discountAmount;
    return {
        original: formatPrice(originalPrice),
        discount: formatPrice(discountAmount),
        final:    formatPrice(finalPrice),
    };
}

const result = calcDiscount(35000, 20);
console.log(`원가: ${result.original} / 할인: ${result.discount} / 최종: ${result.final}`);
// 원가: 35,000원 / 할인: 7,000원 / 최종: 28,000원
