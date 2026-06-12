import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../context/wishlist-context";

function ProductCard({ product, setCartOpen }) {
  const [showSizes, setShowSizes] = useState(false);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);

  const getLoginUser = () => {
    return JSON.parse(localStorage.getItem("loginUser"));
  };

  const openCartDrawer = () => {
    window.dispatchEvent(new Event("cartUpdated"));

    if (setCartOpen) {
      setCartOpen(true);
    }
  };

  const addCart = async (size) => {
    const loginUser = getLoginUser();

    const cartItem = {
      productId: Number(product.id),
      userId: loginUser ? Number(loginUser.id) : null,
      name: product.name,
      price: product.price,
      category: product.category,
      group: product.group || [],
      size,
      quantity: 1,
    };

    if (!loginUser) {
      const guestCart = JSON.parse(sessionStorage.getItem("guestCart")) || [];

      const sameItem = guestCart.find(
        (item) =>
          Number(item.productId) === Number(product.id) && item.size === size
      );

      let newGuestCart;

      if (sameItem) {
        newGuestCart = guestCart.map((item) =>
          Number(item.productId) === Number(product.id) && item.size === size
            ? { ...item, quantity: Number(item.quantity) + 1 }
            : item
        );
      } else {
        newGuestCart = [
          ...guestCart,
          {
            ...cartItem,
            id: `guest-cart-${product.id}-${size}-${Date.now()}`,
          },
        ];
      }

      sessionStorage.setItem("guestCart", JSON.stringify(newGuestCart));
      setShowSizes(false);
      openCartDrawer();
      return;
    }

    const cartResponse = await fetch(
      `http://localhost:3001/cart?userId=${Number(
        loginUser.id
      )}&productId=${Number(product.id)}&size=${size}`
    );

    const cartData = await cartResponse.json();

    if (cartData.length > 0) {
      const sameItem = cartData[0];

      await fetch(`http://localhost:3001/cart/${sameItem.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: Number(sameItem.quantity) + 1,
        }),
      });
    } else {
      await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });
    }

    setShowSizes(false);
    openCartDrawer();
  };

  return (
    <div className="product-card">
      <div className="product-image-frame">
        <Link to={`/product/${product.id}`} className="product-link">
          <div className="product-image-placeholder"></div>
        </Link>

        <button
          type="button"
          className="heart-button"
          onClick={() => toggleWishlist(product)}
        >
          {isWishlisted(product.id) ? <FaHeart /> : <FiHeart />}
        </button>

        <button
          type="button"
          className="bag-button"
          onClick={() => setShowSizes(!showSizes)}
        >
          <FiShoppingBag />
        </button>

        {showSizes && (
          <div className="size-select-box">
            <button type="button" onClick={() => addCart("S")}>
              S
            </button>
            <button type="button" onClick={() => addCart("M")}>
              M
            </button>
            <button type="button" onClick={() => addCart("L")}>
              L
            </button>
          </div>
        )}
      </div>

      <div className="product-info">
        <p>{product.name}</p>
        <p>{product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;