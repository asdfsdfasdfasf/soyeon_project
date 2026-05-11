import { useContext } from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../context/wishlist-context";
import products from "../data/products";

function ProductList({ filter }) {
  const { toggleWishlist, isWishlisted } =
    useContext(WishlistContext);

  const filteredProducts = products.filter((product) => {
    if (!filter) return true;

    if (filter === "new") {
      return product.group?.includes("new");
    }

    if (filter === "best-sellers") {
      return product.group?.includes("best-sellers");
    }

    if (filter === "last-chance") {
      return product.group?.includes("last-chance");
    }

    if (filter === "clothing") {
      return [
        "outers",
        "tees",
        "tops",
        "boleros",
        "knits",
        "dresses",
        "pants",
        "skirts",
        "sets",
        "swimwear",
      ].includes(product.category);
    }

    if (filter === "home") {
      return ["bras", "underwear"].includes(product.category);
    }

    if (filter === "accessories") {
      return ["jewelry", "socks"].includes(product.category);
    }

    return product.category === filter;
  });

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-image-frame">
            <button
              type="button"
              className="heart-button"
              onClick={() => toggleWishlist(product)}
            >
              {isWishlisted(product.id) ? (
                <FaHeart />
              ) : (
                <FiHeart />
              )}
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
  );
}

export default ProductList;