'use strict';
/**
 * app.js — JS 퀴즈 메인 스크립트
 * =================================
 * ch01 · ch02 · ch03 학습 내용을 하나의 앱에서 사용합니다.
 *
 * [ch01] DocumentFragment    → renderChoices(): 선택지 4개를 한 번에 DOM에 삽입
 * [ch01] 이벤트 위임          → #choices에 클릭 리스너 1개로 4개 버튼 처리
 * [ch02] setInterval         → startTimer(): 1초마다 타이머 감소
 * [ch02] clearInterval       → clearTimer(): 답 선택·시간 초과 시 타이머 정지
 * [ch02] try / catch         → loadHighScore(): localStorage 읽기 오류 방어
 * [ch03] localStorage        → 최고 기록·테마 영구 저장
 * [ch03] 불변성 (spread)     → 상태 업데이트 시 새 객체 생성
 */


// ─────────────────────────────────────────────────────
// 퀴즈 문제 데이터
// ─────────────────────────────────────────────────────

/**
 * 각 문제는 { question, choices, answer, explanation } 구조입니다.
 * answer는 정답 선택지의 인덱스(0~3)입니다.
 */
const QUESTIONS = [
  {
    question: '배열의 마지막 요소를 제거하고 반환하는 메서드는?',
    choices: ['shift()', 'pop()', 'splice()', 'slice()'],
    answer: 1,
    explanation: 'pop()은 마지막 요소를 제거하고 그 값을 반환합니다. shift()는 첫 번째 요소를 제거합니다.',
  },
  {
    question: 'typeof [] 의 결과는?',
    choices: ["'array'", "'object'", "'undefined'", "'null'"],
    answer: 1,
    explanation: '배열도 객체이므로 typeof []는 "object"를 반환합니다. 배열 여부 확인에는 Array.isArray()를 사용합니다.',
  },
  {
    question: '다음 중 Falsy 값이 아닌 것은?',
    choices: ['0', "''", '[]', 'null'],
    answer: 2,
    explanation: '빈 배열 []은 Truthy입니다. Falsy는 false, 0, "", null, undefined, NaN 여섯 가지입니다.',
  },
  {
    question: '[1, 2, 3].map(x => x * 2) 의 결과는?',
    choices: ['[2, 3, 4]', '6', '[2, 4, 6]', 'undefined'],
    answer: 2,
    explanation: 'map()은 각 요소에 콜백을 적용한 새 배열을 반환합니다. 원본 배열은 변경되지 않습니다.',
  },
  {
    question: 'let, const, var 중 블록 스코프({})를 갖지 않는 것은?',
    choices: ['let', 'const', 'var', '셋 다 블록 스코프'],
    answer: 2,
    explanation: 'var는 함수 스코프만 가지며, if/for 블록을 무시합니다. let과 const는 블록 스코프를 가집니다.',
  },
  {
    question: 'localStorage에 객체를 저장할 때 먼저 호출해야 하는 메서드는?',
    choices: ['Object.toString()', 'JSON.parse()', 'JSON.stringify()', 'String()'],
    answer: 2,
    explanation: 'localStorage는 문자열만 저장합니다. JSON.stringify()로 객체를 문자열로 변환 후 저장하고, 읽을 때는 JSON.parse()로 복원합니다.',
  },
  {
    question: 'Promise가 성공적으로 완료된 상태를 나타내는 용어는?',
    choices: ['Resolved', 'Fulfilled', 'Completed', 'Done'],
    answer: 1,
    explanation: 'Promise의 3가지 상태는 Pending(대기), Fulfilled(이행), Rejected(거부)입니다.',
  },
  {
    question: '=== 연산자의 특징으로 올바른 것은?',
    choices: [
      '타입을 변환한 후 값을 비교한다',
      '값과 타입을 모두 비교한다',
      '객체의 내용을 깊이 비교한다',
      '== 와 완전히 동일하다',
    ],
    answer: 1,
    explanation: '===은 타입 변환 없이 값과 타입을 모두 비교합니다. 1 == "1"은 true이지만 1 === "1"은 false입니다.',
  },
  {
    question: '이벤트 위임(Event Delegation)이란?',
    choices: [
      '이벤트를 취소하는 패턴',
      '자식이 아닌 부모 요소에 리스너를 등록해 자식 이벤트를 처리하는 패턴',
      '비동기 이벤트를 처리하는 기법',
      '이벤트 실행 순서를 지정하는 방법',
    ],
    answer: 1,
    explanation: '이벤트 버블링을 이용해 부모 하나에 리스너를 달면, 동적으로 추가된 자식 요소의 이벤트도 처리할 수 있습니다.',
  },
  {
    question: 'async 함수가 반환하는 값은?',
    choices: ['일반 값', 'Promise', 'Generator', 'Observable'],
    answer: 1,
    explanation: 'async 함수는 항상 Promise를 반환합니다. return 값은 자동으로 Promise.resolve()로 감싸집니다.',
  },
];

