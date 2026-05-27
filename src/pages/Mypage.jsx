import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
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

      <main className="mypage-page">
        <h2>MY PAGE</h2>

        <p>
          {loginUser.firstName} {loginUser.lastName}
        </p>

        <p>{loginUser.email}</p>

        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </main>
    </div>
  );
}

export default Mypage;