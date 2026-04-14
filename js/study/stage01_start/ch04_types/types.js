// ============================================================
// types.js — 자바스크립트 자료형(Data Types) 완전 정복
//
// 자바스크립트의 모든 값에는 자료형(타입)이 있습니다.
// 크게 두 분류로 나뉩니다:
//
//   기본 타입(Primitive): 값 자체가 변수에 저장됩니다.
//     → string, number, boolean, undefined, null, symbol, bigint
//
//   참조 타입(Reference): 값이 저장된 메모리 주소가 변수에 저장됩니다.
//     → object, array, function
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. 문자열 (String)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. 문자열(String) =====');

// 문자열: 텍스트 데이터를 나타내는 타입.
// 따옴표 세 종류 모두 사용할 수 있습니다.

const str1 = '작은따옴표';     // JS 에서 가장 일반적
const str2 = "큰따옴표";       // 작은따옴표와 동일하게 동작
const str3 = `백틱(템플릿 리터럴)`; // 변수 삽입·여러 줄 지원

console.log(str1, str2, str3);
console.log('타입:', typeof str1); // 'string'


// ── 1-1. 이스케이프 문자 ──────────────────────────────────────

// 특수 문자를 문자열 안에 포함할 때 백슬래시(\)를 앞에 붙입니다.

console.log('\n--- 이스케이프 문자 ---');
console.log('줄 바꿈:\n첫째 줄\n둘째 줄');    // \n : 줄 바꿈
console.log('탭:\t[탭 이후]');                // \t : 탭(들여쓰기)
console.log('백슬래시: \\');                  // \\ : 백슬래시 자체
console.log("큰따옴표: \"따옴표 안에\"");     // \" : 큰따옴표
console.log('작은따옴표: \'따옴표 안에\'');   // \' : 작은따옴표


// ── 1-2. 템플릿 리터럴 ───────────────────────────────────────

console.log('\n--- 템플릿 리터럴 ---');

const month = 12;
const day   = 25;
const event = '크리스마스';

// 기존 방식: + 로 연결 (가독성 낮음)
console.log(month + '월 ' + day + '일은 ' + event + '입니다.');

// 템플릿 리터럴: ${} 안에 변수·표현식 삽입
console.log(`${month}월 ${day}일은 ${event}입니다.`);

// 표현식도 삽입 가능
const price = 15000;
console.log(`가격: ${price.toLocaleString()}원`);       // 15,000원
console.log(`부가세 포함: ${(price * 1.1).toFixed(0)}원`); // 16500원
console.log(`비싼가요? ${price > 10000 ? '예' : '아니오'}`); // 삼항 연산자

// 여러 줄 문자열 — 줄 바꿈이 그대로 유지됨
const lyrics = `동해 물과 백두산이 마르고 닳도록
하느님이 보우하사 우리나라 만세`;
console.log(lyrics);


// ── 1-3. 문자열 주요 속성·메서드 ─────────────────────────────

console.log('\n--- 문자열 메서드 ---');

const text = '  Hello, JavaScript!  ';

// length: 문자열 길이 (공백 포함)
console.log('길이:', text.length);

// trim(): 앞뒤 공백 제거
console.log('trim:', text.trim()); // 'Hello, JavaScript!'

// toUpperCase() / toLowerCase(): 대소문자 변환
const word = 'JavaScript';
console.log('대문자:', word.toUpperCase()); // 'JAVASCRIPT'
console.log('소문자:', word.toLowerCase()); // 'javascript'

// includes(검색어): 포함 여부 확인 (boolean)
console.log('포함 확인:', word.includes('Script')); // true
console.log('포함 확인:', word.includes('Python')); // false

// indexOf(검색어): 처음 나타나는 위치 (없으면 -1)
console.log('위치:', word.indexOf('Script')); // 4

// slice(시작, 끝): 일부 추출 (끝 인덱스 미포함)
console.log('slice:', word.slice(0, 4));  // 'Java'
console.log('slice:', word.slice(4));     // 'Script' (끝까지)

// replace(대상, 대체): 첫 번째 일치 항목 교체
console.log('replace:', 'aabba'.replace('a', 'x')); // 'xabba' (첫 번째만)
// replaceAll: 모든 일치 항목 교체
console.log('replaceAll:', 'aabba'.replaceAll('a', 'x')); // 'xxbbx'

// split(구분자): 문자열을 배열로 분리
const csv = '사과,바나나,체리';
console.log('split:', csv.split(','));  // ['사과', '바나나', '체리']

