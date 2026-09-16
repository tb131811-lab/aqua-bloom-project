import { Search, ShoppingBag, Menu, Waves, ArrowUpRight } from "lucide-react";
import { shop, won } from "../data";
export function Logo() {
  return (
    <a className="logo" href="#" aria-label="아쿠아블룸 홈">
      <span className="logo-mark">
        <Waves size={29} />
      </span>
      <span>
        AQUA BLOOM<small>아쿠아블룸</small>
      </span>
    </a>
  );
}
export default function Header({
  query,
  setQuery,
  onSearch,
  onCategory,
  count,
  onCart,
  onDemo,
  filter,
}) {
  const nav = [
    "열대어",
    "수초",
    "수조",
    "사료",
    "여과·관리용품",
    "초특가",
    "사육 가이드",
  ];
  return (
    <>
      <a className="skip-link" href="#products">
        상품으로 바로가기
      </a>
      <div className="welcome">
        <span>처음 만나는 작은 물속 세상</span>
        <button
          onClick={() =>
            onDemo(
              "웰컴 쿠폰",
              `신규 가입 ${won(shop.coupon)}원 쿠폰은 시안용 혜택입니다. 이 데모에서는 회원가입과 쿠폰 발급이 진행되지 않습니다.`,
            )
          }
        >
          신규 가입 웰컴 쿠폰 <strong>{won(shop.coupon)}원</strong>
          <ArrowUpRight size={14} />
        </button>
      </div>
      <header>
        <div className="header-main container">
          <Logo />
          <form className="search" onSubmit={onSearch}>
            <input
              aria-label="상품 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="어떤 물속 친구를 찾고 있나요?"
            />
            <button aria-label="검색">
              <Search size={21} />
            </button>
          </form>
          <div className="account">
            <button
              onClick={() =>
                onDemo(
                  "로그인",
                  "로그인 화면은 데모입니다. 실제 계정 인증은 연결되어 있지 않습니다.",
                )
              }
            >
              로그인
            </button>
            <button
              onClick={() =>
                onDemo(
                  "회원가입",
                  "회원가입은 데모입니다. 개인정보를 수집하거나 계정을 생성하지 않습니다.",
                )
              }
            >
              회원가입
            </button>
            <button
              className="cart-trigger"
              onClick={onCart}
              aria-label={`장바구니 ${count}개`}
            >
              <ShoppingBag size={22} />
              <span className="cart-label">장바구니</span>
              <b>{count}</b>
            </button>
          </div>
        </div>
        <nav className="nav container" aria-label="상품 카테고리">
          <button className="all-menu" onClick={() => onCategory("전체")}>
            <Menu size={19} />
            전체 카테고리
          </button>
          <div className="nav-items">
            {nav.map((n) => (
              <button
                key={n}
                className={`${n === "초특가" ? "sale-nav" : ""} ${filter === n ? "active" : ""}`}
                onClick={() =>
                  n === "사육 가이드"
                    ? document
                        .getElementById("guide")
                        .scrollIntoView({ behavior: "auto" })
                    : onCategory(n)
                }
              >
                {n}
              </button>
            ))}
          </div>
          <span className="nav-note">작은 생명, 정성을 담아</span>
        </nav>
      </header>
    </>
  );
}

