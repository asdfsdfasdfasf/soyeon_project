import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";

import mainImg from "../assets/main.jpg";
import keyImg from "../assets/key.png";
import reviewImg from "../assets/review.png";
import icecreamImg from "../assets/icecream.png";

import "../styles/main.css";

function Home() {
  const items = Array.from({ length: 10 }, (_, i) => i);

  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    if (startIndex < items.length - 5) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="home-page">
      <TopNotice />
      <Header />
      <FixedLogo />

      <main className="home-content">
        <section className="hero-section">
          <img src={mainImg} alt="main visual" className="hero-image" />

          <img src={keyImg} alt="key" className="floating-key" />

          <img
            src={icecreamImg}
            alt="icecream"
            className="floating-icecream"
          />

          <Link to="/review" className="review-banner">
            <img src={reviewImg} alt="all the love in reviews" />
          </Link>
        </section>

        <section className="lookbook-section">
          <button
            className="lookbook-arrow left"
            onClick={prevSlide}
          >
            ◁
          </button>

          <div className="lookbook-list">
            {items
              .slice(startIndex, startIndex + 5)
              .map((item) => (
                <div key={item} className="lookbook-item">
                  <div className="lookbook-image"></div>
                </div>
              ))}
          </div>

          <button
            className="lookbook-arrow right"
            onClick={nextSlide}
          >
            ▷
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;