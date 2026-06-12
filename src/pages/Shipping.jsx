import { Link } from "react-router-dom";

import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";
import "../styles/returns.css";

function Shipping() {
  return (
    <>
      <TopNotice />
      <Header />
      <FixedLogo />

      <div className="returns-page">
        <h2 className="returns-title">SHIPPING</h2>

        <div className="returns-content">
          <aside className="returns-menu">
            <p><Link to="/faqs">FAQs</Link></p>
            <p><Link to="/shipping" className="active">SHIPPING</Link></p>
            <p><Link to="/returns">RETURNS</Link></p>
            </aside>

            <section className="shipping-text">
            <div className="shipping-section-1">
            <p>
              일반적으로 상품 준비 기간은 1~3 영업일이 소요됩니다.
            </p>
            <p>
              주문 건 내 모든 제품이 준비되어야 배송이 시작됩니다.
            </p>
            <p>
              신제품 출시나 세일 기간에는 주문량 증가로 인하여 출고가 지연될 수 있습니다.
            </p>
            </div>

            <div className="shipping-section">
              <h3>배송</h3>
              <p>
                7만원 이상 구매 시 무료 배송 혜택이 적용되며, 7만원 미만 구매 시에는 3000원의 배송비가 적용됩니다.
              </p>
              <p>
                국내 주문건은 우체국택배를 통해 발송됩니다.
              </p>
              <p>
                부분배송을 원하시는 경우 별도의 배송비가 청구됩니다.
              </p>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Shipping;