import Header from "../components/Header";
import "../styles/main.css";

function Reviews() {
  return (
    <div className="home-page">
      <Header />

      <main className="review-page">
        <h1>Reviews</h1>
        <p>고객 리뷰가 들어갈 페이지입니다.</p>
      </main>
    </div>
  );
}

export default Reviews;