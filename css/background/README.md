# CSS 배경 스타일링 (Background)

요소의 뒷면에 색상이나 이미지를 입혀 시각적 효과를 줍니다.

---

## 1. 배경 색상 (background-color)

요소의 전체 배경색을 지정합니다. RGB, Hex, 색상 이름 등 모든 색상 표현 방식을 사용할 수 있습니다.

```css
div {
  background-color: skyblue;
  background-color: #1a73e8;
  background-color: rgba(0, 123, 255, 0.5);
}
```

> 배경 이미지보다 아래 레이어에 위치하며, 이미지가 투명하거나 로드 실패 시 배경색이 나타납니다.

---

## 2. 배경 이미지 (background-image)

`url('경로')` 형식으로 이미지를 요소 배경에 적용합니다.

```css
div {
  background-image: url('image.jpg');
}
```

---

## 3. 이미지 크기 조절 (background-size)

이미지가 요소 크기와 다를 때 어떻게 표시할지 결정합니다.

| 값 | 설명 | 특징 |
|----|------|------|
| `auto` | 이미지 원래 크기대로 표시 | 기본값 |
| `contain` | 이미지 전체가 보이도록 맞춤 | 빈 공간이 생길 수 있음 |
| `cover` | 요소 전체 면적을 빈틈없이 채움 | 이미지 일부가 잘릴 수 있음 |
| `px / %` | 직접 수치로 크기 지정 | 비율이 깨질 수 있음 |

```css
background-size: contain;       /* 전체 보이게 */
background-size: cover;         /* 꽉 채우게 */
background-size: 50px 50px;     /* 가로 50px, 세로 50px 고정 */
```

> **contain vs cover 요약**
> - `contain`: 이미지가 잘리지 않음, 여백 발생 가능 → `background-color`로 여백 채우는 것이 일반적
> - `cover`: 여백 없이 꽉 채움, 이미지 가장자리가 잘릴 수 있음

---

## 4. 이미지 반복 제어 (background-repeat)

이미지가 요소보다 작을 경우 반복 방식을 지정합니다.

| 값 | 설명 |
|----|------|
| `repeat` | 가로·세로 모두 반복 (기본값) |
| `repeat-x` | 가로 방향으로만 반복 |
| `repeat-y` | 세로 방향으로만 반복 |
| `no-repeat` | 반복 없이 한 번만 표시 |

```css
background-repeat: no-repeat;  /* 단 한 번만 표시 */
background-repeat: repeat-x;   /* 가로로만 반복 */
```

---

## 5. 배경 단축 속성 (background shorthand)

여러 배경 속성을 한 줄로 묶어 작성할 수 있습니다.

```css
/* 순서: 색상  이미지          반복       위치   / 크기  */
background: skyblue url('bg.png') no-repeat center / cover;
```

> 단축 속성에서 `/` 앞은 `background-position`, 뒤는 `background-size`입니다.
