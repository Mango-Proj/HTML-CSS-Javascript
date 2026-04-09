# 요금제 테이블 (Pricing Table)

Flexbox 레이아웃과 `position: absolute` 배지, `::before` 가상 요소 체크리스트를 실습하는 요금제 UI입니다.
JavaScript 없이 CSS만으로 토글 스위치와 FAQ 아코디언도 구현합니다.

## 미리보기

```
┌─────────────────────────────────────────────────┐
│             요금제 선택                          │
│   필요에 맞는 플랜을 선택하세요.                 │
│        [월간 ●───── 연간  20%할인]               │
└─────────────────────────────────────────────────┘

     ┌──────────┐   ✨가장 인기    ┌──────────┐
     │  🌱 무료 │ ┌──────────────┐ │ 🏢 엔터  │
     │          │ │  🚀 프로     │ │          │
     │  ₩0 /월  │ │  ₩29,000/월 │ │ ₩99,000  │
     │          │ │              │ │          │
     │ ✓ 프로젝트3│ ✓ 프로젝트 무제한│ ✓ 모든 기능│
     │ ✓ 1GB    │ │ ✓ 50GB       │ │ ✓ 1TB    │
     │ ✕ 팀협업  │ │ ✕ 우선지원    │ │ ✓ 24/7  │
     │          │ │              │ │          │
     │[시작하기] │ │[지금 시작]   │ │[문의하기]│
     └──────────┘ └──────────────┘ └──────────┘

자주 묻는 질문
▶ 요금제를 언제든지 변경할 수 있나요?  ▾
▶ 환불 정책은 어떻게 되나요?           ▾
```

---

## 적용된 CSS 개념

| 개념 | 사용 위치 | 핵심 역할 |
|------|----------|----------|
| Flexbox | `.plans` | 카드 가로 배치 |
| Position absolute | `.plan-badge` | "인기" 배지 중앙 상단 배치 |
| 가상 요소 `::before` | `.feature-list li` | 체크 아이콘 (HTML 없이 CSS만으로) |
| 가상 요소 `::before` | `.plan-btn--filled` | 버튼 광택 hover 효과 |
| `:hover` | 카드, 버튼 | 시각적 인터랙션 |
| Transform + Transition | 카드, 배지 화살표 | 부드러운 효과 |
| `:checked` + `~` | 토글 스위치 | JS 없는 청구 주기 전환 |
| `details[open]` | FAQ | HTML 아코디언 스타일 |
| `linear-gradient` | 헤더, 추천 카드 | 그라데이션 배경 |

---

## 핵심 코드 설명

### 1. Flexbox — 카드 레이아웃과 가운데 강조

```css
.plans {
  display: flex;
  align-items: stretch;   /* 세 카드 높이를 동일하게 맞춤 */
  justify-content: center;
}

/* 가운데 추천 카드: 음수 margin으로 위아래로 더 크게 */
.plan--featured {
  margin: -20px 0;
  z-index: 1;  /* 다른 카드보다 앞에 표시 */
}
```

```
일반 카드:  │████████████│
추천 카드:  ↑ 20px 더 위
          │████████████████│ ← 위아래로 더 길게 돌출
            ↓ 20px 더 아래
```

---

### 2. position: absolute — "인기" 배지

```css
.plan--featured {
  position: relative;   /* .plan-badge의 기준점 */
}

.plan-badge {
  position: absolute;
  top: -16px;           /* 카드 상단 밖으로 */
  left: 50%;            /* 가로 50% 지점 */
  transform: translateX(-50%);  /* 배지 너비 절반만큼 왼쪽 → 중앙 */
}
```

```
배치 과정:

1. left: 50%      →  카드 가로 중간에서 시작
                        ↓
                  [인기 배지 시작점이 중앙]

2. translateX(-50%) →  배지 너비의 절반만큼 왼쪽으로 이동
                        ↓
                  [인기 배지]  ← 정중앙!
```

---

### 3. `::before` 가상 요소 — 체크리스트 아이콘

```css
/* HTML:  <li>프로젝트 무제한</li>  */

.feature-list li::before {
  content: '✓';        /* HTML 수정 없이 CSS만으로 아이콘 추가! */
  width: 20px;
  height: 20px;
  border-radius: 50%;  /* 원형 배경 */
  background: #dcfce7;
  color: #16a34a;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 비활성화된 항목은 ✕로 덮어씀 */
.feature-disabled::before {
  content: '✕' !important;
  background: #fee2e2 !important;
  color: #ef4444 !important;
}
```

---

### 4. `::before` 버튼 광택 효과

```css
.plan-btn--filled {
  position: relative;
  overflow: hidden;    /* 광택이 버튼 밖으로 나가지 않게 */
}

.plan-btn--filled::before {
  content: '';
  position: absolute;
  left: -100%;         /* 처음엔 왼쪽 밖에 숨어있음 */
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left 0.5s ease;
}

.plan-btn--filled:hover::before {
  left: 150%;          /* hover 시 오른쪽으로 이동 → 광택이 지나가는 효과 */
}
```

```
hover 전:   [      버튼 텍스트      ]  ← 광택이 왼쪽 밖에 숨어있음
hover 중:   [  ///버튼 텍스트///    ]  ← 광택이 오른쪽으로 지나감
hover 후:   [      버튼 텍스트      ]  ← 광택이 오른쪽 밖으로 사라짐
```

---

### 5. CSS 토글 스위치 — `:checked` + `~` 선택자

```html
<input type="checkbox" id="billing-switch" class="billing-input">
<label for="billing-switch">
  <span class="billing-monthly">월간</span>
  <span class="billing-switch-track">
    <span class="billing-switch-thumb"></span>
  </span>
  <span class="billing-yearly">연간</span>
</label>
```

```css
/* checkbox checked 시 → thumb이 오른쪽으로 이동 */
.billing-input:checked ~ label .billing-switch-thumb {
  transform: translateX(22px);
}

/* checked 시 → 연간 텍스트가 굵어짐 */
.billing-input:checked ~ label .billing-yearly {
  opacity: 1;
  font-weight: 700;
}
```

---

### 6. HTML `<details>` 아코디언 — `[open]` 선택자

```html
<!-- 클릭하면 열리고 닫히는 것을 브라우저가 자동 처리 -->
<details class="faq-item">
  <summary>질문</summary>
  <div class="faq-answer">답변...</div>
</details>
```

```css
/* 닫힌 상태 */
.faq-item {
  border-color: var(--color-border);
}

/* 열린 상태: [open] 속성 선택자 */
.faq-item[open] {
  border-color: var(--color-featured);  /* 파란 테두리로 강조 */
}

/* 열렸을 때 화살표 회전 */
.faq-item[open] .faq-arrow {
  transform: rotate(180deg);
}
```

---

## 파일 구조

```
pricing-table/
├── index.html   ← 3개 요금제 카드 + FAQ HTML
├── style.css    ← Flexbox, 배지, ::before 체크리스트, 토글
└── README.md    ← 이 문서
```

## 실행 방법

`index.html` 파일을 브라우저에서 열면 바로 확인할 수 있습니다.

- 상단 토글 스위치로 월간/연간 전환을 테스트해 보세요.
- 카드에 마우스를 올려 hover 효과를 확인해 보세요.
- FAQ 항목을 클릭해 아코디언을 열고 닫아 보세요.
