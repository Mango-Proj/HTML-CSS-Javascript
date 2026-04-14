// ============================================================
// objects.js — 자바스크립트 객체(Object) 기초
//
// 객체: 서로 연관된 데이터(속성)와 기능(메서드)을 하나의 단위로 묶은 자료구조.
// 실세계의 사물·개념을 키(key)-값(value) 쌍으로 표현합니다.
//
// 예) 사람 → { name: '홍길동', age: 28, job: '개발자' }
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. 객체 생성
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. 객체 생성 =====');

// ① 객체 리터럴 방식 — 가장 일반적, 권장
// { 키: 값, 키: 값, ... } 형태로 직접 작성합니다.
const person = {
    name:    'John',          // string
    age:     30,              // number
    gender:  'male',          // string
    isAdmin: false,           // boolean
    scores:  [90, 85, 92],    // 배열도 값으로 사용 가능
    'place of birth': 'Seoul', // 공백·특수문자 포함 키 → 따옴표로 감쌈
};

console.log(person);
console.log('타입:', typeof person); // 'object'

// ② 빈 객체 생성 후 속성 추가
const car = {};        // 빈 객체
car.brand = 'Hyundai'; // 나중에 속성 추가
car.model = 'Sonata';
car.year  = 2024;
console.log('car:', car);

// ③ new Object() 방식 (리터럴과 동일하나 거의 사용 안 함)
const empty = new Object();
empty.value = 42;
console.log('new Object():', empty);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. 프로퍼티 접근 — 점 표기법 vs 대괄호 표기법
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. 프로퍼티 접근 =====');

// ① 점 표기법 (Dot Notation) — 가장 일반적
// 키 이름이 유효한 식별자(영문·숫자·_·$, 숫자로 시작 안 함)일 때 사용
console.log('이름:', person.name);   // 'John'
console.log('나이:', person.age);    // 30

// ② 대괄호 표기법 (Bracket Notation) — 문자열 또는 변수로 키 지정
// 키에 공백·특수문자가 포함되거나, 키를 변수로 동적으로 지정할 때 사용
console.log('출생지:', person['place of birth']); // 'Seoul' — 공백 포함 키
// console.log(person.place of birth); // ❌ SyntaxError

// 변수로 동적 접근 — 대괄호 표기법만 가능
const key = 'age';
console.log('동적 키:', person[key]); // 30 — 변수 key 의 값('age')으로 접근
// console.log(person.key); // undefined — 'key' 라는 이름의 속성을 찾음

// 존재하지 않는 속성 → undefined (에러 아님)
console.log('없는 속성:', person.email);    // undefined
console.log('없는 속성:', person['phone']); // undefined


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. 프로퍼티 추가 / 수정 / 삭제
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. 추가 / 수정 / 삭제 =====');

const profile = { name: 'John', gender: 'male' };
console.log('초기:', profile);

// ① 추가 — 존재하지 않는 키에 값을 할당하면 새 속성이 생김
profile.bloodType   = 'AB+';        // 점 표기법으로 추가
profile['nationality'] = 'Korean';  // 대괄호 표기법으로 추가
console.log('추가 후:', profile);

// ② 수정 — 이미 존재하는 키에 새 값을 할당
profile.name = 'Jane';              // 기존 'John' → 'Jane' 으로 변경
profile['gender'] = 'female';
console.log('수정 후:', profile);

// ③ 삭제 — delete 연산자 사용
delete profile.bloodType;           // 점 표기법으로 삭제
delete profile['nationality'];      // 대괄호 표기법으로 삭제
console.log('삭제 후:', profile);   // { name: 'Jane', gender: 'female' }

// ⚠️ const 로 선언된 객체도 내부 속성은 추가·수정·삭제 가능
// const 는 변수가 가리키는 참조(주소)를 고정할 뿐, 내부 내용은 변경 가능
// profile = {}; // ❌ const 변수 재할당 불가


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. 속성 존재 여부 확인
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. 속성 존재 확인 =====');

const product = { name: '노트북', price: 1200000, stock: 0 };

// ① in 연산자 — 키 존재 여부 확인 (boolean 반환)
console.log("'name' in product:", 'name' in product);   // true
console.log("'email' in product:", 'email' in product); // false
console.log("'stock' in product:", 'stock' in product); // true (값이 0 이어도)

