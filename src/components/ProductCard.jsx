import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../context/wishlist-context";

function ProductCard({ product }) {
  const [showSizes, setShowSizes] = useState(false);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);

  const getLoginUser = () => {
    return JSON.parse(localStorage.getItem("loginUser"));
  };

  const addCart = async (size) => {
    const loginUser = getLoginUser();

    const cartItem = {
      id: `cart-${product.id}-${size}-${Date.now()}`,
      productId: product.id,
      userId: loginUser ? loginUser.id : null,
      name: product.name,
      price: product.price,
      category: product.category,
      group: product.group || [],
      size,
      quantity: 1,
    };

    await fetch("http://localhost:3001/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    });

    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${size} 사이즈가 장바구니에 추가되었습니다.`);
    setShowSizes(false);
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
            <button type="button" onClick={() => addCart("S")}>S</button>
            <button type="button" onClick={() => addCart("M")}>M</button>
            <button type="button" onClick={() => addCart("L")}>L</button>
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