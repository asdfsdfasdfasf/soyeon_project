import { useContext } from "react";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import { WishlistContext } from "../context/wishlist-context";
import { FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

function Wishlist() {
  const { wishlist, toggleWishlist } =
    useContext(WishlistContext);

  return (
    <div>
      <TopNotice />
      <Header />

      <main className="category-page">
        <div className="breadcrumb">
          <strong>Wishlist</strong>
        </div>

        <div className="product-grid">
          {wishlist.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-frame">
                <button
                  className="heart-button"
                  onClick={() => toggleWishlist(product)}
                >
                  <FaHeart />
                </button>

                <button className="bag-button">
                  <FiShoppingBag />
                </button>
              </div>

              <div className="product-info">
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Wishlist;