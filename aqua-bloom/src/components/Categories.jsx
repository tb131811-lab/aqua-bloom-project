import { categories, images } from "../data";
export default function Categories({ onCategory, filter }) {
  return (
    <section className="categories container" aria-label="물속 친구 종류">
      <div className="category-intro">
        <span className="eyebrow">FIND YOUR FAVORITE</span>
        <h2>
          어떤 친구를
          <br />
          만나볼까요?
        </h2>
      </div>
      <div className="category-list">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => onCategory(c.name)}
            className={`category ${filter === c.name ? "selected" : ""}`}
          >
            <span className="category-photo">
              <img src={images[c.key]} alt={c.name} loading="lazy" />
            </span>
            <strong>{c.name}</strong>
            <small>{c.caption}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
