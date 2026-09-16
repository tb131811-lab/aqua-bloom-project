import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  PackageCheck,
  Truck,
  Sprout,
  X,
  Minus,
  Plus,
  ShoppingBag,
  Check,
} from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import { products, images, shop, salePrice, won } from "./data";

function Modal({ title, onClose, children, wide = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    ref.current.showModal();
    return () => {
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={wide ? "modal cart-modal" : "modal"}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <div className="modal-heading">
        <h2>{title}</h2>
        <button aria-label="닫기" onClick={onClose}>
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export default function App() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("전체");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [added, setAdded] = useState(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef();
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartItems = products.filter((p) => cart[p.id]);
  const total = cartItems.reduce((a, p) => a + salePrice(p) * cart[p.id], 0);
  function selectCategory(value) {
    setFilter(value);
    setSearch("");
    setQuery("");
    document
      .getElementById("products")
      .scrollIntoView({ behavior: "auto", block: "start" });
  }
  function onSearch(e) {
    e.preventDefault();
    setSearch(query.trim());
    setFilter("전체");
    document.getElementById("products").scrollIntoView({ behavior: "auto" });
  }
  function add(p) {
    setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }));
    setAdded(p.id);
    setToast(`${p.name}을(를) 장바구니에 담았어요.`);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setAdded(null);
      setToast("");
    }, 2600);
  }
  function change(id, d) {
    setCart((c) => {
      const n = { ...c, [id]: Math.max(0, (c[id] || 0) + d) };
      if (!n[id]) delete n[id];
      return n;
    });
  }
  const demo = (title, body) => setModal({ title, body });
  const filtering = filter !== "전체" || !!search;
  const visible = products.filter(
    (p) =>
      (filter === "전체" ||
        (filter === "초특가"
          ? p.discount > 0
          : p.category === filter || p.type === filter)) &&
      (!search ||
        `${p.name} ${p.type} ${p.description}`
          .toLowerCase()
          .includes(search.toLowerCase())),
  );
  const listed = filtering ? visible : products.filter((p) => p.discount >= 20);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.06 },
    );
    document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    return () => {
      observer.disconnect();
      clearTimeout(toastTimer.current);
    };
  }, []);
  return (
    <>
      <Header
        {...{ query, setQuery, onSearch, count, filter }}
        onCategory={selectCategory}
        onCart={() => setCartOpen(true)}
        onDemo={demo}
      />
      <main>
        <Hero onSale={() => selectCategory("초특가")} />
        <Categories onCategory={selectCategory} filter={filter} />
        <section id="products" className="products-section container reveal">
          <div className="section-heading">
            <div>
              <span className="eyebrow coral-text">THIS WEEK’S SPECIAL</span>
              <h2>
                {filtering
                  ? search
                    ? `‘${search}’ 검색 결과`
                    : `${filter} 상품`
                  : "지금 만나보는 초특가"}
                <span className="title-dot" />
              </h2>
              <p>
                {filtering
                  ? `${listed.length}개의 물속 친구를 찾았어요.`
                  : "마음에 담아둔 물속 친구, 더 기분 좋은 가격으로."}
              </p>
            </div>
            <button
              className="text-button"
              onClick={() =>
                filtering ? selectCategory("전체") : selectCategory("초특가")
              }
            >
              {filtering ? "필터 초기화" : "특가 전체보기"}
              <ArrowUpRight size={18} />
            </button>
          </div>
          {listed.length ? (
            <div className="product-grid">
              {listed.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAdd={add}
                  added={added === p.id}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <SearchEmpty />
              <h3>아직 준비 중인 상품이에요</h3>
              <p>
                {search
                  ? "다른 검색어로 물속 친구를 찾아보세요."
                  : "이 카테고리의 상품은 곧 만나볼 수 있어요."}
              </p>
              <button
                className="button primary"
                onClick={() => selectCategory("전체")}
              >
                전체 상품 보기
              </button>
            </div>
          )}
        </section>
        <section id="beginner" className="beginner container reveal">
          <div className="beginner-copy">
            <span className="eyebrow">YOUR FIRST AQUARIUM</span>
            <h2>
              처음 시작하는
              <br />
              나만의 수조
            </h2>
            <p>
              어렵게 생각하지 마세요.
              <br />
              작은 수조 하나로 시작하는 새로운 취미.
            </p>
            <a className="button dark-button" href="#guide">
              입문 가이드 살펴보기
              <ArrowRight size={18} />
            </a>
            <span className="beginner-note">
              수조 준비부터 첫 물고기 맞이까지
            </span>
          </div>
          <div className="beginner-image">
            <img
              src={images.beginner}
              alt="수초가 풍성하게 자란 담수 수조"
              loading="lazy"
            />
            <span>작은 시작, 깊어지는 즐거움.</span>
          </div>
        </section>
        <section className="products-section popular container reveal">
          <div className="section-heading">
            <div>
              <span className="eyebrow">LOVED BY AQUARISTS</span>
              <h2>오래 보고 싶은, 인기 열대어</h2>
              <p>많은 사랑을 받는 데에는 이유가 있죠.</p>
            </div>
            <button
              className="text-button"
              onClick={() => selectCategory("열대어")}
            >
              열대어 전체보기
              <ArrowUpRight size={18} />
            </button>
          </div>
          <div className="product-grid">
            {products
              .filter((p) => p.popular)
              .map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAdd={add}
                  added={added === p.id}
                />
              ))}
          </div>
        </section>
        <section className="care-section reveal">
          <div className="container">
            <div className="care-heading">
              <span className="eyebrow">WITH CARE, WITH AQUA BLOOM</span>
              <h2>작은 생명이 도착하는 순간까지</h2>
              <p>설레는 첫 만남을 위해, 하나하나 세심하게.</p>
            </div>
            <div className="care-grid">
              <article id="delivery">
                <PackageCheck strokeWidth={1.4} />
                <h3>정성을 담은 안전 포장</h3>
                <p>
                  생물별 개별 포장과 보온 포장으로
                  <br />
                  건강한 만남을 준비해요.
                </p>
                <button
                  onClick={() =>
                    demo(
                      "포장·배송 안내",
                      `시안용 배송 정책: 생물은 산소 충전 봉투와 보온 박스로 포장합니다. 월–목 출고, 출고 후 1–2일 도착을 가정합니다. 기온과 지역에 따라 출고가 조정될 수 있습니다. 실제 판매 및 배송은 제공하지 않습니다.`,
                    )
                  }
                >
                  포장 안내
                  <ArrowRight size={16} />
                </button>
              </article>
              <article>
                <Truck strokeWidth={1.4} />
                <h3>기다림까지 기분 좋게</h3>
                <p>
                  {won(shop.freeShipping)}원 이상 무료배송
                  <br />
                  안전한 도착을 위한 꼼꼼한 준비.
                </p>
                <button
                  onClick={() =>
                    demo(
                      "배송비 안내",
                      `시안용 예시: 상품 합계 ${won(shop.freeShipping)}원 이상 무료배송, 미만은 ${won(shop.shipping)}원입니다. 제주·도서산간 및 생물 배송은 실제 운영 시 별도 정책이 필요합니다.`,
                    )
                  }
                >
                  배송 안내
                  <ArrowRight size={16} />
                </button>
              </article>
              <article id="guide">
                <Sprout strokeWidth={1.4} />
                <h3>처음이라도 괜찮아요</h3>
                <p>
                  물잡이부터 먹이 주기까지,
                  <br />
                  차근차근 함께 알아가요.
                </p>
                <button
                  onClick={() =>
                    demo(
                      "초보자를 위한 사육 가이드",
                      "① 수조와 여과기를 준비하고 염소를 제거한 물로 물잡이를 진행하세요. 생물 투입 전 암모니아와 아질산을 확인하세요. ② 어종에 맞는 수온과 수질, 합사 조건을 확인하세요. 베타는 단독 사육을 권장합니다. ③ 도착한 생물은 수온과 수질에 천천히 적응시켜 주세요. ④ 먹이는 소량씩 급여하고 남은 먹이는 제거하세요. 어종별 상세 조건은 입양 전 별도로 확인해 주세요.",
                    )
                  }
                >
                  사육 가이드
                  <ArrowRight size={16} />
                </button>
              </article>
            </div>
            <p className="sample-note">포장·배송 조건은 시안용 예시입니다.</p>
          </div>
        </section>
      </main>
      <Footer onDemo={demo} />
      {toast && (
        <div className="toast" role="status">
          <Check size={18} />
          {toast}
          <button onClick={() => setCartOpen(true)}>보기</button>
        </div>
      )}
      {modal && (
        <Modal title={modal.title} onClose={() => setModal(null)}>
          <p className="modal-copy">{modal.body}</p>
          <button className="button primary" onClick={() => setModal(null)}>
            확인
          </button>
        </Modal>
      )}
      {cartOpen && (
        <Modal
          title={`장바구니 (${count})`}
          onClose={() => setCartOpen(false)}
          wide
        >
          {cartItems.length ? (
            <>
              <div className="cart-list">
                {cartItems.map((p) => (
                  <div className="cart-row" key={p.id}>
                    <img src={p.image} alt={p.name} />
                    <div className="cart-item-main">
                      <strong>{p.name}</strong>
                      <small>
                        {p.unit} · {won(salePrice(p))}원
                      </small>
                      <div className="quantity">
                        <button
                          onClick={() => change(p.id, -1)}
                          aria-label={`${p.name} 수량 감소`}
                        >
                          <Minus size={14} />
                        </button>
                        <span aria-label="수량">{cart[p.id]}</span>
                        <button
                          onClick={() => change(p.id, 1)}
                          aria-label={`${p.name} 수량 증가`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-end">
                      <button
                        aria-label={`${p.name} 삭제`}
                        onClick={() =>
                          setCart((c) => {
                            const n = { ...c };
                            delete n[p.id];
                            return n;
                          })
                        }
                      >
                        <X size={17} />
                      </button>
                      <strong>{won(salePrice(p) * cart[p.id])}원</strong>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-totals">
                <p>
                  상품 금액<span>{won(total)}원</span>
                </p>
                <p>
                  예상 배송비
                  <span>
                    {total >= shop.freeShipping
                      ? "무료"
                      : `${won(shop.shipping)}원`}
                  </span>
                </p>
                <p className="grand-total">
                  합계
                  <strong>
                    {won(
                      total + (total >= shop.freeShipping ? 0 : shop.shipping),
                    )}
                    원
                  </strong>
                </p>
              </div>
              <p className="demo-note">
                데모 장바구니입니다. 실제 주문·결제는 진행되지 않으며
                새로고침하면 초기화됩니다.
              </p>
              <button
                className="button primary full"
                onClick={() => {
                  setCartOpen(false);
                  demo(
                    "결제 데모 안내",
                    "장바구니 합계 확인까지 체험할 수 있는 시안입니다. 실제 결제나 주문은 생성되지 않습니다.",
                  );
                }}
              >
                주문 확인 (데모)
                <ArrowRight size={18} />
              </button>
            </>
          ) : (
            <div className="empty">
              <ShoppingBag size={38} />
              <h3>장바구니가 비어 있어요</h3>
              <p>마음에 드는 물속 친구를 담아보세요.</p>
              <button
                className="button primary"
                onClick={() => setCartOpen(false)}
              >
                쇼핑 계속하기
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
function SearchEmpty() {
  return <Sprout size={38} strokeWidth={1.5} />;
}

