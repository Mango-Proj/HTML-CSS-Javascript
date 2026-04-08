# 반응형 매거진 카드 레이아웃

다양한 기기 환경(데스크탑, 태블릿, 모바일)에 맞춰 콘텐츠가 유연하게 변하는 웹의 기본 원리를 익힙니다.

---

## 컨셉

최신 글이나 사진이 격자 형태로 나열된 **갤러리형 반응형 레이아웃**

---

## 주요 기능

| 기능 | 설명 | 적용 기술 |
|------|------|-----------|
| **Grid 시스템** | 화면 너비에 따라 카드가 3열 → 2열 → 1열로 자동 조정 | CSS Grid |
| **Overlay 애니메이션** | 이미지 위에 마우스를 올리면 제목과 버튼이 나타남 | `opacity` + `transition` |
| **Badging** | 카드 상단에 'New', 'Hot' 태그를 절대 위치로 배치 | `position: absolute` |
| **비율 유지** | 이미지 크기가 달라도 카드의 비율을 일정하게 유지 | `aspect-ratio` |

---

## 기술 스택 및 도전 과제

### CSS Grid 반응형 레이아웃

`auto-fit`과 `minmax`를 조합하면 미디어 쿼리 없이도 열이 자동으로 조정됩니다.

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /*
    auto-fit  : 공간이 허용하는 만큼 열을 자동으로 생성
    minmax    : 카드 최소 300px, 남은 공간은 균등 분배(1fr)
    결과: 900px 이상 → 3열, 600px → 2열, 300px 이하 → 1열
  */
  gap: 24px;
}
```

---

### Aspect Ratio — 이미지 비율 고정

다양한 크기의 이미지를 사용해도 카드 썸네일 영역의 비율이 항상 일정하게 유지됩니다.

```css
.card-thumbnail {
  aspect-ratio: 16 / 9;    /* 16:9 비율 고정 */
  overflow: hidden;
}

.card-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;       /* 비율을 유지하며 영역을 꽉 채움 */
}
```

---

### Overlay 애니메이션

이미지 위에 반투명 레이어를 올려두고, 마우스 Hover 시 나타나도록 합니다.

```css
.card-overlay {
  position: absolute;
  inset: 0;                          /* top/right/bottom/left 모두 0 */
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;                        /* 평소에는 숨김 */
  transition: opacity 0.3s ease;
}

.card:hover .card-overlay {
  opacity: 1;                        /* Hover 시 나타남 */
}
```

---

### Badging — 절대 위치 태그 배치

카드 이미지 위에 'New', 'Hot' 같은 뱃지를 올립니다.
부모에 `position: relative`, 뱃지에 `position: absolute`를 사용합니다.

```css
/* 부모 카드: 절대 위치의 기준점 역할 */
.card {
  position: relative;
}

/* 뱃지: 카드 좌상단에 고정 */
.card-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}

.badge-new  { background: #6366f1; color: white; }
.badge-hot  { background: #ef4444; color: white; }
```

---

### Media Queries — 특정 해상도에서 세부 조정

`auto-fit`으로 열은 자동 조정되지만, 폰트 크기나 간격은 추가로 조정합니다.

```css
/* 태블릿 이하 (768px) */
@media (max-width: 768px) {
  .card-title {
    font-size: 1rem;    /* 제목 크기 줄임 */
  }
  .card-grid {
    gap: 16px;          /* 간격 줄임 */
  }
}

/* 모바일 (480px 이하) */
@media (max-width: 480px) {
  .page-header {
    font-size: 1.25rem;
  }
}
```

---

## 파일 구성

```
magazine-card-layout/
  index.html   — 카드 목록 구조 (HTML)
  style.css    — Grid 레이아웃 + 반응형 + 애니메이션 스타일
  README.md    — 이 문서
```

---

## 레이아웃 구조 (개념도)

```
데스크탑 (3열)
┌──────────┐ ┌──────────┐ ┌──────────┐
│ [New] 🖼️  │ │ [Hot] 🖼️  │ │       🖼️ │
│ 카드 제목  │ │ 카드 제목  │ │ 카드 제목  │
│ 설명 텍스트│ │ 설명 텍스트│ │ 설명 텍스트│
└──────────┘ └──────────┘ └──────────┘

태블릿 (2열)
┌──────────┐ ┌──────────┐
│ [New] 🖼️  │ │ [Hot] 🖼️  │
│ 카드 제목  │ │ 카드 제목  │
└──────────┘ └──────────┘

모바일 (1열)
┌──────────────────────┐
│ [New]  🖼️ 이미지      │
│ 카드 제목              │
│ 설명 텍스트            │
└──────────────────────┘

Hover 시 Overlay 표시
┌──────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░ │  ← 반투명 어두운 레이어
│ ░░  카드 제목  ░░░░░ │
│ ░░ [자세히 보기] ░░░ │
└──────────────────────┘
```

---

## 학습 포인트 요약

| 개념 | 적용 위치 |
|------|-----------|
| CSS Grid (`auto-fit`, `minmax`) | 반응형 열 자동 조정 |
| `aspect-ratio` | 썸네일 이미지 비율 고정 |
| `object-fit: cover` | 이미지가 영역을 꽉 채우며 비율 유지 |
| `position: absolute` | 뱃지 카드 위에 올리기 |
| `opacity` + `transition` | Hover Overlay 애니메이션 |
| `@media` | 특정 해상도에서 폰트·간격 조정 |
