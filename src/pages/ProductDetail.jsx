import { useParams } from "react-router-dom";
import products from "../data/products";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import Review from "../components/Review";
import "../styles/productDetail.css";
import { useState } from "react";

function ProductDetail() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const fakeImages = ["FRONT", "SIDE", "BACK"];

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

  const handleAddCart = () => {
    if (!selectedColor) {
      alert("색상을 선택해주세요.");
      return;
    }

    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      const newItem = {
        ...product,
        selectedColor: selectedColor,
        selectedSize: selectedSize,
        quantity: 1,
      };

      updatedCart = [...cart, newItem];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("장바구니에 담겼습니다.");
  };

  if (!product) {
    return <p>상품을 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <TopNotice />
      <Header />

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
            * 해당 제품은 드라이클리닝 전용 제품으로, 물세탁은 권장하지 않습니다.
            물세탁 시 타 제품과의 마찰로 인해 로고 손상이 발생할 수 있으므로,
            반드시 단독 세탁해 주시기 바랍니다.
          </p>

          <div className="detail-line"></div>

          <div className="option-box">
            <p className="option-title">COLOR</p>
            <div className="option-buttons">
              {["Ivory", "Pink", "Black"].map((color) => (
                <button
                  key={color}
                  className={selectedColor === color ? "selected-option" : ""}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="option-box">
            <p className="option-title">SIZE</p>
            <div className="option-buttons">
              {["S", "M", "L"].map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? "selected-option" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="add-cart-btn" onClick={handleAddCart}>
            add to cart
          </button>
        </div>
      </div>

      <Review productId={product.id} productName={product.name} />
    </div>
  );
}

export default ProductDetail;