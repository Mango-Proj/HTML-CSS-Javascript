# Chapter 2 · 멀티미디어 & 하이퍼링크

웹 페이지에 이미지, 오디오, 비디오를 삽입하고 다양한 목적지로 연결하는 태그를 학습합니다.

---

## 목차

1. [이미지 태그 `img`](#1-이미지-태그-img)
2. [이미지 + 캡션 묶음 `figure` / `figcaption`](#2-이미지--캡션-묶음-figure--figcaption)
3. [오디오 태그 `audio`](#3-오디오-태그-audio)
4. [비디오 태그 `video`](#4-비디오-태그-video)
5. [링크 태그 `a`](#5-링크-태그-a)
6. [태그 비교 요약](#6-태그-비교-요약)
7. [실전 예제](#7-실전-예제)

---

## 1. 이미지 태그 `img`

웹 페이지에 이미지를 삽입할 때 사용하며, 닫는 태그가 없는 **빈 태그(Void Element)** 입니다.

> 비유: `<img>`는 액자 틀만 제공하고, `src`는 그 틀에 걸 그림의 주소를 알려주는 것과 같습니다.

### 핵심 속성

| 속성 | 필수 여부 | 설명 |
|------|:---------:|------|
| `src` | ✅ 필수 | 이미지 파일의 경로 또는 URL (없으면 이미지가 표시되지 않음) |
| `alt` | ✅ 필수 | 이미지 로드 실패 시 표시되는 대체 텍스트 + 스크린 리더 설명 |
| `width` | 선택 | 표시 너비 — 단위 생략 시 px 단위 |
| `height` | 선택 | 표시 높이 — 단위 생략 시 px 단위 |

### `alt` 속성이 중요한 이유

`alt`(Alternative Text, 대체 텍스트)는 세 가지 상황에서 활용됩니다.

| 상황 | alt의 역할 |
|------|------------|
| **이미지 로드 실패** | 깨진 이미지 대신 alt 텍스트를 화면에 표시합니다 |
| **스크린 리더 사용** | 시각 장애인에게 "프로필 사진" 처럼 이미지 내용을 음성으로 설명합니다 |
| **검색 엔진(SEO)** | 구글이 이미지를 인덱싱할 때 alt 텍스트를 이미지 설명으로 사용합니다 |

```html
<!-- ✅ 올바른 alt: 이미지 내용을 구체적으로 설명 -->
<img src="dog.jpg" alt="공원에서 뛰어노는 갈색 강아지">

<!-- ❌ 잘못된 alt: 의미없는 텍스트 -->
<img src="dog.jpg" alt="image1">

<!-- ✅ 장식용 이미지: alt를 빈 문자열로 설정하면 스크린 리더가 건너뜁니다 -->
<img src="divider.png" alt="">
```

### 경로 지정 방식

파일 경로를 지정하는 방법에는 두 가지가 있습니다.

| 종류 | 예시 | 설명 |
|------|------|------|
| **절대 경로** (URL) | `https://example.com/img.jpg` | 인터넷 어디서나 접근 가능한 외부 이미지 주소 |
| **절대 경로** (루트) | `/images/photo.jpg` | 웹 사이트 최상위(루트) 기준 경로 |
| **상대 경로** (현재) | `./images/photo.jpg` | 현재 HTML 파일이 있는 폴더 기준 |
| **상대 경로** (상위) | `../images/photo.jpg` | 현재 폴더의 한 단계 위 폴더 기준 |

> **tip:** 개인 프로젝트에서는 **상대 경로**를 사용하면 폴더 위치가 바뀌어도 함께 이동하면 경로가 유지됩니다.

```html
<!-- 프로젝트 폴더 구조 예시 -->
<!-- project/
  ├── index.html
  └── images/
       └── photo.jpg -->

<!-- index.html에서 photo.jpg를 참조할 때 -->
<img src="./images/photo.jpg" alt="내 사진" width="200">
```

---

## 2. 이미지 + 캡션 묶음 `figure` / `figcaption`

이미지 하나와 그에 대한 설명(캡션)을 **하나의 의미 단위**로 묶을 때 사용합니다.

> 비유: 신문·책의 사진 아래에 "▲ 서울 광화문 광장 (사진=○○일보)" 처럼  
> 이미지와 설명을 하나의 단위로 묶어 표현하는 것과 같습니다.

### 왜 `div` + `p` 대신 `figure`를 쓰는가?

```html
<!-- ❌ 의미 없이 묶기: div는 이미지와 캡션의 관계를 표현하지 못합니다 -->
<div>
  <img src="chart.png" alt="2026년 매출 차트">
  <p>2026년 1분기 매출 현황</p>
</div>

<!-- ✅ 의미 있는 묶기: figure/figcaption은 이미지와 캡션이 한 쌍임을 명시합니다 -->
<figure>
  <img src="chart.png" alt="2026년 매출 차트">
  <figcaption>그림 1. 2026년 1분기 매출 현황</figcaption>
</figure>
```

`<figure>` 안에는 이미지 외에도 코드 블록, 도표, 비디오 등을 담을 수 있습니다.

---

## 3. 오디오 태그 `audio`

브라우저 내장 플레이어로 음악이나 음성을 재생합니다.

> `controls` 속성이 없으면 재생 버튼 자체가 화면에 나타나지 않습니다.

### 핵심 속성

| 속성 | 설명 |
|------|------|
| `controls` | 재생 / 일시정지 / 볼륨 / 진행 바 등 컨트롤러를 화면에 표시 |
| `loop` | 재생이 끝나면 처음부터 자동 반복 재생 |
| `autoplay` | 페이지 로드 시 자동 재생 — ⚠️ `muted` 없이는 대부분의 브라우저에서 차단됨 |
| `muted` | 음소거 상태로 시작 (autoplay와 함께 써야 자동 재생 허용됨) |

### 폴백(Fallback)과 `<source>` 태그

**폴백(Fallback)** 이란 브라우저가 지원하지 않는 경우에 대비한 **대안(예비책)** 입니다.  
브라우저마다 지원하는 오디오 포맷이 다르기 때문에, 여러 포맷을 나열해 호환성을 높입니다.  
브라우저는 위에서부터 **지원 가능한 첫 번째 포맷**을 선택합니다.

```html
<audio controls loop>
  <!-- 첫 번째 시도: MP3 (대부분의 브라우저에서 지원) -->
  <source src="music.mp3" type="audio/mpeg">
  <!-- MP3 미지원 시 OGG로 대체 -->
  <source src="music.ogg" type="audio/ogg">
  <!-- 모든 포맷 미지원 시 이 텍스트가 표시됩니다 -->
  이 브라우저는 오디오 재생을 지원하지 않습니다.
</audio>
```

---

## 4. 비디오 태그 `video`

브라우저 내장 플레이어로 동영상을 재생합니다.

### 핵심 속성

| 속성 | 설명 |
|------|------|
| `controls` | 재생 / 정지 / 볼륨 / 전체화면 등 컨트롤러 표시 |
| `width` | 플레이어 너비 (px) |
| `muted` | 음소거 상태로 시작 |
| `autoplay` | 자동 재생 — ⚠️ 반드시 `muted`와 함께 사용해야 브라우저에서 허용 |
| `loop` | 반복 재생 |
| `poster` | 재생 전 표시할 썸네일(미리보기) 이미지 경로 |

```html
<!-- poster: 재생 전 표지 이미지 표시 -->
<video width="640" controls poster="thumbnail.jpg">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  이 브라우저는 비디오 재생을 지원하지 않습니다.
</video>

<!-- muted + autoplay: 홈페이지 배경 영상 같은 용도 -->
<video width="100%" autoplay muted loop>
  <source src="bg-video.mp4" type="video/mp4">
</video>
```

### autoplay에 muted가 필요한 이유

크롬, 파이어폭스 등 대부분의 브라우저는 **사용자가 원하지 않는 소리 자동 재생을 차단**합니다.  
`muted`(음소거) 상태에서는 차단하지 않으므로, 배경 영상처럼 소리 없이 자동 재생이 필요한 경우  
`autoplay muted` 조합을 사용합니다.

---

## 5. 링크 태그 `a`

다른 페이지, 이메일, 전화번호 등으로 연결되는 하이퍼링크를 생성합니다.  
**Anchor(닻)** 의 약자로, 현재 위치에서 목적지에 연결한다는 의미입니다.

> 비유: `<a>` 태그는 책에서 "자세한 내용은 3장을 보세요" 처럼  
> 다른 곳을 가리키는 **참조(reference)** 역할을 합니다.

### 핵심 속성

| 속성 | 설명 |
|------|------|
| `href` | 이동할 목적지 주소 (URL, 상대 경로, mailto, tel, #앵커 등) |
| `target` | 링크를 어디서 열지 결정 (`_self` 현재 탭 / `_blank` 새 탭) |

### href 유형별 사용법

| 유형 | href 형식 | 동작 |
|------|-----------|------|
| **외부 페이지** | `https://example.com` | 다른 웹 사이트로 이동 |
| **내부 페이지** | `./about.html` | 같은 프로젝트 내 파일로 이동 |
| **이메일** | `mailto:help@example.com` | 이메일 앱(Outlook, Gmail 등)을 실행 |
| **전화** | `tel:010-1234-5678` | 모바일에서 전화 앱 실행 |
| **페이지 내 이동** | `#section-id` | 같은 페이지 내 특정 위치(앵커)로 스크롤 이동 |

```html
<!-- 외부 링크: target="_blank" 로 새 탭에서 열기 -->
<a href="https://www.google.com" target="_blank">구글 바로 가기</a>

<!-- 내부 링크: target을 생략하면 기본값(_self, 현재 탭)으로 이동 -->
<a href="./about.html">회사 소개</a>

<!-- 이메일 링크: 클릭 시 기본 메일 앱이 실행되고 받는 사람이 자동 입력 -->
<a href="mailto:help@example.com">문의 메일 보내기</a>

<!-- 전화 링크: 모바일에서 클릭 시 전화 앱이 해당 번호를 자동 입력 -->
<a href="tel:010-1234-5678">고객센터 전화하기</a>

<!-- 앵커 링크: 같은 페이지 내 id="section2"인 요소로 스크롤 이동 -->
<a href="#section2">2번 섹션으로 이동</a>
<section id="section2">...</section>
```

### `target="_blank"` 사용 시 주의점

외부 사이트를 새 탭으로 열 때 보안을 위해 `rel="noopener noreferrer"` 속성을 함께 쓰는 것이 권장됩니다.  
(열린 새 탭이 원래 탭에 악의적으로 접근하는 것을 방지합니다.)

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  안전한 외부 링크
</a>
```

---

## 6. 태그 비교 요약

| 태그 | 빈 태그 | 주요 속성 | 용도 |
|------|:-------:|-----------|------|
| `<img>` | ✅ | `src`, `alt`, `width`, `height` | 이미지 삽입 |
| `<figure>` | ✗ | — | 이미지 + 캡션 의미적 묶음 |
| `<figcaption>` | ✗ | — | figure 안의 캡션(설명) |
| `<audio>` | ✗ | `controls`, `loop`, `autoplay`, `muted` | 오디오 재생 |
| `<video>` | ✗ | `controls`, `width`, `muted`, `autoplay`, `poster` | 비디오 재생 |
| `<source>` | ✅ | `src`, `type` | audio/video 포맷 여러 개 지정 |
| `<a>` | ✗ | `href`, `target` | 하이퍼링크 |

---

## 7. 실전 예제

### 예제 파일 목록

| 파일 | 학습 내용 |
|------|-----------|
| `example.html` | `img`, `audio`, `video`, `a` 태그 종합 예제 |
| `profile_card.html` | `img`, `figure`, `a` 태그를 활용한 프로필 카드 실습 |

### 프로필 카드 구조 예시

```html
<div class="profile-card">

  <!-- figure: 이미지와 캡션을 하나의 의미 단위로 묶음 -->
  <figure>
    <img src="photo.jpg" alt="홍길동 프로필 사진" width="150" height="150">
    <figcaption>프론트엔드 개발자 홍길동</figcaption>
  </figure>

  <h2>홍길동 (Gildong Hong)</h2>
  <p><strong>프론트엔드 개발자</strong>를 꿈꾸는 신입입니다.</p>

  <hr>

  <h3>Contact & Social</h3>

  <!-- 외부 링크: 새 탭에서 열기 + 보안 속성 추가 -->
  <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
  <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>

  <!-- 메일 / 전화 링크 -->
  <a href="mailto:hong@email.com">이메일 보내기</a>
  <a href="tel:010-1234-5678">전화 걸기</a>

</div>
```

---

> **핵심 원칙:**  
> - `alt` 속성은 이미지마다 반드시 작성하고, 내용을 구체적으로 설명하세요.  
> - 이미지와 설명이 세트라면 `<figure>` + `<figcaption>`으로 묶으세요.  
> - `autoplay`는 반드시 `muted`와 함께 사용하세요.  
> - 외부 링크에는 `target="_blank" rel="noopener noreferrer"`를 붙이세요.
