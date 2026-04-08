# 모바일 최적화 링크 트리 (Linktree)

자신의 SNS 채널이나 포트폴리오를 한눈에 보여주는 실용적인 원페이지입니다.
인스타그램 프로필 링크용으로 바로 사용할 수 있습니다.

---

## 컨셉

인스타그램 프로필 링크용으로 바로 사용할 수 있는 **원페이지 링크 모음**

---

## 주요 기능

| 기능 | 설명 | 적용 기술 |
|------|------|-----------|
| **프로필 섹션** | 원형 프로필 이미지와 중앙 정렬된 닉네임/설명글 | `border-radius: 50%` + Flexbox |
| **버튼 리스트** | 클릭하고 싶게 만드는 입체적인 버튼 디자인 | 그라데이션 + `box-shadow` |
| **바운스 애니메이션** | 페이지 접속 시 버튼들이 순차적으로 아래서 위로 올라오는 효과 | `@keyframes` + `animation-delay` |
| **커스텀 커서** | 데스크탑 접속 시 포인트 커서로 변경 | `cursor: url(...)` |

---

## 기술 스택 및 도전 과제

### 박스 모델 — 모바일 화면에서 답답하지 않은 간격

모바일은 화면이 좁기 때문에 적절한 `padding`과 `margin` 설정이 중요합니다.

```css
.container {
  max-width: 480px;          /* 모바일 기준 최대 너비 */
  margin: 0 auto;            /* 가로 중앙 정렬 */
  padding: 48px 24px;        /* 상하 48px, 좌우 24px 여백 */
}

.link-btn {
  display: block;
  width: 100%;
  padding: 16px 24px;        /* 터치하기 편한 넉넉한 높이 */
  margin-bottom: 12px;       /* 버튼 사이 간격 */
}
```

---

### 원형 프로필 이미지

`border-radius: 50%`로 정사각형 이미지를 원형으로 만듭니다.

```css
.profile-img {
  width: 96px;
  height: 96px;
  border-radius: 50%;              /* 원형 클리핑 */
  object-fit: cover;               /* 이미지 비율 유지하며 채움 */
  border: 3px solid rgba(255, 255, 255, 0.3);  /* 테두리 */
}
```

---

### 버튼 그라데이션 + 입체감

그라데이션과 그림자를 조합해 버튼에 깊이감을 줍니다.

```css
.link-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);  /* 컬러 그림자 */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.link-btn:hover {
  transform: translateY(-2px);                       /* 살짝 위로 */
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);  /* 그림자 강해짐 */
}

.link-btn:active {
  transform: translateY(0);                          /* 클릭 시 원위치 */
}
```

---

### 바운스 인트로 애니메이션

페이지 진입 시 버튼들이 아래서 위로 순차적으로 올라옵니다.
`animation-delay`로 각 버튼의 시작 시간을 조금씩 늦춥니다.

```css
/* 올라오는 애니메이션 정의 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);   /* 아래에서 시작 */
  }
  to {
    opacity: 1;
    transform: translateY(0);      /* 제자리에서 끝 */
  }
}

/* 버튼에 애니메이션 적용 */
.link-btn {
  animation: slideUp 0.5s ease forwards;
  opacity: 0;                      /* 초기 상태: 투명 */
}

/* 각 버튼마다 시작 시간을 조금씩 늦춤 */
.link-btn:nth-child(1) { animation-delay: 0.1s; }
.link-btn:nth-child(2) { animation-delay: 0.2s; }
.link-btn:nth-child(3) { animation-delay: 0.3s; }
.link-btn:nth-child(4) { animation-delay: 0.4s; }
.link-btn:nth-child(5) { animation-delay: 0.5s; }
```

---

### 커스텀 커서 (데스크탑)

포인터가 올라갈 때 기본 화살표 대신 다른 모양으로 바꿉니다.

```css
/* 방법 1: CSS 내장 커서 사용 */
body {
  cursor: default;
}

a, button {
  cursor: pointer;   /* 손가락 모양 */
}

/* 방법 2: 커스텀 이미지 커서 */
body {
  cursor: url('cursor.png'), auto;
  /* url(): 커스텀 이미지, auto: 이미지 로드 실패 시 기본값 */
}
```

---

### 폰트 레이아웃 — 영문과 한글 폰트 조화

Google Fonts에서 영문 폰트와 한글 폰트를 함께 불러옵니다.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">
```

```css
body {
  /* 영문: Inter → 한글 폰트 없으면 Noto Sans KR 사용 */
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
}

.profile-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;   /* 영문 자간 약간 좁힘 */
}

.profile-bio {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  line-height: 1.6;           /* 한글 가독성을 위한 줄간격 */
}
```

---

## 파일 구성

```
linktree/
  index.html   — 프로필 + 링크 버튼 구조 (HTML)
  style.css    — 모바일 레이아웃 + 애니메이션 스타일
  README.md    — 이 문서
```

---

## 레이아웃 구조 (개념도)

```
┌─────────────────────────┐
│                         │
│      ┌───────┐          │
│      │  👤   │          │  ← 원형 프로필 이미지
│      └───────┘          │
│       닉네임             │
│    소개 한 줄 텍스트      │
│                         │
│ ┌─────────────────────┐ │  ← 버튼 1 (slideUp 0.1s)
│ │  📸  Instagram      │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │  ← 버튼 2 (slideUp 0.2s)
│ │  🐙  GitHub         │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │  ← 버튼 3 (slideUp 0.3s)
│ │  💼  Portfolio      │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │  ← 버튼 4 (slideUp 0.4s)
│ │  ✉️  Contact        │ │
│ └─────────────────────┘ │
│                         │
└─────────────────────────┘
      max-width: 480px
```

---

## 학습 포인트 요약

| 개념 | 적용 위치 |
|------|-----------|
| `max-width` + `margin: 0 auto` | 모바일 중심 컨테이너 중앙 배치 |
| `padding` / `margin` 박스 모델 | 터치하기 편한 버튼 크기와 간격 |
| `border-radius: 50%` | 원형 프로필 이미지 |
| `linear-gradient` + `box-shadow` | 입체적인 버튼 디자인 |
| `@keyframes` + `animation-delay` | 순차적 슬라이드업 인트로 |
| `cursor` | 커스텀 마우스 포인터 |
| Google Fonts 다중 폰트 | 영문/한글 폰트 조화 |
