/* ============================================================
   이벤트 완벽 가이드 — app.js
   5가지 핵심 이벤트 개념을 인터랙티브 예제로 구현합니다.

   1. 이벤트 핸들러 등록 방식   — 인라인 / 프로퍼티 / addEventListener
   2. 이벤트 객체 (event)       — e.target / e.currentTarget / 좌표
   3. 마우스 이벤트             — click / dblclick / mouseover / mousemove
   4. 키보드 이벤트             — keydown / keyup / e.key / e.code / 수식키
   5. 폼 이벤트 (원본 코드 기반) — focus / blur / submit / change
============================================================ */


/* ── 공통 유틸리티 ──────────────────────────────────────────
   appendLog: 각 섹션의 로그 영역에 한 줄씩 메시지를 출력하는 헬퍼
   - logId  : 로그를 표시할 요소의 id
   - message: 출력할 텍스트
   - type   : 'info' | 'success' | 'warn' | 'error' (색상 결정)
──────────────────────────────────────────────────────────── */
function appendLog(logId, message, type = 'info') {
  const logEl = document.getElementById(logId);
  const line  = document.createElement('div');
  line.className   = `log-line log-${type}`;
  line.textContent = message;
  logEl.appendChild(line);

  // 최대 6줄만 유지 (오래된 줄은 자동 제거)
  while (logEl.children.length > 6) {
    logEl.removeChild(logEl.firstChild);
  }
}

function clearLog(logId) {
  document.getElementById(logId).innerHTML = '';
}


/* ============================================================
   Section 1. 이벤트 핸들러 등록 방식

   세 가지 방식의 차이:
   1) 인라인   : HTML 태그 안에 onclick="함수명()" 직접 작성 → 권장하지 않음
   2) 프로퍼티 : btn.onclick = 함수  → 핸들러를 1개밖에 등록 못 함 (덮어씀)
   3) addEventListener : 핸들러를 여러 개 등록 가능, 가장 권장되는 방식
============================================================ */

/* ──────────────────────────────────────
   방법 1: 인라인 방식
   HTML에 onclick="inlineHandler(this)"로 연결됨
   this는 HTML에서 넘겨준 버튼 요소를 가리킴
────────────────────────────────────── */
function inlineHandler(btnEl) {
  appendLog('handler-log', `인라인: onclick="inlineHandler(this)" 실행됨`, 'info');
  appendLog('handler-log', `→ this(btnEl).tagName = "${btnEl.tagName}"`, 'warn');
}

/* ──────────────────────────────────────
   방법 2: 프로퍼티 방식
   btn.onclick = 첫 번째 함수;
   btn.onclick = 두 번째 함수;  ← 첫 번째를 덮어씀! 두 번째만 실행됨
────────────────────────────────────── */
const propBtn = document.getElementById('prop-btn');

// 첫 번째 핸들러 등록
propBtn.onclick = function () {
  appendLog('handler-log', '[첫 번째] 이 메시지는 표시되지 않습니다 (덮어써짐)', 'error');
};

// 두 번째 핸들러로 덮어쓰기 → 첫 번째는 완전히 사라짐
propBtn.onclick = function () {
  appendLog('handler-log', `프로퍼티: btn.onclick = func → 두 번째 핸들러만 실행됨`, 'warn');
  appendLog('handler-log', `→ 이전 핸들러는 덮어씌워져 사라짐 (1개만 등록 가능)`, 'warn');
};

/* ──────────────────────────────────────
   방법 3: addEventListener
   같은 이벤트에 핸들러를 여러 개 등록할 수 있음 → 모두 실행됨
────────────────────────────────────── */
const multiBtn = document.getElementById('multi-btn');

// 첫 번째 핸들러
multiBtn.addEventListener('click', function () {
  appendLog('handler-log', `addEventListener: 첫 번째 핸들러 실행됨`, 'success');
});

// 두 번째 핸들러 — 첫 번째가 사라지지 않고 둘 다 실행됨
multiBtn.addEventListener('click', function () {
  appendLog('handler-log', `addEventListener: 두 번째 핸들러도 실행됨 (2개 동시 동작!)`, 'success');
});

/* ──────────────────────────────────────
   removeEventListener 데모
   removeEventListener를 사용하려면 반드시 "이름 있는 함수(named function)"를
   사용해야 합니다. 익명 함수는 참조를 저장할 수 없어 제거가 불가능합니다.

   ❌ 불가: btn.addEventListener('click', function() {...})
            btn.removeEventListener('click', function() {...}) // 다른 함수!
   ✅ 가능: function myHandler() {...}
            btn.addEventListener('click', myHandler)
            btn.removeEventListener('click', myHandler) // 같은 참조
────────────────────────────────────── */
const limitedBtn = document.getElementById('limited-btn');
let limitedCount = 0;
const MAX_CLICKS = 3;

