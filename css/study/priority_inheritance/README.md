# CSS 우선순위와 상속 (Priority & Inheritance)

여러 스타일 규칙이 동일한 요소에 충돌할 때, 브라우저가 어떤 규칙을 적용할지 결정하는 기준을 정리합니다.

---

## 1. CSS 우선순위 (Cascading)

여러 규칙이 같은 요소를 가리킬 때, 브라우저는 **점수 시스템**으로 가장 힘이 센 규칙 하나를 적용합니다.

### 우선순위 점수표

| 순위 | 대상 | 점수 | 예시 |
|------|------|------|------|
| 0 | `!important` | ∞ | `color: red !important` |
| 1 | 인라인 스타일 | 1000 | `<p style="color: red">` |
| 2 | 아이디 선택자 | 100 | `#title` |
| 3 | 클래스 / 가상 클래스 | 10 | `.text`, `:hover` |
| 4 | 태그 선택자 | 1 | `div`, `p`, `h1` |
| 5 | 상속된 속성 | 0 | 부모로부터 전달된 스타일 |

```css
p           { color: green; }   /* 점수: 1  (태그) */
.child      { color: blue; }    /* 점수: 10 (클래스) → 승리 */
#main       { color: red; }     /* 점수: 100 (아이디) → 승리 */
```

> **점수가 같다면?** 가장 **마지막(아래쪽)**에 작성된 코드가 적용됩니다.

### !important 주의사항

```css
.child { color: hotpink !important; }  /* 인라인 스타일도 무시하고 적용 */
```

> `!important`는 모든 우선순위를 무시합니다. 남용하면 스타일 충돌을 추적하기 어려워지므로, 불가피한 경우에만 사용해야 합니다.

---

## 2. CSS 상속 (Inheritance)

부모 요소에 적용된 스타일이 자식 요소에 **자동으로 전달**되는 현상입니다.

### 상속 여부에 따른 속성 분류

| 구분 | 속성 예시 | 이유 |
|------|-----------|------|
| **상속됨** (주로 텍스트 관련) | `color`, `font-family`, `font-size`, `font-weight`, `text-align`, `visibility`, `cursor` | 텍스트 스타일은 자식에게도 동일하게 적용되는 것이 자연스러움 |
| **상속 안됨** (주로 레이아웃 관련) | `margin`, `padding`, `border`, `width`, `height`, `display`, `background` | 부모의 테두리·여백이 자식까지 복제되면 레이아웃이 무너짐 |

```css
.parent {
  color: blue;       /* ✅ 자식에게 상속됨 */
  border: 1px solid; /* ❌ 자식에게 상속되지 않음 */
}
```

---

## 3. 상속 명시적 제어 (Control Keywords)

속성값 키워드로 상속 여부를 강제로 지정할 수 있습니다.

| 키워드 | 의미 |
|--------|------|
| `inherit` | 부모의 값을 **강제로** 물려받음 |
| `initial` | 브라우저 **기본값(초기값)**으로 되돌림 |
| `unset` | 상속되는 속성이면 `inherit`, 아니면 `initial`로 자동 처리 |

```css
.control-group { color: orange; }

/* 원래 상속이 안 되는 속성도 부모 값을 강제로 받아옴 */
.use-inherit { color: inherit; }

/* 부모나 클래스 스타일을 무시하고 브라우저 기본값으로 초기화 */
.use-initial {
  color: initial;      /* black (브라우저 기본) */
  font-size: initial;  /* 16px (브라우저 기본) */
}
```
