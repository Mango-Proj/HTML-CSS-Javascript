# 멀티미디어 & 하이퍼링크 가이드

웹 페이지에 이미지, 오디오, 비디오를 삽입하고 다양한 목적지로 연결하는 태그를 학습합니다.

---

## 목차

1. [이미지 태그 `img`](#1-이미지-태그-img)
2. [오디오 태그 `audio`](#2-오디오-태그-audio)
3. [비디오 태그 `video`](#3-비디오-태그-video)
4. [링크 태그 `a`](#4-링크-태그-a)
5. [태그 비교 요약](#5-태그-비교-요약)
6. [실전 예제](#6-실전-예제)

---

## 1. 이미지 태그 `img`

웹 페이지에 이미지를 삽입할 때 사용하며, 닫는 태그가 없는 **빈 태그(Void element)** 입니다.

### 핵심 속성

| 속성 | 필수 여부 | 설명 |
|------|:---------:|------|
| `src` | ✅ 필수 | 이미지 파일의 경로 (URL 또는 상대 경로) |
| `alt` | ✅ 필수 | 이미지 로드 실패 시 표시할 대체 텍스트 (접근성 필수) |
| `width` | 선택 | 표시 너비 — 단위 생략 시 px |
| `height` | 선택 | 표시 높이 — 단위 생략 시 px |

> **접근성:** `alt` 속성은 시각 장애인이 사용하는 스크린 리더가 이미지를 설명하는 데 사용됩니다. 반드시 작성하세요.

### 경로 지정 방식

| 종류 | 예시 | 설명 |
|------|------|------|
| 절대 경로 (URL) | `https://example.com/img.jpg` | 외부 서버의 이미지 |
| 절대 경로 (루트) | `/images/photo.jpg` | 사이트 루트 기준 |
| 상대 경로 | `./images/photo.jpg` | 현재 파일 기준 |
| 상위 폴더 | `../images/photo.jpg` | 상위 디렉터리 기준 |

### 코드 예시

```html
<!-- 외부 URL로 이미지 삽입 -->
<img src="https://via.placeholder.com/150" alt="샘플 이미지" width="150">

<!-- 상대 경로로 로컬 이미지 삽입 -->
<img src="./images/photo.jpg" alt="내 사진" width="200">
```

---

## 2. 오디오 태그 `audio`

브라우저 내장 플레이어로 음악이나 음성을 재생합니다.

### 핵심 속성

| 속성 | 설명 |
|------|------|
| `controls` | 재생 / 일시정지 / 볼륨 컨트롤러 표시 |
| `loop` | 반복 재생 |
| `autoplay` | 자동 재생 — ⚠️ `muted` 없이는 대부분의 브라우저에서 차단됨 |
| `muted` | 음소거 상태로 시작 |

### `<source>` 태그

브라우저마다 지원하는 오디오 포맷이 다르므로, 여러 포맷을 나열해 호환성을 높입니다.
브라우저는 위에서부터 지원 가능한 첫 번째 포맷을 선택합니다.

```html
<audio controls loop>
    <!-- 브라우저가 mp3를 지원하면 재생 -->
    <source src="music.mp3" type="audio/mpeg">
    <!-- mp3 미지원 시 ogg로 fallback -->
    <source src="music.ogg" type="audio/ogg">
    <!-- 모두 미지원 시 이 텍스트 표시 -->
    브라우저가 오디오 태그를 지원하지 않습니다.
</audio>
```

---

## 3. 비디오 태그 `video`

브라우저 내장 플레이어로 동영상을 재생합니다.

### 핵심 속성

| 속성 | 설명 |
|------|------|
| `controls` | 재생 / 정지 / 볼륨 / 전체화면 컨트롤러 표시 |
| `width` | 플레이어 너비 (px) |
| `muted` | 음소거 상태로 시작 |
| `autoplay` | 자동 재생 — ⚠️ 반드시 `muted`와 함께 사용해야 브라우저에서 허용 |
| `loop` | 반복 재생 |
| `poster` | 재생 전 표시할 썸네일 이미지 경로 |

```html
<!-- muted + autoplay 조합으로 자동 재생 허용 -->
<video width="400" controls muted autoplay>
    <source src="movie.mp4" type="video/mp4">
    브라우저가 비디오 태그를 지원하지 않습니다.
</video>
```

---

## 4. 링크 태그 `a`

다른 페이지, 이메일, 전화번호 등으로 연결되는 하이퍼링크를 생성합니다.
**Anchor(닻)** 의 약자로, 현재 위치에서 목적지를 연결한다는 의미입니다.

### 핵심 속성

| 속성 | 설명 |
|------|------|
| `href` | 이동할 목적지 주소 (URL, 상대 경로, mailto, tel 등) |
| `target` | 링크를 어디서 열지 결정 |

### `target` 값

| 값 | 설명 |
|----|------|
| `_self` | 현재 탭에서 열기 (기본값 — 생략 가능) |
| `_blank` | 새 탭에서 열기 |

### href 유형별 사용법

| 유형 | href 형식 | 동작 |
|------|-----------|------|
| 외부 페이지 | `https://example.com` | 외부 사이트로 이동 |
| 내부 페이지 | `./about.html` | 같은 프로젝트 내 파일로 이동 |
| 이메일 | `mailto:주소` | 이메일 클라이언트 실행 |
| 전화 | `tel:번호` | 모바일에서 전화 앱 실행 |
| 페이지 내 이동 | `#섹션id` | 같은 페이지 내 특정 위치로 이동 |

### 코드 예시

```html
<!-- 외부 링크 — 새 탭에서 열기 -->
<a href="https://www.google.com" target="_blank">구글 (새 탭)</a>

<!-- 내부 링크 — 현재 탭에서 열기 (target 생략 = _self) -->
<a href="./about.html">회사 소개</a>

<!-- 이메일 링크 -->
<a href="mailto:help@example.com">문의 메일 보내기</a>

<!-- 전화 링크 (모바일에서 전화 앱 실행) -->
<a href="tel:010-1234-5678">고객센터 전화하기</a>
```

---

## 5. 태그 비교 요약

| 태그 | 빈 태그 | 주요 속성 | 용도 |
|------|:-------:|-----------|------|
| `<img>` | ✅ | `src`, `alt`, `width`, `height` | 이미지 삽입 |
| `<audio>` | ✗ | `controls`, `loop`, `autoplay`, `muted` | 오디오 재생 |
| `<video>` | ✗ | `controls`, `width`, `muted`, `autoplay`, `poster` | 비디오 재생 |
| `<source>` | ✅ | `src`, `type` | audio / video 포맷 지정 |
| `<a>` | ✗ | `href`, `target` | 하이퍼링크 |

---

## 6. 실전 예제

### 예제 파일 목록

| 파일 | 학습 내용 |
|------|-----------|
| `example.html` | `img`, `audio`, `video`, `a` 태그 종합 예제 |
| `profile_card.html` | `img`, `a` 태그를 활용한 프로필 카드 실습 |

### 프로필 카드 구조 예시

```html
<div class="profile-card">

    <!-- 프로필 이미지: border-radius: 50%로 원형 처리 -->
    <img src="photo.jpg" alt="프로필 사진" width="150" height="150" class="profile-img">

    <h2>홍길동 (Gildong Hong)</h2>
    <p><strong>프론트엔드 개발자</strong>를 꿈꾸는 신입입니다.</p>

    <hr>

    <h3>Contact & Social</h3>

    <!-- 외부 링크: 새 탭에서 열기 -->
    <a href="https://github.com/" target="_blank">GitHub</a>
    <a href="https://linkedin.com/" target="_blank">LinkedIn</a>

    <!-- 메일 / 전화 링크 -->
    <a href="mailto:hong@email.com">이메일 보내기</a>
    <a href="tel:010-1234-5678">전화 걸기</a>

</div>
```

---

> **핵심 원칙:** `alt` 속성은 이미지마다 반드시 작성하고, `autoplay`는 `muted`와 함께 사용하세요.
> 외부 링크에는 `target="_blank"`를 붙여 현재 페이지 흐름을 유지하는 것이 좋습니다.
