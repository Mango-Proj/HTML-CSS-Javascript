// ============================================================
// script.js — 자바스크립트 기초: 브라우저 환경과 내장 함수
//
// 이 파일은 index.html 의 <body> 하단에서 외부 스크립트로 연결됩니다.
// 브라우저는 HTML을 위에서 아래로 읽다가 <script>를 만나면 멈추고
// 스크립트를 실행한 뒤 HTML 파싱을 재개합니다.
// ============================================================


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 1. 자바스크립트 연결 확인
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// console.log: 브라우저 개발자 도구(F12 → Console)에 메시지를 출력합니다.
// 값 확인, 디버깅, 실행 흐름 추적에 가장 많이 사용하는 함수입니다.
console.log('자바스크립트 연결 성공!');
console.log('index.html 에서 script.js 를 로드했습니다.');


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 2. console 메서드 종류
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// log   : 일반 메시지 (흰색/검은색)
// warn  : 경고 메시지 (노란색, 경고 아이콘)
// error : 에러 메시지 (빨간색, 에러 아이콘)
// info  : 정보 메시지 (파란색 아이콘, log 와 거의 동일)

console.log('console.log — 일반 출력');
console.warn('console.warn — 경고! 주의가 필요한 상황');
console.error('console.error — 에러! 문제가 발생했습니다');
console.info('console.info — 정보 출력');

// 여러 값을 한 번에 출력할 수 있습니다
const language = 'JavaScript';
const year = 1995;
console.log('언어:', language, '| 탄생 연도:', year);

// 객체나 배열도 그대로 출력 가능 (구조를 펼쳐서 보여줌)
const info = { name: 'JavaScript', creator: 'Brendan Eich', version: 'ES2024' };
console.log('JS 정보:', info);


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 3. 브라우저 내장 대화창 함수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 이 함수들은 브라우저 환경에서만 동작합니다.
// Node.js 터미널에서는 사용할 수 없습니다.

// --- alert(메시지) ---
// 사용자에게 메시지를 보여주는 경고창을 표시합니다.
// 확인 버튼을 누를 때까지 스크립트 실행이 멈춥니다. (블로킹)
// 반환값: undefined (항상)
// alert('안녕하세요! 자바스크립트 세계에 오신 것을 환영합니다.');

// --- confirm(메시지) ---
// 사용자가 확인/취소를 선택하는 창을 표시합니다.
// 반환값: 확인 클릭 시 true, 취소 클릭 시 false (boolean)
const isHungry = confirm('밥 먹었어요?');
if (isHungry) {
    console.log('확인 선택 → 맛있게 드셨군요!');
} else {
    // alert: 취소를 눌렀을 때 사용자에게 알림을 표시
    alert('얼른 식사하세요!');
    console.log('취소 선택 → 식사 권유 알림 표시');
}

// --- prompt(메시지, 기본값) ---
// 사용자가 텍스트를 직접 입력할 수 있는 창을 표시합니다.
// 반환값: 입력한 문자열, 취소 시 null
const userName = prompt('이름이 무엇인가요?', '익명');

// prompt 반환값은 항상 문자열(string) 또는 null 입니다.
if (userName !== null && userName.trim() !== '') {
    console.log(`입력된 이름: ${userName}`);
    console.log(`안녕하세요, ${userName}님!`);
} else {
    console.log('이름 입력을 취소했거나 빈 값을 입력했습니다.');
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 4. DOM 조작 — 자바스크립트가 HTML을 바꾸는 방법
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// DOM (Document Object Model): 브라우저가 HTML을 읽어 만든 객체 트리.
// 자바스크립트는 DOM 을 통해 HTML 요소의 내용, 스타일, 속성을 동적으로 변경합니다.

// getElementById: id 속성으로 HTML 요소를 찾아 반환합니다.
const titleEl = document.getElementById('js-title');

if (titleEl) {
    // textContent: 요소의 텍스트 내용을 읽거나 변경합니다.
    console.log('기존 제목:', titleEl.textContent);

    // 자바스크립트로 HTML 내용 변경
    titleEl.textContent = `${language} (${year}년 탄생)`;
    console.log('변경된 제목:', titleEl.textContent);

    // style: 인라인 CSS 스타일을 자바스크립트에서 직접 변경할 수 있습니다.
    titleEl.style.color = '#f7df1e';       // JS 로고 노란색
    titleEl.style.fontWeight = 'bold';
}

// querySelector: CSS 선택자 문법으로 요소를 찾습니다 (더 유연함)
const descEl = document.querySelector('#js-description');
if (descEl) {
    descEl.textContent = '브라우저와 서버 모두에서 동작하는 유일한 언어';
}

// querySelectorAll: 조건에 맞는 모든 요소를 NodeList로 반환합니다.
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach((item, i) => {
    // 각 항목에 순번 추가
    item.textContent = `${i + 1}. ${item.textContent}`;
});


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 5. 이벤트 — 사용자 동작에 반응하기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 이벤트(Event): 클릭, 키보드 입력, 마우스 이동 등 사용자 동작이나
// 브라우저 상태 변화를 의미합니다.
// addEventListener(이벤트명, 콜백): 특정 이벤트가 발생했을 때 실행할 함수를 등록합니다.

const btn = document.getElementById('js-btn');
if (btn) {
    // 'click' 이벤트: 버튼을 클릭했을 때 실행
    btn.addEventListener('click', function () {
        // innerHTML: 텍스트뿐 아니라 HTML 태그를 포함한 내용을 변경합니다.
        const outputEl = document.getElementById('js-output');
        if (outputEl) {
            outputEl.innerHTML = '🎉 버튼 클릭 이벤트 발생! 자바스크립트가 동작 중입니다.';
            outputEl.style.color = 'green';
        }
        console.log('버튼 클릭 이벤트 발생!');
    });
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section 6. 자바스크립트 실행 환경 확인
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// window 객체: 브라우저 환경에서 최상위 전역 객체입니다.
// 브라우저에서 선언한 전역 변수, alert, console 등은 모두 window 의 속성입니다.

console.log('=== 브라우저 환경 정보 ===');
console.log('브라우저 정보 :', navigator.userAgent);
console.log('현재 페이지 URL:', window.location.href);
console.log('화면 너비:', window.innerWidth, 'px');
console.log('화면 높이:', window.innerHeight, 'px');

// 현재 시각 출력 — Date 객체는 브라우저/Node.js 모두 사용 가능
const now = new Date();
console.log('현재 시각:', now.toLocaleString('ko-KR'));