// repeat(횟수): 반복
console.log('repeat:', '-'.repeat(20)); // '--------------------'

// padStart(길이, 채울문자) / padEnd: 길이가 모자랄 때 채워넣기
console.log('padStart:', '7'.padStart(3, '0'));  // '007'
console.log('padEnd:',   '42'.padEnd(5, '.'));   // '42...'


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. 숫자 (Number)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. 숫자(Number) =====');

// 자바스크립트는 정수와 실수를 구분하지 않습니다.
// 모두 64비트 부동소수점(IEEE 754) 형식으로 저장됩니다.

const integer  = 42;
const float    = 3.14;
const negative = -100;
const hex      = 0xFF;   // 16진수 표기 (255)
const binary   = 0b1010; // 2진수 표기 (10)
const octal    = 0o17;   // 8진수 표기 (15)
const big      = 1_000_000; // 숫자 구분자(ES2021) — 백만

console.log(integer, float, negative);
console.log('16진수:', hex);   // 255
console.log('2진수:', binary); // 10
console.log('구분자:', big);   // 1000000


// ── 2-1. 특수값: Infinity / NaN ──────────────────────────────

console.log('\n--- 특수값 ---');

// Infinity: 수학적 무한대
console.log('1 / 0:', 1 / 0);        // Infinity
console.log('-1 / 0:', -1 / 0);      // -Infinity
console.log('isFinite(Infinity):', isFinite(Infinity)); // false
console.log('isFinite(100):', isFinite(100));            // true

// NaN (Not a Number): 숫자로 변환할 수 없는 연산 결과
console.log("'문자열' * 3:", 'abc' * 3);     // NaN
console.log('0 / 0:', 0 / 0);                 // NaN
console.log('parseInt("hello"):', parseInt('hello')); // NaN

// NaN 의 특이한 성질: 자기 자신과도 같지 않음
console.log('NaN === NaN:', NaN === NaN); // false — ⚠️ 주의!
console.log('isNaN(NaN):', isNaN(NaN));   // true — NaN 판별은 isNaN() 사용
console.log('Number.isNaN(NaN):', Number.isNaN(NaN)); // true (더 엄격한 버전)


// ── 2-2. Number 유틸리티 ─────────────────────────────────────

console.log('\n--- Number 유틸리티 ---');

// toFixed(소수점자리): 소수점 자리 수 고정 (반올림, 문자열 반환)
const pi = 3.14159265;
console.log('toFixed(2):', pi.toFixed(2));   // '3.14'
console.log('toFixed(0):', pi.toFixed(0));   // '3'

// toLocaleString(): 지역화된 숫자 형식 (천 단위 쉼표 등)
const bigNum = 1234567.89;
console.log('toLocaleString:', bigNum.toLocaleString('ko-KR')); // '1,234,567.89'

// Number(): 다른 타입을 숫자로 변환
console.log('Number("42"):', Number('42'));       // 42
console.log('Number("3.14"):', Number('3.14'));   // 3.14
console.log('Number(true):', Number(true));       // 1
console.log('Number(false):', Number(false));     // 0
console.log('Number(""):', Number(''));            // 0
console.log('Number("abc"):', Number('abc'));     // NaN

// parseInt / parseFloat: 문자열에서 숫자 파싱
console.log('parseInt("42px"):', parseInt('42px'));       // 42 (숫자만 추출)
console.log('parseFloat("3.14rem"):', parseFloat('3.14rem')); // 3.14

