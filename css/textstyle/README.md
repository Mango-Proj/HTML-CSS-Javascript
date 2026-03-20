# CSS 텍스트 스타일링 (Typography)

CSS를 사용하면 글자의 서체, 크기, 색상, 간격 등을 세밀하게 조절하여 가독성 높은 텍스트 디자인을 만들 수 있습니다.

---

## 1. 폰트 기본 속성 (Font Basics)

글자의 서체, 크기, 굵기 등을 설정합니다.

| 속성 | 설명 | 예시 |
|------|------|------|
| `font-family` | 사용할 폰트 지정 (여러 개 나열 권장) | `"Noto Sans KR", sans-serif` |
| `font-size` | 글자 크기 (기본값: `16px`) | `18px`, `1.5rem` |
| `font-weight` | 글자 두께 (`100`~`900` 또는 `bold`, `normal`) | `700` |
| `font-style` | 글자 기울기 | `italic`, `oblique` |

```css
body {
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
}
```

> `font-family`는 사용자의 환경에 폰트가 없을 경우를 대비해 여러 개를 나열(Fallback)하는 것이 관례입니다.

---

## 2. 웹 폰트 (Web Fonts)

사용자의 시스템 환경과 무관하게 동일한 폰트를 보여주기 위해 온라인 폰트를 불러와 사용합니다.

### 구글 폰트 적용 방식

**① `<link>` 방식** — HTML `<head>`에 삽입

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">
```

**② `@import` 방식** — CSS 파일 최상단에 삽입

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
```

---

## 3. 텍스트 꾸미기 및 정렬

글자의 색상, 정렬, 장식 효과를 설정합니다.

| 속성 | 설명 | 주요 값 |
|------|------|---------|
| `color` | 글자 색상 | `red`, `#1a73e8`, `rgb(0,0,0)` |
| `text-align` | 가로 정렬 | `left`, `center`, `right`, `justify` |
| `text-decoration` | 밑줄·취소선 등 장식 | `none`, `underline`, `line-through` |
| `text-shadow` | 그림자 효과 | `가로 세로 번짐 색상` |

```css
/* text-shadow: 가로offset 세로offset 번짐정도 색상 */
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
```

> `text-decoration: none`은 `<a>` 태그의 기본 밑줄을 제거할 때 자주 사용합니다.

---

## 4. 간격 조절 (Spacing)

글자·단어·줄 사이의 간격을 조절하여 텍스트 밀도를 관리합니다.

| 속성 | 설명 | 특징 |
|------|------|------|
| `letter-spacing` | 자간 (글자 사이 간격) | 음수 사용 시 글자가 겹침 |
| `word-spacing` | 어간 (단어 사이 간격) | 단어와 단어 사이 공백 조절 |
| `line-height` | 행간 (줄 사이 간격) | 단위 없는 숫자 → 폰트 크기의 배수 |

```css
p {
  letter-spacing: -1px;  /* 자간 축소 */
  word-spacing: 2px;     /* 어간 확대 */
  line-height: 1.6;      /* 행간 = font-size × 1.6 */
}
```