const TOTAL       = QUESTIONS.length; // 10
const TIME_LIMIT  = 15;               // 문제당 제한 시간 (초)


// ─────────────────────────────────────────────────────
// 상태 (State)
// ─────────────────────────────────────────────────────

/**
 * 퀴즈 진행 상태를 하나의 객체로 관리합니다.
 * 상태를 변경할 때는 항상 새 객체를 만들어 교체합니다 (ch03 불변성).
 *
 * @property {number}  current   - 현재 문제 인덱스 (0~9)
 * @property {number}  score     - 맞은 문제 수
 * @property {Array}   answers   - 각 문제의 선택 결과: { correct, selected, answer }
 * @property {number|null} timerId - setInterval 반환값 (clearInterval에 사용)
 * @property {number}  timeLeft  - 현재 문제 남은 시간 (초)
 */
let state = {
  current:  0,
  score:    0,
  answers:  [],
  timerId:  null,
  timeLeft: TIME_LIMIT,
};


// ─────────────────────────────────────────────────────
// DOM 요소 참조
// ─────────────────────────────────────────────────────

const screens        = {
  intro:  document.getElementById('screen-intro'),
  quiz:   document.getElementById('screen-quiz'),
  result: document.getElementById('screen-result'),
};
const btnStart       = document.getElementById('btn-start');
const btnRetry       = document.getElementById('btn-retry');
const btnTheme       = document.getElementById('btn-theme');
const questionNum    = document.getElementById('question-num');
const timerBar       = document.getElementById('timer-bar');
const timerText      = document.getElementById('timer-text');
const questionText   = document.getElementById('question-text');
const choicesEl      = document.getElementById('choices');
const resultEmoji    = document.getElementById('result-emoji');
const resultTitle    = document.getElementById('result-title');
const resultScore    = document.getElementById('result-score');
const newRecord      = document.getElementById('new-record');
const resultList     = document.getElementById('result-list');
const displayHighScore = document.getElementById('display-high-score');


// ─────────────────────────────────────────────────────
// 화면 전환
// ─────────────────────────────────────────────────────

/**
 * 지정한 화면만 .active 클래스를 갖도록 전환합니다.
 * CSS에서 .screen은 display:none, .screen.active는 display:flex입니다.
 *
 * @param {'intro'|'quiz'|'result'} name - 표시할 화면 이름
 */
function showScreen(name) {
  Object.values(screens).forEach(el => el.classList.remove('active'));
  screens[name].classList.add('active');
}


// ─────────────────────────────────────────────────────
// 타이머 — ch02 setInterval / clearInterval
// ─────────────────────────────────────────────────────

/**
 * 타이머를 시작합니다.
 * setInterval은 1초마다 콜백을 실행하고, 타이머 ID를 반환합니다.
 * 이 ID를 state.timerId에 저장해 두었다가 clearInterval로 타이머를 멈춥니다.
 */