// 이름 있는 함수로 선언 → removeEventListener에서 같은 참조로 제거 가능
function limitedHandler() {
  limitedCount++;
  appendLog('handler-log', `제한 클릭 ${limitedCount}/${MAX_CLICKS}회`, 'info');

  if (limitedCount >= MAX_CLICKS) {
    // 자기 자신을 리스너에서 제거 → 이후 클릭 무반응
    limitedBtn.removeEventListener('click', limitedHandler);
    limitedBtn.disabled = true; // 버튼도 비활성화
    appendLog('handler-log', `removeEventListener 실행 → 이제 반응 없음`, 'warn');
  }
}

limitedBtn.addEventListener('click', limitedHandler);

/* ──────────────────────────────────────
   { once: true } 옵션 데모
   addEventListener 세 번째 인자에 { once: true }를 전달하면
   딱 1번 실행된 뒤 자동으로 리스너가 제거됩니다.
   removeEventListener를 직접 쓰지 않아도 됩니다.
────────────────────────────────────── */
const onceBtn = document.getElementById('once-btn');

onceBtn.addEventListener('click', function () {
  appendLog('handler-log', `{ once: true } → 딱 1번만 실행됨, 이후 자동 제거`, 'success');
  onceBtn.disabled = true;
}, { once: true }); // ← 이 옵션 하나로 자동 제거


/* ============================================================
   Section 2. 이벤트 객체 (event)

   브라우저가 이벤트 핸들러에 자동으로 넘겨주는 객체입니다.
   - e.type          : 이벤트 종류 문자열 ('click', 'mousemove' 등)
   - e.target        : 실제로 이벤트가 발생한 요소 (클릭된 요소)
   - e.currentTarget : 이벤트 리스너가 등록된 요소
     → target ≠ currentTarget: 버블링으로 부모 핸들러가 실행되는 경우
   - e.clientX/Y     : 브라우저 창(viewport) 기준 마우스 좌표
============================================================ */
const eventArea = document.getElementById('event-area');

// 리스너는 부모(#event-area)에만 1개 등록
// 자식 박스를 클릭하면 버블링으로 이 핸들러가 실행됨
eventArea.addEventListener('click', function (e) {
  // e.target        → 실제 클릭한 자식 박스
  // e.currentTarget → 리스너가 달린 부모(#event-area)
  const targetDesc   = `${e.target.tagName}.${e.target.className.split(' ')[0]}`;
  const currentDesc  = `${e.currentTarget.tagName}#${e.currentTarget.id}`;
  const isSame       = e.target === e.currentTarget;

  // 화면 정보 카드 업데이트
  document.getElementById('ei-type').textContent    = e.type;
  document.getElementById('ei-target').textContent  = targetDesc;
  document.getElementById('ei-current').textContent = currentDesc;
  document.getElementById('ei-coords').textContent  = `${e.clientX} / ${e.clientY}`;

  appendLog('eventobj-log', `e.target = ${targetDesc}`, 'info');
  appendLog('eventobj-log', `e.currentTarget = ${currentDesc}`, 'info');
  appendLog('eventobj-log', `target === currentTarget ? → ${isSame} (자식 클릭 시 false)`, isSame ? 'success' : 'warn');
});


/* ============================================================
   Section 3. 마우스 이벤트

   주요 마우스 이벤트:
   - mousemove    : 요소 위에서 마우스가 움직일 때 (매우 자주 발생)
   - mouseenter   : 요소 안으로 마우스가 들어올 때 (자식에게 전파 안 됨)
   - mouseleave   : 요소 밖으로 마우스가 나갈 때 (자식에게 전파 안 됨)
   - click        : 마우스 왼쪽 버튼 클릭
   - dblclick     : 빠르게 두 번 클릭
   - mouseover    : 요소 또는 자식으로 마우스가 들어올 때 (버블링 O)
   - mouseout     : 요소 또는 자식에서 마우스가 나갈 때 (버블링 O)
============================================================ */
const trackpad    = document.getElementById('trackpad');
const trackpadDot = document.getElementById('trackpad-dot');
const trackpadInfo= document.getElementById('trackpad-info');

// mousemove: 패드 위에서 마우스가 움직일 때마다 실행
// e.offsetX/Y: 이벤트가 발생한 요소(trackpad) 기준 좌표 (요소 내부 좌표)
trackpad.addEventListener('mousemove', function (e) {
  // 도트를 마우스 위치로 이동
  trackpadDot.style.left = e.offsetX + 'px';
  trackpadDot.style.top  = e.offsetY + 'px';

  // 좌표 정보 표시
  trackpadInfo.textContent = `X: ${e.offsetX}  Y: ${e.offsetY}`;
});

