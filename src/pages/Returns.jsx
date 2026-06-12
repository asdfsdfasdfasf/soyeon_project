import { Link } from "react-router-dom";

import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";
import "../styles/returns.css";

function Returns() {
  return (
    <>
      <TopNotice />
      <Header />
      <FixedLogo />

      <div className="returns-page">
        <h2 className="returns-title">RETURNS</h2>

        <div className="returns-content">
          <aside className="returns-menu">
            <p><Link to = "/faqs">FAQs</Link></p>
            <p><Link to = "/shipping">SHIPPING</Link></p>
            <p><Link to = "/returns" className="active">RETURNS</Link></p>
            </aside>

            <section className="returns-text">
            <p>
              제품을 보내주실 때에는 수령한 상태 그대로 발송해 주세요. 보내드린 사은품 및 옷걸이 등
              모든 구성품이 동봉되지 않았을 경우에는 반품이 거절될 수 있습니다. 제품을 사용한 흔적이 있거나
              이름, 택/라벨 훼손 등으로 인해 제품 가치가 상실된 경우에는 반품 처리가 어렵습니다.
            </p>

            <p>
              제품 생산 과정에서 발생할 수 있는 미세한 잡사, 마감 처리 실밥, 초크 자국,
              불규칙한 패턴 등은 불량으로 간주되지 않습니다.
            </p>

            <div className="returns-section">
              <h3>반품 절차</h3>
              <p>
                주문 내역에서 create a return 버튼을 눌러 주문 번호 및 반품 원하시는 제품,
                반품 사유를 입력해 주세요.
              </p>
              <p>
                웹사이트 하단의 채팅 버튼 또는 customerservice@s2yeonnie.com 을 통해서도
                반품을 접수하실 수 있습니다.
              </p>
              <p>
                반품이 승인되면 기존 배송지로 회수 접수 후 고객님께 알림톡을 발송해 드립니다.
              </p>
            </div>

            <div className="returns-section">
              <h3>반품 주소지</h3>
              <p>
                반품 제품의 직접 발송을 원하시는 경우 선불 택배를 이용하여 아래 주소로 발송해 주세요.
              </p>
              <p>
                (00000) 서울특별시 ○○구 ○○로 00 S2YEONNIE
              </p>
            </div>

            <div className="returns-section">
                <h3>교환</h3>
                <p>
                    불량/오배송을 제외한 단순 변심에 의한 교환은 접수가 어렵습니다.
                </p>
                <p>
                    구매하신 제품의 교환을 원하시는 경우, 기존 주문 반품 후 새로운 주문을 접수해 주세요.
                </p>
            </div>

            <div className="returns-section">
                <h3>환불안내</h3>
                <p>
                    반품하신 제품이 저희에게 도착하면, 상품 확인 절차를 마친 후 고객님께서 결제 시 사용하셨던 결제 수단을 이용하여 환불해 드립니다.
                </p>
                <p>
                    반품 배송비 3,000원 차감 후 환불 처리되며, 불량/오배송의 경우에는 쓰리타임즈에서 반품 배송비를 부담합니다.
                </p>
                <p>
                    카드사에 따라 환불 처리 기간에 최대 10 영업일의 시간이 소요될 수 있습니다.
                </p>
            </div>

          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Returns;