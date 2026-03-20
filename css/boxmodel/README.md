# CSS 박스 모델 (Box Model)

모든 HTML 요소는 **박스** 형태로 이루어져 있으며, 네 가지 영역이 겹쳐진 구조를 가집니다.

---

## 1. 박스 모델의 구성 요소

```
┌──────────────────────────────┐
│           Margin             │  ← 외부 여백 (다른 요소와의 간격)
│  ┌────────────────────────┐  │
│  │        Border          │  │  ← 테두리 (경계선)
│  │  ┌──────────────────┐  │  │
│  │  │     Padding      │  │  │  ← 내부 여백 (콘텐츠와 테두리 사이)
│  │  │  ┌────────────┐  │  │  │
│  │  │  │  Content   │  │  │  │  ← 실제 내용 영역 (텍스트, 이미지 등)
│  │  │  └────────────┘  │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

| 영역 | 설명 |
|------|------|
| **Content** | 텍스트·이미지 등 실제 내용이 담기는 영역 |
| **Padding** | 콘텐츠와 테두리 사이의 내부 여백, 배경색이 적용됨 |
| **Border** | 패딩과 마진 사이의 경계선 |
| **Margin** | 테두리 밖의 외부 여백, 다른 요소와의 간격 조절 |

---

## 2. 콘텐츠 크기 (width, height)

요소의 가로·세로 크기를 지정합니다. `px`, `%`, `em`, `rem`, `vw`, `vh` 등 다양한 단위를 사용할 수 있습니다.

```css
div {
  width: 200px;
  height: 100px;
}
```

---

## 3. 여백 단축 속성 (padding, margin)

상하좌우를 한꺼번에 또는 각각 설정할 수 있습니다.

| 작성 방식 | 적용 범위 |
|-----------|-----------|
| `10px` | 상·우·하·좌 모두 10px |
| `10px 20px` | 상하 10px / 좌우 20px |
| `10px 20px 30px` | 상 10px / 좌우 20px / 하 30px |
| `10px 20px 30px 40px` | 상·우·하·좌 (시계 방향) |

```css
padding: 20px 40px;      /* 상하 20px, 좌우 40px */
margin: 30px auto;       /* 상하 30px, 좌우 자동 → 수평 중앙 정렬 */
```

> `margin: 0 auto`는 블록 요소를 수평 가운데 정렬할 때 자주 사용합니다.

---

## 4. 테두리 (border)

### 기본 문법

```css
/* border: 두께 스타일 색상 */
border: 2px solid black;
```

### 테두리 스타일 (border-style)

| 값 | 모양 |
|----|------|
| `solid` | 실선 |
| `dotted` | 점선 |
| `dashed` | 긴 점선 |
| `double` | 이중 실선 |

### 모서리 둥글게 (border-radius)

```css
border-radius: 15px;   /* 모서리를 15px 반경으로 둥글게 */
border-radius: 50%;    /* 원형으로 만들기 */
```

---

## 5. box-sizing

기본적으로 `width`와 `height`는 **Content 영역만**의 크기입니다.
`padding`과 `border`를 추가하면 요소의 실제 크기가 더 커집니다.

```css
/* 기본값: content-box */
/* width: 200px + padding: 40px + border: 10px = 실제 너비 250px */
.default { box-sizing: content-box; }

/* border-box: width 안에 padding과 border까지 포함 */
/* width: 200px = 실제 너비 200px (padding, border가 내부에서 계산됨) */
.border-box { box-sizing: border-box; }
```

> 실무에서는 레이아웃 계산을 단순하게 하기 위해 전체 요소에 `box-sizing: border-box`를 적용하는 것이 일반적입니다.
> ```css
> * { box-sizing: border-box; }
> ```
