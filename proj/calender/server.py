"""
server.py — 이벤트 캘린더 HTTP 서버
======================================
역할:
  1. 정적 파일 서빙 (index.html, style.css, app.js, events.json 등)
  2. REST API 제공
     - GET  /api/events : events.json 파일을 읽어 JSON 배열로 반환
     - POST /api/events : 요청 본문(JSON 배열)을 events.json에 저장
  3. favicon.ico 요청을 204로 조용히 처리 (파일 없음 오류 방지)

실행:
  python server.py

접속:
  http://localhost:8080

주의:
  - 반드시 이 서버를 통해 접속해야 합니다.
  - file:// 프로토콜로 index.html을 직접 열면 fetch()가 CORS 오류로 실패합니다.
  - Python 3.7 이상 필요 (http.server.SimpleHTTPRequestHandler의 directory 인자)
"""

import http.server
import json
import os
from pathlib import Path

# ── 경로 상수 ──────────────────────────────────────────────────────
# 이 파일이 위치한 디렉터리를 기준으로 경로를 구성합니다.
BASE_DIR    = Path(__file__).parent          # server.py가 있는 폴더
EVENTS_FILE = BASE_DIR / 'events.json'      # 이벤트 데이터 파일 경로
PORT        = 8080                           # 서버 포트 (필요에 따라 변경)


