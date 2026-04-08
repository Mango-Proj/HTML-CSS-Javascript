/**
 * cookie_example.js — 쿠키 기본 사용 예제 (단독 실행용 참고 파일)
 * =================================================================
 * 이 파일은 브라우저 콘솔 또는 <script src="cookie_example.js"> 로
 * 직접 불러와 실행할 수 있는 독립 예제입니다.
 *
 * 쿠키의 실제 인터랙티브 데모는 index.html + main.js 의 섹션 5를 참고하세요.
 *
 * [주의] 이 파일은 ES 모듈이 아닙니다.
 *   type="module" 없이 <script src="cookie_example.js">로 로드하면
 *   페이지 로드 시 아래 코드가 즉시 실행됩니다.
 */

// -----------------------------------------------
// 쿠키 저장
// -----------------------------------------------
// document.cookie = "이름=값; 속성들"
//
// 주요 속성:
//   expires  — 만료 날짜 (UTC 형식). 생략 시 브라우저 세션 동안만 유지 (세션 쿠키)
//   path     — 쿠키가 유효한 URL 경로. '/'로 지정하면 전체 사이트에서 접근 가능
//   domain   — 쿠키가 유효한 도메인 (생략 시 현재 도메인)
//   secure   — HTTPS 연결에서만 전송
//   HttpOnly — JavaScript 접근 차단 (서버에서 Set-Cookie 헤더로만 설정 가능)
document.cookie = "visitor=JohnDoe; expires=Fri, 31 Dec 2026 12:00:00 UTC; path=/";

// -----------------------------------------------
// 쿠키 읽기
// -----------------------------------------------
// document.cookie는 현재 접근 가능한 모든 쿠키를
// "name1=value1; name2=value2" 형태의 단일 문자열로 반환합니다.
// 개별 쿠키에 접근하려면 직접 파싱해야 합니다.
console.log("현재 쿠키 목록:", document.cookie);

// -----------------------------------------------
// 쿠키 파싱 예시
// -----------------------------------------------
// document.cookie 문자열을 key-value 객체로 변환합니다
function parseCookies() {
  return Object.fromEntries(
    document.cookie
      .split('; ')
      .filter(Boolean)
      .map(pair => {
        const [name, ...rest] = pair.split('=');
        return [decodeURIComponent(name), decodeURIComponent(rest.join('='))];
      })
  );
}
console.log("파싱된 쿠키 객체:", parseCookies());

// -----------------------------------------------
// 쿠키 삭제
// -----------------------------------------------
// 쿠키를 삭제하려면 동일한 이름과 path로 expires를 과거 시간으로 설정합니다.
// 단순히 값을 빈 문자열로 설정해도 삭제되지 않습니다.
document.cookie = "visitor=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
console.log("visitor 쿠키 삭제 후:", document.cookie);
