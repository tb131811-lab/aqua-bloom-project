import { ArrowRight, ArrowUpRight } from "lucide-react";
import { images, shop } from "../data";
export default function Hero({ onSale }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img
        className="hero-photo"
        src={images.hero}
        alt="싱그러운 수초 사이를 헤엄치는 열대어가 있는 수중 풍경"
        fetchPriority="high"
      />
      <div className="hero-shade" />
      <div className="light-rays" />
      <div className="bubbles" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="hero-content container">
        <div className="hero-eyebrow">
          <span /> A LITTLE OCEAN, A LOT OF JOY
        </div>
        <h1 id="hero-title">
          우리 집에 들어온
          <br />
          작은 열대
        </h1>
        <p>다채로운 열대어와 싱그러운 수초를 만나보세요</p>
        <div className="special-label">
          이번 주 스페셜 특가 <span>·</span> 최대 {shop.maxDiscount}% OFF
        </div>
        <div className="hero-actions">
          <button className="button primary" onClick={onSale}>
            특가 열대어 보러가기
            <ArrowRight size={18} />
          </button>
          <a className="button hero-secondary" href="#beginner">
            처음 키운다면
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="hero-bottom">
          <span>매일의 공간에, 살아 있는 아름다움</span>
          <span className="hero-index">
            <b>01</b>
            <i /> AQUA BLOOM COLLECTION
          </span>
        </div>
      </div>
      <div className="image-caption">THE BEAUTY BENEATH THE SURFACE</div>
    </section>
  );
}
