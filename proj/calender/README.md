# 이벤트 캘린더 (Event Calendar)

순수 HTML · CSS · JavaScript와 Python 경량 서버로 구성된 이벤트 관리 캘린더입니다.  
별도의 프레임워크나 외부 라이브러리 없이 동작하며, 이벤트 데이터는 `events.json` 파일에 영구 저장됩니다.

---

## 파일 구성

```
calender/
├── index.html    # 애플리케이션 HTML 구조 (뼈대)
├── style.css     # 전체 스타일 및 반응형 레이아웃
├── app.js        # 캘린더 로직, 렌더링, API 통신
├── events.json   # 이벤트 데이터 저장소 (서버가 읽고 씀)
├── server.py     # Python HTTP 서버 (정적 파일 서빙 + REST API)
└── README.md     # 이 문서
```

---

## 실행 방법

### 요구 사항

- Python 3.7 이상 (표준 라이브러리만 사용, 별도 설치 불필요)
- 모던 브라우저 (Chrome, Edge, Firefox, Safari 최신 버전)

### 서버 시작

```bash
cd /Users/shannon/Documents/Programming/mango_proj/frontend/basic/proj/calender
python server.py
```

터미널에 아래 메시지가 표시되면 정상 실행된 것입니다.

```
캘린더 서버 실행 중 → http://localhost:8080
```

브라우저에서 `http://localhost:8080` 에 접속합니다.

### 서버 종료

터미널에서 `Ctrl + C` 를 누릅니다.

> **주의:** `index.html` 파일을 브라우저에서 `file://` 로 직접 열면  
> `fetch()` API가 CORS 정책으로 차단되어 동작하지 않습니다.  
> 반드시 `server.py` 를 통해 접속해야 합니다.

---

## 주요 기능

### 캘린더 뷰

| 뷰 | 설명 |
|---|---|
| **월별 뷰** | 한 달 전체를 7×N 그리드로 표시. 기본 뷰 |
| **주별 뷰** | 오늘이 속한 주를 24시간 타임라인으로 표시 |
| **목록 뷰** | 전체 이벤트를 날짜·시간 오름차순으로 나열 |

### 이벤트 관리

| 기능 | 동작 방법 |
|---|---|
| **추가** | 날짜 셀 클릭 또는 `+ 새 이벤트` 버튼 클릭 → 모달에서 입력 후 저장 |
| **수정** | 이벤트 칩 클릭 → 상세 팝업 → 연필(✏) 버튼 → 수정 모달 |
| **삭제** | 상세 팝업의 휴지통(🗑) 버튼 또는 수정 모달의 삭제 버튼 |
| **저장** | 모든 변경사항은 즉시 `events.json` 에 반영됩니다 |

### 이벤트 속성

| 필드 | 필수 여부 | 설명 |
|---|---|---|
| 제목 | 필수 | 이벤트 이름 |
| 날짜 | 필수 | YYYY-MM-DD 형식 |
| 시간 | 선택 | HH:MM 형식. 미입력 시 주별 뷰 00시 슬롯에 배치 |
| 카테고리 | 필수 (기본: 개인 일정) | 개인 일정 / 업무 / 가족 / 공휴일 |
| 메모 | 선택 | 자유 형식 텍스트 |

### 카테고리 색상

| 카테고리 | 색상 | 코드 |
|---|---|---|
| 개인 일정 | 파랑 | `blue` |
| 업무 | 초록 | `green` |
| 가족 | 주황 | `orange` |
| 공휴일 | 보라 | `purple` |

사이드바의 체크박스로 카테고리별 이벤트를 표시/숨김할 수 있습니다.

### 반응형 레이아웃

| 화면 크기 | 동작 |
|---|---|
| > 900px (데스크탑) | 사이드바 항상 표시, 전체 레이아웃 |
| ≤ 900px (태블릿) | 보기 탭 숨김, 폰트 크기 축소 |
| ≤ 640px (모바일) | 사이드바 → 햄버거 드로어, 모달 → 하단 바텀시트 |
| ≤ 380px (소형폰) | 이벤트 칩 대신 색상 점(dot)으로 표시 |

### 단축키

| 키 | 동작 |
|---|---|
| `Esc` | 열린 모달 또는 팝업 닫기 |
| `Enter` | 모달 제목 입력 중 저장 |

---

## 아키텍처

### 데이터 흐름

```
브라우저 (app.js)
    │
    │ GET  /api/events   (페이지 로드 시)
    │ POST /api/events   (이벤트 추가·수정·삭제 시)
    │
    ▼
server.py (Python HTTP 서버)
    │
    │ read / write
    │
    ▼
events.json (데이터 파일)
```

