import { useEffect, useState } from "react";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import "../styles/adminReviews.css";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    fetch("http://localhost:3001/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  };

  const handleDeleteReview = async (reviewId) => {
    const confirmDelete = window.confirm("이 리뷰를 삭제하시겠습니까?");

    if (!confirmDelete) return;

    await fetch(`http://localhost:3001/reviews/${reviewId}`, {
      method: "DELETE",
    });

    setReviews(reviews.filter((review) => review.id !== reviewId));
    alert("리뷰가 삭제되었습니다.");
  };

  return (
    <>
      <TopNotice />
      <Header />

      <div className="admin-reviews-page">
        <h2>Review Management</h2>

        <div className="admin-review-list">
          {reviews.length === 0 ? (
            <p className="no-admin-review">등록된 리뷰가 없습니다.</p>
          ) : (
            reviews.map((review) => (
              <div className="admin-review-card" key={review.id}>
                <div className="admin-review-top">
                  <div>
                    <p className="admin-review-product">
                      with. {review.productName || "상품명 없음"}
                    </p>

                    <p className="admin-review-user">
                      {review.userName?.split("@")[0]} / {review.createdAt}
                    </p>
                  </div>

                  <button
                    className="admin-review-delete-btn"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    delete
                  </button>
                </div>

                <div className="admin-review-stars">
                  {"★".repeat(Number(review.rating))}
                  {"☆".repeat(5 - Number(review.rating))}
                </div>

                <h3>{review.title}</h3>
                <p className="admin-review-content">{review.content}</p>

                {review.image && (
                  <img
                    src={review.image}
                    alt="review"
                    className="admin-review-image"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default AdminReviews;