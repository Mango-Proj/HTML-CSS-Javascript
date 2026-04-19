# quiz-app · JavaScript 퀴즈 미니 프로젝트

JavaScript 핵심 개념을 복습하는 **10문제 객관식 퀴즈 앱**입니다.  
1주일 학습 후 배운 개념을 하나의 앱으로 통합하는 실습 프로젝트입니다.

---

## 실행 방법

ES 모듈을 사용하지 않으므로 `file://`로 **바로 열어도 동작합니다.**

```
index.html 파일을 더블클릭하거나 Live Server로 열기
```

---

## 기능 소개

| 기능 | 설명 |
|------|------|
| 3화면 전환 | 시작 → 퀴즈 → 결과 화면을 상태로 관리 |
| 타이머 | 문제당 15초 카운트다운 (5초 이하 빨간색 경고) |
| 자동 처리 | 시간 초과 시 자동으로 오답 처리 후 다음 문제 |
| 정답 표시 | 답 선택 후 정답/오답 버튼 색상으로 즉시 피드백 |
| 결과 화면 | 문제별 정답·해설, 점수별 다른 이모지 |
| 최고 기록 | localStorage에 저장, 앱을 닫아도 유지 |
| 다크 모드 | 테마 설정도 localStorage에 저장 |

---

## 화면 흐름

```
[시작 화면]                [퀴즈 화면]               [결과 화면]
  최고 기록 표시    →   문제 + 선택지 + 타이머  →  점수 + 문제별 해설
  퀴즈 시작 버튼        답 선택 or 시간 초과          다시 도전 버튼
                        1초 후 다음 문제                   ↓
                                                    [시작 화면으로]
```

---

## 적용 개념

### [ch01] DocumentFragment — 선택지 렌더링

```js
const fragment = document.createDocumentFragment();

q.choices.forEach((choice, idx) => {
  const btn = document.createElement('button');
  btn.textContent   = choice;
  btn.dataset.index = idx;
  fragment.appendChild(btn);
});

choicesEl.innerHTML = '';
choicesEl.appendChild(fragment); // 선택지 4개를 한 번에 DOM에 삽입 (Reflow 1회)
```

> 선택지 4개를 하나씩 `appendChild`하면 Reflow가 4번 발생합니다.  
> Fragment에 모두 조립한 뒤 한 번에 삽입하면 Reflow가 1번으로 줄어듭니다.

---

### [ch01] 이벤트 위임 — 선택지 클릭 처리

```js
// 선택지 버튼 4개마다 리스너를 달지 않고, 부모 하나에만 등록합니다.
choicesEl.addEventListener('click', e => {
  const btn = e.target.closest('.choice-btn');
  if (!btn) return;

  const selected = Number(btn.dataset.index);
  handleAnswer(selected);
});
```

> 버튼 4개에 각각 리스너를 달아도 되지만,  
> 부모에 하나만 달면 동적으로 추가되는 버튼도 자동 처리됩니다.

---

### [ch02] setInterval / clearInterval — 타이머

```js
function startTimer() {
  state = { ...state, timeLeft: TIME_LIMIT };

  const id = setInterval(() => {
    const next = state.timeLeft - 1;
    if (next <= 0) {
      clearTimer();
      handleAnswer(null); // 시간 초과 → 오답 처리
      return;
    }
    state = { ...state, timeLeft: next };
    updateTimerUI(next);
  }, 1000); // 1초마다 실행

  state = { ...state, timerId: id }; // ID 저장
}

function clearTimer() {
  if (state.timerId !== null) {
    clearInterval(state.timerId); // 타이머 정지
    state = { ...state, timerId: null };
  }
}
```

> `setInterval`이 반환하는 ID를 반드시 저장해야 `clearInterval`로 멈출 수 있습니다.  
> 타이머를 멈추지 않으면 화면 전환 후에도 계속 실행됩니다.

---

### [ch02] try / catch — localStorage 안전하게 읽기

