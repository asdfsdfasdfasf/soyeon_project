import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";
import "../styles/brandstory.css";

import brandImg from "../assets/brand-story.jpg";

function BrandStory() {
  return (
    <>
      <TopNotice />
      <Header />
      <FixedLogo />

      <div className="brand-story-page">
        {/* 왼쪽 이미지 */}
        <div className="brand-story-image">
          <img src={brandImg} alt="Brand Story" />
        </div>

        {/* 오른쪽 텍스트 */}
        <div className="brand-story-content">

          <p>
            S2yeonnie is a lifestyle brand inspired by sweetness,
            self-expression, and the beauty found in everyday moments.
            We create pieces that blend softness, femininity, and timeless charm.
          </p>

          <p>
            Through fashion, accessories, and lifestyle items,
            we hope to bring a little joy to ordinary days and turn
            small moments into lasting memories.
          </p>

          <p>
            At S2, we believe that beauty lives in thoughtful details,
            genuine emotions, and things made with love.
          </p>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default BrandStory;