/**
 * theme.js — 테마 저장·로드 모듈
 * ================================
 * ES 모듈(export/import) 패턴을 보여주는 예제 파일입니다.
 *
 * 이 파일이 내보내는(export) 항목을 main.js에서 import 하여 사용합니다.
 *   import { saveTheme, loadTheme, THEME_KEY } from './theme.js';
 *
 * 모듈의 장점:
 *   - 코드를 역할에 따라 분리하여 관리합니다 (관심사 분리)
 *   - THEME_KEY 상수가 이 모듈 안에서만 관리되므로 오타·충돌을 방지합니다
 *   - 다른 파일에서 동일한 saveTheme/loadTheme 로직을 재사용할 수 있습니다
 */

// 불변성을 위해 상수로 선언합니다
// — localStorage 키 이름을 한 곳에서 관리하면 변경 시 여러 파일을 수정하지 않아도 됩니다
export const THEME_KEY = 'user_theme';

/**
 * saveTheme — 선택한 테마를 localStorage에 저장합니다.
 *
 * localStorage.setItem(key, value):
 *   - key와 value 모두 문자열로 저장됩니다
 *   - 같은 key가 이미 있으면 덮어씁니다
 *   - 명시적으로 삭제하기 전까지 영구적으로 유지됩니다
 *
 * @param {string} theme - 저장할 테마 이름 ('light' 또는 'dark')
 */
export function saveTheme(theme) {
  // 로컬 스토리지에 데이터 저장
  localStorage.setItem(THEME_KEY, theme);
  console.log(`테마 '${theme}' 저장 완료!`);
}

/**
 * loadTheme — localStorage에서 저장된 테마를 불러옵니다.
 *
 * localStorage.getItem(key):
 *   - 저장된 값을 문자열로 반환합니다
 *   - 해당 key가 없으면 null을 반환합니다
 *   - || 연산자로 null인 경우 기본값 'light'를 반환합니다
 *
 * @returns {string} 저장된 테마 이름, 없으면 'light'
 */
export function loadTheme() {
  // 데이터 불러오기 (없으면 'light' 반환)
  return localStorage.getItem(THEME_KEY) || 'light';
}
