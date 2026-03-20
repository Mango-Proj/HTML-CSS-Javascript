# CSS 레이아웃 (Display · Position · Flexbox · Grid)

HTML 요소를 화면에 배치하는 핵심 레이아웃 속성들을 정리합니다.

---

## 1. Display: 요소의 흐름 결정

브라우저가 HTML 요소를 어떻게 화면에 그릴지 결정하는 가장 기본적인 속성입니다.

| 값 | 특징 | 대표 태그 |
|----|------|-----------|
| `block` | 가로 전체 차지, 줄 바꿈 발생. `width`·`height`·여백 자유롭게 지정 가능 | `div`, `h1`, `p`, `ul` |
| `inline` | 콘텐츠 크기만큼 차지, 줄 바꿈 없음. `width`·`height` 지정 불가, 상하 여백 제한 | `span`, `a`, `strong` |
| `inline-block` | 한 줄에 나열되지만 `width`·`height`·여백 지정 가능. 두 방식의 장점 결합 | - |
| `none` | 요소가 보이지 않으며 **공간도 차지하지 않음** | - |
| `flex` | 자식을 1차원(가로 또는 세로)으로 정렬하는 컨테이너 | - |
| `grid` | 자식을 2차원(행 + 열)으로 배치하는 컨테이너 | - |

```css
span { display: block; }         /* inline → block으로 변환 */
div  { display: inline-block; }  /* block이지만 한 줄에 나열 */
.hidden { display: none; }       /* DOM에서 공간 제거 */
```

> **`display: none` vs `visibility: hidden`**
> - `display: none` → 요소가 완전히 사라지고 **공간도 사라짐**
> - `visibility: hidden` → 요소가 보이지 않지만 **공간은 유지됨**

---

## 2. Position: 자유로운 위치 배치

`static`을 제외한 모든 값은 `top`, `bottom`, `left`, `right` 좌표 속성과 함께 사용합니다.

| 값 | 기준점 | 설명 |
|----|--------|------|
| `static` | - | 기본값. HTML 선언 순서대로 배치, 좌표 속성 무시 |
| `relative` | 자기 자신의 원래 위치 | 원래 자리를 유지하면서 상대적으로 이동. **빈 공간 유지됨** |
| `absolute` | `static`이 아닌 가장 가까운 조상 | 조상 기준으로 절대 위치. **문서 흐름에서 제거됨** |
| `fixed` | 뷰포트(브라우저 창) | 스크롤해도 항상 같은 자리에 고정 |
| `sticky` | 스크롤 위치 | 평소엔 `relative`처럼 동작하다가, 지정 위치에 도달하면 `fixed`처럼 고정 |

```css
/* absolute를 사용하려면 부모에 position: relative가 필요 */
.parent { position: relative; }
.child  { position: absolute; top: 10px; right: 10px; }

/* 스크롤해도 상단에 고정되는 헤더 */
header { position: sticky; top: 0; }
```

### z-index: 층 쌓기

`position`이 `static`이 아닌 요소끼리 겹칠 때, 숫자가 클수록 앞(위)에 표시됩니다.

```css
.modal   { position: fixed; z-index: 100; }
.overlay { position: fixed; z-index: 99;  }
.header  { position: sticky; z-index: 10; }
```

> `z-index`는 같은 **쌓임 맥락(stacking context)** 안에서만 비교됩니다.

---

## 3. Flexbox: 1차원 레이아웃

단일 축(가로 **또는** 세로)을 따라 요소를 정렬합니다.
**컨테이너(부모)** 에 `display: flex`를 선언하면 **아이템(자식)** 들이 flex 규칙을 따릅니다.

### 컨테이너 속성 (부모에 적용)

```css
.container {
  display: flex;

  /* 주축 방향: row(기본,가로) | column(세로) | row-reverse | column-reverse */
  flex-direction: row;

  /* 줄 바꿈: nowrap(기본) | wrap | wrap-reverse */
  flex-wrap: wrap;

  /* 단축 속성: flex-direction + flex-wrap */
  flex-flow: row wrap;

  /* 주축 정렬: flex-start | flex-end | center | space-between | space-around | space-evenly */
  justify-content: space-between;

  /* 교차축 정렬(한 줄): stretch(기본) | flex-start | flex-end | center | baseline */
  align-items: center;

  /* 교차축 정렬(여러 줄, flex-wrap: wrap일 때 의미 있음) */
  align-content: flex-start;

  /* 아이템 사이 간격 */
  gap: 20px;
}
```

