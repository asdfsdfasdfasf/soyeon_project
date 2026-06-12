import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";
import "../styles/main.css";
import "../styles/password.css";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    alert("비밀번호 재설정 기능은 준비 중입니다.");
    navigate("/login");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="password-page">
      <TopNotice />
      <Header />
      <FixedLogo />

      <div className="password-content">
        <div className="password-container">
          <h2>RESET YOUR PASSWORD</h2>

          <p className="reset-text">
            비밀번호 재설정을 위해 이메일을 보내드리겠습니다.
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="email"
          />

          <button type="button" 
          className="submit-btn" 
          onClick={handleSubmit}
          >
            submit
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/login")}
          >
            cancel
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;