import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";
import "../styles/main.css";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const response = await fetch(
      `http://localhost:3001/users?email=${form.email}&password=${form.password}`
    );

    const data = await response.json();

    if (data.length === 0) {
      alert("이메일 또는 비밀번호가 틀렸습니다.");
      return;
    }

    localStorage.setItem("loginUser", JSON.stringify(data[0]));

    sessionStorage.removeItem("guestWishlist");

    window.dispatchEvent(new Event("wishlistReload"));
    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-page">
      <TopNotice />
      <Header />
      <FixedLogo />

      <div className="login-content">
        <div className="login-container">
          <h2>LOGIN</h2>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="email"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="password"
          />

          <p className="forgot" onClick={() => navigate("/reset-password")}>
            forgot your password?
          </p>

          <button
            type="button"
            className="login-btn"
            onClick={handleLogin}
          >
            sign in
          </button>

          <Link to="/signup" className="signup-link">
            create an account
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;