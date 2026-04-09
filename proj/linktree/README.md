# 모바일 링크 트리 (Linktree)

SNS 채널과 포트폴리오를 한 페이지에서 보여주는 링크 모음 UI입니다.
인스타그램 프로필 링크용으로 바로 사용할 수 있습니다.

---

## 미리보기

```
┌─────────────────────────┐
│                         │
│         ╭─────╮         │
│         │ 👤  │         │  ← <img> 원형 프로필
│         ╰─────╯         │
│      @dev.shannon       │
│  프론트엔드를 공부하는  │
│                         │
│ ┌─────────────────────┐ │  ← 순차 slideUp 0.1s
│ │ 📸  Instagram       │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │  ← 순차 slideUp 0.2s
│ │ 🐙  GitHub          │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ ▶️  YouTube          │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ ✍️  블로그           │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ ✉️  이메일 문의      │ │
│ └─────────────────────┘ │
│    © 2025 @dev.shannon  │
└─────────────────────────┘
       max-width: 480px
```

---

## 수정 이력 — 발견된 문제와 개선 내용

### ① `<button>` → `<a>` 태그 교체 (시멘틱 개선)

```html
<!-- ❌ 이전: 페이지 이동에 button 태그 사용 -->
<button class="link-btn"></button>

<!-- ✅ 수정: 링크에는 a 태그가 의미상 올바름 -->
<a class="link-btn" href="https://github.com/" target="_blank" rel="noopener noreferrer">
  <span class="btn-icon">🐙</span>
  <span class="btn-label">GitHub</span>
</a>
```

> `<button>` — "동작 수행" (폼 제출, 모달 열기 등)
> `<a>` — "페이지/URL 이동"
> 의미에 맞는 태그를 써야 접근성(스크린리더)과 SEO에 유리합니다.

`<a>` 태그는 기본 스타일(파란 글자, 밑줄)이 있어 CSS에서 리셋이 필요합니다:

```css
.link-btn {
  color: white;          /* a 태그 기본 파란 글자 덮어쓰기 */
  text-decoration: none; /* a 태그 기본 밑줄 제거 */
  font-family: inherit;  /* 일부 브라우저에서 a 는 font-family 상속 안 함 */
}
```

---

### ② `object-fit: cover` 적용 대상 수정

```css
/* ❌ 이전: div에 object-fit 적용 → 무시됨 */
.profile-img { /* div 였음 */
  object-fit: cover; /* div는 대체 요소가 아니라 적용 안 됨 */
}

/* ✅ 수정: img 태그로 교체 → 정상 동작 */
.profile-img { /* img 태그 */
  object-fit: cover;   /* 비율 유지하며 원형 영역을 꽉 채움 */
  display: block;      /* img 기본값 inline → 하단 여백(descender) 제거 */
}
```

> `object-fit`은 `img`, `video`, `canvas` 같은 **대체 콘텐츠 요소**에만 동작합니다.

---

### ③ `nth-child` 애니메이션 딜레이 버그 수정

```html
<!-- ❌ 이전: 버튼이 .container 의 직계 자식 -->
<div class="container">
  <div class="profile-img"></div>  ← nth-child(1)
  <button class="link-btn"></button>  ← nth-child(2) — nth-child(1) 딜레이 적용 안 됨!
  <button class="link-btn"></button>  ← nth-child(3)
</div>

<!-- ✅ 수정: 버튼을 <nav class="links"> 로 분리 -->
<nav class="links">
  <a class="link-btn">...</a>  ← nth-child(1) — 정확히 1번 딜레이
  <a class="link-btn">...</a>  ← nth-child(2)
</nav>
```

```css
/* ✅ .links 안 기준으로 nth-child 매칭 — 정확한 딜레이 */
.links .link-btn:nth-child(1) { animation-delay: 0.10s; }
.links .link-btn:nth-child(2) { animation-delay: 0.20s; }
.links .link-btn:nth-child(3) { animation-delay: 0.30s; }
.links .link-btn:nth-child(4) { animation-delay: 0.40s; }
.links .link-btn:nth-child(5) { animation-delay: 0.50s; }
```

---

### ④ `min-height: 100vh` 복원

```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 이 값이 없으면 body 높이 = 콘텐츠 높이 → 세로 중앙 불가 */
}
```

> `align-items: center`는 **Flex 컨테이너 안에서** 세로 중앙을 잡습니다.
> `min-height: 100vh`가 없으면 body 높이가 콘텐츠 높이만큼밖에 되지 않아
> "세로 중앙"이 의미가 없어집니다.

---

### ⑤ CSS 변수 도입

```css
/* ❌ 이전: 색상값이 코드 곳곳에 하드코딩 */
background: linear-gradient(135deg, #667eea, #764ba2);
box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

/* ✅ 수정: :root 변수로 통일 → 테마 변경 시 한 곳만 수정 */
:root {
  --color-btn-from: #667eea;
  --color-btn-to:   #764ba2;
  --shadow-btn:     0 4px 15px rgba(102, 126, 234, 0.4);
}
background: linear-gradient(135deg, var(--color-btn-from), var(--color-btn-to));
```

---

### ⑥ `will-change: transform` 추가 (성능 최적화)

```css
.link-btn {
  will-change: transform; /* hover 시 transform 예고 → GPU 레이어 사전 생성 */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
```

> 브라우저에게 "이 요소는 곧 transform이 일어날 것"이라고 미리 알려줍니다.
> 브라우저가 사전에 GPU 합성 레이어를 만들어 애니메이션이 더 부드러워집니다.
> 단, 너무 많은 요소에 쓰면 메모리를 낭비하므로 `transform`/`opacity`가
> 실제로 사용되는 요소에만 적용합니다.

---

### ⑦ `font-family` 추가

```css
/* ❌ 이전: font-family 없음 → 브라우저 기본 폰트로 표시 */
body { background-color: #764ba2; }

/* ✅ 수정 */
body { font-family: 'Inter', 'Noto Sans KR', sans-serif; }
```

---

## HTML 구조

```
<body>
  └── .container                   ← 카드 전체 래퍼
        ├── .profile                ← 프로필 섹션
        │     ├── <img.profile-img> ← 플레이스홀더 이미지 (picsum.photos)
        │     ├── .profile-name     ← 닉네임
        │     └── .profile-bio      ← 소개글
        ├── <nav.links>             ← 링크 버튼 묶음 (시멘틱 nav)
        │     ├── <a.link-btn>      ← Instagram
        │     ├── <a.link-btn>      ← GitHub
        │     ├── <a.link-btn>      ← YouTube
        │     ├── <a.link-btn>      ← 블로그
        │     └── <a.link-btn>      ← 이메일
        └── <footer.footer>         ← 하단 저작권
```

---

## 주요 CSS 개념

| 개념 | 적용 위치 | 설명 |
|------|----------|------|
| `min-height: 100vh` + Flexbox | `body` | 화면 정중앙 배치 |
| `border-radius: 50%` + `object-fit` | `.profile-img` | 원형 이미지 클리핑 |
| CSS 변수 (`:root`) | 색상·그림자 | 테마 한 곳에서 관리 |
| `linear-gradient` + `box-shadow` | `.link-btn` | 입체적 버튼 디자인 |
| `@keyframes slideUp` + `animation-delay` | `.link-btn` | 순차 등장 인트로 |
| `will-change: transform` | `.link-btn` | GPU 애니메이션 최적화 |
| `rel="noopener noreferrer"` | `<a target="_blank">` | 새 탭 보안 설정 |

---

## 보안: `rel="noopener noreferrer"`

```html
<a href="..." target="_blank" rel="noopener noreferrer">
```

`target="_blank"`로 새 탭을 열 때 반드시 함께 씁니다.

| 속성 | 역할 |
|------|------|
| `noopener` | 열린 탭에서 `window.opener`로 원본 탭을 제어하는 것을 차단 |
| `noreferrer` | 이동할 사이트에 이전 페이지 URL 정보를 전달하지 않음 |

---

## 파일 구성

```
linktree/
  index.html   — 프로필 + 링크 버튼 구조
  style.css    — 레이아웃 + 애니메이션 + CSS 변수
  README.md    — 이 문서
```

## 실행 방법

`index.html`을 브라우저로 열면 바로 확인할 수 있습니다.
