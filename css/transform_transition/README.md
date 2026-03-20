# CSS Transform & Transition

JavaScript 없이 CSS만으로 요소의 형태를 변형하고, 그 변화를 부드럽게 연출하는 방법을 정리합니다.

---

## 1. Transform: 형태 변형

요소의 크기·회전·위치·기울기를 **시각적으로** 변경합니다.
실제 레이아웃(문서 흐름)에는 영향을 주지 않고, 눈에 보이는 모습만 바뀝니다.

> 레이아웃을 건드리지 않으므로 **리플로우가 발생하지 않아** 성능상 유리합니다.
> `top`/`left` 이동보다 `translate()`가 권장되는 이유입니다.

### 주요 함수

| 함수 | 설명 | 예시 |
|------|------|------|
| `scale(x, y)` | 크기 확대·축소 (1 = 원래 크기) | `scale(1.2)` → 1.2배 확대 |
| `rotate(deg)` | 시계 방향으로 회전 | `rotate(45deg)` → 45도 회전 |
| `translate(x, y)` | x·y 방향으로 이동 | `translate(50px, -10px)` |
| `skew(x, y)` | x·y 축으로 기울임 | `skewX(20deg)` |
| `scaleX(n)` / `scaleY(n)` | 가로 또는 세로만 축소·확대 | `scaleX(0.5)` → 가로만 절반 |
| `translateX(n)` / `translateY(n)` | 한 축만 이동 | `translateY(-5px)` → 위로 5px |
| `matrix(...)` | 위 함수들을 수학적으로 조합 | 고급 변형 시 사용 |

```css
/* 단일 변형 */
transform: scale(1.2);
transform: rotate(45deg);
transform: translate(50px, -10px);

/* 여러 함수를 공백으로 이어 쓰면 왼쪽부터 순서대로 적용됨 */
transform: scale(1.1) translateY(-5px) rotate(10deg);
```

> **주의**: `transform`에 여러 함수를 쓸 때 순서가 결과에 영향을 줍니다.
> `rotate` 후 `translate`와 `translate` 후 `rotate`는 결과가 다릅니다.

### transform-origin: 변형 기준점

기본 기준점은 요소의 **정중앙(50% 50%)** 입니다.

```css
transform-origin: top left;    /* 왼쪽 상단 기준으로 회전·확대 */
transform-origin: 0 0;         /* 위와 동일 (수치로 지정) */
transform-origin: center;      /* 기본값 */
transform-origin: 100% 100%;   /* 오른쪽 하단 */
```

---

## 2. Transition: 부드러운 전환

CSS 속성값이 변경될 때(예: `:hover`), 그 변화를 일정 시간 동안 **부드럽게 애니메이션** 처리합니다.
변경 전 상태의 요소에 선언해야 합니다.

### 세부 속성

| 속성 | 설명 | 예시 |
|------|------|------|
| `transition-property` | 전환 효과를 적용할 속성 | `all`, `transform`, `background-color` |
| `transition-duration` | 전환이 지속되는 시간 | `0.3s`, `500ms` |
| `transition-timing-function` | 속도 변화 곡선 (가속도) | `ease`, `linear`, `ease-in-out` |
| `transition-delay` | 전환 시작 전 대기 시간 | `0.1s` |

### 단축 속성

```css
/* transition: 속성명  지속시간  타이밍함수  대기시간 */
transition: all        0.3s      ease-out    0s;

/* 여러 속성에 각각 다른 설정 */
transition: background-color 0.3s ease, transform 0.5s ease-in-out;
```

> `transition-property: all`은 편리하지만, 변하지 않는 속성까지 감시하므로
> 성능이 중요한 경우 `transform`, `opacity` 등 **필요한 속성만** 명시하는 것이 좋습니다.

### timing-function 비교

| 값 | 설명 | 체감 |
|----|------|------|
| `linear` | 일정한 속도 | 기계적, 단조로운 느낌 |
| `ease` | 시작·끝 느리고 중간 빠름 (기본값) | 자연스러운 느낌 |
| `ease-in` | 천천히 시작 → 점점 빠름 | 무거운 느낌 |
| `ease-out` | 빠르게 시작 → 점점 느림 | 튀어나오는 느낌 |
| `ease-in-out` | 천천히 시작 → 빠름 → 천천히 끝 | 가장 부드러운 느낌 |
| `cubic-bezier(x1,y1,x2,y2)` | 직접 베지어 곡선 커스텀 | 완전 자유 제어 |

```css
/* cubic-bezier로 스프링 튀기는 효과 */
transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## 3. Transform + Transition 조합 패턴

실무에서 자주 쓰이는 조합 예시입니다.

### 버튼 hover 효과

```css
.btn {
  background-color: #3498db;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  background-color: #2ecc71;
  transform: scale(1.1) translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
```

### 카드 뒤집기 효과 (3D)

```css
.card { transform-style: preserve-3d; transition: transform 0.6s ease; }
.card:hover { transform: rotateY(180deg); }
```

### 이미지 확대 + 오버레이

```css
.img-wrap { overflow: hidden; }
.img-wrap img { transition: transform 0.4s ease; }
.img-wrap:hover img { transform: scale(1.1); }
```

---

## 4. Transition이 적용되는 속성

수치로 계산 가능한 속성에만 transition이 동작합니다.

| 분류 | 속성 |
|------|------|
| 박스 모델 | `width`, `height`, `margin`, `padding`, `border-radius` |
| 색상·배경 | `color`, `background-color`, `opacity` |
| 위치·변형 | `top`, `left`, `right`, `bottom`, `transform` |
| 텍스트 | `font-size`, `letter-spacing`, `text-shadow` |
| 기타 | `box-shadow`, `z-index` |

> `display: none → block` 처럼 **이산값(숫자로 보간 불가)** 은 transition이 적용되지 않습니다.
> 이 경우 `opacity` + `visibility`를 함께 전환하는 방법을 사용합니다.
>
> ```css
> /* display: none 대신 opacity + visibility 조합으로 전환 */
> .tooltip { opacity: 0; visibility: hidden; transition: opacity 0.3s, visibility 0.3s; }
> .tooltip.show { opacity: 1; visibility: visible; }
> ```
