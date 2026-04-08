# ch01 · 브라우저 렌더링 & 이벤트

브라우저가 화면을 그리는 원리와 자바스크립트 이벤트 처리 방식을 학습하는 예제입니다.  
`index.html`을 브라우저에서 열면 모든 개념을 직접 실행하며 확인할 수 있습니다.

---

## 실행 방법

파일을 직접 브라우저에서 열면 됩니다. (별도 서버 불필요)

```
ch01_browser/index.html  →  브라우저로 열기
```

---

## 파일 구성

```
ch01_browser/
├── index.html   # 5개 섹션으로 구성된 인터랙티브 데모 페이지
├── style.css    # 데모 페이지 스타일
├── example.js   # 각 섹션의 동작 로직 (원본 코드 + 추가 코드)
└── README.md    # 이 문서
```

---

## 핵심 개념 요약

### 1. 브라우저 렌더링 프로세스 (6단계)

웹 페이지가 화면에 표시되기까지 브라우저가 수행하는 순서입니다.

| 단계 | 이름 | 설명 |
|------|------|------|
| 1 | **HTML 파싱** | HTML을 읽어 DOM 트리 생성 |
| 2 | **CSS 파싱** | CSS를 읽어 CSSOM 트리 생성 |
| 3 | **렌더 트리** | DOM + CSSOM 결합. `display:none` 요소는 제외 |
| 4 | **Layout** | 각 요소의 위치·크기 계산 (리플로우) |
| 5 | **Paint** | 색상·이미지 등 시각적 스타일을 픽셀로 렌더링 (리페인트) |
| 6 | **Composite** | 여러 레이어를 합쳐 최종 화면 출력 |

---

### 2. 리플로우 vs 리페인트 vs 컴포지트

렌더링 비용이 어느 단계에서 발생하는지에 따라 성능 차이가 납니다.

| 종류 | 유발 속성 예시 | 실행 단계 | 비용 |
|------|---------------|-----------|------|
| **리플로우 (Reflow)** | `width`, `height`, `margin`, `top` | Layout → Paint → Composite | 🔴 높음 |
| **리페인트 (Repaint)** | `color`, `background`, `border-color` | Paint → Composite | 🟡 중간 |
| **컴포지트 전용** | `transform`, `opacity` | Composite 만 | 🟢 낮음 |

**최적화 전략:**

```js
// ❌ 리플로우 2번 유발 (width, height 각각 변경)
el.style.width  = '200px';
el.style.height = '100px';

// ✅ 클래스 하나만 변경 → 렌더링 연산 최소화
el.classList.toggle('active');

// ✅ transform 사용 → Layout·Paint 생략, Composite만
el.style.transform = 'translateX(200px)';
```

---

### 3. DocumentFragment — 리플로우 최소화

여러 DOM 노드를 추가할 때 Fragment를 사용하면 리플로우를 1회로 줄일 수 있습니다.

```js
// ❌ 루프마다 DOM 반영 → 리플로우 N회
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `항목 ${i}`;
  list.appendChild(li);  // 매번 DOM 업데이트
}

// ✅ Fragment에 모아서 한 번에 삽입 → 리플로우 1회
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `항목 ${i}`;
  fragment.appendChild(li);  // 메모리에서만 처리
}
list.appendChild(fragment);  // DOM 반영은 단 1회
```

---

### 4. 스크립트 로딩 — async vs defer

HTML 파싱을 차단하지 않고 스크립트를 로드하는 방법입니다.

```
<script> (기본)
  파싱 ─────► [중단] ─► 다운로드 ─► 실행 ─► 파싱 재개

async
  파싱 ─────────────────────────────────► [중단] ─► 실행 ─► 재개
         ↳ 다운로드 (병렬)──────────────►

defer (권장)
  파싱 ──────────────────────────────────────────► 완료
         ↳ 다운로드 (병렬)───────────────────────►
                                                    └─► 실행
```

| 구분 | 병렬 다운로드 | 실행 시점 | 실행 순서 보장 | 권장 용도 |
|------|:---:|---|:---:|---|
| `<script>` | ❌ | 다운로드 직후 | ✅ | - |
| `async` | ✅ | 다운로드 직후 | ❌ | 독립적인 스크립트 (광고, 분석 등) |
| `defer` | ✅ | HTML 파싱 완료 후 | ✅ | **일반 앱 스크립트 (권장)** |

```html
<!-- 이 예제에서 사용하는 방식 -->
<script defer src="example.js"></script>
```

---

### 5. 이벤트 전파 — 버블링 & 캡처링

사용자 클릭 이벤트는 DOM 트리를 따라 3단계로 이동합니다.

```
document
  └─ body
       └─ outer        ← 2. 버블링 (올라감)
            └─ middle  ← 2. 버블링
                 └─ inner  ← 1. 타깃 (이벤트 발생)
```

- **캡처링 단계**: `document → … → 타깃`으로 내려가는 단계  
  `addEventListener(type, fn, { capture: true })`
- **타깃 단계**: 이벤트가 발생한 요소 자체
- **버블링 단계**: `타깃 → … → document`로 올라가는 단계 (기본값)

```js
// 버블링 (기본)
el.addEventListener('click', handler);

// 캡처링 단계에서 실행
el.addEventListener('click', handler, { capture: true });

// 전파 중단
el.addEventListener('click', (e) => {
  e.stopPropagation(); // 이 요소 이후로 전파하지 않음
});
```

---

### 6. 이벤트 위임 (Event Delegation)

자식 요소 각각에 리스너를 달지 않고, **공통 부모 하나에만** 등록하는 패턴입니다.  
버블링 덕분에 동적으로 추가된 요소도 처리할 수 있습니다.

```js
// ❌ 각 li마다 리스너 등록 → 동적 추가 li는 처리 불가
document.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', handler);
});

// ✅ 부모 ul에 하나만 등록 → 버블링으로 모든 li 처리
ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    handler(e.target);
  }
});
```

`data-action` 속성 패턴으로 여러 버튼을 하나의 리스너에서 분기할 수 있습니다.

```js
list.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  if (btn.dataset.action === 'done')   { /* 완료 처리 */ }
  if (btn.dataset.action === 'delete') { /* 삭제 처리 */ }
});
```

---

## 예제 데모 섹션 구성

| 섹션 | 주제 | 핵심 확인 포인트 |
|------|------|-----------------|
| **01** | DocumentFragment & 이벤트 위임 | "항목 5개 일괄 추가" 버튼 → 리플로우 1회 / li 클릭 → 위임으로 처리 |
| **02** | 리플로우 vs 리페인트 vs 컴포지트 | 버튼 3개를 클릭해 각 렌더링 단계 로그 확인 |
| **03** | 이벤트 전파 시각화 | 파란 박스 클릭 → 버블링/캡처링 경로 로그 확인 |
| **04** | 이벤트 위임 심화 | 할 일 추가 후 완료·삭제 버튼 동작 확인 |
| **05** | async vs defer | 타임라인 다이어그램 + 실제 DOM 파싱 소요 시간 표시 |

---

## 코드 구분 안내 (`example.js`)

| 표시 | 의미 |
|------|------|
| `[원본 코드]` | 최초 작성된 코드 |
| `[추가 코드]` | 실행 가능한 예제로 만들기 위해 추가된 코드 |
