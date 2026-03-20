# Mango Café - CSS 미니 프로젝트

CSS 기초 학습 내용을 종합하여 만든 카페 메뉴 소개 페이지입니다.

---

## 프로젝트 구조

```
project/
├── src/
│   ├── index.html    # 페이지 마크업
│   └── style.css     # 스타일시트
└── README.md
```

---

## 페이지 구성

| 섹션 | 설명 |
|------|------|
| **Header** | 로고 + 네비게이션, 스크롤 시 상단 고정 |
| **Hero** | 전면 배경 + 메인 카피 + CTA 버튼 |
| **Menu** | 커피·논커피·디저트 9가지 카드 그리드 |
| **About** | 카페 소개 텍스트 + 운영 정보 |
| **Newsletter** | 이메일 구독 폼 |
| **Footer** | 저작권 및 주소 정보 |

---

## 적용된 CSS 개념

### [begining] CSS 기초
- 외부 스타일시트 `<link>` 방식으로 연결
- 구글 폰트 웹 폰트 `<link>` 방식 적용

### [selector] 선택자
- 클래스 선택자 `.menu-card`, 아이디 선택자 `#site-header`
- 교집합 선택자 `.menu-card.coffee::before` → 카테고리별 배지 색 분기
- 자손 선택자 `.nav-links a` → 헤더 링크 스타일
- 그룹 선택자 `.section-title.light, .section-sub.light` → 다크 섹션 텍스트

### [textstyle] 텍스트 스타일링
- `font-family`: Noto Sans KR (본문), Playfair Display (제목·로고)
- `font-size`: `rem`, `clamp(min, vw, max)` 반응형 크기
- `letter-spacing`: 로고·배지·서브 타이틀 자간 조절
- `line-height`: 본문 가독성 (1.7~1.9)
- `text-transform: uppercase`: 배지·라벨 대문자 처리

### [unit_color] 단위와 색상
- `rem`: 폰트 크기 (`1rem` = 16px 기준 상대값)
- `vw`: 히어로 제목 반응형 크기 (`clamp(2rem, 5vw, 3.6rem)`)
- `vh`: 히어로 섹션 높이 (`height: 100vh`)
- `rgba()`: 헤더 반투명 배경, 히어로 오버레이
- `hex`: 주요 브랜드 색상 (`#f5a623`, `#2c1810`, `#6b4226`)

### [background] 배경
- `linear-gradient` 레이어 2개 겹쳐 이미지 오버레이 효과 구현
- `background-size: cover` → 카드 이미지 영역을 빈틈없이 채움
- `background-position: center` → 이미지 중앙 기준으로 크롭

### [boxmodel] 박스 모델
- `box-sizing: border-box` → 전체 초기화
- `padding`: 각 섹션·카드·버튼 내부 여백
- `border-radius`: 카드(16px), 버튼(40px pill), 배지(20px)
- `border-left`: 인용문 왼쪽 강조 선
- `box-shadow`: 카드 기본 그림자 + hover 시 강화

### [pseudo] 가상 요소 / 가상 클래스
| 사용처 | 선택자 | 효과 |
|--------|--------|------|
| 섹션 제목 장식 선 | `.section-title::after` | 제목 아래 포인트 색 밑줄 |
| 카드 카테고리 배지 | `.menu-card::before` | 우측 상단 카테고리 표시 |
| 카드 이미지 확대 | `.menu-card:hover .card-img` | hover 시 이미지 scale |
| 짝수 카드 배경 | `.menu-card:nth-child(even)` | 배경색 교차 강조 |
| 첫 번째 info 항목 | `.info-item:first-child` | 상단 border 추가 |
| 입력창 포커스 | `input:focus` | 포인트 색 테두리 + 배경 |
| 버튼 클릭 | `.newsletter-btn:active` | 눌리는 느낌 |
| 드래그 선택 | `::selection` | 포인트 색 배경 |

### [priority_inheritance] 우선순위 / 상속
- `body`에 선언한 `color`, `font-family` → 하위 요소에 자동 상속
- `.footer-copy`에 별도 `color` 미선언 → `#site-footer`의 `#888` 상속
- `.menu-card:nth-child(even)` (점수 20) vs `.menu-card` (점수 10) → nth-child 승리

### [layout] 레이아웃
- **Grid**: `.menu-grid` → `repeat(auto-fill, minmax(280px, 1fr))` 반응형 3열
- **Grid**: `.about-grid` → `1fr 1fr` 2열 소개 레이아웃
- **Flex**: `.header-inner` → 로고·네비 양 끝 정렬
- **Flex**: `.hero-content` → 히어로 요소 세로 중앙 정렬
- **Flex**: `.newsletter-form` → 입력창·버튼 가로 정렬
- **position: sticky** → 헤더 스크롤 고정
- **position: relative/absolute** → 카드 카테고리 배지 위치

### [transform_transition] 변형 / 전환
| 요소 | transform | transition |
|------|-----------|------------|
| 히어로 버튼 hover | `translateY(-4px) scale(1.04)` | `all 0.25s ease-out` |
| 메뉴 카드 hover | `translateY(-8px) scale(1.02)` | `transform 0.3s ease` |
| 카드 이미지 hover | `scale(1.07)` | `transform 0.4s ease` |
| 구독 버튼 hover | `translateY(-3px) scale(1.05)` | `all 0.25s ease-out` |
| 구독 버튼 active | `translateY(0) scale(0.98)` | (즉시) |
| 히어로 등장 | `translateY(30px) → 0` | `@keyframes fadeUp` |

---

## 브라우저에서 열기

```bash
open /Users/shannon/Documents/Programming/mango_proj/frontend/basic/css/project/src/index.html
```
