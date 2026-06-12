import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../context/wishlist-context";

function ProductList({ filter }) {
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);
  const [products, setProducts] = useState([]);
  const [sizeOpenId, setSizeOpenId] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("http://localhost:3001/products");
      const data = await response.json();
      setProducts(data);
    };

    getProducts();
  }, []);

  const isProductSoldOut = (product) => {
    if (!product.stock) return false;

    return Object.values(product.stock).every((colorStock) =>
      Object.values(colorStock).every((sizeStock) => sizeStock === false)
    );
  };

  const getLoginUser = () => {
    return JSON.parse(localStorage.getItem("loginUser"));
  };

  const openCartDrawer = () => {
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("openCart"));
  };

  const addCart = async (product, size) => {
    if (isProductSoldOut(product)) {
      alert("품절된 상품입니다.");
      return;
    }

    const loginUser = getLoginUser();

    const cartItem = {
      id: `cart-${product.id}-${size}-${Date.now()}`,
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
        newGuestCart = [...guestCart, cartItem];
      }

      sessionStorage.setItem("guestCart", JSON.stringify(newGuestCart));

      setSizeOpenId(null);
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

    setSizeOpenId(null);
    openCartDrawer();
  };

  const filteredProducts = products.filter((product) => {
    if (!filter) return true;

    if (filter === "new") return product.group?.includes("new");
    if (filter === "best-sellers")
      return product.group?.includes("best-sellers");
    if (filter === "last-chance")
      return product.group?.includes("last-chance");

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

    if (filter === "home") {
      return ["bras", "underwear"].includes(product.category);
    }

    if (filter === "accessories") {
      return ["jewelry", "socks"].includes(product.category);
    }

    return product.category === filter;
  });

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => {
        const soldOut = isProductSoldOut(product);

        return (
          <div className="product-card" key={product.id}>
            <Link to={`/product/${product.id}`} className="product-link">
              <div className="product-image-frame">
                <div className="product-image-placeholder"></div>

                {soldOut && <div className="sold-out-box">out of stock</div>}
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

            {!soldOut && (
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
            )}

            {sizeOpenId === product.id && !soldOut && (
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

            <Link to={`/product/${product.id}`} className="product-link">
              <div className="product-info">
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;