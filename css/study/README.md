# CSS 기초 학습 정리

CSS(Cascading Style Sheets)의 핵심 개념을 단계별로 학습한 내용을 요약합니다.
각 항목의 상세 내용과 예제 소스는 하위 폴더를 참고하세요.

---

## 목차

| # | 주제 | 폴더 | 핵심 키워드 |
|---|------|------|------------|
| 1 | [CSS 기초](#1-css-기초) | `begining/` | 문법, 선택자, 적용 방식 3가지 |
| 2 | [선택자](#2-선택자-selector) | `selector/` | 클래스, 아이디, 자식, 자손, 형제, 그룹 |
| 3 | [텍스트 스타일](#3-텍스트-스타일-typography) | `textstyle/` | font, text-align, letter-spacing |
| 4 | [단위와 색상](#4-단위와-색상-units--colors) | `unit_color/` | px, rem, vw/vh, rgba, hex |
| 5 | [배경](#5-배경-background) | `background/` | background-image, size, repeat |
| 6 | [박스 모델](#6-박스-모델-box-model) | `boxmodel/` | content, padding, border, margin |
| 7 | [가상 요소·클래스](#7-가상-요소와-가상-클래스-pseudo) | `pseudo/` | ::before/after, :hover, :nth-child |
| 8 | [우선순위·상속](#8-우선순위와-상속-priority--inheritance) | `priority_inheritance/` | 점수 시스템, inherit, initial |
| 9 | [레이아웃](#9-레이아웃-layout) | `layout/` | display, position, Flex, Grid |
| 10 | [변형·전환](#10-변형과-전환-transform--transition) | `transform_transition/` | scale, rotate, translate, transition |

---

## 1. CSS 기초

> 📁 `begining/`

**CSS**는 HTML 문서의 시각적 스타일을 정의하는 언어입니다. `선택자 { 속성: 값; }` 구조로 작성합니다.

### CSS 적용 방식 3가지

| 방식 | 위치 | 특징 |
|------|------|------|
| 인라인 스타일 | HTML 태그의 `style=""` 속성 | 해당 요소 하나에만 즉시 적용 |
| 내부 스타일 시트 | `<head>` 안의 `<style>` 태그 | 해당 HTML 파일 전체 적용 |
| **외부 스타일 시트** | 별도 `.css` 파일 + `<link>` 연결 | **여러 파일 공유 가능. 권장 방식** |

```css
/* 기본 문법 */
선택자 {
  속성: 값;   /* 주석은 /* */ 로 표기 */
}
```

---

## 2. 선택자 (Selector)

> 📁 `selector/`

스타일을 적용할 HTML 요소를 **지정하는 패턴**입니다.

| 선택자 | 문법 | 설명 |
|--------|------|------|
| 전체 | `*` | 모든 요소 |
| 태그 | `div` | 해당 태그 전체 |
| 클래스 | `.class` | 동일 클래스 모든 요소 |
| 아이디 | `#id` | 페이지 내 고유 요소 |
| 교집합 | `.a.b` | 두 클래스를 동시에 가진 요소 |
| 자식 | `A > B` | A의 **직계 자식** B만 |
| 자손 | `A B` | A 안의 **모든 깊이** B |
| 인접 형제 | `A + B` | A 바로 다음 형제 B **하나** |
| 일반 형제 | `A ~ B` | A 이후 **모든 형제** B |
| 그룹 | `A, B` | A와 B 모두 |

```css
.container > p { font-weight: bold; }  /* 직계 자식만 */
.container p   { color: gray; }        /* 모든 자손 */
span + span    { margin-left: 10px; }  /* 인접 형제 */
h1, span       { font-style: italic; } /* 그룹 */
```

---

## 3. 텍스트 스타일 (Typography)

> 📁 `textstyle/`

글자의 서체, 크기, 색상, 간격을 세밀하게 조절합니다.

```css
body {
  font-family: "Noto Sans KR", sans-serif; /* 웹 폰트 + 폴백 */
  font-size: 16px;       /* 기본 크기 */
  font-weight: 700;      /* 굵기: 100~900 */
  font-style: italic;    /* 기울임 */

  color: #333;
  text-align: center;    /* left | right | center | justify */
  text-decoration: none; /* <a> 태그 밑줄 제거 시 자주 사용 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* 가로 세로 번짐 색상 */

  letter-spacing: -1px;  /* 자간 */
  word-spacing: 2px;     /* 어간 */
  line-height: 1.6;      /* 행간: font-size × 1.6 */
}
```

**구글 폰트 적용 (`<link>` 방식 권장)**
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">
```

---

## 4. 단위와 색상 (Units & Colors)

> 📁 `unit_color/`

### 크기 단위

| 단위 | 기준 | 특징 |
|------|------|------|
| `px` | 화소(고정) | 정밀한 크기 지정 |
| `em` | 부모 `font-size` | 중첩 시 누적 주의 |
| `rem` | `<html>` `font-size` | 기준 고정, **권장** |
| `%` | 부모 크기 | 유동 레이아웃 |
| `vw` / `vh` | 뷰포트 너비 / 높이의 1% | 반응형 크기 |

```css
html { font-size: 16px; }
.em  { font-size: 1.5em;  } /* 부모 20px × 1.5 = 30px */
.rem { font-size: 1.5rem; } /* html 16px × 1.5 = 24px */
```

### 색상 표현

```css
color: red;                    /* 색상 이름 */
color: #1a73e8;                /* Hex (#RRGGBB) */
color: rgb(0, 123, 255);       /* RGB */
color: rgba(0, 123, 255, 0.7); /* RGBA (투명도 포함) */
```

> **`rgba` vs `opacity`**
> - `rgba` → 배경색만 반투명, 텍스트는 영향 없음
> - `opacity` → 요소 전체(배경 + 텍스트 + 자식) 반투명

---

## 5. 배경 (Background)

> 📁 `background/`

```css
div {
  background-color: #f4f4f4;
  background-image: url('image.jpg');
  background-size: cover;       /* contain | cover | px | % */
  background-repeat: no-repeat; /* repeat | repeat-x | repeat-y | no-repeat */
  background-position: center;

  /* 단축 속성: 색상 이미지 반복 위치 / 크기 */
  background: #f4f4f4 url('bg.png') no-repeat center / cover;
}
```

> - `contain`: 이미지 전체가 보이도록 맞춤, 여백 생길 수 있음
> - `cover`: 여백 없이 꽉 채움, 이미지 일부가 잘릴 수 있음

---

## 6. 박스 모델 (Box Model)

> 📁 `boxmodel/`

모든 HTML 요소는 **Content → Padding → Border → Margin** 구조를 가집니다.

```
┌──── Margin ─────────────────────┐
│  ┌── Border ──────────────────┐ │
│  │  ┌── Padding ────────────┐ │ │
│  │  │  ┌── Content ───────┐ │ │ │
│  │  │  │   텍스트 / 이미지  │ │ │ │
│  │  │  └─────────────────┘ │ │ │
│  │  └──────────────────────┘ │ │
│  └────────────────────────────┘ │
└─────────────────────────────────┘
```

```css
* { box-sizing: border-box; } /* 실무 기본값: padding·border를 width에 포함 */

div {
  width: 200px;
  padding: 20px 40px;          /* 상하 20 / 좌우 40 */
  border: 2px solid #333;      /* 두께 스타일 색상 */
  border-radius: 8px;          /* 모서리 둥글게, 50% = 원형 */
  margin: 30px auto;           /* 상하 30 / 좌우 auto = 수평 중앙 정렬 */
}
```

> **`content-box`(기본)**: `width` = Content 크기만 → padding+border 추가 시 실제 크기 커짐
> **`border-box`(권장)**: `width` 안에 padding+border 포함 → 실제 크기 고정

---

## 7. 가상 요소와 가상 클래스 (Pseudo)

> 📁 `pseudo/`

### 가상 요소 `::` — HTML 없이 요소 생성

| 선택자 | 설명 |
|--------|------|
| `::before` | 요소 내용 **앞**에 콘텐츠 삽입 |
| `::after` | 요소 내용 **뒤**에 콘텐츠 삽입 |
| `::selection` | 드래그 선택된 텍스트 스타일 |
| `::first-letter` | 첫 번째 글자만 선택 |

```css
.item::before { content: "✔ "; color: green; } /* content 필수! */
::selection   { background-color: yellow; }
```

### 구조 가상 클래스 `:` — 위치 기반 선택

```css
li:first-child     { border-top: 2px solid #333; }
li:last-child      { border-bottom: none; }
li:nth-child(even) { background-color: #f1f2f6; } /* 짝수 */
li:nth-child(3n)   { color: red; }                /* 3의 배수 */
```

### 상태 가상 클래스 `:` — 동적 상태 기반 선택

```css
a:hover   { color: blue; cursor: pointer; }
a:visited { color: purple; }
a:active  { color: red; }
input:focus {
  outline: 2px solid #1e90ff;
  background-color: #f1f9ff;
}
```

> | 구분 | 기호 | 역할 |
> |------|------|------|
> | 가상 **요소** | `::` | HTML에 없는 요소를 CSS로 **생성** |
> | 가상 **클래스** | `:` | 요소의 **상태·위치**에 따라 선택 |

---

## 8. 우선순위와 상속 (Priority & Inheritance)

> 📁 `priority_inheritance/`

### 우선순위 점수표

| 순위 | 대상 | 점수 |
|------|------|------|
| 0 | `!important` | ∞ (남용 금지) |
| 1 | 인라인 `style=""` | 1000 |
| 2 | `#id` | 100 |
| 3 | `.class`, `:hover` 등 | 10 |
| 4 | `태그` | 1 |
| 5 | 상속된 속성 | 0 |

> 점수가 같으면 **나중에 작성된 코드**가 적용됩니다.

### 상속 여부

| 구분 | 속성 |
|------|------|
| **상속됨** (텍스트 관련) | `color`, `font-*`, `text-align`, `line-height` |
| **상속 안됨** (레이아웃 관련) | `margin`, `padding`, `border`, `width`, `background` |

### 상속 제어 키워드

```css
.child { color: inherit; }  /* 부모 값 강제 상속 */
.child { color: initial; }  /* 브라우저 기본값으로 초기화 */
.child { color: unset; }    /* 상속 가능이면 inherit, 아니면 initial */
```

---

## 9. 레이아웃 (Layout)

> 📁 `layout/`

### Display

| 값 | 특징 |
|----|------|
| `block` | 가로 전체 차지, 줄 바꿈 |
| `inline` | 콘텐츠 크기만, 줄 바꿈 없음 |
| `inline-block` | 한 줄 나열 + 크기·여백 지정 가능 |
| `none` | 요소 + 공간 모두 제거 (`visibility: hidden`은 공간 유지) |

### Position

| 값 | 기준점 |
|----|--------|
| `static` | 기본값, 좌표 무시 |
| `relative` | 자기 자신의 원래 위치 |
| `absolute` | static이 아닌 가장 가까운 조상 |
| `fixed` | 뷰포트 (스크롤해도 고정) |
| `sticky` | 스크롤 특정 지점까지 relative, 이후 fixed |

```css
.parent { position: relative; }
.child  { position: absolute; top: 10px; right: 10px; }
header  { position: sticky; top: 0; z-index: 10; }
```

### Flexbox (1차원)

```css
.container {
  display: flex;
  flex-direction: row;           /* 주축 방향 */
  flex-wrap: wrap;               /* 줄 바꿈 */
  justify-content: space-between; /* 주축 정렬 */
  align-items: center;           /* 교차축 정렬 */
  gap: 20px;
}
/* 아이템: flex-grow | flex-shrink | flex-basis */
.item { flex: 1 0 200px; }
```

### Grid (2차원)

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 균등 */
  grid-template-rows: 80px 1fr 60px;
  grid-template-areas:
    "nav  nav"
    "side main"
    "foot foot";
  gap: 10px;
}
header { grid-area: nav; }
/* 반응형: 최소 150px, 최대 1fr */
grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
```

> **Flex vs Grid**: Flex는 1방향 정렬, Grid는 행+열 2차원 배치에 적합합니다.
> 실무에서는 **Grid로 큰 틀 → Flex로 내부 정렬** 조합이 일반적입니다.

---

## 10. 변형과 전환 (Transform & Transition)

> 📁 `transform_transition/`

### Transform — 시각적 형태 변형

레이아웃(문서 흐름)에 영향 없이 **눈에 보이는 모양**만 바꿉니다.

| 함수 | 설명 |
|------|------|
| `scale(n)` | 크기 확대·축소 (1 = 원본) |
| `rotate(deg)` | 시계 방향 회전 |
| `translate(x, y)` | 위치 이동 (리플로우 없어 성능 유리) |
| `skew(x, y)` | 기울임 |

```css
/* 여러 함수 조합: 왼쪽부터 순서대로 적용 */
transform: scale(1.1) translateY(-5px) rotate(10deg);

/* 변형 기준점 변경 (기본: center) */
transform-origin: top left;
```

### Transition — 부드러운 전환

속성값 변화를 **일정 시간 동안 애니메이션** 처리합니다. **변경 전 상태에 선언**해야 합니다.

```css
/* 단축 속성: 속성명  지속시간  타이밍함수  대기시간 */
transition: all 0.3s ease-out 0s;

/* 성능 최적화: 필요한 속성만 명시 */
transition: transform 0.3s ease, background-color 0.2s ease;
```

| timing-function | 체감 |
|-----------------|------|
| `linear` | 일정한 속도 |
| `ease` | 시작·끝 느리고 중간 빠름 (기본값) |
| `ease-in` | 천천히 시작 → 빠름 |
| `ease-out` | 빠름 → 천천히 끝 |
| `ease-in-out` | 양쪽 모두 천천히 |
| `cubic-bezier(...)` | 완전 커스텀 |

**실전 패턴**

```css
/* 버튼 hover */
.btn { transition: all 0.25s ease-out; }
.btn:hover {
  transform: scale(1.1) translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* display:none 대신 opacity + visibility 조합 */
.tooltip { opacity: 0; visibility: hidden; transition: opacity 0.3s, visibility 0.3s; }
.tooltip.show { opacity: 1; visibility: visible; }
```

---

## 학습 순서 요약

```
CSS 기초 → 선택자 → 텍스트 → 단위·색상 → 배경
    → 박스 모델 → 가상 선택자 → 우선순위·상속
        → 레이아웃 (Display → Position → Flex → Grid)
            → Transform · Transition
```

## 미니 프로젝트

학습한 모든 개념을 종합 적용한 **Mango Café 메뉴 페이지** 예제가 있습니다.

> 📁 `../project/`
