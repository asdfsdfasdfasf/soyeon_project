import { useEffect, useState } from "react";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";
import "../styles/main.css";
import "../styles/review.css";

function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  useEffect(() => {
    loadReviews();
    loadProducts();
  }, []);

  const loadReviews = async () => {
    const response = await fetch("http://localhost:3001/reviews");
    const data = await response.json();
    setReviews(data.reverse());
  };

  const loadProducts = async () => {
    try {
    const response = await fetch("http://localhost:3001/products");

    if(!response.ok){
        setProducts([]);
        return;
    }

    const data = await response.json();
    setProducts(data);
  } catch (error) {
    setProducts([]);
  }
  };

  const averageRating =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, review) => sum + Number(review.rating), 0) /
        reviews.length;

  const getProductName = (productId) => {
    const product = products.find(
      (item) => Number(item.id) === Number(productId)
    );

    return product ? product.name : "상품명 없음";
  };

  const getSizePercent = (size) => {
    if (size === "small") return "20%";
    if (size === "a bit small") return "40%";
    if (size === "true to size") return "60%";
    if (size === "normal") return "60%";
    if (size === "a bit large") return "80%";
    if (size === "large") return "100%";
    return "60%";
  };

  return (
    <div>
      <TopNotice />
      <Header />
      <FixedLogo />

      <main className="review-page">
        <section className="review-section">

          <div className="review-summary">
            <div className="review-score">
              <span className="summary-stars">
                {"★".repeat(Math.round(averageRating))}
                {"☆".repeat(5 - Math.round(averageRating))}
              </span>

              <span>{averageRating.toFixed(2)} out of 5</span>
              <p>based on {reviews.length} reviews</p>
            </div>
          </div>

          <div className="review-photo-section">
            <h3>photos</h3>

            <div className="review-photo-list">
              {reviews.filter((review) => review.image).length === 0 ? (
                <p className="no-review">No photo reviews yet.</p>
              ) : (
                reviews
                  .filter((review) => review.image)
                  .map((review) => (
                    <img
                      key={review.id}
                      src={review.image}
                      alt="review"
                      className="review-photo-thumbnail"
                    />
                  ))
              )}
            </div>
          </div>

          <div className="review-list">
            {reviews.length === 0 ? (
              <p className="no-review">등록된 리뷰가 없습니다.</p>
            ) : (
              reviews.map((review) => (
                <div className="review-item" key={review.id}>
                  <div className="review-product">
                    <span>with</span>
                    <span className="review-product-name">
                      {review.productName || getProductName(review.productId)}
                    </span>
                  </div>

                  <div className="review-top-row">
                    <div className="review-left">
                      <span className="review-stars">
                        {"★".repeat(Number(review.rating))}
                        {"☆".repeat(5 - Number(review.rating))}
                      </span>

                      <span className="review-user">
                        {review.userName?.split("@")[0]}
                      </span>

                      <span className="verified-badge">Verified</span>
                    </div>

                    <div className="review-date">
                      {review.createdAt || review.date}
                    </div>
                  </div>

                  <div className="review-middle">
                    <h4>{review.title}</h4>

                    <p>{review.content}</p>

                    <div className="review-size-bar">
                      <p className="size-title">sizing tips:</p>

                      <div className="size-bar">
                        <div
                          className="size-fill"
                          style={{
                            width: getSizePercent(review.sizeTip),
                          }}
                        ></div>
                      </div>

                      <div className="size-labels">
                        <span>small</span>
                        <span>large</span>
                      </div>
                    </div>

                    {review.image && (
                      <img
                        src={review.image}
                        alt="review"
                        className="review-image"
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ReviewPage;