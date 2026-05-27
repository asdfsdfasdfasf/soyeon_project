import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../context/wishlist-context";
import products from "../data/products";

function ProductList({ filter }) {
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);
  const [sizeOpenId, setSizeOpenId] = useState(null);

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  const addCart = async (product, size) => {
    if (!loginUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const cartItem = {
      ...product,
      id: `${loginUser.id}-${product.id}-${size}-${Date.now()}`,
      productId: product.id,
      userId: loginUser.id,
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
    setSizeOpenId(null);
  };

  const filteredProducts = products.filter((product) => {
    if (!filter) return true;
    if (filter === "new") return product.group?.includes("new");
    if (filter === "best-sellers") return product.group?.includes("best-sellers");
    if (filter === "last-chance") return product.group?.includes("last-chance");

    if (filter === "clothing") {
      return [
        "outers", "tees", "tops", "boleros", "knits",
        "dresses", "pants", "skirts", "sets", "swimwear",
      ].includes(product.category);
    }

    if (filter === "home") return ["bras", "underwear"].includes(product.category);
    if (filter === "accessories") return ["jewelry", "socks"].includes(product.category);

    return product.category === filter;
  });

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <div className="product-card" key={product.id}>
          <Link to={`/product/${product.id}`} className="product-link">
            <div className="product-image-frame"></div>

            <div className="product-info">
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          </Link>

          <button
            type="button"
            className="heart-button"
            onClick={() => {
              if (!loginUser) {
                alert("로그인이 필요합니다.");
                navigate("/login");
                return;
              }

              toggleWishlist(product);
            }}
          >
            {isWishlisted(product.id) ? <FaHeart /> : <FiHeart />}
          </button>

          <button
            type="button"
            className="bag-button"
            onClick={() =>
              setSizeOpenId(sizeOpenId === product.id ? null : product.id)
            }
          >
            <FiShoppingBag />
          </button>

          {sizeOpenId === product.id && (
            <div className="size-select-box">
              <button type="button" onClick={() => addCart(product, "S")}>S</button>
              <button type="button" onClick={() => addCart(product, "M")}>M</button>
              <button type="button" onClick={() => addCart(product, "L")}>L</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductList;