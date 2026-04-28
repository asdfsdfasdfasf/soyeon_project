import { Link } from "react-router-dom";
import "../styles/main.css";
import { FiSearch, FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";
import { useState } from "react";
import SearchBar from "./SearchBar";

function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="home-page">

      {/* 헤더 */}
      <header className="main-header">

        {/* 로고 */}
        <div className="logo">
          <Link to="/">S2yeonnie</Link>
        </div>

        {/* 중앙 메뉴 */}
        <nav className="main-nav">
  {/* NEW */}
  <div className="menu-item">
    <Link to="/new" className="menu-title">NEW</Link>
  </div>

  {/* BEST */}
  <div className="menu-item">
    <Link to="/best" className="menu-title">BEST THINGS</Link>
    <div className="menu-dropdown">
      <Link to="/best/best-sellers">best sellers</Link>
      <Link to="/best/last-chance">last chance</Link>
    </div>
  </div>

  {/* SHOP ALL */}
  <div className="menu-item">
    <Link to="/shop-all" className="menu-title">SHOP ALL</Link>

    <div className="menu-dropdown">
      <div className="dropdown-item">
        <Link to="/shop-all/clothing">clothing</Link>
        <div className="submenu">
          <Link to="/shop-all/clothing/outers">outers</Link>
          <Link to="/shop-all/clothing/tees">tees</Link>
          <Link to="/shop-all/clothing/tops">tops</Link>
          <Link to="/shop-all/clothing/boleros">boleros</Link>
          <Link to="/shop-all/clothing/knits">knits</Link>
          <Link to="/shop-all/clothing/dresses">dresses</Link>
          <Link to="/shop-all/clothing/pants">pants</Link>
          <Link to="/shop-all/clothing/skirts">skirts</Link>
          <Link to="/shop-all/clothing/sets">sets</Link>
          <Link to="/shop-all/clothing/swimwear">swimwear</Link>
        </div>
      </div>

      <Link to="/shop-all/bags">bags</Link>
      <Link to="/shop-all/shoes">shoes</Link>

      <div className="dropdown-item">
        <Link to="/shop-all/home">home</Link>
        <div className="submenu">
          <Link to="/shop-all/home/bras">bras</Link>
          <Link to="/shop-all/home/underwear">underwear</Link>
        </div>
      </div>

      <div className="dropdown-item">
        <Link to="/shop-all/accessories">accessories</Link>
        <div className="submenu">
          <Link to="/shop-all/accessories/jewelry">jewelry</Link>
          <Link to="/shop-all/accessories/socks">socks</Link>
        </div>
      </div>
    </div>
  </div>

  <Link to="/album" className="menu-title single-link">ALBUM</Link>
  <Link to="/village" className="menu-title single-link">S2  VILLAGE</Link>
</nav>
  {/* 오른쪽 메뉴 */}
       <div className="header-icons">
        <button className="search-open-button" onClick={() => setSearchOpen(true)}>
        <FiSearch />
        </button>
        <Link to="/login"><FiUser /></Link>
        <Link to="/wishlist"><FiHeart /></Link>
        <Link to="/cart"><FiShoppingBag /></Link>
      </div>

      </header>

      <SearchBar open={searchOpen} setOpen={setSearchOpen} />

    </div>
  );
}

export default Home;
