import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";
import "../styles/main.css";
import "../styles/mypage.css";

function Mypage() {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loginUser"));

    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    setLoginUser(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loginUser");

    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("wishlistReload"));

    alert("로그아웃되었습니다.");
    navigate("/");
  };

  if (!loginUser) return null;

  return (
    <div>
      <TopNotice />
      <Header />
      <FixedLogo />

      <main className="mypage-container">
        <h2 className="mypage-title">ACCOUNT</h2>

        <div className="mypage-content">

          {/* 왼쪽 메뉴 */}
          <div className="mypage-menu">
            <p className="menu-active">ACCOUNT</p>

            <p onClick={() => navigate("/wishlist")}>
              WISHLIST
            </p>

            <p onClick={handleLogout}>
              LOG OUT
            </p>
          </div>

          {/* 오른쪽 정보 */}
          <div className="mypage-box">

            <div className="mypage-user-info">
              <p className="mypage-email">
                {loginUser.email}
              </p>

              <p className="mypage-name">
                {loginUser.firstName} {loginUser.lastName}
              </p>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                log out
              </button>
            </div>

            <div className="mypage-order-info">
              <p>order history</p>
              <h3>0</h3>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Mypage;