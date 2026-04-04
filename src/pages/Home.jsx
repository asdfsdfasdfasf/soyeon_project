import "../styles/main.css";
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="home-page">
      <div className="top-right-menu">
        <Link to="/search">Search</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
      </div>

      <div className="center-banner">
         <div className="best-menu">
            <Link to="/best" className="best-title">Best</Link>

        <div className="best-dropdown">
            <Link to="/best/best-sellers">Best Sellers</Link>
            <Link to="/best/last-chance">Last Chance</Link>
        </div>
    </div>

        <div className="shopall-menu">
          <Link to="/shop-all" className="shopall-title">Shop All</Link>

          <div className="dropdown-menu">
            
            {/* Clothing */}
            <div className="dropdown-item">
              <Link to="/shop-all/clothing">Clothing</Link>
              <div className="submenu">
                <Link to="/shop-all/clothing/outers">Outers</Link>
                <Link to="/shop-all/clothing/tees">Tees</Link>
                <Link to="/shop-all/clothing/tops">Tops</Link>
                <Link to="/shop-all/clothing/bloeros">Boleros</Link>
                <Link to="/shop-all/clothing/knits">Knits</Link>
                <Link to="/shop-all/clothing/dresses">Dresses</Link>
                <Link to="/shop-all/clothing/pants">Pants</Link>
                <Link to="/shop-all/clothing/skirts">Skirts</Link>
                <Link to="/shop-all/clothing/sets">Sets</Link>
                <Link to="/shop-all/clothing/swimwear">Swimwear</Link>
              </div>
            </div>

            {/* Bags */}
            <Link to="/shop-all/bags">Bags</Link>

            {/* Shoes */}
            <Link to="/shop-all/shoes">Shoes</Link>

            {/* Home */}
            <div className="dropdown-item">
              <Link to="/shop-all/home">Home</Link>
              <div className="submenu">
                <Link to="/shop-all/home/bras">Bras</Link>
                <Link to="/shop-all/home/underwear">Underwear</Link>
                <Link to="/shop-all/home/tops">Tops</Link>
                <Link to="/shop-all/home/bottoms">Bottoms</Link>
              </div>
            </div>

            {/* Accessories */}
            <div className="dropdown-item">
              <Link to="/shop-all/accessories">Accessories</Link>
              <div className="submenu">
                <Link to="/shop-all/accessories/jewelry">Jewelry</Link>
                <Link to="/shop-all/accessories/socks">Socks</Link>
                <Link to="/shop-all/accessories/leather-acc">Leather Acc</Link>
                <Link to="/shop-all/accessories/iphone-cases">iPhone Cases</Link>
              </div>
            </div>

          </div>
        </div>

        <Link to="/album">Album</Link>
        <Link to="/brand-story">Brand Story</Link>
      </div>
    </div>
  );
}

export default Home;