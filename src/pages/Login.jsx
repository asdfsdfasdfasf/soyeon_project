import { Link } from "react-router-dom";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import "../styles/main.css";
import "../styles/login.css";

function Login() {
  return (
    <div className="login-page">
      <TopNotice />
      <Header />

      <div className="login-content">
        <div className="login-container">
          <h2>LOGIN</h2>

          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <p className="forgot">forgot your password?</p>

          <button className="login-btn">sign in</button>

          <Link to="/signup" className="signup-link">
            create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;