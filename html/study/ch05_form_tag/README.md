# HTML Form: 데이터 입력 및 전송 가이드

웹 페이지에서 아이디, 비밀번호, 설문 조사 등 사용자의 정보를 입력받아 서버로 전달하는 양식입니다.

---

## 목차

1. [폼의 개념과 구조](#1-폼form의-개념과-구조)
2. [폼을 구성하는 주요 태그](#2-폼을-구성하는-주요-태그)
3. [input 태그의 다양한 타입](#3-input-태그의-다양한-타입)
4. [태그 비교 요약](#4-태그-비교-요약)
5. [종합 예제: 회원가입 양식](#5-종합-예제-회원가입-양식)
6. [폼 작성 시 주의사항](#6-폼-작성-시-주의사항)

---

## 1. 폼(Form)의 개념과 구조

### 서버란 무엇인가요?

> 비유: 주문서와 주방
>
> 카페에서 주문할 때, 직원이 **주문서(Form)** 에 메뉴를 적어 **주방(서버)** 에 전달합니다.  
> 주방은 주문을 받아 음료를 만든 뒤 결과물을 돌려줍니다.
>
> 웹에서도 마찬가지입니다:
> - **Form** = 사용자가 정보를 입력하는 주문서
> - **서버** = 정보를 받아 처리하는 컴퓨터 (데이터베이스에 저장, 로그인 확인 등)
> - **브라우저** = 주문을 전달하고 결과를 받아서 화면에 표시하는 직원

`<form>` 태그는 이 주문서 역할을 합니다. 사용자가 입력한 데이터를 어디로(`action`), 어떤 방식으로(`method`) 보낼지 결정합니다.

### 핵심 속성

| 속성 | 설명 |
|------|------|
| `action` | 데이터를 처리할 서버의 URL 주소 |
| `method` | 데이터를 보내는 HTTP 전송 방식 |

### GET vs POST — 데이터를 어떻게 보낼까?

| 값 | 전송 위치 | 보안 | 적합한 경우 |
|----|-----------|:----:|-------------|
| `GET` | URL 끝에 데이터 노출 (`?key=value`) | 낮음 | 검색, 필터 등 단순 조회 |
| `POST` | HTTP 바디(Body)에 담아 전송 | 높음 | 로그인, 회원가입, 파일 업로드 |

### GET vs POST 실제 차이

**GET 방식** — 주소창에 데이터가 그대로 보입니다:
```
https://search.example.com/results?query=HTML공부&sort=latest
                                   ↑ 이렇게 URL에 노출됨
```

**POST 방식** — 주소창에는 아무것도 보이지 않습니다:
```
https://login.example.com/auth
(비밀번호는 URL이 아닌 요청 바디에 숨겨져 전송됨)
```

> **결론:** 검색처럼 URL을 공유해도 괜찮은 경우 → `GET`  
> 비밀번호·개인정보처럼 숨겨야 하는 경우 → 반드시 `POST`

```html
<form action="/submit-user-info" method="post">
  <!-- 폼 요소들 -->
</form>
```

---

## 2. 폼을 구성하는 주요 태그

사용자에게 어떤 형태의 입력을 받을지에 따라 다양한 태그를 사용합니다.

### 태그 목록

| 태그 | 역할 | 주요 속성 |
|------|------|-----------|
| `<fieldset>` | 관련 입력 요소들을 논리적으로 그룹화 | — |
| `<legend>` | `<fieldset>`의 제목 표시 | — |
| `<label>` | 입력 필드의 이름 표시 | `for` — input의 `id`와 연결 |
| `<input>` | 가장 기본적인 입력 필드 | `type`, `name`, `value`, `placeholder` |
| `<textarea>` | 여러 줄의 긴 텍스트 입력 | `rows`(높이), `cols`(너비) |
| `<select>` | 드롭다운 선택 메뉴 | `name` |
| `<optgroup>` | `<select>` 안의 옵션 그룹화 | `label` |
| `<option>` | `<select>` 안의 각 선택 항목 | `value`, `selected` |
| `<button>` | 폼 제출 / 초기화 버튼 | `type` |

---

### `<label>`과 `<input>` 연결 — 왜 필요할까?

`<label>`의 `for` 속성값과 `<input>`의 `id` 속성값을 일치시키면,
라벨 텍스트를 클릭했을 때 해당 입력창에 자동으로 포커스가 이동합니다.

```html
<label for="uid">아이디:</label>
<input type="text" id="uid" name="userid">
<!--         ↑ for와 id가 일치 → "아이디:" 텍스트 클릭해도 입력창에 커서 이동 -->
```

**왜 중요한가요?**

| 혜택 | 설명 |
|------|------|
| **사용성** | 모바일에서 작은 체크박스 대신 텍스트를 눌러도 선택됩니다 |
| **접근성** | 스크린 리더가 "아이디 입력칸"이라고 음성으로 읽어줍니다 |
| **표준 준수** | `<label>` 없는 `<input>`은 접근성 검사에서 오류로 표시됩니다 |

---

### `name` 속성 — 서버로 데이터를 보내는 열쇠

`name` 속성은 폼 데이터가 서버에 전달될 때 **변수 이름(Key)** 역할을 합니다.
`name`이 없으면 해당 입력값은 서버로 전송되지 않습니다.

```html
<!-- name="userid" → 서버에서 userid라는 이름으로 값을 받음 -->
<input type="text" name="userid" value="kim123">
<!-- 전송 결과: userid=kim123 -->

<!-- name이 없으면 서버에서 받을 수 없음 -->
<input type="text" value="kim123">
<!-- 전송 결과: (아무것도 전송 안 됨) -->
```

---

### `<button>` type 비교

| `type` 값 | 동작 |
|-----------|------|
| `submit` | 폼 데이터를 `action` URL로 전송 (기본값) |
| `reset` | 폼 내 모든 입력값을 초기값으로 되돌림 |
| `button` | 아무 동작 없음 — JavaScript와 함께 사용 |

---

## 3. `<input>` 태그의 다양한 타입

`type` 속성값에 따라 입력 필드의 **모양과 기능**이 완전히 달라집니다.
`<input>` 하나의 태그가 이렇게 다양한 형태로 변신할 수 있습니다.

### 텍스트 및 정보 입력

| `type` 값 | 모양 / 기능 | 특징 |
|-----------|-------------|------|
| `text` | 일반 한 줄 텍스트 | 기본 텍스트 입력 |
| `password` | 마스킹 처리 (●●●) | 입력 내용 숨김 |
| `email` | 이메일 형식 | `@` 포함 여부 자동 검증 |
| `tel` | 전화번호 | 모바일에서 숫자 키패드 활성화 |
| `number` | 숫자만 입력 | `min`, `max`, `step` 속성으로 범위 제한 |

### 선택 입력

| `type` 값 | 모양 / 기능 | 특징 |
|-----------|-------------|------|
| `radio` | 원형 버튼 | 같은 `name` 그룹에서 **하나만** 선택 가능 |
| `checkbox` | 체크박스 | 같은 `name` 그룹에서 **다중** 선택 가능 |
| `file` | 파일 선택 창 | `multiple` 추가 시 다중 파일 선택 가능 |

**radio vs checkbox 선택 기준:**

| 상황 | 사용할 타입 |
|------|-------------|
| 성별 선택 (남 / 여 / 선택 안 함 중 하나) | `radio` |
| 동의 항목 (약관 동의 여부) | `checkbox` |
| 관심 분야 (여러 개 선택 가능) | `checkbox` |

### 기타 유용한 타입

| `type` 값 | 모양 / 기능 |
|-----------|-------------|
| `range` | 슬라이더 — `min`, `max`, `step`으로 범위 설정 |
| `date` | 날짜 선택기 |
| `datetime-local` | 날짜 + 시간 선택기 |
| `color` | 색상 팔레트 선택기 |

### 주요 공통 속성

| 속성 | 설명 | 중요도 |
|------|------|:------:|
| `name` | 서버 전송 시 데이터의 키(Key) | ⭐ **필수** |
| `id` | `<label>`의 `for`와 연결하기 위한 고유 식별자 | ⭐ **접근성** |
| `value` | 초기값 또는 서버로 전송될 실제 값 | — |
| `placeholder` | 입력 전 표시되는 힌트 텍스트 | — |
| `required` | 비워두면 폼 제출이 차단되는 필수 입력 | — |
| `checked` | radio / checkbox의 기본 선택 상태 | — |
| `selected` | option의 기본 선택 상태 | — |
| `disabled` | 입력 불가 + 서버 전송 제외 | — |
| `readonly` | 읽기 전용 (수정 불가, 전송은 됨) | — |

---

## 4. 태그 비교 요약

### 단일 선택 vs 다중 선택

| 상황 | 사용할 태그 |
|------|-------------|
| 하나만 선택 (라디오) | `<input type="radio">` — 같은 `name` 그룹 |
| 여러 개 선택 (체크박스) | `<input type="checkbox">` — 같은 `name` 그룹 |
| 드롭다운 단일 선택 | `<select>` + `<option>` |

### 텍스트 입력 비교

| 상황 | 사용할 태그 |
|------|-------------|
| 짧은 한 줄 입력 | `<input type="text">` |
| 비밀번호 입력 | `<input type="password">` |
| 긴 여러 줄 입력 | `<textarea>` |

---

## 5. 종합 예제: 회원가입 양식

```html
<form action="/submit-user-info" method="post">

  <!-- fieldset: 관련 입력 요소를 그룹으로 묶음 -->
  <fieldset>
    <legend>기본 정보</legend>
    <p>
      <!-- label의 for와 input의 id가 "uid"로 일치 → 텍스트 클릭 시 포커스 이동 -->
      <label for="uid">아이디:</label>
      <input type="text" id="uid" name="userid" required placeholder="5자 이상 입력">
    </p>
    <p>
      <label for="upw">비밀번호:</label>
      <!-- type="password": 입력 내용이 ●●● 으로 마스킹됨 -->
      <input type="password" id="upw" name="userpw" required>
    </p>
  </fieldset>

  <fieldset>
    <legend>추가 정보</legend>
    <p>성별:
      <!-- radio: 같은 name("gender") 그룹 내 하나만 선택 가능 -->
      <label><input type="radio" name="gender" value="m" checked> 남성</label>
      <label><input type="radio" name="gender" value="f"> 여성</label>
      <!--
        checked: 기본으로 선택된 상태
        value: 서버로 전송되는 실제 값 ("m" 또는 "f")
      -->
    </p>
    <p>관심 분야:
      <!-- checkbox: 같은 name이라도 다중 선택 가능 -->
      <label><input type="checkbox" name="hobby" value="html"> HTML</label>
      <label><input type="checkbox" name="hobby" value="css"> CSS</label>
    </p>
  </fieldset>

  <fieldset>
    <legend>상세 설정</legend>
    <p>
      <label for="city">거주 지역:</label>
      <select id="city" name="location">
        <!-- optgroup: 옵션을 카테고리로 묶어 시각적으로 구분 -->
        <optgroup label="서울">
          <option value="gangnam">강남구</option>
          <option value="gangseo" selected>강서구</option>
          <!-- selected: 페이지 로딩 시 기본 선택된 항목 -->
        </optgroup>
        <option value="etc">기타 지역</option>
      </select>
    </p>
    <p>
      <label for="bio">자기소개:</label>
      <!-- textarea: rows(줄 수), cols(글자 너비)로 기본 크기 지정 -->
      <textarea id="bio" name="bio" rows="4" cols="50" placeholder="자신을 소개해 주세요."></textarea>
    </p>
    <p>
      <label for="favcolor">테마 색상:</label>
      <!-- type="color": 색상 팔레트 선택기 표시 -->
      <input type="color" id="favcolor" name="color" value="#00ff00">
    </p>
  </fieldset>

  <!-- submit: 폼 데이터 전송 / reset: 모든 입력값 초기화 -->
  <button type="submit">가입하기</button>
  <button type="reset">초기화</button>

</form>
```

---

## 6. 폼 작성 시 주의사항

### `name` 속성은 필수입니다

`name`이 없으면 서버에서 해당 값을 식별할 수 없어 데이터가 전송되지 않습니다.
`id`는 HTML 내부 연결용이고, `name`은 서버와의 통신용입니다.

```
name  → 서버와의 약속 (서버가 데이터를 받을 때 사용하는 키)
id    → HTML 내부 연결 (label ↔ input 연결, JavaScript 접근)
```

### 보안: 비밀번호에는 반드시 POST를 사용하세요

```html
<!-- ❌ 위험: GET은 URL에 비밀번호가 그대로 노출됨 -->
<form action="/login" method="get">

<!-- ✅ 안전: POST는 URL에 보이지 않음 -->
<form action="/login" method="post">
```

### `required`는 클라이언트 측 1차 검증입니다

`required`를 사용하면 브라우저가 제출 전에 빈 필드를 감지하고 경고를 보여줍니다.
하지만 이것만으로는 충분하지 않습니다. 서버 측에서도 반드시 데이터 유효성을 검사해야 합니다.

| 검증 위치 | 설명 |
|-----------|------|
| **클라이언트 (브라우저)** | `required`, `type="email"` 등 → 사용자 편의용 1차 검사 |
| **서버 (백엔드)** | 실제 보안을 위한 최종 검사 → 반드시 있어야 함 |

---

> **핵심 원칙:** `name`은 서버와의 약속(Key), `id`는 HTML 내부의 연결(Label↔Input)입니다.  
> 두 속성의 역할을 구분해서 사용하세요.  
> 비밀번호와 개인정보는 언제나 `method="post"`를 사용하세요.
