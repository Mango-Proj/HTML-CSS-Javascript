# Survey — 라이프스타일 밸런스 체크 설문 예제

`index.html` 의 기존 `header / main / footer / table` 뼈대를 그대로 유지한 채,
CSS 스타일링과 JavaScript 인터랙션을 추가해 완성한 설문지 예제입니다.

---

## 미리보기 구조

```
┌──────────────────────────────────────────────────────────┐
│  header  │  2026 라이프스타일 밸런스 체크: 나의 '갓생' 지수는?       │
└──────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────┐
│  main    │  [진행률 바 — sticky]                              │
│          │  ┌──────────────────────────────────────────┐  │
│          │  │ thead [sticky]  no│question│SA│A│N│D│SD  │  │
│          │  │ tbody  Q1~5  (📵 디지털 디톡스)              │  │
│          │  │        Q6~10 (🧠 두뇌 건강)                 │  │
│          │  │        Q11~15(💤 휴식·회복)                 │  │
│          │  │        Q16~20(✍️ 아날로그 감성)              │  │
│          │  └──────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────┐
│  footer  │  5점 척도 안내 문구               │  결과 보기 버튼  │
└──────────────────────────────────────────────────────────┘
                          ↓ 제출
┌──────────────────────────────────────────────────────────┐
│  결과 오버레이 모달  │  점수 / 유형 / 섹션별 세부 점수 / 다시하기  │
└──────────────────────────────────────────────────────────┘
```

---

## 파일 구조

```
survey/
├── index.html   # 마크업 + 인라인 CSS + JavaScript (기존 뼈대 유지 + 완성 코드 추가)
└── README.md    # 이 문서
```

---

## 기존 코드와 추가 코드의 구분

### 기존 (수정하지 않은 부분)

| 대상 | 내용 |
|------|------|
| `<header>` 텍스트 | 설문 제목 |
| `<table>` 구조 | `<thead>` 헤더 행, `<tbody>` Q1~Q20 질문 행 |
| 라디오 버튼 | `name="q1"~"q20"`, `value="1"~"5"` 속성 |
| HTML 뼈대 | `<header>`, `<main>`, `<footer>` 요소 자체 |

### 추가 (새롭게 작성한 부분)

모든 새 코드 앞에 `/* [NEW] */` 또는 `<!-- [NEW] -->` 주석으로 표시되어 있으며,
주석에는 해당 코드를 추가한 **의도**가 설명되어 있습니다.

---

## 사용된 HTML 태그 (신규 추가)

| 태그 | 역할 |
|------|------|
| `<style>` | 인라인 CSS 스타일시트 |
| `<form id="surveyForm">` | 라디오 버튼을 묶어 submit 이벤트와 연결 |
| `<colgroup>` / `<col>` | 컬럼 너비 클래스 지정 (`col-no`, `col-question`, `col-option`) |
| `<div class="progress-wrap">` | 진행률 바 컨테이너 (sticky) |
| `<div class="progress-fill">` | JS로 너비를 동적 조절하는 채워지는 막대 |
| `<span id="progressText">` | "N / 20 완료" 텍스트를 JS가 업데이트 |
| `<div id="resultOverlay">` | 결과 모달 오버레이 (fixed 포지셔닝) |
| `<div class="result-card">` | 모달 내 결과 카드 |
| `<div class="result-breakdown">` | 섹션별 세부 점수 목록 |
| `<button type="submit" form="surveyForm">` | `<form>` 외부에서 제출 트리거 |
| `<script>` | 진행률·채점·결과 표시 JavaScript |

---

## 사용된 CSS 기법

### linear-gradient (배경 그라디언트)

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

`linear-gradient`는 CSS로 두 색 이상을 부드럽게 이어주는 그라디언트 배경을 만듭니다.
`135deg`는 좌상→우하 방향입니다. 이미지 파일 없이 선명한 배경을 표현할 수 있습니다.

---

### position: sticky — 진행률 바 + thead 고정

```css
/* 진행률 바: main 스크롤 시 최상단 고정 */
.progress-wrap {
    position: sticky;
    top: 0;
    z-index: 20;
}

/* thead: 진행률 바 바로 아래에 고정 */
thead tr {
    position: sticky;
    top: 53px;   /* .progress-wrap 실제 높이 */
    z-index: 10;
}
```

`position: sticky`는 스크롤 컨테이너 안에서 요소가 지정한 `top` 위치에 도달하면
그 자리에 '붙어서' 고정됩니다. `fixed`와 달리 부모 컨테이너 범위 안에서만 동작합니다.

---

### accent-color — 라디오 버튼 색상 변경

```css
input[type="radio"] {
    accent-color: #7c3aed;
}
```