// 안전한 정수 범위
console.log('MAX_SAFE_INTEGER:', Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log('MIN_SAFE_INTEGER:', Number.MIN_SAFE_INTEGER); // -9007199254740991


// ── 2-3. BigInt — 매우 큰 정수 (ES2020) ─────────────────────

console.log('\n--- BigInt ---');

// Number.MAX_SAFE_INTEGER 를 초과하는 정수를 정확히 표현합니다.
// 숫자 끝에 n 을 붙여 선언합니다.

const maxSafe = Number.MAX_SAFE_INTEGER; // 9007199254740991
console.log('MAX_SAFE + 1:', maxSafe + 1); // 9007199254740992
console.log('MAX_SAFE + 2:', maxSafe + 2); // 9007199254740992 ← 오차 발생!

const bigInt1 = 9007199254740991n;
console.log('BigInt + 2n:', bigInt1 + 2n); // 9007199254740993n — 정확!
console.log('타입:', typeof bigInt1);       // 'bigint'

// BigInt 와 number 는 혼합 연산 불가
// console.log(bigInt1 + 1); // ❌ TypeError
console.log(bigInt1 + 1n); // ✅ 같은 타입끼리만 연산 가능


// ── 2-4. Math 객체 — 수학 함수 ───────────────────────────────

console.log('\n--- Math 유틸리티 ---');

console.log('Math.abs(-5):', Math.abs(-5));             // 5 절댓값
console.log('Math.round(3.6):', Math.round(3.6));       // 4 반올림
console.log('Math.floor(3.9):', Math.floor(3.9));       // 3 내림
console.log('Math.ceil(3.1):', Math.ceil(3.1));         // 4 올림
console.log('Math.max(1,5,3):', Math.max(1, 5, 3));     // 5 최댓값
console.log('Math.min(1,5,3):', Math.min(1, 5, 3));     // 1 최솟값
console.log('Math.pow(2,10):', Math.pow(2, 10));        // 1024 거듭제곱
console.log('Math.sqrt(16):', Math.sqrt(16));           // 4 제곱근
console.log('Math.random():', Math.random());           // 0 이상 1 미만 랜덤

// 1 ~ 10 사이 정수 랜덤 생성
const randomInt = Math.floor(Math.random() * 10) + 1;
console.log('1~10 랜덤:', randomInt);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. 논리형 (Boolean)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. 논리형(Boolean) =====');

// Boolean 은 true(참) 또는 false(거짓) 두 값만 존재합니다.
// 조건문, 반복문의 조건 판단에 핵심적으로 사용됩니다.

const isActive   = true;
const isLoggedIn = false;

console.log('isActive:', isActive);
console.log('타입:', typeof isActive); // 'boolean'

// 비교 연산의 결과는 boolean
console.log('10 > 5:', 10 > 5);    // true
console.log('10 < 5:', 10 < 5);    // false
console.log("'a' === 'a':", 'a' === 'a'); // true

// Boolean() 함수 — 다른 값을 boolean 으로 변환
console.log('\n--- 불리언 변환 (Truthy / Falsy) ---');

// Falsy 값: boolean 변환 시 false 가 되는 값 (6가지)
console.log('Boolean(false):', Boolean(false));      // false
console.log('Boolean(0):', Boolean(0));              // false
console.log('Boolean(-0):', Boolean(-0));            // false
console.log('Boolean(0n):', Boolean(0n));            // false (BigInt 0)
console.log('Boolean(""):', Boolean(''));             // false (빈 문자열)
console.log('Boolean(null):', Boolean(null));        // false
console.log('Boolean(undefined):', Boolean(undefined)); // false
console.log('Boolean(NaN):', Boolean(NaN));          // false

// Truthy 값: 위 6가지 외의 모든 값
console.log('\n--- Truthy ---');
console.log('Boolean("hello"):', Boolean('hello'));  // true
console.log('Boolean(1):', Boolean(1));              // true
console.log('Boolean(-1):', Boolean(-1));            // true
console.log('Boolean({}):', Boolean({}));            // true (빈 객체도!)
console.log('Boolean([]):', Boolean([]));            // true (빈 배열도!)


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. undefined와 null
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. undefined와 null =====');

// ── undefined ────────────────────────────────────────────────
// 변수를 선언했지만 아직 값이 할당되지 않았을 때 JS 엔진이 자동으로 부여하는 값.

let notAssigned;
console.log('선언만 한 변수:', notAssigned); // undefined
console.log('타입:', typeof notAssigned);    // 'undefined'

// 함수가 아무것도 반환하지 않을 때도 undefined
function noReturn() {
    const x = 1; // 반환 없음
}
console.log('반환 없는 함수:', noReturn()); // undefined

// 존재하지 않는 객체 속성 접근 시
const obj = { name: '홍길동' };
console.log('없는 속성:', obj.age); // undefined


// ── null ─────────────────────────────────────────────────────
// 개발자가 "값이 없음"을 의도적으로 명시할 때 직접 할당하는 값.

let userData = null; // 아직 사용자 데이터가 없음을 명시
console.log('null 변수:', userData);   // null
console.log('타입:', typeof userData); // 'object' ← JS 역사적 버그!

// 나중에 실제 데이터 할당
userData = { name: '홍길동', age: 28 };
console.log('데이터 할당 후:', userData);


// ── undefined vs null 비교 ────────────────────────────────────

console.log('\n--- undefined vs null 비교 ---');
console.log('null == undefined:', null == undefined);   // true  (동등 비교)
console.log('null === undefined:', null === undefined); // false (엄격 비교)

// 타입도 다르고, 의도도 다릅니다
// undefined: "아직 초기화되지 않음" (JS 엔진이 자동 할당)
// null:      "의도적으로 비어 있음" (개발자가 명시적 할당)


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. Symbol — 유일한 식별자
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. Symbol =====');

// Symbol: 매번 호출할 때마다 유일(unique)한 값을 만듭니다.
// 주로 객체 속성의 충돌을 방지하기 위한 고유 키로 사용합니다.

const sym1 = Symbol('id');
const sym2 = Symbol('id');

console.log('sym1 === sym2:', sym1 === sym2); // false — 같은 설명이라도 다른 값
console.log('타입:', typeof sym1);             // 'symbol'
console.log('설명:', sym1.toString());         // 'Symbol(id)'
console.log('설명(description):', sym1.description); // 'id'

// Symbol 을 객체 키로 사용
const KEY = Symbol('secretKey');
const secret = {
    [KEY]: '비밀 데이터',  // Symbol 을 키로 사용 (외부 노출 안 됨)
    name: '공개 데이터',
};
console.log('Symbol 키 접근:', secret[KEY]); // '비밀 데이터'
console.log('일반 키 접근:', secret.name);   // '공개 데이터'
// Object.keys 에서 Symbol 키는 나타나지 않음 (숨겨진 속성)
console.log('Object.keys:', Object.keys(secret)); // ['name']


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. typeof 연산자
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. typeof =====');

// typeof 값: 해당 값의 자료형을 문자열로 반환합니다.
// 변수에 어떤 타입이 들어있는지 런타임에 확인할 때 사용합니다.

console.log('typeof "hello":', typeof 'hello');          // 'string'
console.log('typeof 42:', typeof 42);                    // 'number'
console.log('typeof 3.14:', typeof 3.14);                // 'number' (실수도 number)
console.log('typeof true:', typeof true);                // 'boolean'
console.log('typeof undefined:', typeof undefined);      // 'undefined'
console.log('typeof null:', typeof null);                // 'object' ← 버그!
console.log('typeof {}:', typeof {});                    // 'object'
console.log('typeof []:', typeof []);                    // 'object' ← 배열도 object
console.log('typeof function(){}:', typeof function(){}); // 'function'
console.log('typeof Symbol():', typeof Symbol());        // 'symbol'
console.log('typeof 1n:', typeof 1n);                    // 'bigint'

// ⚠️ 배열 여부 확인은 Array.isArray() 를 사용해야 합니다
const arr = [1, 2, 3];
console.log('\ntypeof []:', typeof arr);          // 'object' — 배열인지 알 수 없음
console.log('Array.isArray([]):', Array.isArray(arr)); // true — 명확히 배열 확인

// 실용 예시 — 타입에 따라 다른 처리
function describe(value) {
    switch (typeof value) {
        case 'string':
            return `문자열 "${value}" (길이: ${value.length})`;
        case 'number':
            return `숫자 ${value} (${isNaN(value) ? 'NaN' : isFinite(value) ? '유한' : '무한'})`;
        case 'boolean':
            return `불리언 ${value}`;
        case 'undefined':
            return '값 없음(undefined)';
        case 'object':
            if (value === null) return 'null';
            if (Array.isArray(value)) return `배열 (길이: ${value.length})`;
            return `객체 (키: ${Object.keys(value).join(', ')})`;
        default:
            return `기타 타입: ${typeof value}`;
    }
}

console.log('\ndescribe 결과:');
console.log(describe('안녕하세요'));    // 문자열 "안녕하세요" (길이: 5)
console.log(describe(42));             // 숫자 42 (유한)
console.log(describe(Infinity));       // 숫자 Infinity (무한)
console.log(describe(NaN));            // 숫자 NaN (NaN)
console.log(describe(true));           // 불리언 true
console.log(describe(undefined));      // 값 없음(undefined)
console.log(describe(null));           // null
console.log(describe([1, 2, 3]));      // 배열 (길이: 3)
console.log(describe({ a: 1, b: 2 })); // 객체 (키: a, b)


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 7. 참조 타입 (Reference Type)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 7. 참조 타입 =====');

// 참조 타입: 값 자체가 아닌 값이 저장된 메모리 주소(참조)를 변수에 저장합니다.
// 기본 타입: 변수에 값이 직접 저장됩니다.


// ── 7-1. 객체 (Object) ───────────────────────────────────────

// 객체: 키(key)와 값(value)의 쌍(프로퍼티)을 중괄호로 묶은 자료구조.
// 서로 연관된 데이터를 하나의 단위로 묶을 수 있습니다.

const person = {
    name:    'HongGilDong',  // 문자열
    age:     30,             // 숫자
    isAdmin: false,          // 불리언
    address: {               // 중첩 객체
        city:    '서울',
        zipCode: '04524',
    },
    greet() {                // 메서드(함수 속성)
        return `안녕하세요, ${this.name}입니다!`;
    },
};

console.log('객체:', person);
console.log('이름:', person.name);              // 점 표기법
console.log('나이:', person['age']);            // 대괄호 표기법
console.log('도시:', person.address.city);     // 중첩 접근
console.log('인사:', person.greet());          // 메서드 호출
console.log('타입:', typeof person);           // 'object'


// ── 7-2. 배열 (Array) ────────────────────────────────────────

// 배열: 순서 있는 값들의 목록을 대괄호로 묶은 자료구조.
// 인덱스(0부터 시작)로 각 요소에 접근합니다.

const fruits = ['사과', '바나나', '체리', '딸기'];

console.log('\n배열:', fruits);
console.log('첫 번째:', fruits[0]);       // '사과' (인덱스 0)
console.log('마지막:', fruits[fruits.length - 1]); // '딸기'
console.log('길이:', fruits.length);     // 4
console.log('타입:', typeof fruits);     // 'object'
console.log('배열 여부:', Array.isArray(fruits)); // true

// 배열 기본 메서드
fruits.push('망고');          // 끝에 추가
console.log('push 후:', fruits);

const removed = fruits.pop(); // 끝에서 제거
console.log('pop 으로 제거:', removed); // '망고'

console.log('includes:', fruits.includes('바나나')); // true
console.log('indexOf:', fruits.indexOf('체리'));     // 2
console.log('join:', fruits.join(' / '));            // '사과 / 바나나 / 체리 / 딸기'


// ── 7-3. 함수 (Function) ─────────────────────────────────────

// 함수도 참조 타입 — 변수에 저장하고, 인수로 전달하고, 반환할 수 있습니다.

function greet(name) {
    return `Hello, ${name}!`;
}

const sayHi = greet; // 함수 자체를 변수에 할당 (호출 아님)
console.log('\n함수 할당:', sayHi('World')); // 'Hello, World!'
console.log('타입:', typeof greet); // 'function'


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 8. 기본 타입 vs 참조 타입 — 메모리 모델
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 8. 기본 타입 vs 참조 타입 메모리 모델 =====');

// ── 기본 타입: 값을 복사 ─────────────────────────────────────

let a = 10;
let b = a;  // a 의 값(10)을 복사해 b 에 저장

b = 20;     // b 를 바꿔도 a 는 영향 없음

console.log('기본 타입 복사:');
console.log('a:', a); // 10 — 그대로
console.log('b:', b); // 20 — 변경됨


// ── 참조 타입: 주소를 공유 ───────────────────────────────────

const objA = { value: 10 };
const objB = objA; // 객체의 주소(참조)를 복사 → 같은 객체를 가리킴

objB.value = 999;  // objB 를 통해 수정

console.log('\n참조 타입 공유:');
console.log('objA.value:', objA.value); // 999 — objA 도 바뀜!
console.log('objB.value:', objB.value); // 999
console.log('같은 객체?:', objA === objB); // true

// 독립적인 복사본을 만들려면 스프레드 연산자 사용
const objC = { ...objA }; // 얕은 복사 (새 객체)
objC.value = 42;

console.log('\n스프레드로 복사:');
console.log('objA.value:', objA.value); // 999 — 영향 없음
console.log('objC.value:', objC.value); // 42
console.log('같은 객체?:', objA === objC); // false


// ── 타입 비교 정리 ────────────────────────────────────────────

console.log('\n--- 기본 타입 vs 참조 타입 ---');
//
// 기본 타입: 변수에 값이 직접 들어감
//   a [10]   b [10]  → 복사 후 독립
//
// 참조 타입: 변수에 주소가 들어감
//   objA → [주소: 0x01]  objB → [주소: 0x01]  → 같은 데이터 공유
//            ↓
//          { value: 10 }
