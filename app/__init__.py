from flask import Flask
# 브라우저는 기본적으로 같은 출처 이외의 도메인으로의 HTTP 요청을 차단하며,
#  이를 해결하기 위해 서버에서 허용 정책을 설정해야함
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from app import routes