import { Plus, Check } from "lucide-react";
import { salePrice, won } from "../data";
export default function ProductCard({ product: p, onAdd, added }) {
  return (
    <article className="product-card">
      <div className="product-photo">
        <img src={p.image} alt={`${p.name} 참고 사진`} loading="lazy" />
        <span
          className={`badge ${p.badge === "초특가" ? "coral" : p.badge === "인기" ? "dark" : "mint"}`}
        >
          {p.badge}
        </span>
        <button
          className={`add-button ${added ? "added" : ""}`}
          onClick={() => onAdd(p)}
          aria-label={`${p.name} 장바구니 추가`}
        >
          {added ? <Check size={21} /> : <Plus size={22} />}
        </button>
      </div>
      <div className="product-info">
        <span className="product-type">
          {p.type} <span>· {p.unit}</span>
        </span>
        <h3>{p.name}</h3>
        <p>{p.description}</p>
        <div className="price-line">
          {p.discount > 0 && (
            <strong className="discount">{p.discount}%</strong>
          )}
          <strong>
            {won(salePrice(p))}
            <span>원</span>
          </strong>
          {p.discount > 0 && <del>{won(p.price)}원</del>}
        </div>
      </div>
    </article>
  );
}