function startTimer() {
  // 남은 시간 초기화
  // ch03 불변성: state 객체를 직접 수정하지 않고 새 객체로 교체합니다.
  state = { ...state, timeLeft: TIME_LIMIT };
  updateTimerUI(TIME_LIMIT);

  const id = setInterval(() => {
    const next = state.timeLeft - 1;

    if (next <= 0) {
      // 시간 초과 → 타이머 멈추고 오답 처리
      clearTimer();
      handleAnswer(null); // null = 선택하지 않음 (시간 초과)
      return;
    }

    // ch03 불변성: timeLeft만 바꾼 새 state 객체로 교체
    state = { ...state, timeLeft: next };
    updateTimerUI(next);
  }, 1000);

  // setInterval ID 저장
  state = { ...state, timerId: id };
}

/**
 * 진행 중인 타이머를 정지합니다.
 * state.timerId가 null이면 타이머가 없는 것이므로 아무것도 하지 않습니다.
 */
function clearTimer() {
  if (state.timerId !== null) {
    clearInterval(state.timerId);
    state = { ...state, timerId: null };
  }
}

/**
 * 타이머 바 너비와 숫자를 업데이트합니다.
 * 남은 시간 비율로 너비를 계산합니다.
 *
 * @param {number} left - 남은 시간(초)
 */
function updateTimerUI(left) {
  const pct = (left / TIME_LIMIT) * 100;
  timerBar.style.width = `${pct}%`;

  // 남은 시간이 5초 이하이면 빨간색으로 경고
  timerBar.classList.toggle('danger', left <= 5);

  timerText.textContent = left;
  timerText.classList.toggle('danger', left <= 5);
}


// ─────────────────────────────────────────────────────
// 퀴즈 시작
// ─────────────────────────────────────────────────────

/**
 * 퀴즈를 처음부터 시작합니다.
 * 상태를 초기화하고 첫 번째 문제를 로드합니다.
 */
function startQuiz() {
  // ch03 불변성: 기존 state를 수정하지 않고 새 객체로 완전히 교체
  state = {
    current:  0,
    score:    0,
    answers:  [],
    timerId:  null,
    timeLeft: TIME_LIMIT,
  };

  showScreen('quiz');
  loadQuestion();
}


// ─────────────────────────────────────────────────────
// 문제 로드 — ch01 DocumentFragment
// ─────────────────────────────────────────────────────

/**
 * 현재 인덱스의 문제를 화면에 렌더링합니다.
 *
 * DocumentFragment를 사용하는 이유 (ch01):
 *   - 선택지 4개를 메모리 안의 임시 컨테이너에 조립합니다.
 *   - appendChild(fragment)로 한 번에 DOM에 삽입해 Reflow를 1회로 줄입니다.
 */
function loadQuestion() {
  const q = QUESTIONS[state.current];

  // 문제 번호 표시
  questionNum.textContent = `${state.current + 1} / ${TOTAL}`;

  // 문제 텍스트 — XSS 방지를 위해 innerHTML 대신 textContent 사용
  questionText.textContent = q.question;

  // Fragment: 실제 DOM에 붙어 있지 않은 임시 컨테이너
  const fragment = document.createDocumentFragment();

  q.choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.className        = 'choice-btn';
    btn.textContent      = choice;       // XSS 방지: textContent 사용
    btn.dataset.index    = idx;          // 이벤트 위임에서 인덱스를 꺼낼 때 사용

    fragment.appendChild(btn);
  });

  // 기존 선택지 초기화 후 Fragment를 한 번에 삽입 (Reflow 1회)
  choicesEl.innerHTML = '';
  choicesEl.appendChild(fragment);

  // 이전 문제에서 비활성화된 선택지를 다시 활성화
  choicesEl.classList.remove('answered');

  // 타이머 시작
  startTimer();
}


