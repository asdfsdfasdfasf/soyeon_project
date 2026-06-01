import { useEffect, useState } from "react";
import "../styles/review.css";

function Review({ productId, productName }) {
  const [reviews, setReviews] = useState([]);
  const [isWriting, setIsWriting] = useState(false);

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewImage, setReviewImage] = useState("");
  const [sizeTip, setSizeTip] = useState("true to size");

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  useEffect(() => {
    fetch(`http://localhost:3001/reviews?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [productId]);

  const averageRating =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, review) => sum + Number(review.rating), 0) /
        reviews.length;

  const handleOpenReview = () => {
    if (!loginUser) {
      alert("로그인한 사용자만 리뷰를 작성할 수 있습니다.");
      return;
    }

    setIsWriting(!isWriting);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setReviewImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleReviewSubmit = async () => {
    if (!reviewTitle.trim()) {
      alert("리뷰 제목을 입력해주세요.");
      return;
    }

    if (!reviewContent.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    const newReview = {
      productId: Number(productId),
      productName: productName,
      userId: loginUser.id,
      userName: loginUser.name || loginUser.email,
      rating: Number(rating),
      title: reviewTitle,
      content: reviewContent,
      image: reviewImage,
      sizeTip: sizeTip,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    const response = await fetch("http://localhost:3001/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    });

    const savedReview = await response.json();

    setReviews([...reviews, savedReview]);
    setReviewTitle("");
    setReviewContent("");
    setRating(5);
    setReviewImage("");
    setSizeTip("true to size");
    setIsWriting(false);

    alert("리뷰가 등록되었습니다.");
  };

  return (
    <div className="review-section">
      <h2>reviews</h2>

      <div className="review-summary">
        <div className="review-score">
          <span className="summary-stars">
            {"★".repeat(Math.round(averageRating))}
            {"☆".repeat(5 - Math.round(averageRating))}
          </span>

          <span>{averageRating.toFixed(2)} out of 5</span>
          <p>based on {reviews.length} reviews</p>
        </div>

        <button className="write-review-btn" onClick={handleOpenReview}>
          {isWriting ? "cancel review" : "write a review"}
        </button>
      </div>

      {isWriting && (
        <div className="review-write-box">
          <h3>write a review</h3>

          <p className="write-label">rating</p>
          <div className="rating-buttons">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={rating >= star ? "star active" : "star"}
              >
                ★
              </button>
            ))}
          </div>

          <p className="write-label">review title</p>
          <input
            className="review-title-input"
            placeholder="Give your review a title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />

          <p className="write-label">review content</p>
          <textarea
            className="review-content-input"
            placeholder="Start writing here..."
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />

          <p className="write-label">picture (optional)</p>
          <label className="image-upload-box">
            +
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          {reviewImage && (
            <img
              src={reviewImage}
              alt="review preview"
              className="review-preview"
            />
          )}

          <p className="write-label pink-label">sizing tips*</p>

          <div className="size-tip-box">
            {[
              "small",
              "a bit small",
              "true to size",
              "a bit large",
              "large",
            ].map((tip) => (
              <label key={tip}>
                <input
                  type="radio"
                  name="sizeTip"
                  value={tip}
                  checked={sizeTip === tip}
                  onChange={(e) => setSizeTip(e.target.value)}
                />
                <span>{tip}</span>
              </label>
            ))}
          </div>

          <div className="review-submit-row">
            <button
              type="button"
              className="cancel-review-btn"
              onClick={() => setIsWriting(false)}
            >
              cancel review
            </button>

            <button
              type="button"
              className="submit-review-btn"
              onClick={handleReviewSubmit}
            >
              submit review
            </button>
          </div>
        </div>
      )}

      <div className="review-photo-section">
        <h3>photos</h3>

        <div className="review-photo-list">
          {reviews
            .filter((review) => review.image)
            .map((review) => (
              <img
                key={review.id}
                src={review.image}
                alt="review"
                className="review-photo-thumbnail"
              />
            ))}
        </div>
      </div>

      <div className="review-list">
        {reviews.length === 0 ? (
          <p className="no-review">등록된 리뷰가 없습니다.</p>
        ) : (
          reviews.map((review) => (
            <div className="review-item" key={review.id}>
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
                        width:
                          review.sizeTip === "small"
                            ? "20%"
                            : review.sizeTip === "a bit small"
                            ? "40%"
                            : review.sizeTip === "true to size"
                            ? "60%"
                            : review.sizeTip === "a bit large"
                            ? "80%"
                            : "100%",
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
    </div>
  );
}

export default Review;