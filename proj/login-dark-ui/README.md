# 세련된 다크 모드 로그인 UI

단순한 입력창을 넘어, 사용자 경험(UX)과 시각적인 완성도에 집중하는 프로젝트입니다.

---

## 컨셉

눈이 편안한 다크 테마 기반의 **모던한 로그인 인터페이스**

---

## 주요 기능

| 기능 | 설명 | 적용 기술 |
|------|------|-----------|
| **Focus 인터랙션** | 입력창 클릭 시 테두리 색상이 부드럽게 변하는 효과 | `transition` |
| **Button Hover** | 마우스를 올렸을 때 버튼이 살짝 커지거나 밝아지는 효과 | `transform: scale` |
| **Glassmorphism** | 배경에 블러 처리를 한 반투명 박스 디자인 | `backdrop-filter: blur` |
| **소셜 로그인** | 구글, 깃허브 아이콘 버튼 배치 | SVG 아이콘 |

---

## 기술 스택 및 도전 과제

### CSS 변수 활용

배경색, 글자색, 포인트 컬러 등을 `:root`에 변수로 선언하여 일관되게 관리합니다.

```css
:root {
  --bg-page: #0f172a;
  --bg-card: rgba(255, 255, 255, 0.05);
  --color-text: #e2e8f0;
  --color-accent: #6366f1;
  --color-border: #334155;
}
```

---

### Flexbox 정렬

화면 정중앙에 로그인 박스를 배치합니다.

```css
body {
  display: flex;
  justify-content: center;  /* 가로 중앙 */
  align-items: center;      /* 세로 중앙 */
  min-height: 100vh;
}
```

---

### Glassmorphism 효과

반투명 유리처럼 보이는 카드 디자인입니다.
배경 이미지나 그라데이션 위에 올렸을 때 가장 잘 어울립니다.

```css
.login-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);          /* 배경 블러 */
  -webkit-backdrop-filter: blur(12px);  /* Safari 지원 */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
```

---

### Focus 인터랙션

입력창에 포커스가 이동할 때 테두리가 부드럽게 강조됩니다.

```css
input {
  border: 1px solid var(--color-border);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}
```

---

### Button Hover 효과

마우스를 올리면 버튼이 살짝 커지고 밝아집니다.

```css
.btn-login {
  transition: transform 0.15s ease, filter 0.15s ease;
}

.btn-login:hover {
  transform: scale(1.03);      /* 살짝 확대 */
  filter: brightness(1.1);     /* 살짝 밝아짐 */
}

.btn-login:active {
  transform: scale(0.97);      /* 클릭 시 살짝 축소 */
}
```

---

### SVG 소셜 로그인 아이콘

외부 이미지 없이 SVG 코드를 직접 사용합니다.
파일 요청 없이 아이콘을 렌더링할 수 있어 빠릅니다.

```html
<!-- 구글 아이콘 예시 -->
<button class="btn-social">
  <svg viewBox="0 0 24 24" width="20" height="20">
    <!-- SVG path 데이터 -->
  </svg>
  Google로 계속하기
</button>
```

---

## 파일 구성

```
login-dark-ui/
  index.html   — 로그인 폼 구조 (HTML)
  style.css    — 다크 테마 + Glassmorphism 스타일
  README.md    — 이 문서
```

---

## 레이아웃 구조 (개념도)

```
┌────────────────────────────────────────────┐
│              배경 (그라데이션)               │
│                                            │
│        ┌──────────────────────┐            │
│        │   Glassmorphism 카드  │            │
│        │                      │            │
│        │    🔒 로그인          │            │
│        │                      │            │
│        │  [ 이메일 입력창    ] │            │
│        │  [ 비밀번호 입력창  ] │            │
│        │                      │            │
│        │  [   로그인 버튼   ]  │            │
│        │                      │            │
│        │  ── 또는 ──          │            │
│        │  [G] Google  [🐙] GitHub │         │
│        └──────────────────────┘            │
│                                            │
└────────────────────────────────────────────┘
```

---

## 학습 포인트 요약

| 개념 | 적용 위치 |
|------|-----------|
| CSS 변수 (`--var`) | 색상, 간격 등 테마 값 전역 관리 |
| Flexbox | 화면 중앙 배치, 내부 요소 정렬 |
| `backdrop-filter` | Glassmorphism 카드 효과 |
| `transition` | Focus, Hover 시 부드러운 변화 |
| `transform: scale` | 버튼 Hover/Active 피드백 |
| SVG 인라인 아이콘 | 소셜 로그인 버튼 |