### 아이템 속성 (자식에 적용)

```css
.item {
  /* 남은 공간을 나눠 갖는 비율 (기본값: 0) */
  flex-grow: 1;

  /* 공간 부족 시 줄어드는 비율 (기본값: 1) */
  flex-shrink: 0;

  /* 아이템의 기본 크기 (기본값: auto) */
  flex-basis: 200px;

  /* 단축 속성: grow shrink basis */
  flex: 1 0 200px;

  /* 자신만 교차축 정렬 개별 지정 */
  align-self: flex-end;

  /* 시각적 순서 변경 (기본값: 0, 낮을수록 앞에 배치) */
  order: -1;
}
```

### justify-content 값 비교

```
flex-start   : [A][B][C]               →  왼쪽 정렬
flex-end     :               [A][B][C] →  오른쪽 정렬
center       :      [A][B][C]          →  가운데 정렬
space-between: [A]      [B]      [C]   →  첫·끝 붙이고 나머지 균등 분배
space-around :  [A]    [B]    [C]      →  각 아이템 양쪽 동일 간격
space-evenly :   [A]   [B]   [C]      →  모든 간격 동일
```

---

## 4. Grid: 2차원 레이아웃

행(Row)과 열(Column)을 동시에 사용하여 격자형 레이아웃을 만듭니다.

### 컨테이너 속성 (부모에 적용)

```css
.container {
  display: grid;

  /* 열 3개: 200px 고정 + 나머지 공간 1:2로 분배 */
  grid-template-columns: 200px 1fr 2fr;

  /* repeat(반복 횟수, 크기): 열 4개를 동일하게 */
  grid-template-columns: repeat(4, 1fr);

  /* 행 크기 지정 */
  grid-template-rows: 80px 1fr 60px;

  /* 셀 사이 간격 */
  gap: 10px;               /* 행·열 모두 */
  row-gap: 10px;           /* 행 간격만 */
  column-gap: 20px;        /* 열 간격만 */
}
```

### fr 단위

`fr`은 **남은 공간의 비율**을 나타내는 그리드 전용 단위입니다.

```css
grid-template-columns: 1fr 2fr 1fr;
/* 전체를 4등분 → 왼쪽 1칸, 가운데 2칸, 오른쪽 1칸 */
```

### minmax() · auto-fill · auto-fit

```css
/* 최소 150px, 최대 1fr로 자동 조절 */
grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
/* auto-fill: 빈 셀이라도 공간 유지 */
/* auto-fit : 빈 셀을 접어서 남은 공간을 아이템에 배분 */
```

### grid-template-areas: 영역 이름으로 레이아웃 설계

```css
.wrapper {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 80px 1fr 60px;
  grid-template-areas:
    "nav  nav"
    "side main"
    "foot foot";
}

header { grid-area: nav; }
aside  { grid-area: side; }
main   { grid-area: main; }
footer { grid-area: foot; }
```

### 아이템 속성 (자식에 적용)

```css
.item {
  /* 열 1번 선에서 3번 선까지 (2칸 차지) */
  grid-column: 1 / 3;

  /* span 키워드: 현재 위치에서 2칸 차지 */
  grid-column: span 2;

  /* 행 2번 선에서 4번 선까지 */
  grid-row: 2 / 4;
}
```

---

## Flexbox vs Grid 선택 기준

| 상황 | 권장 |
|------|------|
| 메뉴바, 카드 한 줄 나열 등 **1방향** 배치 | **Flexbox** |
| 헤더·사이드바·본문 등 **전체 페이지 구조** | **Grid** |
| 카드 그리드처럼 **행과 열 모두** 제어 필요 | **Grid** |
| 아이템 크기가 콘텐츠에 따라 **유동적** | **Flexbox** |

> 실무에서는 **Grid로 큰 틀**을 잡고, **Flexbox로 내부 정렬**을 처리하는 방식을 많이 사용합니다.