// ─────────────────────────────────────────────────────
// 이벤트 위임 — ch01
// ─────────────────────────────────────────────────────

/**
 * #choices(부모)에 클릭 리스너를 1개만 등록합니다.
 * 선택지 버튼 4개마다 리스너를 달지 않아도 됩니다.
 *
 * 이벤트 버블링 덕분에 자식 버튼에서 발생한 클릭이
 * 부모인 #choices까지 전파됩니다.
 */
choicesEl.addEventListener('click', e => {
  const btn = e.target.closest('.choice-btn');
  if (!btn) return; // 버튼이 아닌 곳 클릭 시 무시

  const selected = Number(btn.dataset.index);
  handleAnswer(selected);
});


// ─────────────────────────────────────────────────────
// 정답 처리
// ─────────────────────────────────────────────────────

/**
 * 선택지를 선택하거나 시간이 초과되었을 때 호출됩니다.
 *
 * @param {number|null} selected - 선택한 선택지 인덱스, null이면 시간 초과
 */
function handleAnswer(selected) {
  // 타이머 정지
  clearTimer();

  // 중복 클릭 방지: 선택지 컨테이너에 .answered 클래스를 추가하면
  // CSS로 pointer-events:none이 적용되어 버튼 클릭이 막힙니다.
  choicesEl.classList.add('answered');

  const q       = QUESTIONS[state.current];
  const correct = selected === q.answer;

  // 선택지 버튼에 정답/오답 표시
  const btns = choicesEl.querySelectorAll('.choice-btn');
  btns.forEach((btn, idx) => {
    if (idx === q.answer) {
      btn.classList.add('correct'); // 정답 버튼 초록색
    } else if (idx === selected) {
      btn.classList.add('wrong');   // 선택한 오답 버튼 빨간색
    }
  });

  // ch03 불변성: answers 배열을 직접 push하지 않고 spread로 새 배열 생성
  const newAnswers = [
    ...state.answers,
    { correct, selected, answer: q.answer },
  ];

  state = {
    ...state,
    score:   correct ? state.score + 1 : state.score,
    answers: newAnswers,
  };

  // 1초 후 다음 문제로 이동 (정답 표시를 잠깐 보여 줍니다)
  setTimeout(() => {
    if (state.current + 1 < TOTAL) {
      // ch03 불변성: current만 바꾼 새 state 객체 생성
      state = { ...state, current: state.current + 1 };
      loadQuestion();
    } else {
      endQuiz();
    }
  }, 1000);
}


// ─────────────────────────────────────────────────────
// 퀴즈 종료 · 결과 표시
// ─────────────────────────────────────────────────────

/**
 * 모든 문제를 마친 후 결과 화면을 렌더링합니다.
 */
