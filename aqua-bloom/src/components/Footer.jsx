import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Header";
import { shop } from "../data";
export default function Footer({ onDemo }) {
  return (
    <footer>
      <div className="container footer-top">
        <div>
          <Logo />
          <p>
            당신의 일상에 작은 수중 정원을.
            <br />
            건강한 생명과 함께하는 아쿠아블룸.
          </p>
        </div>
        <div className="footer-service">
          <span>
            고객센터 <small>시안용 연락처</small>
          </span>
          <strong>{shop.phone}</strong>
          <p>
            {shop.hours}
            <br />
            점심 12:00 – 13:00 · 주말 및 공휴일 휴무
          </p>
        </div>
        <div className="footer-links">
          <button
            onClick={() =>
              onDemo(
                "쇼핑몰 안내",
                "아쿠아블룸은 열대어 판매 쇼핑몰의 디자인 시안입니다. 실제 주문과 판매는 이루어지지 않습니다.",
              )
            }
          >
            아쿠아블룸 소개
            <ArrowUpRight size={15} />
          </button>
          <a href="#delivery">
            포장·배송 안내
            <ArrowUpRight size={15} />
          </a>
          <a href="#guide">
            사육 가이드
            <ArrowUpRight size={15} />
          </a>
          <a href="/IMAGE-CREDITS.md" target="_blank" rel="noreferrer">
            이미지 출처
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          아쿠아블룸 AQUA BLOOM · 쇼핑몰 디자인 데모
          <br />
          상품 이미지와 가격, 할인, 쿠폰, 배송 조건은 시안용 예시입니다. 실제
          결제·회원가입은 지원하지 않습니다.
        </p>
        <span>© 2026 AQUA BLOOM</span>
      </div>
    </footer>
  );
}
