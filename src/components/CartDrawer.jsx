import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function CartDrawer({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const getLoginUser = () => {
    return JSON.parse(localStorage.getItem("loginUser"));
  };

  const getGuestCart = () => {
    return JSON.parse(sessionStorage.getItem("guestCart")) || [];
  };

  const saveGuestCart = (cart) => {
    sessionStorage.setItem("guestCart", JSON.stringify(cart));
    setCartItems(cart);
  };

  const refreshCart = async () => {
    const loginUser = getLoginUser();

    if (!loginUser) {
      setCartItems(getGuestCart());
      return;
    }

    const response = await fetch(
      `http://localhost:3001/cart?userId=${loginUser.id}`
    );

    const data = await response.json();
    setCartItems(data);
  };

  useEffect(() => {
    if (!isOpen) return;

    refreshCart();
  }, [isOpen]);

  useEffect(() => {
    const handleCartUpdated = () => {
      refreshCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdated);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, []);

  const deleteCartItem = async (id) => {
    const loginUser = getLoginUser();

    if (!loginUser) {
      const newCart = getGuestCart().filter((item) => item.id !== id);
      saveGuestCart(newCart);
      return;
    }

    await fetch(`http://localhost:3001/cart/${id}`, {
      method: "DELETE",
    });

    refreshCart();
  };

  const increaseQuantity = async (item) => {
    const loginUser = getLoginUser();

    if (!loginUser) {
      const newCart = getGuestCart().map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );

      saveGuestCart(newCart);
      return;
    }

    await fetch(`http://localhost:3001/cart/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: item.quantity + 1,
      }),
    });

    refreshCart();
  };

  const decreaseQuantity = async (item) => {
    const loginUser = getLoginUser();

    if (!loginUser) {
      if (item.quantity <= 1) {
        const newCart = getGuestCart().filter(
          (cartItem) => cartItem.id !== item.id
        );
        saveGuestCart(newCart);
        return;
      }

      const newCart = getGuestCart().map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );

      saveGuestCart(newCart);
      return;
    }

    if (item.quantity <= 1) {
      deleteCartItem(item.id);
      return;
    }

    await fetch(`http://localhost:3001/cart/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: item.quantity - 1,
      }),
    });

    refreshCart();
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const priceNumber = Number(String(item.price).replace(/[^0-9]/g, ""));
    return total + priceNumber * item.quantity;
  }, 0);

  return (
    <div className={`cart-drawer-wrap ${isOpen ? "open" : ""}`}>
      <div className="cart-drawer">
        <div className="cart-drawer-header">
          <div>shopping cart ({cartItems.length})</div>

          <button type="button" onClick={onClose}>
            <IoCloseOutline />
          </button>
        </div>

        <div className="cart-free-shipping">
          <p>You get free shipping now ఇ</p>
          <div className="shipping-bar"></div>
        </div>

        <div className="cart-coupon">
          Use coupon code WELCOME10 for 10% off your first order.
        </div>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-image"></div>

              <div className="cart-item-info">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">{item.price}</p>

                <div className="cart-quantity">
                  <button type="button" onClick={() => decreaseQuantity(item)}>
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button type="button" onClick={() => increaseQuantity(item)}>
                    ＋
                  </button>
                </div>

                <p className="cart-option">size: {item.size}</p>
              </div>

              <button
                type="button"
                className="cart-delete-button"
                onClick={() => deleteCartItem(item.id)}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-subtotal">
          <span>subtotal</span>
          <strong>₩{totalPrice.toLocaleString()}</strong>
        </div>

        <button
          type="button"
          className="checkout-button"
          disabled = {cartItems.length === 0}
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