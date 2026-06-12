import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";
import "../styles/signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
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

  const handleCreate = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("회원가입이 완료되었습니다.");
    navigate("/login");
  };

  return (
    <div>
      <TopNotice />
      <Header />
      <FixedLogo />

      <main className="signup-page">
        <div className="signup-box">
          <h2>Create Account</h2>

          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="이름"
          />

          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="성"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="password"
          />

          <button type="button" onClick={handleCreate}>
            create
          </button>

          <Link to="/login" className="signup-login-link">
            login
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Signup;