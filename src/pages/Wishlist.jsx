import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import { WishlistContext } from "../context/wishlist-context";
import { FaHeart } from "react-icons/fa";

function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const [selectedSize, setSelectedSize] = useState({});

  const addCart = async (product) => {
    const size = selectedSize[product.productId];

    if (!size) {
      alert("사이즈를 선택해주세요.");
      return;
    }

    const cartItem = {
      productId: product.productId,
      userId: product.userId || null,
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

    alert(`${size} 사이즈가 장바구니에 추가되었습니다.`);

    setSelectedSize({
      ...selectedSize,
      [product.productId]: "",
    });
  };

  return (
    <div>
      <TopNotice />
      <Header />

      <main className="wishlist-page">
        <div className="wishlist-title-area">
          <h2>WISHLIST</h2>
          <p>{wishlist.length} item</p>

          <p>
            To save your wishlist please <Link to="/login">login</Link> or{" "}
            <Link to="/signup">sign up</Link>.
          </p>
        </div>

        <div className="wishlist-product-area">
          {wishlist.map((product) => (
            <div className="wishlist-item" key={product.id}>
              <div className="wishlist-image-box">
                <div className="wishlist-image"></div>

                <button
                  type="button"
                  className="wishlist-heart-button"
                  onClick={() => toggleWishlist(product)}
                >
                  <FaHeart />
                </button>
              </div>

              <div className="wishlist-info">
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>

              <select
                className="wishlist-size-select"
                value={selectedSize[product.productId] || ""}
                onChange={(e) =>
                  setSelectedSize({
                    ...selectedSize,
                    [product.productId]: e.target.value,
                  })
                }
              >
                <option value="">Select size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>

              <button
                type="button"
                className="wishlist-cart-button"
                onClick={() => addCart(product)}
              >
                {selectedSize[product.productId] ? "add to cart" : "select size"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Wishlist;