# 프로필 카드 (Profile Card)

CSS의 핵심 개념들을 한 페이지에서 실습할 수 있는 프로필 카드 UI입니다.

## 미리보기

```
┌─────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ← 그라데이션 상단 영역
│         ╭─────╮             │
│         │ KD  │ ← 아바타 (경계선에 걸침)
│         ╰─────╯             │
│          김개발              │
│      FRONTEND DEVELOPER     │
│          ─────              │
│   CSS와 JavaScript를 좋아하는│
│   프론트엔드 개발자입니다.   │
│  128   │  4.2k  │  312      │
│ 프로젝트 │ 팔로워 │ 팔로잉   │
│  HTML  CSS  JavaScript      │
│    React    Figma           │
│  [팔로우]    [메시지]        │
└─────────────────────────────┘
```

---

## 적용된 CSS 개념

| 개념 | 사용 위치 | 핵심 역할 |
|------|----------|----------|
| CSS 변수 (`:root`) | 색상·크기 선언 | 테마 색상 한 곳에서 관리 |
| Flexbox | body, 버튼 그룹, 아바타 | 수평·수직 중앙 정렬 |
| Box Model | 카드, 아바타, 버튼 | padding, border, border-radius, box-shadow |
| Position (absolute) | 아바타, 배경 장식 | 상단 영역에 아바타 걸치기 |
| 가상 요소 `::before/::after` | 배경 원, 파형, 구분선 | HTML 없이 순수 CSS 장식 |
| 가상 클래스 `:hover` | 카드, 버튼 | 마우스 올릴 때 시각 피드백 |
| 가상 클래스 `:nth-child` | 스킬 태그 | 순서별 다른 색상 |
| Transform + Transition | 카드, 버튼 | 부드러운 hover 애니메이션 |
| linear-gradient | 상단, 아바타, 페이지 배경 | 그라데이션 배경 |

---

## 핵심 코드 설명

### 1. CSS 변수 — 테마 컬러 한 곳에서 관리

```css
:root {
  --color-primary: #6366f1;   /* 포인트 색상 */
  --shadow-card: 0 20px 60px rgba(99, 102, 241, 0.15);
}

/* 여러 곳에서 같은 색상 재사용 */
.card { box-shadow: var(--shadow-card); }
.name { color: var(--color-primary); }
```

> 나중에 색상 테마를 바꿀 때 `:root` 한 줄만 수정하면 전체가 바뀝니다.

---

### 2. 아바타 — position: absolute 핵심 패턴

```
.card-top (position: relative) ← 기준점
    └── .avatar (position: absolute) ← 기준점 기준으로 배치
         bottom: 0        → .card-top 하단에 맞춤
         left: 50%        → 가로 중앙으로
         transform: translate(-50%, 50%)
                          → 아바타 너비 절반만큼 왼쪽으로 당기고
                            아바타 높이 절반만큼 아래로 내림
                            → 경계선에 정확히 걸침!
```

```css
.card-top {
  position: relative;   /* ← .avatar의 기준점 */
}

.avatar {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);  /* 경계선 위에 걸치는 핵심! */
}
```

---

### 3. 가상 요소 `::before/::after` — HTML 없이 장식 만들기

HTML 파일에 태그를 추가하지 않고도 CSS만으로 장식 요소를 만들 수 있습니다.

```css
/* 카드 상단과 본문 사이의 물결 모양 */
.card-top::after {
  content: '';                      /* 가상 요소는 content가 필수! */
  position: absolute;
  bottom: -1px;
  left: 0; right: 0;
  height: 60px;
  background: white;
  clip-path: ellipse(55% 100% at 50% 100%);  /* 타원형으로 잘라내기 */
}

/* 구분선 장식 (HTML: <div class="divider"></div>) */
.divider::before {
  content: '';
  width: 48px;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
}
```

---

### 4. `:nth-child` — 순서별 다른 색상

```css
/* 부모 안에서 n번째 .skill-tag에 다른 색상 적용 */
.skill-tag:nth-child(1) { background: #ede9fe; color: #6d28d9; } /* 보라 */
.skill-tag:nth-child(2) { background: #dbeafe; color: #1d4ed8; } /* 파랑 */
.skill-tag:nth-child(3) { background: #fef3c7; color: #b45309; } /* 노랑 */
.skill-tag:nth-child(4) { background: #dcfce7; color: #166534; } /* 초록 */
.skill-tag:nth-child(5) { background: #fee2e2; color: #b91c1c; } /* 빨강 */
```

---

### 5. Transform + Transition — 부드러운 hover 효과

```css
.card {
  /* transition: 어떤 속성을, 얼마나 걸려서, 어떤 속도로 변화시킬지 */
  transition: transform 0.35s ease-out, box-shadow 0.35s ease-out;
}

.card:hover {
  transform: translateY(-8px);     /* 위로 8px 이동 */
  box-shadow: var(--shadow-hover); /* 그림자 강해짐 */
}
```

> `ease-out`: 빠르게 시작해서 천천히 끝남 — 자연스럽고 고급스러운 느낌

---

## 파일 구조

```
profile-card/
├── index.html   ← 카드 HTML 구조
├── style.css    ← 스타일 (주석으로 개념 설명 포함)
└── README.md    ← 이 문서
```

## 실행 방법

`index.html` 파일을 브라우저에서 열면 바로 확인할 수 있습니다.
