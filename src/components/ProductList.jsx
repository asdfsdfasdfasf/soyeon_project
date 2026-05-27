import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../context/wishlist-context";
import products from "../data/products";

function ProductList({ filter }) {
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);
  const [sizeOpenId, setSizeOpenId] = useState(null);

  const getLoginUser = () => {
    return JSON.parse(localStorage.getItem("loginUser"));
  };

  const getGuestCart = () => {
    return JSON.parse(sessionStorage.getItem("guestCart")) || [];
  };

  const saveGuestCart = (cart) => {
    sessionStorage.setItem("guestCart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const addCart = async (product, size) => {
    const loginUser = getLoginUser();

    const cartItem = {
      productId: product.id,
      userId: loginUser ? loginUser.id : null,
      name: product.name,
      price: product.price,
      category: product.category,
      group: product.group || [],
      size,
      quantity: 1,
    };

    if (!loginUser) {
      const guestCart = getGuestCart();

      const sameItem = guestCart.find(
        (item) => item.productId === product.id && item.size === size
      );

      let newGuestCart;

      if (sameItem) {
        newGuestCart = guestCart.map((item) =>
          item.productId === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newGuestCart = [
          ...guestCart,
          {
            ...cartItem,
            id: Date.now(),
          },
        ];
      }

      saveGuestCart(newGuestCart);

      alert(`${size} 사이즈가 장바구니에 추가되었습니다.`);
      setSizeOpenId(null);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) {
        throw new Error("장바구니 저장 실패");
      }

      window.dispatchEvent(new Event("cartUpdated"));

      alert(`${size} 사이즈가 장바구니에 추가되었습니다.`);
      setSizeOpenId(null);
    } catch (error) {
      console.error(error);
      alert("장바구니에 담기지 않았습니다. json-server를 확인해주세요.");
    }
  };

  const filteredProducts = products.filter((product) => {
    if (!filter) return true;

    if (filter === "new") return product.group?.includes("new");
    if (filter === "best-sellers") return product.group?.includes("best-sellers");
    if (filter === "last-chance") return product.group?.includes("last-chance");

    if (filter === "clothing") {
      return [
        "outers",
        "tees",
        "tops",
        "boleros",
        "knits",
        "dresses",
        "pants",
        "skirts",
        "sets",
        "swimwear",
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
          >
            {isWishlisted(product.id) ? <FaHeart /> : <FiHeart />}
          </button>

          <button
            type="button"
            className="bag-button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSizeOpenId(sizeOpenId === product.id ? null : product.id);
            }}
          >
            <FiShoppingBag />
          </button>

          {sizeOpenId === product.id && (
            <div className="size-select-box">
              <button type="button" onClick={() => addCart(product, "S")}>
                S
              </button>
              <button type="button" onClick={() => addCart(product, "M")}>
                M
              </button>
              <button type="button" onClick={() => addCart(product, "L")}>
                L
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductList;