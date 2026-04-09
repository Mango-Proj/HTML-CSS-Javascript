# 포토 갤러리 (Photo Gallery)

CSS Grid의 반응형 레이아웃과 hover overlay 효과를 실습하는 갤러리 UI입니다.
JavaScript 없이 순수 CSS만으로 필터 탭 기능까지 구현합니다.

## 미리보기

```
┌────────────────────────────────────────────────────┐
│         포토 갤러리                                 │
│    CSS Grid · Hover Overlay · aspect-ratio         │
├────────────────────────────────────────────────────┤
│     [전체]  [자연]  [도시]  [음식]                  │
├──────────┬──────────┬──────────┬────────────────────┤
│ ████████ │ ████████ │ ████████ │ ← hover 시 overlay
│ ████████ │ ████████ │ ████████ │   나타남
│ ████████ │ ████████ │ ████████ │
│ 🌿 자연  │ 🏙 도시  │ 🍜 음식  │
│ 북한산일출│ 남산타워 │ 전주비빔밥│
├──────────┼──────────┼──────────┤
│ ████████ │ ████████ │ ████████ │
│ ...      │ ...      │ ...      │
└──────────┴──────────┴──────────┘
```

화면 너비에 따라 열 수가 자동으로 변합니다:
- 넓은 화면: 4열 / 중간 화면: 3열 / 좁은 화면: 2열 / 모바일: 1열

---

## 적용된 CSS 개념

| 개념 | 사용 위치 | 핵심 역할 |
|------|----------|----------|
| CSS Grid | `.gallery` | 자동 반응형 열 배치 |
| `auto-fit` + `minmax` | grid-template-columns | 열 수 자동 조절 |
| `aspect-ratio` | `.card-img` | 이미지 비율 고정 |
| Position absolute | `.overlay` | 이미지 위에 overlay 올리기 |
| `opacity` + Transition | `.overlay` | hover 시 부드럽게 나타남 |
| Transform `scale` | `.card-img` | hover 시 이미지 확대 |
| `@keyframes` | 카드 등장 | 아래에서 위로 페이드인 |
| `:nth-child` | 카드 딜레이 | 순차 등장 효과 |
| `:checked` + `~` 선택자 | 필터 탭 | JS 없는 탭 UI |

---

## 핵심 코드 설명

### 1. CSS Grid — `auto-fit` + `minmax`

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
```

이 한 줄이 반응형 갤러리의 핵심입니다.

```
repeat(auto-fit, minmax(260px, 1fr)) 분해:

repeat(auto-fit, ...)
→ "열을 몇 개 만들지 브라우저가 자동으로 결정"

minmax(260px, 1fr)
→ "각 열의 최소 너비는 260px, 최대는 남은 공간 균등 분배"

결과:
┌─────────────────────────────────────────────────────┐
│ 1200px 화면:  [260px] [260px] [260px] [260px] = 4열 │
│  860px 화면:  [260px] [260px] [260px]         = 3열 │
│  560px 화면:  [260px] [260px]                 = 2열 │
│  300px 화면:  [260px]                         = 1열 │
└─────────────────────────────────────────────────────┘
미디어 쿼리 없이 자동으로 반응형!
```

---

### 2. `aspect-ratio` — 이미지 비율 고정

```css
.card-img {
  aspect-ratio: 4 / 3;  /* 가로:세로 = 4:3 항상 유지 */
}
```

```
width가 260px → height 자동으로 195px
width가 400px → height 자동으로 300px
width가 180px → height 자동으로 135px

비율이 항상 4:3으로 유지됩니다.
```

> 실제 `<img>` 태그를 사용할 때는 `object-fit: cover`와 함께 사용합니다.
> ```css
> .card-img img {
>   width: 100%;
>   height: 100%;
>   object-fit: cover;  /* 비율 유지하며 영역을 꽉 채움 */
> }
> ```

---

### 3. hover overlay — `opacity` 전환

```
평소 상태:
┌────────────┐
│  ████████  │  ← 이미지만 보임
│  ████████  │
└────────────┘

hover 상태:
┌────────────┐
│░░░░░░░░░░░░│  ← 반투명 검정 overlay
│  🔍 제목  │  ← 텍스트가 위에 표시
│  부제목    │
└────────────┘
```

```css
.overlay {
  position: absolute;
  inset: 0;             /* top/right/bottom/left: 0 → 꽉 채움 */
  background: rgba(0, 0, 0, 0.55);
  opacity: 0;           /* 기본: 투명 */
  transition: opacity 0.3s ease;
}

.card:hover .overlay {
  opacity: 1;           /* hover 시: 불투명 */
}
```

---

### 4. `:nth-child` — 순차 등장 효과

```css
/* 각 카드마다 animation-delay를 다르게 */
.card:nth-child(1) { animation-delay: 0.05s; }
.card:nth-child(2) { animation-delay: 0.10s; }
.card:nth-child(3) { animation-delay: 0.15s; }
/* ... */
```

```
페이지 로드 시:
시간→  0.05s    0.10s    0.15s
         ↓        ↓        ↓
       카드1    카드2    카드3  순서대로 하나씩 나타남
```

---

### 5. 순수 CSS 필터 탭 — `:checked` + `~` 선택자

JavaScript 없이 radio input과 CSS만으로 필터 기능을 구현합니다.

```html
<!-- radio가 checked되면 CSS가 반응함 -->
<input type="radio" id="filter-nature" name="filter" class="filter-input">
<label for="filter-nature">자연</label>
```

```css
/* "자연" 탭이 선택되면: */
#filter-nature:checked ~ .gallery-wrap .card {
  display: none;              /* 모든 카드 숨김 */
}
#filter-nature:checked ~ .gallery-wrap .card[data-category="nature"] {
  display: block;             /* 자연 카드만 표시 */
}
```

```
~ (형제 선택자): checked된 input 뒤에 오는 형제 요소를 선택
[data-category="nature"]: data 속성으로 카드 구분
```

---

## 파일 구조

```
photo-gallery/
├── index.html   ← 9개 카드 HTML 구조
├── style.css    ← Grid, overlay, 필터, 애니메이션
└── README.md    ← 이 문서
```

## 실행 방법

`index.html` 파일을 브라우저에서 열면 바로 확인할 수 있습니다.
상단 탭([전체] [자연] [도시] [음식])을 클릭해 필터 기능을 테스트해 보세요.
