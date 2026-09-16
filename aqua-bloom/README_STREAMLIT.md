# Streamlit 실행 및 배포

이 폴더에는 기존 React 앱과 별도로 실행할 수 있는 Python Streamlit 버전이 들어 있습니다. NumPy는 사용하지 않습니다.

## 로컬 실행

PowerShell에서 이 폴더로 이동한 뒤 실행합니다.

```powershell
cd "C:\Users\user\tropical_fish_shop\aqua-bloom-project\aqua-bloom"
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m streamlit run app.py
```

브라우저에서 `http://localhost:8501`을 엽니다. PowerShell 실행 정책 오류가 나면 현재 창에서만 다음 명령을 먼저 실행할 수 있습니다.

```powershell
Set-ExecutionPolicy -Scope Process Bypass
```

## Streamlit Community Cloud 배포

1. 이 프로젝트를 GitHub 저장소에 올립니다.
2. Streamlit Community Cloud에서 **Create app**을 선택합니다.
3. 저장소와 브랜치를 선택합니다.
4. **Main file path**에 `aqua-bloom-project/aqua-bloom/app.py`를 입력합니다.
5. Deploy를 선택합니다.

`requirements.txt`, `packages.txt`, 이미지 파일은 `app.py`와 같은 `aqua-bloom` 폴더에 이미 준비되어 있습니다.

## 주요 기능

- 상품 검색 및 카테고리 필터
- 할인 상품 표시
- 장바구니 추가, 수량 합계, 배송비 계산
- `st.session_state`를 이용한 세션별 장바구니 유지

현재 상품과 결제 화면은 샘플이며 실제 주문·결제 API는 연결되어 있지 않습니다.
