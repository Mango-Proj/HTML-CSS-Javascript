// ============================================================
// conditions.js — 조건문과 논리 연산 완전 정복
//
// 조건문: 주어진 조건의 참/거짓에 따라 실행 흐름을 제어합니다.
//
// 종류:
//   if / if...else / else if  — 범위·복잡한 조건
//   switch                    — 고정된 값과 비교
//   삼항 연산자                — 간단한 값 선택
//   논리 연산자 단락 평가      — 조건부 값 반환
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. 비교 연산자 — 조건식의 재료
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. 비교 연산자 =====');

// 비교 연산자는 두 값을 비교해 boolean(true/false) 을 반환합니다.
// 이 결과가 조건문의 판단 기준이 됩니다.

const a = 10;
const b = 20;
const c = '10';

// 동등(==) vs 일치(===)
// ==  : 값만 비교, 타입이 다르면 자동 형변환 후 비교 (주의 필요)
// === : 값과 타입 모두 비교 (권장)

console.log('10 == "10":', a == c);   // true  — 타입 변환 후 비교 (위험)
console.log('10 === "10":', a === c); // false — 타입이 다르므로 false (안전)

// 부등(!=) vs 불일치(!==)
console.log('10 != "10":', a != c);   // false — 형변환 후 같음
console.log('10 !== "10":', a !== c); // true  — 타입 다르므로 다름

// 크기 비교
console.log('a > b:', a > b);   // false
console.log('a < b:', a < b);   // true
console.log('a >= 10:', a >= 10); // true
console.log('a <= 9:', a <= 9);   // false

// 실무에서는 항상 === / !== 를 사용하세요
// == 의 형변환 규칙이 복잡해 예상치 못한 버그를 만들 수 있습니다
console.log('\n== 의 함정들:');
console.log('0 == false:', 0 == false);     // true  (위험!)
console.log('0 === false:', 0 === false);   // false (안전)
console.log('"" == false:', '' == false);   // true  (위험!)
console.log('null == undefined:', null == undefined); // true (위험!)


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. 논리 연산자 — 조건 결합
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. 논리 연산자 =====');

// && (AND): 양쪽 모두 true 일 때만 true
// || (OR):  하나라도 true 면 true
// !  (NOT): true ↔ false 반전

const score = 85;
const attendance = 90;

console.log('&& (AND) — 둘 다 조건 충족:');
console.log(score >= 80 && attendance >= 80); // true  — 둘 다 충족
console.log(score >= 80 && attendance >= 95); // false — attendance 미충족

console.log('\n|| (OR) — 하나라도 조건 충족:');
console.log(score >= 90 || attendance >= 80); // true  — attendance 충족
console.log(score >= 90 || attendance >= 95); // false — 둘 다 미충족

console.log('\n! (NOT) — 결과 반전:');
const isLoggedIn = false;
console.log('!isLoggedIn:', !isLoggedIn);   // true  — false 반전
console.log('!!isLoggedIn:', !!isLoggedIn); // false — 두 번 반전 (원래 값)
// !! 패턴: 값을 명시적으로 boolean 으로 변환할 때 사용


// ── 2-1. 단락 평가 (Short-circuit Evaluation) ────────────────

console.log('\n--- 단락 평가 ---');

// && 는 왼쪽이 falsy 면 왼쪽 값을 즉시 반환하고 오른쪽은 평가하지 않습니다.
// || 는 왼쪽이 truthy 면 왼쪽 값을 즉시 반환하고 오른쪽은 평가하지 않습니다.

// || 단락: 왼쪽이 falsy 이면 오른쪽을 반환 → 기본값 패턴
const userInput = '';
const defaultName = userInput || '익명';   // '' 는 falsy → '익명' 반환
console.log('기본값 패턴(||):', defaultName); // '익명'

const inputNum = 0;
const fallback = inputNum || 100;           // 0 은 falsy → 100 반환
console.log('0 || 100:', fallback);         // 100 ← 의도치 않은 결과일 수 있음!

// && 단락: 왼쪽이 truthy 이면 오른쪽을 반환 → 조건부 실행 패턴
const user = { name: '홍길동', isAdmin: true };
const adminLabel = user.isAdmin && '[관리자]'; // isAdmin 이 truthy → '[관리자]' 반환
console.log('조건부 값(&&):', adminLabel);     // '[관리자]'

const guestLabel = false && '[관리자]'; // false → false 반환
console.log('false &&:', guestLabel);  // false


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. if 문 — 기본 조건 분기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. if 문 =====');

