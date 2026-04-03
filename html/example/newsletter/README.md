# Newsletter — 신문(Newspaper) 레이아웃 예제

`index.html` 의 기존 `header / main / footer` 뼈대와 CSS를 그대로 유지한 채,
실제 신문 지면을 흉내 낸 콘텐츠와 스타일을 추가한 예제입니다.

---

## 미리보기 구조

```
┌──────────────────────────────────────────────────────────┐
│  header  │  Thursday, April 3, 2026  ·  VOL. …  ·  $3.50│
│          │         THE DAILY MANGO                        │
│          │   "All the News That's Fit to Read"            │
└──────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────┐
│  main    │  1단 (특집)  │  2단 (서브 기사 2건)  │  3단 (사이드바) │
│  (540px) │             │                       │ 날씨 / 단신    │
└──────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────┐
│  footer  │  © 2026 …   │  THE DAILY MANGO  │  연락처       │
└──────────────────────────────────────────────────────────┘
```

---

## 파일 구조

```
newsletter/
├── index.html   # 마크업 + 인라인 CSS (기존 뼈대 유지 + 신문 콘텐츠 추가)
└── README.md    # 이 문서
```

---

## 기존 코드와 추가 코드의 구분

### 기존 (수정하지 않은 부분)

| 대상 | 내용 |
|------|------|
| `body` 스타일 | `background-color: rgb(134, 153, 216)`, `opacity: 40%` |
| `header` 스타일 | `height: 100px`, `background-color: beige`, `border-radius`, `box-shadow` 등 |
| `main` 스타일 | `height: 540px`, 동일 카드 스타일 |
| `footer` 스타일 | `height: 100px`, 동일 카드 스타일 |
| HTML 뼈대 | `<header>`, `<main>`, `<footer>` 요소 자체 |

### 추가 (새롭게 작성한 부분)

모든 새 코드 앞에 `/* [NEW] */` 또는 `<!-- [NEW] -->` 주석으로 표시되어 있으며,
주석에는 해당 코드를 추가한 **의도**가 설명되어 있습니다.

---

## 사용된 HTML 태그

| 태그 | 역할 |
|------|------|
| `<header>` | 신문 마스트헤드(제호 영역) |
| `<main>` | 기사 본문 영역 |
| `<footer>` | 발행사 정보 영역 |
| `<div>` | 레이아웃 구역 분리 (마스트헤드, 그리드, 컬럼 등) |
| `<h2>` | 1단 메인 헤드라인 |
| `<h3>` | 2·3단 서브 헤드라인 |
| `<p>` | 기사 본문, 기자명, 단신 본문 |
| `<hr>` | 기사 간 구분선 |
| `<span>` | 인라인 텍스트 (날씨 도시명·기온, 정보바 항목) |

---

## 사용된 CSS 기법

### Flexbox

```css
/* 마스트헤드 수직 중앙 정렬 */
.masthead {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* 날씨 항목 양 끝 정렬 */
.weather-item {
    display: flex;
    justify-content: space-between;
}
```

Flexbox는 **단순한 한 방향 정렬**에 적합합니다.
마스트헤드처럼 위→아래로 쌓거나, 날씨 항목처럼 좌우 양 끝에 배치할 때 사용했습니다.

### CSS Grid

```css
/* 신문 3단 컬럼 */
.newspaper-grid {
    display: grid;
    grid-template-columns: 2fr 2fr 1.2fr;
}
```

Grid는 **2차원(행 + 열) 레이아웃**에 적합합니다.
신문의 다단 편집처럼 너비 비율이 다른 여러 컬럼을 나란히 배치할 때 사용했습니다.

### box-sizing: border-box

```css
.newspaper-grid {
    padding: 12px 16px;
    box-sizing: border-box;
}
```

`border-box`를 사용하면 `padding`이 `width/height` 안에 포함됩니다.
덕분에 부모의 고정 높이(540px)를 넘지 않고 안쪽 여백을 자유롭게 조절할 수 있습니다.

### overflow: hidden

```css
.newspaper-grid { overflow: hidden; }
.col            { overflow: hidden; }
```

`main`의 높이가 540px로 고정되어 있어서, 내용이 넘칠 때 잘라냅니다.
실제 신문처럼 칸에 들어갈 분량만 보이는 효과도 있습니다.

### 타이포그래피 — serif vs sans-serif

```css
/* 본문 · 헤드라인: 신문다운 느낌 */
font-family: Georgia, 'Times New Roman', serif;

/* UI 레이블 (섹션 제목 등): 가독성 우선 */
font-family: Arial, sans-serif;
```

신문 본문에는 전통적으로 serif(명조) 폰트를 사용합니다.
읽기 쉬운 UI 레이블에는 sans-serif(고딕)를 사용해 구분했습니다.

### text-align: justify

```css
.article-body {
    text-align: justify;
}
```

좌우 양 끝을 맞춰 단락의 폭을 균일하게 만듭니다.
인쇄물·신문 본문에서 흔히 사용하는 정렬 방식입니다.

### letter-spacing

```css
.masthead-title {
    letter-spacing: 0.15em;
}
```

`em` 단위는 폰트 크기에 비례하므로, 글자 크기가 바뀌어도 자간 비율이 유지됩니다.

---

## 레이아웃 흐름 요약

```
body
 ├── header
 │    └── .masthead (flex, column)
 │         ├── .masthead-top      ← 날짜 / 호수 / 가격
 │         ├── .masthead-title    ← 신문 제호
 │         └── .masthead-tagline  ← 슬로건
 ├── main
 │    └── .newspaper-grid (grid, 3-col)
 │         ├── .col               ← 특집 기사
 │         ├── .col               ← 서브 기사 × 2
 │         └── .col               ← 날씨 + 단신 사이드바
 └── footer
      └── .footer-content (flex, space-between)
           ├── .footer-left       ← 저작권
           ├── .footer-center     ← 신문 이름
           └── .footer-right      ← 연락처 / 창간 연도
```

---

## 학습 포인트

1. **Flexbox vs Grid** — 단방향 정렬에는 Flex, 다열 레이아웃에는 Grid가 더 간결합니다.
2. **고정 높이 + overflow: hidden** — 컨테이너 크기가 정해진 상황에서 내용을 안전하게 제어하는 방법입니다.
3. **box-sizing: border-box** — padding을 포함한 실제 크기 계산을 직관적으로 만듭니다.
4. **CSS 우선순위 (Specificity)** — `.brief-item p`처럼 부모 클래스를 포함한 선택자는 `.article-body`보다 구체적이어서 override됩니다.
5. **시맨틱 태그** — `<header>`, `<main>`, `<footer>`, `<h2>`, `<h3>`, `<p>`는 의미를 담은 태그로, 스크린 리더와 검색 엔진이 구조를 이해하는 데 도움을 줍니다.
