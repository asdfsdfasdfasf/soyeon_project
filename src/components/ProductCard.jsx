import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-box">
          <img src={product.image} alt={product.name} />

          <FiHeart className="product-heart" />
          <FiShoppingBag className="product-bag" />
        </div>

        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.price}</p>
      </Link>
    </div>
  );
}

export default ProductCard;