// ② hasOwnProperty() — 상속받은 속성 제외, 직접 정의한 속성만 확인
console.log('hasOwnProperty(name):', product.hasOwnProperty('name'));   // true
console.log('hasOwnProperty(toString):', product.hasOwnProperty('toString')); // false (상속)

// ③ undefined 비교 — 값이 undefined 인지 키가 없는지 구분이 안 돼 부정확
console.log('undefined 비교:', product.email === undefined); // true (키 없음)
// → stock 이 0 이어도 in 연산자로는 true, undefined 비교에는 false
console.log('stock === undefined:', product.stock === undefined); // false
console.log("'stock' in product:", 'stock' in product);           // true


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. 메서드 — 객체 안의 함수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. 메서드 =====');

// 객체의 값으로 함수를 넣으면 그것을 메서드(method)라고 합니다.
// this 는 메서드를 호출한 객체 자신을 가리킵니다.

const calculator = {
    value: 0,

    // 메서드 — function 키워드 버전
    add: function (n) {
        this.value += n; // this = calculator 객체
        return this;     // 메서드 체이닝을 위해 자기 자신 반환
    },

    // 메서드 — 단축 문법 (ES6, 권장)
    subtract(n) {
        this.value -= n;
        return this;
    },

    reset() {
        this.value = 0;
        return this;
    },

    getResult() {
        return this.value;
    },
};

// 메서드 호출
calculator.add(10);
calculator.add(5);
calculator.subtract(3);
console.log('결과:', calculator.getResult()); // 12

// 메서드 체이닝 — 각 메서드가 this 를 반환하므로 연이어 호출 가능
const result = calculator
    .reset()
    .add(100)
    .subtract(40)
    .add(20)
    .getResult();

console.log('체이닝 결과:', result); // 80


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. Object 유틸리티 메서드
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 6. Object 유틸리티 =====');

const student = {
    name:    '홍길동',
    grade:   'A',
    score:   95,
    subject: '수학',
};

// Object.keys(obj)   → 키 배열
// Object.values(obj) → 값 배열
// Object.entries(obj)→ [키, 값] 쌍의 배열

console.log('keys:', Object.keys(student));     // ['name', 'grade', 'score', 'subject']
console.log('values:', Object.values(student)); // ['홍길동', 'A', 95, '수학']
console.log('entries:', Object.entries(student));
// [['name','홍길동'], ['grade','A'], ['score',95], ['subject','수학']]

// 순회 예시 — 키·값을 함께 출력
console.log('\n전체 속성 출력:');
Object.entries(student).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
});

// Object.assign(target, source) — 객체 병합 (얕은 복사)
const defaults = { theme: 'light', language: 'ko', fontSize: 14 };
const userPrefs = { theme: 'dark', fontSize: 16 };

const config = Object.assign({}, defaults, userPrefs); // 새 객체에 병합
console.log('\n설정 병합:', config);
// { theme: 'dark', language: 'ko', fontSize: 16 } — userPrefs 가 덮어씀

// 스프레드 연산자로도 동일하게 병합 가능 (더 간결, 권장)
const config2 = { ...defaults, ...userPrefs };
console.log('스프레드 병합:', config2); // 동일한 결과


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 7. 중첩 객체
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 7. 중첩 객체 =====');

// 객체 안에 객체를 넣어 계층적 데이터를 표현합니다.
const company = {
    name: 'TechCorp',
    address: {               // 중첩 객체
        city:    '서울',
        district: '강남구',
        zipCode: '06000',
    },
    ceo: {                   // 중첩 객체
        name: '김대표',
        age:  45,
    },
    employees: 150,
};

// 중첩 접근: 점 표기법 연속 사용
console.log('도시:', company.address.city);           // '서울'
console.log('우편번호:', company.address['zipCode']); // '06000'
console.log('대표:', company.ceo.name);               // '김대표'

// 중첩 속성 수정
company.address.city = '부산';
console.log('이전 후 도시:', company.address.city); // '부산'

// 옵셔널 체이닝 — 중간에 없는 속성이 있어도 에러 없이 undefined
console.log(company?.cfo?.name); // undefined (cfo 속성 없음, 에러 안 남)