class CalendarHandler(http.server.SimpleHTTPRequestHandler):
    """
    HTTP 요청을 처리하는 커스텀 핸들러.

    SimpleHTTPRequestHandler를 상속하여:
    - /api/events (GET/POST) : 직접 처리
    - /favicon.ico           : 204 응답으로 무시
    - 그 외                  : 부모 클래스가 정적 파일로 서빙
    """

    def __init__(self, *args, **kwargs):
        """
        directory 인자를 BASE_DIR로 고정하여
        server.py가 어느 위치에서 실행되더라도 올바른 폴더를 서빙합니다.
        """
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    # ── CORS 헬퍼 ──────────────────────────────────────────────────
    def _send_cors_headers(self):
        """
        CORS(Cross-Origin Resource Sharing) 헤더를 응답에 추가합니다.
        브라우저에서 다른 출처(예: VS Code Live Server 등)의 fetch 요청을 허용합니다.
        """
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    # ── OPTIONS 요청 (Preflight) ────────────────────────────────────
    def do_OPTIONS(self):
        """
        브라우저가 실제 요청 전에 보내는 Preflight 요청을 처리합니다.
        204 No Content로 CORS 헤더만 반환하면 됩니다.
        """
        self.send_response(204)
        self._send_cors_headers()
        self.end_headers()

    # ── GET 요청 ────────────────────────────────────────────────────
    def do_GET(self):
        """
        GET 요청을 경로에 따라 분기합니다.
          - /api/events  → _get_events()
          - /favicon.ico → 204 (브라우저 자동 요청, 파일 없음 오류 방지)
          - 그 외        → 부모 클래스(정적 파일 서빙)
        """
        if self.path == '/api/events':
            self._get_events()
        elif self.path == '/favicon.ico':
            # favicon 파일이 없어도 에러 로그 없이 빈 응답을 반환합니다.
            self.send_response(204)
            self.end_headers()
        else:
            super().do_GET()

    def _get_events(self):
        """
        events.json을 읽어 JSON 형식으로 응답합니다.

        처리 흐름:
          1. events.json 파일 읽기
          2. JSON 유효성 확인 (json.loads로 파싱 시도)
          3. 성공 시 200 + JSON 본문 반환
          4. 파일 없음 → 빈 배열([]) 반환
          5. JSON 파싱 오류 → 500 에러 반환
        """
        try:
            data = EVENTS_FILE.read_text(encoding='utf-8')
            json.loads(data)  # 유효한 JSON인지 검증 (파싱 결과는 사용하지 않음)
        except FileNotFoundError:
            # 파일이 없으면 빈 배열을 반환합니다 (초기 상태)
            data = '[]'
        except json.JSONDecodeError as e:
            self._send_error(500, f'events.json 파싱 오류: {e}')
            return

        body = data.encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))  # 응답 크기 명시
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(body)

    # ── POST 요청 ───────────────────────────────────────────────────
    def do_POST(self):
        """
        POST 요청을 경로에 따라 분기합니다.
          - /api/events → _save_events()
          - 그 외       → 404 반환
        """
        if self.path == '/api/events':
            self._save_events()
        else:
            self.send_response(404)
            self.end_headers()

    def _save_events(self):
        """
        요청 본문(JSON 배열)을 받아 events.json 파일에 덮어씁니다.

        처리 흐름:
          1. Content-Length 헤더로 본문 크기를 확인하고 읽기
          2. JSON 파싱 (실패 시 400 반환)
          3. events.json에 indent=2 형식으로 저장
          4. 성공 시 200 + {"ok": true} 반환

        주의:
          - 이 API는 배열 전체를 교체합니다 (PATCH가 아닌 PUT 방식).
          - app.js가 state.events 전체를 직렬화하여 전송합니다.
        """
        length = int(self.headers.get('Content-Length', 0))
        raw    = self.rfile.read(length)  # 본문 읽기

        try:
            events = json.loads(raw.decode('utf-8'))
        except json.JSONDecodeError as e:
            self._send_error(400, f'잘못된 JSON: {e}')
            return

        # indent=2, ensure_ascii=False: 한글이 유니코드 이스케이프 없이 저장됨
        EVENTS_FILE.write_text(
            json.dumps(events, ensure_ascii=False, indent=2),
            encoding='utf-8'
        )

        body = b'{"ok": true}'
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(body)

    # ── 에러 응답 헬퍼 ──────────────────────────────────────────────
    def _send_error(self, code: int, message: str):
        """
        JSON 형식의 에러 응답을 반환하는 헬퍼 메서드입니다.

        Args:
            code    : HTTP 상태 코드 (예: 400, 500)
            message : 에러 설명 문자열
        """
        body = json.dumps({'error': message}, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(body)

    # ── 로그 출력 ───────────────────────────────────────────────────
    def log_message(self, fmt: str, *args):
        """
        기본 로그 형식을 간결하게 재정의합니다.

        정상 요청: "  GET    /api/events                    → 200"
        에러/기타: 기본 형식 그대로 출력

        주의:
          - 부모 클래스는 에러 응답 시 args[0]에 HTTPStatus 객체를 전달합니다.
          - isinstance(args[0], str) 체크로 문자열인 경우만 파싱합니다.
        """
        if args and isinstance(args[0], str) and ' ' in args[0]:
            # 정상 요청: args[0] = "GET /api/events HTTP/1.1"
            parts  = args[0].split()
            method = parts[0]
            path   = parts[1] if len(parts) > 1 else ''
            status = args[1] if len(args) > 1 else ''
            print(f'  {method:6} {path:30} → {status}')
        else:
            # 에러·기타: 포맷 문자열 그대로 출력
            print(f'  ' + (fmt % args))


# ── 서버 실행 진입점 ────────────────────────────────────────────────
if __name__ == '__main__':
    # 작업 디렉터리를 BASE_DIR로 변경 (정적 파일 서빙 기준 경로 설정)
    os.chdir(BASE_DIR)

    print(f'\n캘린더 서버 실행 중 → http://localhost:{PORT}\n')

    # HTTPServer: 단일 쓰레드 동기 서버 (소규모 로컬 사용에 충분)
    with http.server.HTTPServer(('', PORT), CalendarHandler) as httpd:
        try:
            httpd.serve_forever()  # Ctrl+C 입력 전까지 무한 대기
        except KeyboardInterrupt:
            print('\n서버 종료.')
