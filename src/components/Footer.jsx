import { Link } from "react-router-dom";
import "../styles/main.css";

function Footer() {
  return (
    <footer className="footer-menu">
      <Link to="/brand-story">about</Link>
      <Link to="/review">➷ reviews ఇ</Link>
      <Link to="/shop-all">shipping</Link>
      <Link to="/returns">returns</Link>
      <Link to="/faqs">FAQs</Link>
      <Link to="/contact">contact</Link>
    </footer>
  );
}

export default Footer;