import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";
import Review from "../components/Review";

import "../styles/productDetail.css";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const fakeImages = ["FRONT", "SIDE", "BACK"];
  const colors = ["Ivory", "Pink", "Black"];
  const getSizesByCategory = (category) => {
    if (["bags", "jewelry", "socks"].includes(category)) {
      return ["OS"];
    }

    if (category === "shoes") {
      return ["225", "230", "235", "240", "245", "250", "255", "260"];
    }

    return ["S", "M", "L"];
  };

const sizes = getSizesByCategory(product?.category);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`http://localhost:3001/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    getProduct();
  }, [id]);

  if (!product) {
    return <p>상품을 불러오는 중입니다.</p>;
  }

  const isColorSoldOut = (color) => {
    if (!product.stock || !product.stock[color]) return false;

    return Object.values(product.stock[color]).every(
      (stockValue) => stockValue === false
    );
  };

  const isSizeSoldOut = (size) => {
    if (!selectedColor) return false;
    if (!product.stock || !product.stock[selectedColor]) return false;

    return product.stock[selectedColor][size] === false;
  };

  const isProductSoldOut = () => {
    if (!product.stock) return false;

    return Object.values(product.stock).every((colorStock) =>
      Object.values(colorStock).every((sizeStock) => sizeStock === false)
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? fakeImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === fakeImages.length - 1 ? 0 : prev + 1
    );
  };

  const getLoginUser = () => {
    return JSON.parse(localStorage.getItem("loginUser"));
  };

  const handleAddCart = async () => {
    if (isProductSoldOut()) {
      alert("품절된 상품입니다.");
      return;
    }

    if (!selectedColor) {
      alert("색상을 선택해주세요.");
      return;
    }

    if (isColorSoldOut(selectedColor)) {
      alert("품절된 색상입니다.");
      return;
    }

    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }

    if (isSizeSoldOut(selectedSize)) {
      alert("품절된 옵션입니다.");
      return;
    }

    const loginUser = getLoginUser();

    const newCartItem = {
      ...product,
      productId: product.id,
      userId: loginUser ? loginUser.id : null,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    };

    if (!loginUser) {
      const guestCart = JSON.parse(sessionStorage.getItem("guestCart")) || [];

      const existingItem = guestCart.find(
        (item) =>
          item.productId === product.id &&
          item.color === selectedColor &&
          item.size === selectedSize
      );

      let updatedCart;

      if (existingItem) {
        updatedCart = guestCart.map((item) =>
          item.productId === product.id &&
          item.color === selectedColor &&
          item.size === selectedSize
            ? { ...item, quantity: Number(item.quantity) + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...guestCart,
          {
            ...newCartItem,
            id: `guest-${product.id}-${selectedColor}-${selectedSize}`,
          },
        ];
      }

      sessionStorage.setItem("guestCart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
      window.dispatchEvent(new Event("openCart"));
      return;
    }

    const response = await fetch(
      `http://localhost:3001/cart?userId=${loginUser.id}&productId=${product.id}&color=${selectedColor}&size=${selectedSize}`
    );

    const data = await response.json();

    if (data.length > 0) {
      const existingItem = data[0];

      await fetch(`http://localhost:3001/cart/${existingItem.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: Number(existingItem.quantity) + 1,
        }),
      });
    } else {
      await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newCartItem,
          id: `cart-${product.id}-${selectedColor}-${selectedSize}-${Date.now()}`,
        }),
      });
    }

    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("openCart"));
  };

  return (
    <div>
      <TopNotice />
      <Header />
      <FixedLogo />

      <div className="product-detail-page">
        <div className="product-detail-left">
          <div className="image-slider">
            <button
              className="slide-btn left"
              onClick={prevImage}
              aria-label="previous image"
            ></button>

            <div className="fake-image">
              <span>
                {product.name} {fakeImages[currentImage]}
              </span>
            </div>

            <button
              className="slide-btn right"
              onClick={nextImage}
              aria-label="next image"
            ></button>
          </div>
        </div>

        <div className="product-detail-right">
          <p className="detail-category">{product.category}</p>
          <h2 className="detail-name">{product.name}</h2>
          <p className="detail-price">{product.price}</p>

          <p className="detail-notice">
            * 해당 제품은 드라이클리닝 전용 제품으로, 물세탁은 권장하지
            않습니다. 물세탁 시 타 제품과의 마찰로 인해 로고 손상이 발생할 수
            있으므로, 반드시 단독 세탁해 주시기 바랍니다.
          </p>

          <div className="detail-line"></div>

          <div className="option-box">
            <p className="option-title">COLOR</p>

            <div className="option-buttons">
              {colors.map((color) => {
                const colorSoldOut = isColorSoldOut(color);

                return (
                  <button
                    key={color}
                    type="button"
                    disabled={colorSoldOut}
                    className={`${selectedColor === color ? "selected-option" : ""} ${
                      colorSoldOut ? "soldout-option" : ""
                    }`}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedSize("");
                    }}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="option-box">
            <p className="option-title">SIZE</p>

            <div className="option-buttons">
              {sizes.map((size) => {
                const sizeSoldOut = isSizeSoldOut(size);

                return (
                  <button
                    key={size}
                    type="button"
                    disabled={!selectedColor || sizeSoldOut}
                    className={`${selectedSize === size ? "selected-option" : ""} ${
                      sizeSoldOut ? "soldout-option" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {isProductSoldOut() ? (
            <button type="button" className="notify-btn">
              notify me when available
            </button>
          ) : (
            <button
              type="button"
              className="add-cart-btn"
              onClick={handleAddCart}
            >
              add to cart
            </button>
          )}
        </div>
      </div>

      <Review productId={product.id} productName={product.name} />
      <Footer />
    </div>
  );
}

export default ProductDetail;