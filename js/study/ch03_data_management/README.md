# ch03 · 데이터 관리: 불변성, 모듈화, 스토리지

자바스크립트의 데이터 관리 핵심 패턴을 인터랙티브 데모로 학습합니다.

---

## 실행 방법

ES 모듈(`import/export`)을 사용하므로 **반드시 HTTP 서버**를 통해 열어야 합니다.  
`file://` 프로토콜로 직접 열면 CORS 오류로 모듈이 로드되지 않습니다.

```bash
# Python 내장 서버
python3 -m http.server 8080
# → http://localhost:8080/ch03_data_management/ 접속
```

> **왜 서버가 필요한가?**  
> `<script type="module">` 은 브라우저의 동일 출처 정책(CORS)을 따릅니다.  
> `file://` URL에서는 모듈 간 import가 차단되므로 반드시 HTTP/HTTPS로 서빙해야 합니다.

---

## 파일 구성

| 파일 | 역할 |
|------|------|
| `index.html` | 5개 섹션 인터랙티브 데모 페이지 |
| `style.css` | 라이트/다크 모드 지원 스타일 (CSS 변수 기반) |
| `main.js` | 원본 테마 토글 + 5개 섹션 데모 로직 (ES 모듈) |
| `theme.js` | `saveTheme` / `loadTheme` 유틸 모듈 (export) |
| `cookie_example.js` | 쿠키 기본 사용법 독립 예제 (참고용) |
| `README.md` | 이 문서 |

---

## 학습 내용

### 1. 불변성 (Immutability)

데이터를 직접 수정하지 않고, 변경이 필요할 때 새로운 데이터를 생성하는 원칙입니다.

**`const`의 오해**

```js
// const는 '재할당'만 막습니다 — 배열·객체 내부 변경은 허용됩니다
const arr = [1, 2, 3];
arr.push(4);    // ✅ 가능! 원본 배열이 [1, 2, 3, 4]로 변경됨
arr = [1, 2];   // ❌ TypeError: Assignment to constant variable
```

**배열 불변성**

```js
const original = [1, 2, 3];

// ⚠️ 가변 방식: 원본 배열이 수정됩니다
original.push(4);
// original → [1, 2, 3, 4] ← 원본이 변경됨!

// ✅ 불변 방식: 원본을 유지하고 새 배열을 생성합니다
const newArr = [...original, 4];
// original → [1, 2, 3] (보존)  /  newArr → [1, 2, 3, 4] (새 배열)
```

**객체 불변성**

```js
const user = { name: 'Alice', score: 100 };

// ⚠️ 가변 방식: 원본 객체가 수정됩니다
user.score = 200;
// user → { name: 'Alice', score: 200 } ← 원본 변경!

// ✅ 불변 방식: spread로 원본을 복사하고 변경할 프로퍼티만 덮어씁니다
const newUser = { ...user, score: 200 };
// user    → { name: 'Alice', score: 100 } (보존)
// newUser → { name: 'Alice', score: 200 } (새 객체)
```

> **왜 불변성이 중요한가?**  
> - 참조를 공유하는 다른 코드에서 예상치 못한 값 변경을 방지합니다  
> - 상태 변화를 추적하기 쉬워 디버깅이 용이합니다  
> - React 등 UI 프레임워크의 상태 비교(re-render 최적화)에 필수입니다

**데모**: 배열/객체 가변·불변 버튼을 클릭하여 원본 데이터 변화 여부를 시각적으로 확인합니다.

---

### 2. 모듈화 (Modularization)

코드를 역할에 따라 독립 파일로 분리하여 관리합니다.

```js
// theme.js — 기능을 내보냅니다 (export)
export const THEME_KEY = 'user_theme';

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}
```

```js
// main.js — 필요한 기능을 가져옵니다 (import)
import { saveTheme, loadTheme, THEME_KEY } from './theme.js';

const theme = loadTheme();       // localStorage에서 로드
document.body.className = theme; // 테마 적용

document.getElementById('theme-btn').addEventListener('click', () => {
  const newTheme = document.body.className === 'light' ? 'dark' : 'light';
  document.body.className = newTheme;
  saveTheme(newTheme);           // localStorage에 저장
});
```

**ES 모듈 핵심 규칙**

| 항목 | 설명 |
|------|------|
| `export` | 다른 파일에서 사용할 수 있도록 공개 |
| `import` | 다른 모듈의 공개 항목을 현재 파일로 가져옴 |
| `type="module"` | HTML에서 모듈 스크립트임을 선언 |
| 스코프 | 모듈은 자체 스코프를 가져 전역 변수 오염 없음 |
| 로딩 | `type="module"`은 기본적으로 `defer` 처럼 동작 |

**데모**: 헤더의 다크 모드 버튼을 클릭하면 `saveTheme()`이 호출되고 `localStorage`에 저장됩니다. 새로고침 후에도 테마가 유지됩니다.

---

### 3. localStorage