```js
function loadHighScore() {
  try {
    return Number(localStorage.getItem('quiz_high_score') || 0);
  } catch (e) {
    // 시크릿 모드 등에서 localStorage 접근이 차단될 수 있습니다
    console.warn('최고 기록 읽기 실패:', e.message);
    return 0;
  }
}
```

> localStorage는 대부분 정상 동작하지만,  
> 시크릿 모드나 특정 보안 정책에서 예외가 발생할 수 있습니다.  
> `try/catch`로 감싸두면 오류가 나도 앱이 중단되지 않습니다.

---

### [ch03] 불변성 — 상태 업데이트

```js
// ❌ 직접 수정 (가변)
state.score = state.score + 1;
state.answers.push({ correct, selected, answer });

// ✅ 새 객체·배열 생성 (불변)
state = {
  ...state,
  score:   correct ? state.score + 1 : state.score,
  answers: [...state.answers, { correct, selected, answer }],
};
```

> 상태를 직접 수정하면 이전 값을 잃어 버그 추적이 어렵습니다.  
> spread(`...`)로 새 객체를 만들면 이전 상태가 보존됩니다.

---

### [ch03] localStorage — 최고 기록 · 테마 저장

```js
// 저장
localStorage.setItem('quiz_high_score', score);
localStorage.setItem('quiz_theme', 'dark');

// 읽기 (없으면 기본값)
const highScore = Number(localStorage.getItem('quiz_high_score') || 0);
const theme     = localStorage.getItem('quiz_theme') || 'light';
```

> 브라우저를 닫았다 켜도 최고 기록과 테마 설정이 유지됩니다.

---

## 파일 구성

| 파일 | 역할 |
|------|------|
| `index.html` | 3개 화면 구조 (시작·퀴즈·결과), `defer` 스크립트 로드 |
| `style.css` | CSS 변수 기반 라이트/다크 모드, 타이머 바 애니메이션 |
| `app.js` | 퀴즈 문제 데이터, 상태 관리, 타이머, 결과 렌더링 |
| `README.md` | 이 문서 |

---

## 핵심 설계 패턴

### 3화면 상태 전환

```
#screen-intro   .screen          → display: none
#screen-quiz    .screen          → display: none
#screen-result  .screen.active   → display: flex  ← 이것만 보임
```

```js
function showScreen(name) {
  // 모든 화면에서 .active 제거
  Object.values(screens).forEach(el => el.classList.remove('active'));
  // 원하는 화면에만 .active 추가
  screens[name].classList.add('active');
}
```

### 상태 객체 한 곳에서 관리

```js
let state = {
  current:  0,       // 현재 문제 인덱스
  score:    0,       // 맞은 개수
  answers:  [],      // 각 문제 결과 기록
  timerId:  null,    // setInterval ID
  timeLeft: 15,      // 남은 시간
};
```

> 퀴즈에 관련된 모든 상태를 하나의 객체로 모아 관리합니다.  
> 상태가 분산되면 동기화 오류가 생기기 쉽습니다.

---

## 학습 포인트 요약

| 개념 | 이 프로젝트에서 어디에? |
|------|------------------------|
| DocumentFragment | `loadQuestion()`, `endQuiz()` — 요소 묶음 삽입 |
| 이벤트 위임 | `choicesEl.addEventListener` — 버튼 4개를 부모 하나로 처리 |
| setInterval | `startTimer()` — 1초마다 타이머 감소 |
| clearInterval | `clearTimer()` — 답 선택·시간 초과 시 타이머 정지 |
| try/catch | `loadHighScore()`, `saveHighScore()` — 스토리지 오류 방어 |
| 불변성(spread) | `handleAnswer()`, `startTimer()` — 상태 새 객체로 교체 |
| localStorage | 최고 기록(`quiz_high_score`), 테마(`quiz_theme`) 영구 저장 |
| textContent | XSS 방지 — innerHTML 대신 안전한 방법으로 텍스트 삽입 |
