// ============================================================
// join.js — join / split / 배열 변환 유틸리티 완전 정복
//
// join: 배열 요소를 하나의 문자열로 합칩니다.
// split: 문자열을 구분자로 나눠 배열로 만듭니다. (join의 반대)
//
// 두 메서드는 배열 ↔ 문자열 변환의 핵심 도구입니다.
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. join 기본 문법
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('===== 1. join 기본 =====');

// join(구분자): 배열의 모든 요소를 구분자로 연결한 문자열을 반환합니다.
// 원본 배열은 변경되지 않습니다.
// 구분자를 생략하면 쉼표(,)가 기본값입니다.

const words = ['Hello', 'World', 'JavaScript'];

console.log(words.join(' '));    // "Hello World JavaScript"  (공백)
console.log(words.join(', '));   // "Hello, World, JavaScript" (쉼표+공백)
console.log(words.join(' | ')); // "Hello | World | JavaScript" (파이프)
console.log(words.join('-'));    // "Hello-World-JavaScript" (하이픈)
console.log(words.join(''));     // "HelloWorldJavaScript" (구분자 없음)
console.log(words.join());      // "Hello,World,JavaScript" (기본값: 쉼표)

// undefined / null / 빈 문자열은 빈 문자열('')로 처리됩니다
const sparse = ['a', undefined, null, '', 'b'];
console.log(sparse.join('-')); // "a---b" (undefined, null, '' 모두 빈 문자열)


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. split — 문자열 → 배열 (join의 역연산)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 2. split =====');

// split(구분자): 구분자를 기준으로 문자열을 나눠 배열로 반환합니다.
// 원본 문자열은 변경되지 않습니다.

const sentence = 'Hello World JavaScript';

// 공백으로 분리
const splitBySpace = sentence.split(' ');
console.log(splitBySpace); // ['Hello', 'World', 'JavaScript']

// 쉼표로 분리
const csv = '사과,바나나,체리,딸기';
const csvArr = csv.split(',');
console.log(csvArr); // ['사과', '바나나', '체리', '딸기']

// 글자 하나씩 분리 (빈 문자열 구분자)
const chars = 'hello'.split('');
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

// 두 번째 인수: 최대 배열 길이 제한
const limited = 'a-b-c-d-e'.split('-', 3);
console.log(limited); // ['a', 'b', 'c'] — 최대 3개


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. split + join 조합 — 문자열 처리
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 3. split + join 조합 =====');

// 특정 문자를 다른 문자로 교체 (replaceAll 이 없던 시절 자주 쓰던 패턴)
// 현재는 replaceAll 사용 권장, 원리 파악용

const original = 'Hello_World_JavaScript';
const replaced = original.split('_').join(' ');
console.log('_ → 공백:', replaced); // "Hello World JavaScript"

// kebab-case → camelCase 변환
function toCamelCase(str) {
  return str
    .split('-')                          // ['hello', 'world', 'foo']
    .map((word, i) =>
      i === 0
        ? word                             // 첫 단어는 그대로
        : word[0].toUpperCase() + word.slice(1) // 이후는 첫 글자 대문자
    )
    .join('');                             // 'helloWorldFoo'
}

console.log(toCamelCase('hello-world'));           // 'helloWorld'
console.log(toCamelCase('background-color'));      // 'backgroundColor'
console.log(toCamelCase('my-custom-event-name')); // 'myCustomEventName'

// snake_case → PascalCase 변환
function toPascalCase(str) {
  return str
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join('');
}
console.log(toPascalCase('user_profile_name')); // 'UserProfileName'

// 문장 내 단어 수 세기
const text = 'the quick brown fox jumps over the lazy dog';
const wordCount = text.split(' ').length;
console.log(`단어 수: ${wordCount}개`); // 9


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. join 실전 활용 — URL / CSV / HTML 생성
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 4. join 실전 활용 =====');

// ① URL 경로 조합
const pathSegments = ['api', 'v1', 'users', '123', 'profile'];
const urlPath = '/' + pathSegments.join('/');
console.log('URL 경로:', urlPath); // '/api/v1/users/123/profile'

// ② 쿼리 스트링 생성
const params = { page: 1, limit: 20, sort: 'name', order: 'asc' };
const queryString = Object.entries(params)
  .map(([key, val]) => `${key}=${val}`)
  .join('&');
console.log('쿼리 스트링:', queryString);
// 'page=1&limit=20&sort=name&order=asc'

// ③ CSV 행 생성
const headers = ['이름', '나이', '점수', '등급'];
const row = ['Alice', 28, 92, 'A'];
console.log('CSV 헤더:', headers.join(','));
console.log('CSV 데이터:', row.join(','));

// CSV 전체 생성
const tableData = [
  ['Alice', 28, 92, 'A'],
  ['Bob',   35, 78, 'B'],
  ['Carol', 22, 85, 'B'],
];
const csv2 = [headers, ...tableData].map((r) => r.join(',')).join('\n');
console.log('\nCSV 출력:\n' + csv2);

// ④ HTML 리스트 생성 (간단한 템플릿)
const menuItems = ['홈', '소개', '서비스', '연락처'];
const htmlList = '<ul>\n'
  + menuItems.map((item) => `  <li>${item}</li>`).join('\n')
  + '\n</ul>';
console.log('\nHTML 리스트:\n' + htmlList);

// ⑤ 여러 조각의 CSS 클래스 조합
const baseClass = 'btn';
const modifiers = ['primary', 'large', 'rounded'];
const className = [baseClass, ...modifiers.map((m) => `btn--${m}`)].join(' ');
console.log('\nCSS 클래스:', className);
// 'btn btn--primary btn--large btn--rounded'


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. 기타 배열 ↔ 문자열 변환 도구
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log('\n===== 5. 기타 변환 도구 =====');

// toString() — join(',') 와 동일
const arr = [1, 2, 3, 4, 5];
console.log(arr.toString()); // "1,2,3,4,5"
console.log(arr.join(','));  // "1,2,3,4,5" — 동일

// JSON.stringify — 배열 구조를 그대로 직렬화
console.log(JSON.stringify(arr));           // "[1,2,3,4,5]"
console.log(JSON.stringify({ a: 1, b: 2 })); // '{"a":1,"b":2}'

// 템플릿 리터럴 + join — 자연스러운 목록 표현
const tags = ['JavaScript', 'TypeScript', 'React'];
console.log(`사용 기술: ${tags.join(', ')}`);
// '사용 기술: JavaScript, TypeScript, React'

// 마지막 항목 앞에 '그리고' 넣기 (한국어 자연스러운 나열)
function listKorean(items) {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  const last = items[items.length - 1];
  const rest = items.slice(0, -1);
  return `${rest.join(', ')} 그리고 ${last}`;
}

console.log(listKorean(['사과', '바나나', '체리'])); // '사과, 바나나 그리고 체리'
console.log(listKorean(['JavaScript']));              // 'JavaScript'
