import streamlit as st
from pathlib import Path


ROOT = Path(__file__).parent
IMAGE_DIR = ROOT / "public" / "images"

SHOP = {"shipping": 4000, "free_shipping": 50000}
PRODUCTS = [
    {"id": "guppy", "name": "모스크 블루 구피", "unit": "1마리", "description": "선명한 블루 컬러의 인기 구피", "category": "열대어", "type": "구피", "image": "guppy.jpg", "price": 10000, "discount": 40, "badge": "초특가", "popular": True},
    {"id": "tetra", "name": "네온테트라", "unit": "5마리", "description": "물속을 가로지르는 작은 보석", "category": "열대어", "type": "테트라", "image": "tetra.jpg", "price": 10000, "discount": 30, "badge": "입문 추천", "popular": True},
    {"id": "betta", "name": "코이 베타", "unit": "1마리", "description": "한 마리만으로 완성되는 아름다움", "category": "열대어", "type": "베타", "image": "betta.jpg", "price": 20000, "discount": 25, "badge": "인기", "popular": True},
    {"id": "shrimp", "name": "레드 체리 새우", "unit": "10마리", "description": "수초 사이를 부지런히 누비는 작은 생명", "category": "열대어", "type": "새우", "image": "shrimp.jpg", "price": 15000, "discount": 20, "badge": "초특가", "popular": False},
    {"id": "cory", "name": "팬더 코리도라스", "unit": "1마리", "description": "바닥을 누비는 귀여운 청소부", "category": "열대어", "type": "코리도라스", "image": "cory.jpg", "price": 8000, "discount": 0, "badge": "입문 추천", "popular": True},
    {"id": "plants", "name": "아누비아스 나나", "unit": "1포트", "description": "초보자도 키우기 쉬운 수초", "category": "수초", "type": "수초", "image": "plants.jpg", "price": 10000, "discount": 10, "badge": "입문 추천", "popular": False},
]


def sale_price(product):
    return round(product["price"] * (100 - product["discount"]) / 100)


def won(value):
    return f"{value:,}원"


st.set_page_config(page_title="Aqua Bloom", page_icon="🐠", layout="wide")
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700;800&display=swap');
html, body, [class*="css"] { font-family: 'Noto Sans KR', sans-serif; }
.hero { background: linear-gradient(120deg,#073e49,#087c7d); color:white; padding:3rem; border-radius:20px; margin:1rem 0 2rem; }
.hero h1 { font-size:clamp(2rem,5vw,4rem); margin:.3rem 0; }
.hero p { font-size:1.05rem; opacity:.9; }
.price { color:#ee6748; font-size:1.25rem; font-weight:800; }
.old { color:#8a9697; text-decoration:line-through; font-size:.9rem; margin-left:.5rem; }
.badge { color:#ee6748; font-weight:700; font-size:.82rem; }
.muted { color:#798789; }
div[data-testid="stVerticalBlock"] > div:has(> div.product-card) { border:1px solid #e5eeee; border-radius:16px; padding:1rem; }
</style>
""", unsafe_allow_html=True)

if "cart" not in st.session_state:
    st.session_state.cart = {}

st.markdown("<div class='hero'><div class='muted' style='color:#bce4df'>AQUA BLOOM</div><h1>작은 수조에서 시작되는<br>깊은 즐거움</h1><p>건강한 생명과 아름다운 수초를 한곳에서 만나보세요.</p></div>", unsafe_allow_html=True)

with st.sidebar:
    st.header("Aqua Bloom")
    st.caption("열대어와 수초를 위한 작은 아쿠아리움")
    query = st.text_input("상품 검색", placeholder="구피, 수초...")
    category = st.radio("카테고리", ["전체", "초특가", "열대어", "수초", "구피", "베타", "테트라", "새우", "코리도라스"], index=0)
    st.divider()
    st.subheader(f"장바구니 ({sum(st.session_state.cart.values())})")
    if st.session_state.cart:
        total = 0
        for product in PRODUCTS:
            qty = st.session_state.cart.get(product["id"], 0)
            if qty:
                line_total = sale_price(product) * qty
                total += line_total
                st.write(f"{product['name']} × {qty}  ")
                st.caption(won(line_total))
        shipping = 0 if total >= SHOP["free_shipping"] else SHOP["shipping"]
        st.write(f"상품 금액: **{won(total)}**")
        st.write(f"배송비: **{'무료' if shipping == 0 else won(shipping)}**")
        st.success(f"결제 예정 금액: {won(total + shipping)}")
        if st.button("장바구니 비우기", use_container_width=True):
            st.session_state.cart = {}
            st.rerun()
    else:
        st.info("장바구니가 비어 있습니다.")

st.subheader("이번 주 특별 상품")
filtered = []
for product in PRODUCTS:
    matches_category = category == "전체" or (category == "초특가" and product["discount"] > 0) or category in (product["category"], product["type"])
    searchable = " ".join((product["name"], product["type"], product["description"])).lower()
    if matches_category and (not query or query.lower() in searchable):
        filtered.append(product)

if not query and category == "전체":
    filtered = [p for p in PRODUCTS if p["discount"] >= 20]

if not filtered:
    st.info("조건에 맞는 상품이 없습니다. 다른 검색어를 입력해 보세요.")
else:
    cols = st.columns(4)
    for index, product in enumerate(filtered):
        with cols[index % 4]:
            st.markdown("<div class='product-card'>", unsafe_allow_html=True)
            image_path = IMAGE_DIR / product["image"]
            if image_path.exists():
                st.image(str(image_path), use_container_width=True)
            st.markdown(f"<div class='badge'>{product['badge']}</div><h3>{product['name']}</h3><div class='muted'>{product['unit']} · {product['description']}</div>", unsafe_allow_html=True)
            if product["discount"]:
                st.markdown(f"<span class='price'>{won(sale_price(product))}</span><span class='old'>{won(product['price'])}</span>", unsafe_allow_html=True)
            else:
                st.markdown(f"<span class='price'>{won(product['price'])}</span>", unsafe_allow_html=True)
            if st.button("담기", key=f"add_{product['id']}", use_container_width=True):
                st.session_state.cart[product["id"]] = st.session_state.cart.get(product["id"], 0) + 1
                st.toast(f"{product['name']}을(를) 장바구니에 담았습니다.")
                st.rerun()
            st.markdown("</div>", unsafe_allow_html=True)

st.divider()
st.subheader("처음 시작하는 분을 위한 안내")
guide_cols = st.columns(3)
for col, title, text in zip(guide_cols, ["안전한 포장", "기분 좋은 배송", "초보자 가이드"], ["생물별 개별 포장과 보온 포장으로 건강한 도착을 준비합니다.", f"{won(SHOP['free_shipping'])} 이상 무료 배송입니다.", "수조 준비부터 물맞댐까지 차근차근 안내해 드립니다."]):
    with col:
        st.info(f"**{title}**\n\n{text}")

st.caption("Aqua Bloom · 샘플 쇼핑몰 · 실제 주문과 결제는 연결되어 있지 않습니다.")
