// ============================================================
// conventions.js — 자바스크립트 코딩 컨벤션(규칙)
//
// 코딩 컨벤션(Coding Convention): 코드를 작성할 때 지키는 규칙과 약속입니다.
// 기능적으로 맞는 코드라도 규칙이 없으면 읽기 어렵고 협업이 힘들어집니다.
// 일관된 스타일을 유지하면 유지보수와 협업 효율이 크게 높아집니다.
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. 주석 (Comment)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 주석은 코드의 실행에 영향을 주지 않는 설명문입니다.
// 코드를 처음 보는 사람도 이해할 수 있도록 목적·이유·주의사항을 기록합니다.
// 시간이 지나면 작성자 본인도 맥락을 잊으므로 주석 작성 습관이 중요합니다.


// ── 1-1. 한 줄 주석 (//) ────────────────────────────────────
// // 기호 오른쪽이 모두 주석으로 처리됩니다.
// 코드 한 줄에 대한 간단한 설명이나 임시 비활성화에 사용합니다.

let customerAge = 20; // 고객 나이 (단위: 세)
let isLoggedIn = true; // 로그인 여부

// console.log('디버깅용 로그 — 배포 전 제거 예정');  ← 임시 비활성화


// ── 1-2. 여러 줄 주석 (/* */) ───────────────────────────────
/*
 * 여러 줄에 걸친 설명이 필요할 때 사용합니다.
 * 함수나 모듈의 상세한 동작 방식, 알고리즘 설명 등에 활용합니다.
 * 각 줄 앞의 * 는 가독성을 위한 관례입니다 (필수 아님).
 */

/*
 * 할인율 계산 기준:
 *   - 1만 원 미만: 0%
 *   - 1만 원 이상: 5%
 *   - 10만 원 이상: 10%
 *   - 100만 원 이상: 15%
 */
function getDiscountRate(price) {
    if (price >= 1000000) return 0.15;
    if (price >= 100000)  return 0.10;
    if (price >= 10000)   return 0.05;
    return 0;
}


// ── 1-3. JSDoc 주석 (/** */) — 함수·클래스 문서화 ────────────
// VS Code 등 편집기에서 타입 정보와 설명을 자동 완성에 활용합니다.
// 협업 시 함수의 매개변수와 반환값을 명확히 전달할 수 있습니다.

/**
 * 두 수를 더하는 함수
 *
 * @param {number} a - 첫 번째 피연산자
 * @param {number} b - 두 번째 피연산자
 * @returns {number} 두 수의 합
 *
 * @example
 * add(3, 5); // 8
 */
function add(a, b) {
    return a + b;
}

/**
 * 사용자 정보를 출력하는 함수
 *
 * @param {string} name  - 사용자 이름
 * @param {number} age   - 사용자 나이
 * @param {boolean} [isAdmin=false] - 관리자 여부 (선택, 기본값 false)
 * @returns {string} 포맷된 사용자 정보 문자열
 */
function formatUser(name, age, isAdmin = false) {
    const role = isAdmin ? '[관리자]' : '[일반 사용자]';
    return `${role} ${name} (${age}세)`;
}

console.log('===== 1. 주석 예시 =====');
console.log(add(3, 5));                       // 8
console.log(formatUser('홍길동', 28));         // [일반 사용자] 홍길동 (28세)
console.log(formatUser('관리자', 35, true));   // [관리자] 관리자 (35세)


// ── 1-4. 좋은 주석 vs 나쁜 주석 ─────────────────────────────

// ❌ 나쁜 주석 — 코드와 같은 말을 반복 (의미 없음)
let count = 0; // count 를 0 으로 설정

// ✅ 좋은 주석 — 코드만으로 알 수 없는 이유·의도를 설명
let retryCount = 0; // API 호출 실패 시 최대 3회까지 재시도

// ❌ 나쁜 주석 — 오래된 정보 (코드는 바뀌었는데 주석은 그대로)
// 이름을 가져온다
let userId = 42; // 실제로는 이름이 아니라 ID