### 상태 관리 (app.js)

```javascript
const state = {
  year:         // 현재 표시 중인 연도
  month:        // 현재 표시 중인 월 (0-indexed)
  view:         // 활성 뷰: 'month' | 'week' | 'list'
  events:       // events.json에서 로드한 이벤트 배열
  editingId:    // 수정 중인 이벤트 id (추가 시 null)
  hiddenCats:   // 숨김 카테고리 Set
  popupEventId: // 현재 열린 팝업의 이벤트 id
};
```

상태가 변경될 때마다 `renderAll()` 을 호출하여 UI를 갱신합니다.

### REST API (server.py)

| 메서드 | 경로 | 설명 | 응답 |
|---|---|---|---|
| `GET` | `/api/events` | events.json 전체 읽기 | `200` + JSON 배열 |
| `POST` | `/api/events` | events.json 전체 덮어쓰기 | `200` + `{"ok": true}` |
| `OPTIONS` | `/api/events` | CORS Preflight | `204` |
| `GET` | `/favicon.ico` | 아이콘 없음 처리 | `204` |
| `GET` | `/*` | 정적 파일 서빙 | `200` / `404` |

---

## 주요 함수 목록 (app.js)

### API 통신

| 함수 | 설명 |
|---|---|
| `fetchEvents()` | GET /api/events → 이벤트 배열 반환 (async) |
| `saveEvents()` | POST /api/events → state.events 전체 저장 (async) |

### 렌더링

| 함수 | 설명 |
|---|---|
| `renderAll()` | 헤더 + 미니 캘린더 + 현재 뷰 전체 갱신 |
| `renderHeader()` | 툴바 연월 텍스트 갱신 |
| `renderMiniCal()` | 사이드바 미니 캘린더 생성 |
| `renderMonthView()` | 월별 7×N 그리드 생성 |
| `renderWeekView()` | 주별 24시간 타임라인 생성 |
| `renderListView()` | 목록형 이벤트 나열 |
| `switchView(view)` | 뷰 전환 및 해당 뷰 렌더링 |

### 이벤트 CRUD

| 함수 | 설명 |
|---|---|
| `openModal(dateStr, editId)` | 추가/수정 모달 열기 |
| `closeModal()` | 모달 닫기 |
| `saveEvent()` | 모달 폼 검증 및 이벤트 저장 (async) |
| `deleteEvent(id)` | 이벤트 삭제 후 파일 갱신 (async) |
| `showEventPopup(id, anchorEl)` | 상세 팝업 표시 (위치 자동 계산) |
| `closePopup()` | 팝업 닫기 |

### 헬퍼

| 함수 | 설명 |
|---|---|
| `toDateKey(date)` | Date → "YYYY-MM-DD" 문자열 변환 |
| `formatDateKo(dateStr, timeStr)` | "2026년 4월 7일 (화) 14:00" 형식으로 변환 |
| `visibleEvents()` | 숨김 카테고리 제외 후 표시 가능한 이벤트 반환 |
| `escHtml(str)` | XSS 방지용 HTML 특수문자 이스케이프 |
| `genId()` | 타임스탬프 기반 고유 ID 생성 |

---

## events.json 형식

```json
[
  {
    "id": "s1",
    "title": "팀 미팅",
    "date": "2026-04-03",
    "time": "10:00",
    "category": "green",
    "note": "주간 스프린트 계획"
  }
]
```

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | string | 고유 식별자 (`genId()`로 생성) |
| `title` | string | 이벤트 제목 (필수) |
| `date` | string | `"YYYY-MM-DD"` 형식 |
| `time` | string | `"HH:MM"` 형식, 빈 문자열 허용 |
| `category` | string | `"blue"` \| `"green"` \| `"orange"` \| `"purple"` |
| `note` | string | 메모, 빈 문자열 허용 |

---

## 개발 이력

| 단계 | 내용 |
|---|---|
| 1차 | HTML + CSS만으로 정적 캘린더 UI 구현 |
| 2차 | JavaScript 추가 → 동적 렌더링, 이벤트 CRUD, 반응형 레이아웃 구현 |
| 3차 | 이벤트 데이터를 `events.json`으로 분리, Python 서버(`server.py`) 추가하여 파일 읽기/쓰기 구현 |
| 4차 | `server.py` 버그 수정 (favicon 404 오류, `log_message` `HTTPStatus` 파싱 오류) |
| 5차 | 전체 코드 상세 주석 추가 및 README 작성 |