function endQuiz() {
  const { score, answers } = state;

  // ── 이모지 · 제목 결정 ──
  let emoji, title;
  if      (score === TOTAL)      { emoji = '🏆'; title = '완벽해요!'; }
  else if (score >= TOTAL * 0.8) { emoji = '🎉'; title = '훌륭해요!'; }
  else if (score >= TOTAL * 0.6) { emoji = '👍'; title = '잘했어요!'; }
  else if (score >= TOTAL * 0.4) { emoji = '🤔'; title = '조금 더 공부해봐요!'; }
  else                           { emoji = '📚'; title = '다시 도전해봐요!'; }

  resultEmoji.textContent = emoji;
  resultTitle.textContent = title;
  resultScore.textContent = `${score} / ${TOTAL} 정답`;

  // ── 최고 기록 갱신 확인 — ch03 localStorage ──
  const prev    = loadHighScore();
  const isNew   = score > prev;
  if (isNew) saveHighScore(score);

  newRecord.classList.toggle('hidden', !isNew);
  displayHighScore.textContent = `${isNew ? score : prev} / ${TOTAL}`;

  // ── 문제별 결과 목록 렌더링 — ch01 DocumentFragment ──
  const fragment = document.createDocumentFragment();

  answers.forEach((ans, idx) => {
    const q    = QUESTIONS[idx];
    const item = document.createElement('div');
    item.className = `result-item ${ans.correct ? 'result-correct' : 'result-wrong'}`;

    const icon = document.createElement('span');
    icon.className   = 'result-icon';
    icon.textContent = ans.correct ? '✅' : '❌';

    const body = document.createElement('div');
    body.className = 'result-body';

    const qText = document.createElement('p');
    qText.className   = 'result-q';
    qText.textContent = `Q${idx + 1}. ${q.question}`;

    const info = document.createElement('p');
    info.className = 'result-info';

    if (ans.correct) {
      info.textContent = `정답: ${q.choices[q.answer]}`;
    } else if (ans.selected === null) {
      info.textContent = `시간 초과 — 정답: ${q.choices[q.answer]}`;
    } else {
      info.textContent = `선택: ${q.choices[ans.selected]} → 정답: ${q.choices[q.answer]}`;
    }

    const exp = document.createElement('p');
    exp.className   = 'result-exp';
    exp.textContent = q.explanation;

    body.append(qText, info, exp);
    item.append(icon, body);
    fragment.appendChild(item);
  });

  resultList.innerHTML = '';
  resultList.appendChild(fragment);

  showScreen('result');
}


// ─────────────────────────────────────────────────────
// 최고 기록 — ch02 try/catch + ch03 localStorage
// ─────────────────────────────────────────────────────

/**
 * localStorage에서 최고 기록을 읽어옵니다.
 *
 * try/catch를 사용하는 이유 (ch02):
 *   - 시크릿 모드나 저장소 정책에 따라 localStorage 접근이 실패할 수 있습니다.
 *   - 오류가 나도 앱이 중단되지 않도록 안전하게 처리합니다.
 *
 * @returns {number} 저장된 최고 기록, 없으면 0
 */
function loadHighScore() {
  try {
    return Number(localStorage.getItem('quiz_high_score') || 0);
  } catch (e) {
    console.warn('최고 기록 읽기 실패:', e.message);
    return 0;
  }
}

/**
 * 최고 기록을 localStorage에 저장합니다.
 *
 * @param {number} score - 저장할 점수
 */
function saveHighScore(score) {
  try {
    localStorage.setItem('quiz_high_score', score);
  } catch (e) {
    console.warn('최고 기록 저장 실패:', e.message);
  }
}


// ─────────────────────────────────────────────────────
// 다크 / 라이트 모드 — ch03 localStorage 테마 저장
// ─────────────────────────────────────────────────────

/**
 * 테마를 적용하고 localStorage에 저장합니다.
 * body.className을 바꾸면 style.css의 CSS 변수가 자동으로 교체됩니다.
 *
 * @param {'light'|'dark'} theme
 */
function applyTheme(theme) {
  document.body.className      = theme;
  btnTheme.textContent         = theme === 'dark' ? '☀️ 라이트' : '🌙 다크';
  localStorage.setItem('quiz_theme', theme);
}

btnTheme.addEventListener('click', () => {
  const next = document.body.className === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});


// ─────────────────────────────────────────────────────
// 버튼 이벤트
// ─────────────────────────────────────────────────────

btnStart.addEventListener('click', startQuiz);

btnRetry.addEventListener('click', () => {
  showScreen('intro');
});


// ─────────────────────────────────────────────────────
// 초기화 — 페이지 로드 시 실행
// ─────────────────────────────────────────────────────

// 저장된 테마 복원 (없으면 'light')
applyTheme(localStorage.getItem('quiz_theme') || 'light');

// 저장된 최고 기록 표시
const highScore = loadHighScore();
displayHighScore.textContent = highScore > 0 ? `${highScore} / ${TOTAL}` : '—';