// ✅ 좋은 주석 — 예외 처리 이유, 알고리즘 선택 근거, TODO
// TODO: 성능 개선 필요 — 사용자가 1만 명 이상일 때 느려짐
// FIXME: 음수 입력 시 잘못된 결과 반환 (이슈 #42)
// NOTE: 이 값은 서버에서 초 단위로 오지만 ms 로 변환해서 사용


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. 변수 명명 규칙
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. 변수 명명 규칙 =====');

// ── 2-1. 사용 가능 문자 ──────────────────────────────────────

let $dollarSign  = '달러 기호로 시작 가능';
let _underscore  = '언더스코어로 시작 가능';
let letter123    = '문자 뒤에 숫자 가능';

// let 123abc;   // ❌ 숫자로 시작 불가
// let my-name;  // ❌ 하이픈 사용 불가 (빼기 연산자로 인식)
// let my name;  // ❌ 공백 사용 불가

console.log($dollarSign, _underscore, letter123);


// ── 2-2. 예약어 사용 불가 ────────────────────────────────────

// 예약어(Reserved Word): JS 문법에서 이미 특별한 의미로 사용되는 단어들
// 예약어를 변수명으로 쓰면 SyntaxError 가 발생합니다.

// let if;       // ❌ SyntaxError: Unexpected token 'if'
// let for;      // ❌
// let class;    // ❌
// let return;   // ❌

// 주요 예약어 목록 (참고)
// break, case, catch, class, const, continue, debugger,
// default, delete, do, else, export, extends, false, finally,
// for, function, if, import, in, instanceof, let, new, null,
// return, static, super, switch, this, throw, true, try,
// typeof, var, void, while, with, yield


// ── 2-3. 명확한 이름 짓기 (가장 중요!) ──────────────────────

// ❌ 나쁜 이름 — 무슨 값인지 알 수 없음
let a = 20;
let x = 'kim';
let temp = true;
let data = [1, 2, 3];

// ✅ 좋은 이름 — 값의 목적이 명확
let userAge = 20;           // 나이임이 명확
let userName2 = 'kim';     // 사람 이름임이 명확
let isActive = true;       // boolean + is 접두사
let scoreList = [1, 2, 3]; // 배열 + 복수형 관례

console.log('명확한 이름 예시:');
console.log('userAge:', userAge);
console.log('userName:', userName2);
console.log('isActive:', isActive);
console.log('scoreList:', scoreList);


// ── 2-4. 네이밍 스타일 4가지 ──────────────────────────────────

// 1) camelCase — 변수, 함수의 기본 스타일
let firstName = '길동';          // 첫 단어 소문자, 이후 단어 첫 글자 대문자
let totalItemCount = 10;
let getUserById = function (id) { return id; };

// 2) PascalCase (UpperCamelCase) — 클래스, 생성자 함수
// class UserProfile {}
// class ShoppingCart {}
// function Person(name) { this.name = name; }

// 3) SCREAMING_SNAKE_CASE — 전역 상수, 환경 변수
const MAX_CONNECTIONS = 100;     // 대문자 + 언더스코어
const API_KEY = 'abc123';
const DEFAULT_LANGUAGE = 'ko';

// 4) snake_case — JS 에선 잘 사용 안 함 (Python 등에서 주로 사용)
// let user_name; // JS 에서는 비권장

console.log('\n네이밍 스타일:');
console.log('camelCase:', firstName, totalItemCount);
console.log('SCREAMING_SNAKE_CASE:', MAX_CONNECTIONS, DEFAULT_LANGUAGE);


// ── 2-5. 용도별 접두사 관례 ──────────────────────────────────

// boolean: is / has / can / should 접두사
let isVisible = true;        // 보이는가?
let hasError = false;        // 에러가 있는가?
let canDelete = true;        // 삭제할 수 있는가?
let shouldRetry = false;     // 재시도해야 하는가?

// 이벤트 핸들러: on / handle 접두사
// const onClick = () => {};
// const handleSubmit = () => {};