// mouseenter: 패드 안으로 마우스가 들어올 때 (1회만 실행)
trackpad.addEventListener('mouseenter', function () {
  trackpad.classList.add('active');   // 도트 표시
  appendLog('mouse-log', `mouseenter → 마우스가 패드 안으로 들어옴`, 'info');
});

// mouseleave: 패드 밖으로 마우스가 나갈 때 (1회만 실행)
trackpad.addEventListener('mouseleave', function () {
  trackpad.classList.remove('active'); // 도트 숨김
  trackpadInfo.textContent = '마우스를 올려보세요';
  appendLog('mouse-log', `mouseleave → 마우스가 패드 밖으로 나감`, 'warn');
});

/* click / dblclick ──────────────────────────────── */
const clickBox  = document.getElementById('click-box');
let clickCount  = 0;
let dblCount    = 0;

// click: 클릭할 때마다 카운터 증가
clickBox.addEventListener('click', function () {
  clickCount++;
  document.getElementById('click-count').textContent = clickCount;
  appendLog('mouse-log', `click 이벤트 발생 (총 ${clickCount}회)`, 'success');
});

// dblclick: 더블클릭 시 실행 (click 이벤트도 2번 함께 발생함)
clickBox.addEventListener('dblclick', function () {
  dblCount++;
  document.getElementById('dbl-count').textContent = dblCount;
  appendLog('mouse-log', `dblclick 이벤트 발생 (총 ${dblCount}회)`, 'success');
});

/* mouseover / mouseout ── hover 카드 ────────────── */
// 각 hover 카드에 mouseover / mouseout 등록
document.querySelectorAll('.hover-card').forEach(function (card) {
  // mouseover: 마우스가 카드 위로 들어올 때
  card.addEventListener('mouseover', function () {
    appendLog('mouse-log', `mouseover → "${card.textContent}" 카드 위에 마우스 올림`, 'info');
  });

  // mouseout: 마우스가 카드 밖으로 나갈 때
  card.addEventListener('mouseout', function () {
    appendLog('mouse-log', `mouseout  → "${card.textContent}" 카드에서 마우스 나감`, 'warn');
  });
});


/* ============================================================
   Section 4. 키보드 이벤트

   - keydown  : 키를 누르는 순간 발생 → 모든 키 감지 (권장)
   - keyup    : 키를 떼는 순간 발생
   - keypress : 문자 키만 감지 → 현재 사용 중단(deprecated) 권장 안 함

   e.key  : 실제 입력된 문자 ('a', 'A', 'Enter', 'ArrowUp', ' ')
   e.code : 물리적 키 위치 코드 ('KeyA', 'Enter', 'Space')
            → 같은 키라도 언어 설정에 따라 e.key 값이 다를 수 있어
              특정 키를 판별할 때는 e.code가 더 안정적

   수식키 (Modifier Keys):
   e.ctrlKey  : Ctrl 키가 눌려 있으면 true
   e.shiftKey : Shift 키가 눌려 있으면 true
   e.altKey   : Alt 키가 눌려 있으면 true
============================================================ */
const keyInput  = document.getElementById('key-input');
const kiKey     = document.getElementById('ki-key');
const kiCode    = document.getElementById('ki-code');
const modCtrl   = document.getElementById('mod-ctrl');
const modShift  = document.getElementById('mod-shift');
const modAlt    = document.getElementById('mod-alt');

// keydown: 키를 누르는 순간 실행
keyInput.addEventListener('keydown', function (e) {
  // 화면에 키 정보 표시
  kiKey.textContent  = e.key;
  kiCode.textContent = e.code;

  // 수식키 표시: 눌리면 active 클래스 추가 (CSS에서 색상 변경)
  modCtrl.classList.toggle('active',  e.ctrlKey);
  modShift.classList.toggle('active', e.shiftKey);
  modAlt.classList.toggle('active',   e.altKey);

  // 수식키 조합 단축키 예시: Ctrl + Enter → 특별 동작
  if (e.ctrlKey && e.key === 'Enter') {
    appendLog('keyboard-log', `Ctrl + Enter 감지 → 단축키 조합!`, 'warn');
    e.preventDefault(); // 기본 동작 방지 (예: 폼 제출 등)
    return;
  }

  appendLog('keyboard-log', `keydown → key: "${e.key}" / code: "${e.code}"`, 'info');
});

