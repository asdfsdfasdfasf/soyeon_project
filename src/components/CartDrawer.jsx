import { useEffect, useState } from "react";

import { FiTrash2 } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

function CartDrawer({ isOpen, onClose }) {

  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  /* cart 새로 불러오기 */
  const refreshCart = async () => {

    if(!loginUser){
      setCartItems([]);
      return;
    }

    const response = await fetch(
      'http://localhost:3001/cart?userId=${loginUSer.id}'
    );

    const data = await response.json();

    setCartItems(data);
  };

  /* drawer 열릴 때 cart 불러오기 */
  useEffect(() => {

    if (!isOpen) return;

    refreshCart();

  }, [isOpen]);

  /* 상품 삭제 */
  const deleteCartItem = async (id) => {

    await fetch(
      `http://localhost:3001/cart/${id}`,
      {
        method: "DELETE",
      }
    );

    refreshCart();
  };

  /* 수량 증가 */
  const increaseQuantity = async (item) => {

    await fetch(
      `http://localhost:3001/cart/${item.id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          quantity: item.quantity + 1,
        }),
      }
    );

    refreshCart();
  };

  /* 수량 감소 */
  const decreaseQuantity = async (item) => {

    /* 1개 이하이면 삭제 */
    if (item.quantity <= 1) {

      deleteCartItem(item.id);

      return;
    }

    await fetch(
      `http://localhost:3001/cart/${item.id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          quantity: item.quantity - 1,
        }),
      }
    );

    refreshCart();
  };

  /* subtotal 계산 */
  const totalPrice = cartItems.reduce(
    (total, item) => {

      const priceNumber = Number(
        String(item.price).replace(/[^0-9]/g, "")
      );

      return total + priceNumber * item.quantity;

    },
    0
  );

  return (

    <div
      className={`cart-drawer-wrap ${
        isOpen ? "open" : ""
      }`}
    >

      <div className="cart-drawer">

        {/* 상단 */}
        <div className="cart-drawer-header">

          <div>
            shopping cart ({cartItems.length})
          </div>

          <button
            type="button"
            onClick={onClose}
          >
            <IoCloseOutline />
          </button>

        </div>

        {/* 배송 바 */}
        <div className="cart-free-shipping">

          <p>
            You get free shipping now ఇ
          </p>

          <div className="shipping-bar"></div>

        </div>

        {/* 쿠폰 */}
        <div className="cart-coupon">

          Use coupon code WELCOME10
          for 10% off your first order.

        </div>

        {/* 상품 리스트 */}
        <div className="cart-items">

          {cartItems.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              {/* 상품 이미지 */}
              <div className="cart-item-image"></div>

              {/* 상품 정보 */}
              <div className="cart-item-info">

                <p className="cart-item-name">
                  {item.name}
                </p>

                <p className="cart-item-price">
                  {item.price}
                </p>

                {/* 수량 */}
                <div className="cart-quantity">

                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item)
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(item)
                    }
                  >
                    ＋
                  </button>

                </div>

                {/* 옵션 */}
                <p className="cart-option">
                  size: {item.size}
                </p>

              </div>

              {/* 삭제 */}
              <button
                type="button"
                className="cart-delete-button"
                onClick={() =>
                  deleteCartItem(item.id)
                }
              >
                <FiTrash2 />
              </button>

            </div>

          ))}

        </div>

        {/* subtotal */}
        <div className="cart-subtotal">

          <span>
            subtotal
          </span>

          <strong>
            ₩{totalPrice.toLocaleString()}
          </strong>

        </div>

        {/* checkout */}
        <button
          type="button"
          className="checkout-button"
          onClick={() => {

            onClose();

            navigate("/checkout");

          }}
        >
          check out
        </button>

      </div>

    </div>
  );
}

export default CartDrawer;