// if (조건식) { 조건이 true 일 때 실행 }
// 조건식은 자동으로 boolean 으로 변환됩니다 (Truthy/Falsy 적용)

const passScore = 80;

if (passScore >= 70) {
    console.log('합격하셨군요! 축하합니다!');
}

// 블록 내 코드가 한 줄이면 {} 생략 가능하지만, 항상 붙이는 것이 권장됩니다.
if (passScore >= 70) console.log('(중괄호 생략 버전)'); // 생략 가능하나 비권장

// 조건식에 논리 연산자 활용
const myScore = 85;
const absenceDay = 2;

if (myScore >= 80 && absenceDay <= 4) {
    console.log('우수 학생 — 점수와 출석 모두 충족');
}

if (myScore < 20 || absenceDay >= 10) {
    console.log('재수강 필요');
} else {
    console.log('재수강 해당 없음');
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. if...else 문 — 두 갈래 분기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. if...else 문 =====');

// if 조건이 false 이면 else 블록이 실행됩니다.
// if 와 else 중 하나는 반드시 실행되고, 동시에 실행되지는 않습니다.

const examScore = 50;

if (examScore >= 70) {
    console.log('합격 — 점수:', examScore);
} else {
    console.log('불합격 — 점수:', examScore);
}
// examScore = 50 → 불합격

// 실전 예시: 로그인 상태에 따른 메시지
const isAuthenticated = false;

if (isAuthenticated) {
    console.log('환영합니다! 마이페이지로 이동합니다.');
} else {
    console.log('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. else if — 다중 분기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. else if — 다중 분기 =====');

// 조건을 위에서 아래로 순서대로 평가합니다.
// 처음으로 true 인 블록 하나만 실행하고 나머지는 건너뜁니다.
// 모든 조건이 false 이면 마지막 else 가 실행됩니다.

const finalScore = 73;

if (finalScore >= 90) {
    console.log('A학점 — 매우 우수');
} else if (finalScore >= 80) {
    console.log('B학점 — 우수');
} else if (finalScore >= 70) {
    console.log('C학점 — 보통');        // ← finalScore = 73 이므로 여기 실행
} else if (finalScore >= 60) {
    console.log('D학점 — 미흡');
} else {
    console.log('F학점 — 재수강');
}

// ⚠️ 조건 순서에 주의 — 큰 범위를 앞에 두면 의도치 않은 동작
// 예: >= 60 을 먼저 두면 90점도 '60점 이상' 에서 걸림
const wrongExample = 95;
if (wrongExample >= 60) {
    console.log('❌ 잘못된 순서: 60점 이상'); // 95점인데도 여기서 끝
} else if (wrongExample >= 90) {
    console.log('90점 이상'); // 도달하지 않음
}

// 실전 예시: 쇼핑몰 배송비 정책
const orderAmount = 35000;

if (orderAmount >= 50000) {
    console.log('\n배송비: 무료');
} else if (orderAmount >= 30000) {
    console.log('\n배송비: 2,000원');
} else if (orderAmount >= 10000) {
    console.log('\n배송비: 3,000원');
} else {
    console.log('\n배송비: 5,000원');
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. 중첩 if 문 — 세부 분기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. 중첩 if 문 =====');

// if 블록 안에 또 다른 if 문을 넣어 더 세부적인 조건을 처리합니다.
// 단, 3단계 이상 깊어지면 가독성이 크게 떨어집니다 — 리팩토링을 고려하세요.

const nestedScore = 85;

if (nestedScore >= 70) {
    console.log('통과'); // 외부 조건: 70점 이상
    if (nestedScore >= 90) {
        console.log('A학점');
    } else if (nestedScore >= 80) {
        console.log('B학점'); // ← nestedScore = 85 이므로 여기 실행
    } else {
        console.log('C학점');
    }
} else {
    console.log('미통과 — 재시험 대상');
}

// 중첩 대신 && 로 조건 합치기 (가독성 향상)
if (nestedScore >= 70 && nestedScore < 90) {
    console.log('중첩 없이: 70~89점 범위');
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 7. switch 문 — 고정 값 비교
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 7. switch 문 =====');

// switch(표현식): 표현식의 값을 각 case 와 === 로 비교합니다.
// 일치하는 case 부터 실행하며, break 를 만나면 switch 전체를 종료합니다.
// break 없으면 다음 case 로 계속 실행됩니다 (fall-through).

const season = 'summer';

switch (season) {
    case 'spring':
        console.log('봄에는 딸기가 제철입니다.');
        break; // ← 여기서 switch 종료
    case 'summer':
        console.log('여름에는 수박이 제철입니다.'); // ← 실행됨
        break;
    case 'autumn':
        console.log('가을에는 사과가 제철입니다.');
        break;
    case 'winter':
        console.log('겨울에는 귤이 제철입니다.');
        break;
    default: // 어떤 case 도 일치하지 않을 때 실행
        console.log('알 수 없는 계절입니다.');
}


// ── 7-1. break 없을 때 — fall-through 주의 ───────────────────

console.log('\n--- fall-through 주의 ---');

const level = 2;

switch (level) {
    case 1:
        console.log('level 1 실행');
        // ⚠️ break 없음 → 다음 case 로 계속 실행
    case 2:
        console.log('level 2 실행'); // ← level=2 이므로 여기서 시작
        // ⚠️ break 없음 → fall-through
    case 3:
        console.log('level 3 실행'); // ← fall-through 로 여기도 실행됨
        break;
    case 4:
        console.log('level 4 실행'); // ← break 로 멈췄으므로 실행 안 됨
}
// 출력: level 2 실행 → level 3 실행 (의도한 경우에만 break 생략)


// ── 7-2. 여러 case 묶기 — fall-through 활용 ─────────────────

console.log('\n--- case 묶기 ---');

const grade = 'B';

switch (grade) {
    case 'A+':
    case 'A':
    case 'A-':
        console.log('훌륭합니다!');
        break;
    case 'B+':
    case 'B':   // ← grade = 'B' 일치
    case 'B-':
        console.log('잘했습니다!'); // ← 실행됨
        break;
    case 'C+':
    case 'C':
    case 'C-':
        console.log('보통입니다.');
        break;
    default:
        console.log('노력이 필요합니다.');
}

// ── 7-3. switch 실전 예시: 요일 처리 ─────────────────────────

console.log('\n--- 요일 처리 ---');

const dayNum = new Date().getDay(); // 0(일) ~ 6(토)
let dayName;
let isWeekend;

switch (dayNum) {
    case 0: dayName = '일요일'; isWeekend = true;  break;
    case 1: dayName = '월요일'; isWeekend = false; break;
    case 2: dayName = '화요일'; isWeekend = false; break;
    case 3: dayName = '수요일'; isWeekend = false; break;
    case 4: dayName = '목요일'; isWeekend = false; break;
    case 5: dayName = '금요일'; isWeekend = false; break;
    case 6: dayName = '토요일'; isWeekend = true;  break;
    default: dayName = '알 수 없음'; isWeekend = false;
}

console.log(`오늘은 ${dayName}입니다. 주말: ${isWeekend}`);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 8. 삼항 연산자 — 간결한 값 선택
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 8. 삼항 연산자 =====');

// 구조: 조건식 ? 참일 때 값 : 거짓일 때 값
// if...else 를 한 줄로 압축하는 표현식(expression)입니다.
// 값을 반환하므로 변수 할당, 함수 인수, 템플릿 리터럴에 바로 쓸 수 있습니다.

const ternaryScore = 85;

// if...else 버전
let resultIf;
if (ternaryScore >= 70) {
    resultIf = 'Pass';
} else {
    resultIf = 'Fail';
}

// 삼항 연산자 버전 (동일한 결과)
const resultTernary = ternaryScore >= 70 ? 'Pass' : 'Fail';

console.log('if-else:', resultIf);      // 'Pass'
console.log('삼항:', resultTernary);    // 'Pass'

// 변수 할당에 자주 활용
const age = 20;
const ticketType = age >= 18 ? '성인권' : '청소년권';
console.log('티켓:', ticketType); // '성인권'

// 템플릿 리터럴 안에 직접 삽입
const points = 1200;
console.log(`포인트: ${points}점 (등급: ${points >= 1000 ? 'Gold' : 'Silver'})`);

// 함수 반환값에 활용
function getLabel(value) {
    return value > 0 ? '양수' : value < 0 ? '음수' : '0';
}
console.log(getLabel(5));   // '양수'
console.log(getLabel(-3));  // '음수'
console.log(getLabel(0));   // '0'


// ── 8-1. 중첩 삼항 — 가독성 주의 ────────────────────────────

console.log('\n--- 삼항 연산자 중첩 (주의) ---');

// 중첩 삼항: 동작은 하지만 읽기 어려워 권장하지 않습니다.
const s = 75;
const gradeStr = s >= 90 ? 'A' : s >= 80 ? 'B' : s >= 70 ? 'C' : 'F';
console.log('중첩 삼항:', gradeStr); // 'C'

// ✅ 위 코드는 아래처럼 else if 로 쓰는 것이 더 명확합니다.
function getGrade(n) {
    if (n >= 90) return 'A';
    if (n >= 80) return 'B';
    if (n >= 70) return 'C';
    return 'F';
}
console.log('else if 버전:', getGrade(s)); // 'C'


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 9. Nullish 병합(??) / 옵셔널 체이닝(?.)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 9. ?? 와 ?. =====');

// ── ?? (Nullish 병합 연산자, ES2020) ─────────────────────────
// 왼쪽이 null 또는 undefined 일 때만 오른쪽 값을 반환합니다.
// || 와 달리 0, '', false 는 왼쪽 값을 그대로 유지합니다.

const inputA = 0;
const inputB = null;
const inputC = '';

console.log('0 || 10:', inputA || 10);   // 10  ← 0 이 falsy 라 오른쪽 반환 (의도치 않을 수 있음)
console.log('0 ?? 10:', inputA ?? 10);   // 0   ← null/undefined 가 아니므로 왼쪽 유지

console.log('null || 10:', inputB || 10);  // 10
console.log('null ?? 10:', inputB ?? 10);  // 10 — 동일

console.log('"" || "기본":', inputC || '기본');  // '기본' ← '' 이 falsy
console.log('"" ?? "기본":', inputC ?? '기본');  // ''    ← null/undefined 아님

// 사용자가 0 또는 빈 문자열을 의도적으로 입력한 경우: ?? 사용
const userScore = 0;  // 사용자가 0점을 입력
const displayScore = userScore ?? '미입력'; // 0 을 유지
console.log('사용자 점수:', displayScore); // 0 — 의도대로


// ── ?. (옵셔널 체이닝, ES2020) ────────────────────────────────
// 중첩 객체 속성에 접근할 때 중간에 null/undefined 가 있으면
// 에러 없이 undefined 를 반환합니다.

const loggedUser = {
    name: '홍길동',
    address: {
        city: '서울',
        zip:  '04524',
    },
};

const guestUser = null; // 비로그인 사용자

// ❌ 옵셔널 체이닝 없이 — null 이면 에러 발생
// console.log(guestUser.address.city); // TypeError: Cannot read properties of null

// ✅ ?. 사용 — null/undefined 면 undefined 반환 (에러 없음)
console.log(loggedUser?.address?.city);  // '서울'
console.log(guestUser?.address?.city);   // undefined (에러 아님)

// ?? 와 조합 — undefined 대신 기본값 제공
const city = guestUser?.address?.city ?? '위치 정보 없음';
console.log('도시:', city); // '위치 정보 없음'

// 메서드 호출에도 사용 가능
const obj = { greet: () => '안녕!' };
const emptyObj = {};
console.log(obj.greet?.());      // '안녕!'
console.log(emptyObj.greet?.());  // undefined (에러 아님)


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 10. 조기 반환 — 가드 클로즈 패턴
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 10. 조기 반환 (Guard Clause) =====');

// 함수 안에서 유효하지 않은 입력을 먼저 걸러내고 일찍 반환합니다.
// 중첩 깊이를 줄이고 코드를 위에서 아래로 읽기 쉽게 만듭니다.

// ❌ 깊은 중첩 — 읽기 어려움
function processPaymentBad(user, amount) {
    if (user) {
        if (user.isActive) {
            if (amount > 0) {
                if (amount <= user.balance) {
                    console.log(`결제 처리: ${amount}원`);
                    return true;
                } else {
                    console.log('잔액 부족');
                    return false;
                }
            } else {
                console.log('금액이 유효하지 않습니다');
                return false;
            }
        } else {
            console.log('비활성 계정입니다');
            return false;
        }
    } else {
        console.log('사용자 정보가 없습니다');
        return false;
    }
}

// ✅ 조기 반환 — 읽기 쉬움 (동일한 동작)
function processPaymentGood(user, amount) {
    if (!user)             { console.log('사용자 정보 없음'); return false; }
    if (!user.isActive)    { console.log('비활성 계정');     return false; }
    if (amount <= 0)       { console.log('유효하지 않은 금액'); return false; }
    if (amount > user.balance) { console.log('잔액 부족');   return false; }

    // 모든 검증 통과 — 핵심 로직
    console.log(`결제 처리: ${amount}원`);
    return true;
}

const testUser = { isActive: true, balance: 50000 };
processPaymentBad(testUser, 30000);   // 결제 처리: 30000원
processPaymentGood(testUser, 30000);  // 결제 처리: 30000원
processPaymentGood(testUser, 100000); // 잔액 부족
processPaymentGood(null, 1000);       // 사용자 정보 없음