// 배열/리스트: 복수형(s) 또는 List/Array 접미사
const userNames = ['Alice', 'Bob', 'Carol'];    // 복수형
const scoreList2 = [92, 78, 85];               // List 접미사
const itemArray = ['사과', '바나나'];            // Array 접미사

console.log('\n접두사 관례:');
console.log('isVisible:', isVisible, '| hasError:', hasError);
console.log('userNames:', userNames);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. 세미콜론 (Semicolon)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. 세미콜론 =====');

// 세미콜론(;): 하나의 문장(statement)이 끝났음을 나타내는 기호입니다.
// 자바스크립트는 ASI(Automatic Semicolon Insertion) 기능으로
// 세미콜론을 생략해도 대부분 정상 동작합니다.

// ── 3-1. 세미콜론 있음 vs 없음 ──────────────────────────────

let withSemicolon = '세미콜론 있음';    // 명시적
let withoutSemicolon = '세미콜론 없음'  // ASI 가 자동 삽입

console.log(withSemicolon);
console.log(withoutSemicolon);


// ── 3-2. ASI 의 함정 — 생략하면 안 되는 경우 ─────────────────

// 아래 패턴에서는 세미콜론 생략이 예상치 못한 오류를 만들 수 있습니다.

// 함정 1: 즉시 실행 함수(IIFE) 앞에 세미콜론 없을 때
// (이전 문장이 세미콜론 없이 끝나면 함수 호출로 오해할 수 있음)
const value = 10
;(function () {   // ← 줄 시작 ( 앞에 ; 방어 코드
    console.log('IIFE 실행');
})();

// 함정 2: 배열 리터럴이 바로 이어질 때
// const a = 1
// [1, 2, 3].forEach(...) // ← a[1] 처럼 해석될 수 있음

// ✅ 권장: 세미콜론을 명시적으로 붙이는 것이 안전
const greeting2 = '안녕하세요';
const num = 42;
console.log(greeting2, num);


// ── 3-3. 세미콜론을 쓰지 않는 경우 (참고) ───────────────────

// 블록 문(block statement) 뒤에는 세미콜론을 붙이지 않습니다.
// if, for, while, function 선언문, class 선언문 등

if (true) {
    // 블록 뒤: 세미콜론 없음 ✅
}

function example() {
    // 함수 선언문 뒤: 세미콜론 없음 ✅
}

const arrowFn = () => {
    // 화살표 함수를 변수에 할당 → 이건 문장이므로 세미콜론 붙임
};  // ← 세미콜론 있음 ✅


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. 들여쓰기와 공백
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. 들여쓰기와 공백 =====');

// 들여쓰기는 코드의 계층 구조(중첩 관계)를 시각적으로 표현합니다.
// 실행에는 영향이 없지만, 가독성에 결정적인 역할을 합니다.


// ── 4-1. 들여쓰기 스타일 비교 ────────────────────────────────

// ✅ 스페이스 2칸 (Google, Airbnb 스타일)
function indent2(condition) {
  if (condition) {
    console.log('2칸 들여쓰기');
  }
}

// ✅ 스페이스 4칸 (Microsoft, Python 스타일)
function indent4(condition) {
    if (condition) {
        console.log('4칸 들여쓰기');
    }
}

// ❌ 들여쓰기 없음 — 계층 구조 파악 불가
function noIndent(condition) {
if (condition) {
console.log('들여쓰기 없음 — 읽기 어려움');
}
}

indent2(true);
indent4(true);

// 탭(Tab) vs 스페이스(Space)
// 팀 내 혼용은 금지 — 하나로 통일하고 Prettier/EditorConfig 등으로 자동화 권장


// ── 4-2. 연산자와 공백 ───────────────────────────────────────

// ❌ 공백 없이 붙여 쓰기 — 가독성 저하
const result1=10+20*3;

// ✅ 연산자 양쪽에 공백 — 읽기 쉬움
const result2 = 10 + 20 * 3;

console.log('연산자 공백:', result2); // 70

// 비교 연산자도 동일
const isAdult = customerAge >= 18;    // ✅
// const isAdult=customerAge>=18;     // ❌


