import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  const [form, setForm] = useState({
    email: "",
    lastName: "",
    firstName: "",
    zipCode: "",
    province: "서울특별시",
    city: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [billingType, setBillingType] = useState("same");

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch("http://localhost:3001/cart");
      const data = await response.json();
      setCartItems(data);
    };

    fetchCart();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePayNow = () => {
    const newErrors = {};

    if (!form.email) newErrors.email = "이메일 입력";
    if (!form.lastName) newErrors.lastName = "성 입력";
    if (!form.firstName) newErrors.firstName = "이름 입력";
    if (!form.zipCode) newErrors.zipCode = "우편 번호 입력";
    if (!form.city) newErrors.city = "구/군/시 입력";
    if (!form.address) newErrors.address = "주소 입력";
    if (!form.phone) newErrors.phone = "전화번호 입력";

    setErrors(newErrors);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const priceNumber = Number(String(item.price).replace(/[^0-9]/g, ""));
    return total + priceNumber * item.quantity;
  }, 0);

  return (
    <div className="checkout-page">
      <div className="checkout-header-wrap">
        <header className="checkout-header">
          <Link to="/" className="checkout-logo">
          <h2>S2yeonnie</h2>
          </Link>
        </header>
      </div>

      <div className="checkout-body-wrap">
        <main className="checkout-layout">
          <section className="checkout-left">
            <div className="checkout-section">
              <div className="checkout-title-row">
                <h2>연락처</h2>

                <Link to="/login" className="checkout-login-link">
                  Log in
                </Link>
              </div>

              <input
                className={`checkout-input ${errors.email ? "input-error" : ""}`}
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일"
              />

              {errors.email && <p className="error-text">{errors.email}</p>}

              <label className="checkout-check">
                <input type="checkbox" />
                뉴스 및 제안을 이메일로 받기
              </label>
            </div>

            <div className="checkout-section">
              <h2>배송</h2>

              <select className="checkout-input" defaultValue="대한민국">
                <option>대한민국</option>
              </select>

              <div className="checkout-two">
                <div>
                  <input
                    className={`checkout-input ${errors.lastName ? "input-error" : ""}`}
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="성"
                  />

                  {errors.lastName && (
                    <p className="error-text">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <input
                    className={`checkout-input ${errors.firstName ? "input-error" : ""}`}
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="이름"
                  />

                  {errors.firstName && (
                    <p className="error-text">{errors.firstName}</p>
                  )}
                </div>
              </div>

              <input
                className={`checkout-input ${errors.zipCode ? "input-error" : ""}`}
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
                placeholder="우편 번호"
              />

              {errors.zipCode && <p className="error-text">{errors.zipCode}</p>}

              <div className="checkout-two">
                <select
                  className="checkout-input"
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                >
                  <option>서울특별시</option>
                  <option>부산광역시</option>
                  <option>대구광역시</option>
                  <option>인천광역시</option>
                  <option>광주광역시</option>
                  <option>대전광역시</option>
                  <option>울산광역시</option>
                  <option>세종특별자치시</option>
                  <option>경기도</option>
                  <option>강원도</option>
                  <option>충청북도</option>
                  <option>충청남도</option>
                  <option>전라북도</option>
                  <option>전라남도</option>
                  <option>경상북도</option>
                  <option>경상남도</option>
                  <option>제주특별자치도</option>
                </select>

                <div>
                  <input
                    className={`checkout-input ${errors.city ? "input-error" : ""}`}
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="구/군/시"
                  />

                  {errors.city && <p className="error-text">{errors.city}</p>}
                </div>
              </div>

              <input
                className={`checkout-input ${errors.address ? "input-error" : ""}`}
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="주소"
              />

              {errors.address && <p className="error-text">{errors.address}</p>}

              <input
                className="checkout-input"
                placeholder="아파트, 동/호수 등(선택 사항)"
              />

              <input
                className={`checkout-input ${errors.phone ? "input-error" : ""}`}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="전화"
              />

              {errors.phone && <p className="error-text">{errors.phone}</p>}

              <label className="checkout-check">
                <input type="checkbox" />
                다음을 위해 이 정보를 저장
              </label>
            </div>

            <div className="checkout-section">
              <h2>배송 방법</h2>

              <div className="checkout-notice">
                사용 가능한 배송 방법을 보려면 배송 주소를 입력하십시오.
              </div>
            </div>

            <div className="checkout-section">
              <h2>결제</h2>

              <p className="checkout-small-text">
                모든 거래는 안전하고 암호화되어 있습니다.
              </p>

              <div className="payment-box">
                <div className="payment-title">토스페이먼츠</div>

                <div className="payment-desc">
                  구매를 완료할 수 있도록 토스페이먼츠(으)로 리디렉션됩니다.
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h2>청구 주소</h2>

              <div className="billing-box">
                <label
                  className={
                    billingType === "same"
                      ? "billing-option active"
                      : "billing-option"
                  }
                >
                  <input
                    type="radio"
                    name="billing"
                    checked={billingType === "same"}
                    onChange={() => setBillingType("same")}
                  />
                  배송 주소와 같음
                </label>

                <label
                  className={
                    billingType === "different"
                      ? "billing-option active"
                      : "billing-option"
                  }
                >
                  <input
                    type="radio"
                    name="billing"
                    checked={billingType === "different"}
                    onChange={() => setBillingType("different")}
                  />
                  다른 청구 주소 사용
                </label>
              </div>
            </div>

            <button
              type="button"
              className="pay-now-button"
              onClick={handlePayNow}
            >
              Pay now
            </button>
          </section>

          <aside className="checkout-right">
            <div className="checkout-summary">
              {cartItems.map((item) => {
                const priceNumber = Number(
                  String(item.price).replace(/[^0-9]/g, "")
                );

                return (
                  <div className="summary-item" key={item.id}>
                    <div className="summary-image">
                      <span>{item.quantity}</span>
                    </div>

                    <div className="summary-info">
                      <p>{item.name}</p>
                      <small>{item.size}</small>
                      <small>color: pink</small>
                    </div>

                    <div className="summary-price">
                      ₩{(priceNumber * item.quantity).toLocaleString()}
                    </div>
                  </div>
                );
              })}

              <div className="coupon-row">
                <input placeholder="할인 코드 또는 기프트 카드" />
                <button>적용</button>
              </div>

              <div className="summary-row">
                <span>소계 · {cartItems.length}개 품목</span>
                <strong>₩{totalPrice.toLocaleString()}</strong>
              </div>

              <div className="summary-row">
                <span>배송</span>
                <span>배송 주소를 입력해주세요</span>
              </div>

              <div className="summary-total">
                <span>총계</span>
                <div>KRW ₩{totalPrice.toLocaleString()}</div>
              </div>

              <p className="tax-text">
                부가세 ₩{Math.floor(totalPrice * 0.1).toLocaleString()} 포함
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default Checkout;