브라우저를 닫아도 유지되는 영구 저장소입니다.

```js
// 저장
localStorage.setItem('username', 'Alice');

// 읽기
const name = localStorage.getItem('username');  // 'Alice'
const none = localStorage.getItem('nokey');     // null (없는 키)

// 삭제
localStorage.removeItem('username');

// 전체 삭제
localStorage.clear();

// 객체 저장 시 JSON 직렬화 필요
const obj = { age: 25, city: 'Seoul' };
localStorage.setItem('user', JSON.stringify(obj));
const loaded = JSON.parse(localStorage.getItem('user'));
```

**데모**: 키/값 입력 후 setItem → getItem → removeItem → clear 순서로 CRUD를 실습하고 실시간 테이블로 저장 상태를 확인합니다.

---

### 4. sessionStorage

탭(창)을 닫으면 자동으로 삭제되는 임시 저장소입니다.  
API는 localStorage와 완전히 동일합니다.

```js
// API는 localStorage와 동일 — 객체명만 다릅니다
sessionStorage.setItem('tempData', '임시값');
sessionStorage.getItem('tempData');
sessionStorage.removeItem('tempData');
sessionStorage.clear();
```

**localStorage vs sessionStorage 비교**

| 특성 | localStorage | sessionStorage |
|------|-------------|----------------|
| 유지 기간 | 영구 (명시적 삭제 전) | 탭·창 닫힘 시 자동 삭제 |
| 탭 간 공유 | ✅ 같은 도메인 모든 탭 공유 | ❌ 각 탭마다 독립 |
| 주요 용도 | 테마, 설정, 자동 로그인 | 임시 입력, 일회성 데이터 |
| 저장 한도 | 약 5~10 MB | 약 5~10 MB |

**데모**: sessionStorage에 데이터를 저장한 후 탭을 닫고 다시 열면 데이터가 사라지는 것을 확인합니다.

---

### 5. Cookie

서버 요청 시 HTTP 헤더(`Cookie:`)에 자동으로 포함되는 소규모 데이터입니다.

```js
// 저장: "이름=값; 속성들" 형태로 document.cookie에 할당
document.cookie = "username=Alice; expires=Fri, 31 Dec 2026 12:00:00 UTC; path=/";

// 읽기: 모든 쿠키가 하나의 문자열로 반환됨 → 직접 파싱 필요
console.log(document.cookie);  // "username=Alice; theme=dark"

// 파싱 유틸리티
function parseCookies() {
  return Object.fromEntries(
    document.cookie.split('; ').filter(Boolean).map(pair => {
      const [name, ...rest] = pair.split('=');
      return [decodeURIComponent(name), decodeURIComponent(rest.join('='))];
    })
  );
}

// 삭제: expires를 과거로 설정
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
```

**주요 쿠키 속성**

| 속성 | 설명 |
|------|------|
| `expires` | 만료 날짜 (UTC). 생략 시 세션 쿠키 (탭 닫힘 시 삭제) |
| `path` | 쿠키 유효 경로. `/`로 지정 시 전체 사이트 |
| `domain` | 쿠키 유효 도메인 |
| `Secure` | HTTPS에서만 전송 |
| `HttpOnly` | JS 접근 차단 (서버 Set-Cookie 전용) |
| `SameSite` | 크로스 사이트 요청 시 전송 여부 제어 (CSRF 방어) |

**Storage vs Cookie 비교**

| 항목 | localStorage | sessionStorage | Cookie |
|------|-------------|----------------|--------|
| 서버 전송 | ❌ | ❌ | ✅ 자동 전송 |
| 유지 기간 | 영구 | 탭 세션 | 설정값에 따라 |
| 용량 한도 | ~5 MB | ~5 MB | ~4 KB |
| 접근 | JS | JS | JS + 서버 |

**데모**: 이름·값·만료일을 입력해 쿠키를 저장하고, 목록 새로고침으로 현재 쿠키를 확인하며, 삭제도 직접 실행합니다.

---

## 데모 섹션 요약

| # | 섹션 | 주요 인터랙션 |
|---|------|---------------|
| 01 | 불변성 | 배열/객체 가변·불변 방식 비교, 원본 변화 시각화 |
| 02 | 모듈화 | import/export 다이어그램, 테마 토글 localStorage 영속화 |
| 03 | localStorage | setItem/getItem/removeItem/clear 실시간 CRUD |
| 04 | sessionStorage | 동일 CRUD, 탭 격리 비교 |
| 05 | Cookie | set/read/delete, 속성별 쿠키 저장 |

---

## 코드 구분

`main.js`의 코드는 두 가지로 구분됩니다.

- `[원본 코드]` — 원본 테마 토글 로직 (`import`, `loadTheme`, `saveTheme`, `themeBtn` 핸들러)
- `[추가 코드]` — 인터랙티브 데모를 위해 추가된 코드 (섹션 1~5 핸들러, 스토리지 유틸, 쿠키 유틸 등)