// ── 4-3. 쉼표 뒤 공백 ────────────────────────────────────────

// ❌ 쉼표 뒤 공백 없음
const arr1 = [1,2,3,4,5];
function badFn(a,b,c) { return a+b+c; }

// ✅ 쉼표 뒤 공백
const arr2 = [1, 2, 3, 4, 5];
function goodFn(a, b, c) { return a + b + c; }

console.log('배열:', arr2);
console.log('함수 결과:', goodFn(1, 2, 3));


// ── 4-4. 빈 줄로 논리 단위 구분 ──────────────────────────────

// 관련 코드는 모으고, 다른 역할을 하는 코드 사이에는 빈 줄을 넣습니다.
// 긴 함수라도 빈 줄로 "읽기 단락"을 만들면 이해가 쉬워집니다.

function processOrder(orderId, userId) {
    // [1단계] 입력값 검증
    if (!orderId || !userId) {
        console.log('유효하지 않은 주문 정보');
        return;
    }

    // [2단계] 재고 확인
    const hasStock = true; // 실제로는 DB 조회
    if (!hasStock) {
        console.log('재고 없음');
        return;
    }

    // [3단계] 주문 처리
    console.log(`주문 처리 완료 — 주문 ID: ${orderId}, 사용자 ID: ${userId}`);
}

processOrder('ORD-001', 'USR-123');


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. 매직 넘버 — 상수로 의미 부여하기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. 매직 넘버 =====');

// 매직 넘버(Magic Number): 코드에 의미 설명 없이 그냥 등장하는 숫자·문자열
// 코드를 보는 사람이 "이 숫자가 왜 나왔지?" 혼란을 겪게 만듭니다.

// ❌ 매직 넘버 — 86400, 7, 0.1 이 무엇인지 알 수 없음
function badExample(price, days) {
    const fee = price * 0.1;           // 0.1 이 뭐지?
    const seconds = days * 86400;      // 86400 이 뭐지?
    if (days > 7) {                    // 7 이 뭐지?
        console.log('장기 대여');
    }
    return fee;
}

// ✅ 상수로 의미 부여 — 코드가 문서가 됨
const TAX_RATE = 0.1;                  // 부가세율 10%
const SECONDS_PER_DAY = 86400;        // 하루 = 60초 × 60분 × 24시간
const LONG_TERM_RENTAL_DAYS = 7;      // 장기 대여 기준일

function goodExample(price, days) {
    const fee = price * TAX_RATE;
    const seconds = days * SECONDS_PER_DAY;
    if (days > LONG_TERM_RENTAL_DAYS) {
        console.log('장기 대여');
    }
    return fee;
}

console.log('부가세(10000원):', goodExample(10000, 10)); // 1000


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. 코드 스타일 도구
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. 코드 스타일 도구 =====');

// 현업에서는 사람이 직접 스타일을 지키기보다
// 도구를 사용해 자동으로 검사하고 교정합니다.

// Prettier — 코드 포매터 (들여쓰기·공백·따옴표·세미콜론 자동 정렬)
//   npx prettier --write .
//   설정 파일: .prettierrc

// ESLint — 코드 린터 (오류 가능성·스타일 규칙 검사)
//   npx eslint .
//   설정 파일: .eslintrc.json

// EditorConfig — 편집기 들여쓰기·줄바꿈·인코딩 통일
//   설정 파일: .editorconfig

// 대표 스타일 가이드 (회사·팀마다 선택해 사용)
//   - Airbnb JavaScript Style Guide
//   - Google JavaScript Style Guide
//   - StandardJS (세미콜론 없음 스타일)

// 현재 파일 기준: 들여쓰기 4칸, 세미콜론 사용, 작은따옴표 우선

// 스타일보다 중요한 것: 팀 내에서 일관성을 유지하는 것입니다.
// 스타일이 무엇이든, 프로젝트 전체에서 통일되어 있어야 합니다.

console.log('코딩 컨벤션 학습 완료!');
