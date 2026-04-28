import { Link } from "react-router-dom";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import reviewImg from "../assets/review.png";
import "../styles/main.css";

function Home() {
  return (
    <div className="home-page">
      <TopNotice />
      <Header />
    <main className="home-content">
        <Link to="/review" className="review-banner">
          <img src={reviewImg} alt="all the love in reviews" />
        </Link>
    </main>
      
    </div>
  );
}

export default Home;