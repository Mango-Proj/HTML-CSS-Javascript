# CSS: 웹 페이지에 생명력을 불어넣는 스타일 시트

---

## 1. CSS의 정의와 역할

**CSS**는 Cascading Style Sheets의 약자로, HTML 문서의 스타일을 정의하는 언어입니다.

| 역할 | 설명 |
|------|------|
| **HTML** (뼈대) | 제목, 문단, 이미지, 표 등 콘텐츠의 구조를 만듭니다. |
| **CSS** (디자인) | 색상, 폰트 크기, 간격, 배치(레이아웃) 등 시각적인 요소를 결정합니다. |

---

## 2. CSS 기본 문법 (Syntax)

CSS는 스타일을 적용할 대상을 선택하고, 어떤 속성을 어떤 값으로 바꿀지 선언하는 구조로 이루어져 있습니다.

### 기본 구조

```css
선택자 {
  속성: 값;
  속성: 값;
}
```

- **선택자 (Selector)**: 스타일을 입힐 HTML 요소를 지목합니다. (예: `h1`, `p`, `div`)
- **속성 (Property)**: 변경하고 싶은 특징입니다. (예: `color`, `font-size`)
- **값 (Value)**: 속성에 부여할 구체적인 설정입니다. (예: `red`, `20px`)

### 주석 처리 (Comments)

코드에 대한 설명이나 메모를 남길 때 사용하며, 브라우저는 이 부분을 실행하지 않습니다.

```css
/* 한 줄 주석입니다 */

/* 여러 줄 주석입니다.
   코드의 특정 부분을 임시로
   차단할 때도 사용합니다. */
```

---

## 3. CSS 적용 방식 3가지

HTML에 CSS를 연결하는 방법은 총 세 가지가 있으며, 상황에 따라 적절한 방법을 선택합니다.

### ① 인라인 스타일 (Inline Style)

HTML 태그 안에 `style` 속성을 직접 적는 방식입니다. 해당 요소 하나에만 즉각 적용됩니다.

```html
<h1 style="color: blue; text-decoration: underline;">인라인 스타일 예제</h1>
```

### ② 내부 스타일 시트 (Internal Style Sheet)

HTML 문서의 `<head>` 태그 안에 `<style>` 태그를 만들어 작성하는 방식입니다. 해당 HTML 파일 전체에 적용됩니다.

```html
<head>
  <style>
    p {
      color: gray;
      line-height: 1.5;
    }
  </style>
</head>
```

### ③ 외부 스타일 시트 (External Style Sheet) ✨ 권장 방식

별도의 `.css` 파일을 만들고 HTML에서 `<link>` 태그로 연결하는 방식입니다.
여러 페이지에 동일한 디자인을 일괄 적용할 수 있어 가장 많이 사용됩니다.

**1. `styles.css` 파일 작성**

```css
/* 별도의 CSS 파일 */
body {
  background-color: #f4f4f4;
}
h2 {
  color: navy;
}
```

**2. HTML 파일에서 연결**

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h2>외부 스타일 시트 연결 성공!</h2>
</body>
```