`accent-color`는 체크박스·라디오 버튼·range 슬라이더 등 네이티브 폼 요소의
강조 색상을 CSS 한 줄로 변경합니다. 브라우저 기본 파란색을 브랜드 색으로 교체할 때 유용합니다.

---

### :has() — 선택된 셀 하이라이트

```css
tbody td:has(input[type="radio"]:checked) {
    background-color: rgba(139, 92, 246, 0.12);
    border-radius: 6px;
}
```

`:has()`는 특정 자식 요소를 **포함하는** 부모를 선택하는 CSS 셀렉터입니다.
여기서는 선택된 라디오 버튼이 있는 `<td>`에 시각적 피드백을 적용했습니다.
**지원 브라우저**: Safari 15.4+, Chrome 105+, Firefox 121+

---

### backdrop-filter: blur() — 모달 배경 블러

```css
.result-overlay {
    position: fixed;
    inset: 0;
    backdrop-filter: blur(5px);
}
```

`backdrop-filter`는 요소 **뒤쪽** 콘텐츠에 필터를 적용합니다.
`blur(5px)`로 배경을 흐리게 만들어 모달에 시선을 집중시킵니다.
`inset: 0`은 `top:0; right:0; bottom:0; left:0`의 축약형입니다.

---

### @keyframes — 모달 등장 애니메이션

```css
.result-card {
    animation: slideUp 0.35s ease;
}
@keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
}
```

`@keyframes`로 CSS 애니메이션의 시작(`from`)과 끝(`to`) 상태를 정의합니다.
`translateY(30px)`에서 `translateY(0)`으로 이동하면서 아래에서 위로 올라오는 효과를 냅니다.

---

### nth-child 범위 선택 — 섹션 색상 인디케이터

```css
/* Q1~Q5: 파랑 */
tbody tr:nth-child(-n+5) td:first-child       { border-left: 4px solid #3b82f6; }
/* Q6~Q10: 초록 */
tbody tr:nth-child(n+6):nth-child(-n+10) td:first-child  { border-left: 4px solid #10b981; }
/* Q11~Q15: 주황 */
tbody tr:nth-child(n+11):nth-child(-n+15) td:first-child { border-left: 4px solid #f59e0b; }
/* Q16~Q20: 핑크 */
tbody tr:nth-child(n+16) td:first-child                  { border-left: 4px solid #ec4899; }
```

`nth-child(n+A):nth-child(-n+B)` 패턴으로 A번째부터 B번째 행을 범위 선택합니다.
클래스 추가 없이 순서만으로 섹션별 색상 인디케이터를 적용할 수 있습니다.

---

### table-layout: fixed — 컬럼 너비 고정

```css
table {
    table-layout: fixed;
    width: 100%;
}
col.col-no       { width: 44px; }
col.col-question { width: auto; }
col.col-option   { width: 80px; }
```

`table-layout: fixed`는 첫 행의 너비를 기준으로 모든 행의 컬럼 너비를 고정합니다.
`<colgroup>`과 함께 사용하면 5점 척도 컬럼이 항상 동일한 너비를 유지합니다.

---

## JavaScript 로직

### 상수 정의

```js
const TOTAL = 20;  // 전체 문항 수

// 4개 섹션 — 이름, 이모지, 포함 문항 번호
const SECTIONS = [
    { name: '디지털 디톡스', emoji: '📵', questions: [1,2,3,4,5] },
    { name: '두뇌 건강',     emoji: '🧠', questions: [6,7,8,9,10] },
    { name: '휴식과 회복',   emoji: '💤', questions: [11,12,13,14,15] },
    { name: '아날로그 감성', emoji: '✍️', questions: [16,17,18,19,20] },
];

// 5단계 등급 — minScore(100점 만점 기준)로 판정
const GRADES = [
    { minScore: 87, emoji: '🌟', type: '갓생 실천가',    desc: '...' },
    { minScore: 72, emoji: '⚖️', type: '밸런스 추구형',  desc: '...' },
    { minScore: 52, emoji: '🔍', type: '균형 탐색 중',   desc: '...' },
    { minScore: 35, emoji: '📱', type: '디지털 의존 경향', desc: '...' },
    { minScore: 0,  emoji: '💻', type: '완전 디지털 라이프', desc: '...' },
];
```

`GRADES` 배열은 `minScore` 내림차순으로 정렬되어 있으며,
`Array.find()`로 처음 일치하는 항목을 선택해 등급을 판정합니다.

---

### updateProgress()

```js
function updateProgress() {
    let answered = 0;
    for (let i = 1; i <= TOTAL; i++) {
        if (form.querySelector(`input[name="q${i}"]:checked`)) answered++;
    }
    const pct = (answered / TOTAL) * 100;
    progressFill.style.width = pct + '%';
    progressText.textContent = `${answered} / ${TOTAL} 완료`;
}
```

