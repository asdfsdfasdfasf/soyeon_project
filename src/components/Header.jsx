import { Link, useNavigate } from "react-router-dom";
import "../styles/main.css";

import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";

import { useState } from "react";

import SearchBar from "./SearchBar";
import CartDrawer from "./CartDrawer";

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();

  const loginUser = JSON.parse(
    localStorage.getItem("loginUser")
  );

  return (
    <div className="home-page">
      <header className="main-header">
        <div className="logo">
          <Link to="/">S2yeonnie</Link>
        </div>

        <nav className="main-nav">
          <div className="menu-item">
            <Link to="/new" className="menu-title">
              NEW
            </Link>
          </div>

          <div className="menu-item">
            <Link to="/best" className="menu-title">
              BEST THINGS
            </Link>

            <div className="menu-dropdown">
              <Link to="/best/best-sellers">
                best sellers
              </Link>

              <Link to="/best/last-chance">
                last chance
              </Link>
            </div>
          </div>

          <div className="menu-item">
            <Link to="/shop-all" className="menu-title">
              SHOP ALL
            </Link>

            <div className="menu-dropdown">
              <div className="dropdown-item">
                <Link to="/shop-all/clothing">
                  clothing
                </Link>

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
                <Link to="/shop-all/home">
                  home
                </Link>

                <div className="submenu">
                  <Link to="/shop-all/home/bras">bras</Link>
                  <Link to="/shop-all/home/underwear">underwear</Link>
                </div>
              </div>

              <div className="dropdown-item">
                <Link to="/shop-all/accessories">
                  accessories
                </Link>

                <div className="submenu">
                  <Link to="/shop-all/accessories/jewelry">jewelry</Link>
                  <Link to="/shop-all/accessories/socks">socks</Link>
                </div>
              </div>
            </div>
          </div>

          <Link to="/album" className="menu-title single-link">
            ALBUM
          </Link>

          <Link to="/village" className="menu-title single-link">
            S2 VILLAGE
          </Link>
        </nav>

        <div className="header-icons">
          <button
            type="button"
            className="search-open-button"
            onClick={() => setSearchOpen(true)}
          >
            <FiSearch />
          </button>

          <button
            type="button"
            className="user-button"
            onClick={() => {
              if (loginUser) {
                navigate("/mypage");
              } else {
                navigate("/login");
              }
            }}
          >
            <FiUser />
          </button>

          <Link to="/wishlist">
            <FiHeart />
          </Link>

          <button
            type="button"
            className="cart-open-button"
            onClick={() => setCartOpen(true)}
          >
            <FiShoppingBag />
          </button>
        </div>
      </header>

      <SearchBar
        open={searchOpen}
        setOpen={setSearchOpen}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </div>
  );
}

export default Header;