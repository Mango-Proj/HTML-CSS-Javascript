# CSS 가상 요소와 가상 클래스 (Pseudo)

CSS 선택자에 특수 키워드를 붙여, HTML을 수정하지 않고도 특정 상태나 위치의 요소에 스타일을 적용할 수 있습니다.

---

## 1. 가상 요소 (Pseudo-elements) `::`

HTML 문서에 실제로 존재하지 않는 요소를 CSS로 **가상 생성**하여 스타일을 입힙니다.
선택자 뒤에 `::` (콜론 두 개)를 붙여 사용합니다.

| 가상 요소 | 설명 |
|-----------|------|
| `::before` | 요소의 내용 **앞**에 콘텐츠 추가 |
| `::after` | 요소의 내용 **뒤**에 콘텐츠 추가 |
| `::selection` | 마우스로 드래그하여 **선택된 텍스트** 스타일 지정 |
| `::first-letter` | 텍스트의 **첫 번째 글자**만 선택 |

```css
/* ::before / ::after 는 반드시 content 속성이 있어야 렌더링됨 */
.menu-item::before {
  content: "🍴 ";
}

.menu-item::after {
  content: " (추천)";
  color: red;
}

/* 드래그 선택 시 색상 변경 */
::selection {
  background-color: #ffce00;
  color: #000;
}
```

> `::before`와 `::after`는 `content` 속성이 없으면 화면에 나타나지 않습니다.
> 빈 문자열(`content: ""`)이라도 반드시 선언해야 합니다.

---

## 2. 구조 가상 클래스 (Structural Pseudo-classes) `:`

요소가 부모 안에서 **몇 번째 위치**하는지에 따라 스타일을 적용합니다.
선택자 뒤에 `:` (콜론 한 개)를 붙여 사용합니다.

| 가상 클래스 | 선택 대상 |
|-------------|-----------|
| `:first-child` | 부모의 자식 중 **첫 번째** 요소 |
| `:last-child` | 부모의 자식 중 **마지막** 요소 |
| `:nth-child(n)` | 부모의 자식 중 **n번째** 요소 |

### `:nth-child()` 패턴

| 값 | 선택 대상 |
|----|-----------|
| `2` | 정확히 2번째 요소 |
| `odd` / `2n+1` | 홀수 번째 요소 (1, 3, 5...) |
| `even` / `2n` | 짝수 번째 요소 (2, 4, 6...) |
| `3n` | 3의 배수 번째 요소 (3, 6, 9...) |

```css
li:first-child          { border-top: 2px solid #333; }  /* 첫 번째 */
li:nth-child(even)      { background-color: #f1f2f6; }   /* 짝수 행 */
li:nth-child(3n)        { color: red; }                  /* 3의 배수 */
```

---

## 3. 상태 가상 클래스 (User Action Pseudo-classes) `:`

사용자의 **동작**이나 요소의 **특정 상태**에 따라 동적으로 스타일을 적용합니다.

| 가상 클래스 | 발생 시점 | 주요 활용 |
|-------------|-----------|-----------|
| `:hover` | 마우스 커서를 요소 위에 올렸을 때 | 버튼·링크 강조 효과 |
| `:active` | 요소를 마우스로 누르고 있을 때 | 클릭 누름 효과 |
| `:focus` | 입력창 등에 포커스가 맞춰졌을 때 | `<input>`, `<textarea>` 강조 |
| `:visited` | 이미 방문한 적 있는 링크일 때 | `<a>` 태그 색상 변경 |

```css
.btn:hover  { background-color: #dfe4ea; cursor: pointer; }
.btn:active { transform: scale(0.97); }

input:focus {
  outline: 2px solid #1e90ff;
  background-color: #f1f9ff;
}
```

---

## 가상 요소 vs 가상 클래스 구분

| 구분 | 기호 | 역할 |
|------|------|------|
| 가상 **요소** | `::` (콜론 2개) | HTML에 없는 요소를 CSS로 **생성** |
| 가상 **클래스** | `:` (콜론 1개) | 요소의 **상태나 위치**에 따라 선택 |