라디오 버튼 `change` 이벤트마다 호출됩니다.
1~20번 문항에서 선택된 항목 수를 세어 진행률 바의 너비와 텍스트를 업데이트합니다.

---

### 폼 제출 & 채점

```js
form.addEventListener('submit', (e) => {
    e.preventDefault();   // 기본 새로고침 방지

    // 미응답 문항 검출
    const unanswered = [...Array(TOTAL)].map((_, i) => i + 1)
        .filter(i => !form.querySelector(`input[name="q${i}"]:checked`));
    if (unanswered.length > 0) { alert(...); return; }

    // 총점 및 섹션별 점수 계산
    let totalScore = 0;
    const sectionScores = SECTIONS.map(sec => {
        const raw = sec.questions.reduce((sum, q) => {
            return sum + Number(form.querySelector(`input[name="q${q}"]:checked`).value);
        }, 0);
        totalScore += raw;
        return { ...sec, raw, max: sec.questions.length * 5 };
    });

    // 100점 환산 후 결과 표시
    const score100 = Math.round((totalScore / (TOTAL * 5)) * 100);
    showResult(score100, sectionScores);
});
```

`e.preventDefault()`로 페이지 이동을 막고, 미응답 문항이 있으면 경고 후 중단합니다.
총점은 `(원점수 / 최고점) × 100`으로 100점 만점으로 환산합니다.

---

### form 외부 제출 버튼 연결

```html
<button type="submit" form="surveyForm" class="submit-btn">결과 보기 ✨</button>
```

HTML5 `form` 속성으로 `<form>` 외부에 있는 버튼이 해당 폼의 `submit`을 트리거합니다.
footer에 버튼을 두면서도 별도의 JavaScript 없이 폼과 연결할 수 있습니다.

---

### 다시하기

```js
document.getElementById('resetBtn').addEventListener('click', () => {
    resultOverlay.classList.add('hidden');
    form.reset();            // 모든 라디오 버튼 초기화
    updateProgress();        // 진행률 바를 0%로 리셋
});
```

`form.reset()`은 폼 내부 모든 입력 요소를 HTML의 기본값으로 되돌립니다.
라디오 버튼에는 기본 선택 값이 없으므로 전부 해제됩니다.

---

## 레이아웃 흐름 요약

```
body (linear-gradient 배경)
 ├── header (flex, 중앙 정렬)
 ├── main (white card, overflow-y: auto)
 │    ├── .progress-wrap (sticky top:0)
 │    │    ├── .progress-label   ← "N / 20 완료" 텍스트
 │    │    └── .progress-track → .progress-fill (JS width)
 │    └── form#surveyForm
 │         └── table (table-layout: fixed)
 │              ├── colgroup   ← 컬럼 너비 제어
 │              ├── thead (sticky top:53px)
 │              └── tbody (Q1~Q20, 섹션별 색상 인디케이터)
 ├── footer (flex, space-between)
 │    ├── .footer-note    ← 5점 척도 안내
 │    └── button[form="surveyForm"]  ← 외부 제출 버튼
 └── #resultOverlay (fixed, backdrop-filter: blur, hidden 기본)
      └── .result-card (slideUp 애니메이션)
           ├── .result-emoji / .result-score / .result-type / .result-desc
           ├── .result-breakdown (섹션별 세부 점수)
           └── button#resetBtn   ← 다시하기
```

---

## 학습 포인트

1. **`position: sticky`의 중첩 사용** — 진행률 바(`top:0`)와 thead(`top:53px`)를 레이어별로 고정해 스크롤 시 맥락을 유지합니다.
2. **`accent-color`** — 네이티브 폼 요소 색상을 CSS 한 줄로 커스터마이징할 수 있습니다.
3. **`:has()` 셀렉터** — 자식 상태에 따라 부모 스타일을 변경하는 새로운 CSS 기능으로, JavaScript 없이도 선택 피드백이 가능합니다.
4. **`backdrop-filter`** — 배경 흐림 효과로 모달의 시각적 집중도를 높입니다.
5. **`form` 속성 (HTML5)** — 버튼을 `<form>` 외부에 위치시켜도 `form="id"` 속성으로 연결할 수 있습니다.
6. **`form.reset()`** — 모든 입력 요소를 초기화하는 기본 API로, 별도의 반복 코드가 필요 없습니다.
7. **데이터와 로직 분리** — `SECTIONS`, `GRADES` 상수 배열로 데이터를 정의하고 렌더링 로직과 분리해 유지보수성을 높입니다.
