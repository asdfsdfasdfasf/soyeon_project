import { useParams } from "react-router-dom";
import products from "../data/products";
import Header from "../components/Header";
import "../styles/productDetail.css";
import TopNotice from "../components/TopNotice";
import { useState } from "react";

function ProductDetail() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [currentImage, setCurrentImage] = useState(0);

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
              <button>Ivory</button>
              <button>Pink</button>
              <button>Black</button>
            </div>
          </div>

          <div className="option-box">
            <p className="option-title">SIZE</p>
            <div className="option-buttons">
              <button>S</button>
              <button>M</button>
              <button>L</button>
            </div>
          </div>

          <button className="add-cart-btn">add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;