// keyup: 키를 떼는 순간 실행 → 글자 수 카운터 업데이트에 적합
keyInput.addEventListener('keyup', function () {
  // 글자 수는 keyup 시 계산 (이때 값이 확정됨)
  const len = keyInput.value.length;
  document.getElementById('char-count').textContent = len;

  // 수식키 해제 반영
  modCtrl.classList.remove('active');
  modShift.classList.remove('active');
  modAlt.classList.remove('active');
});


/* ============================================================
   Section 5. 폼 이벤트

   [원본 코드] — 기존 app.js의 focus/blur + submit 유효성 검사를 보존하고
   change 이벤트와 시각적 피드백을 추가합니다.
============================================================ */
const loginForm    = document.getElementById('login-form');
const usernameInput= document.getElementById('username');  // [원본 코드] 변수명 유지

/* ── focus / blur ─────────────────────────────────────
   [원본 코드]
   focus : 입력창 클릭 시 (커서가 들어갈 때)
   blur  : 입력창 바깥을 클릭 시 (커서가 나갈 때)

   원본에서는 this.style.border로 직접 스타일을 변경했지만,
   classList 방식이 더 유지보수에 유리하므로 CSS 클래스로 관리합니다.
   → style.css의 .focused 클래스에서 스타일 정의
────────────────────────────────────────────────────── */
usernameInput.addEventListener('focus', function () {
  // [원본 코드] this.style.border = '2px solid lightblue' → classList 방식으로 개선
  this.classList.add('focused');
  document.getElementById('username-hint').textContent = '✏️ 입력 중...';
  appendLog('form-log', `focus → 아이디 입력창에 커서가 들어옴`, 'info');
});

usernameInput.addEventListener('blur', function () {
  // [원본 코드] this.style.border = '' → classList 방식으로 개선
  this.classList.remove('focused');
  document.getElementById('username-hint').textContent =
    this.value ? `입력값: "${this.value}"` : '';
  appendLog('form-log', `blur → 아이디 입력창에서 커서가 나감`, 'warn');
});

/* ── submit + preventDefault ───────────────────────
   [원본 코드]
   submit 이벤트: 폼이 제출될 때 발생
   event.preventDefault(): 브라우저의 기본 동작(페이지 새로고침 + 서버 전송)을 막음
   → 막지 않으면 페이지가 새로고침되어 검사 결과를 볼 수 없음
────────────────────────────────────────────────────── */
loginForm.addEventListener('submit', function (event) {
  // [원본 코드] 기본 동작(서버 제출 + 페이지 새로고침)을 막음
  event.preventDefault();

  const password = document.getElementById('password').value; // [원본 코드] 변수명 유지
  const errorMsg = document.getElementById('error-msg');      // [원본 코드] 변수명 유지
  const successMsg = document.getElementById('success-msg');

  // 이전 메시지 초기화
  errorMsg.textContent   = '';
  successMsg.textContent = '';
  document.getElementById('password').classList.remove('error');

  // [원본 코드] 비밀번호 4자 미만이면 에러
  if (password.length < 4) {
    errorMsg.textContent = '비밀번호는 최소 4자 이상이어야 합니다.'; // [원본 코드] 메시지 유지
    document.getElementById('password').classList.add('error');
    appendLog('form-log', `submit → 유효성 실패: 비밀번호 ${password.length}자 (4자 미만)`, 'error');
    return; // 이후 코드 실행 안 함
  }

  // 유효성 통과 시
  successMsg.textContent = `✅ 로그인 성공! (비밀번호 ${password.length}자 확인됨)`;
  appendLog('form-log', `submit → 유효성 통과! 서버로 전송 가능 상태`, 'success');
});

/* ── change ────────────────────────────────────────
   change 이벤트: 값이 변경되고 포커스가 빠져나갈 때 발생
   (input 이벤트는 키 입력마다 발생, change는 확정 후 1회 발생)
   select 드롭다운은 선택하는 즉시 change가 발생합니다.
────────────────────────────────────────────────────── */
document.getElementById('role-select').addEventListener('change', function () {
  const selected = this.value;
  const hint     = document.getElementById('role-hint');

  if (selected === 'admin') {
    hint.textContent = '관리자 권한으로 로그인합니다.';
  } else if (selected === 'user') {
    hint.textContent = '일반 사용자 권한으로 로그인합니다.';
  } else if (selected === 'guest') {
    hint.textContent = '제한된 게스트 권한으로 로그인합니다.';
  } else {
    hint.textContent = '';
  }

  appendLog('form-log', `change → 역할 선택: "${selected || '(선택 안 함)'}"`, 'info');
});
