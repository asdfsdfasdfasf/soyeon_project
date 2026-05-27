import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { useState } from "react";

function ProductCard({ product }) {
  const [showSizes, setShowSizes] = useState(false);

  const addWishlist = async () => {
    await fetch("http://localhost:3001/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    alert("찜목록에 추가되었습니다.");
  };

  const addCart = async (size) => {
    await fetch("http://localhost:3001/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        size: size,
        quantity: 1,
      }),
    });

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
          onClick={addWishlist}
        >
          <FiHeart />
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