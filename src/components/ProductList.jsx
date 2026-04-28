import { FiHeart, FiShoppingBag } from "react-icons/fi";

function ProductList({ filter }) {
  const products = [
    { name: "outer", price: "₩00,000", category: "outers", group: ["new", "best-sellers"] },
    { name: "tee", price: "₩00,000", category: "tees", group: ["best-sellers"] },
    { name: "top", price: "₩00,000", category: "tops", group: ["new"] },
    { name: "boleros", price: "₩00,000", category: "boleros", group: ["new", "best-sellers"] },
    { name: "knits", price: "₩00,000", category: "knits", group: ["best-sellers"] },
    { name: "dresse", price: "₩00,000", category: "dresses", group: ["new"] },
    { name: "pants", price: "₩00,000", category: "pants" },
    { name: "skirt", price: "₩00,000", category: "skirts", group: ["new", "best-sellers"] },
    { name: "sets", price: "₩00,000", category: "sets", group: ["best-sellers"] },
    { name: "swimwear", price: "₩00,000", category: "swimwear" },
    { name: "bag", price: "₩00,000", category: "bags", group: ["best-sellers"] },
    { name: "shoes", price: "₩00,000", category: "shoes" },
    { name: "bra", price: "₩00,000", category: "bras" },
    { name: "under", price: "₩00,000", category: "underwear" },
    { name: "jewelry", price: "₩00,000", category: "jewelry" },
    { name: "socks", price: "₩00,000", category: "socks", group: ["last-chance"] },
  ];

  const filteredProducts = products.filter((product) => {
    if (!filter) return true;

    // 🔥 NEW
    if (filter === "new") {
      return product.group?.includes("new");
    }

    // 🔥 BEST
    if (filter === "best-sellers") {
      return product.group?.includes("best-sellers");
    }

    if (filter === "last-chance") {
      return product.group?.includes("last-chance");
    }

    // 🔥 SHOP ALL (큰 카테고리)
    if (filter === "clothing") {
      return ["outers", "tees", "tops", "pants"].includes(product.category);
    }

    if (filter === "home") {
      return ["bras", "underwear"].includes(product.category);
    }

    if (filter === "accessories") {
      return ["jewelry", "socks"].includes(product.category);
    }

    // 🔥 기본 (서브카테고리)
    return product.category === filter;
  });

  return (
    <div className="product-grid">
      {filteredProducts.map((product, index) => (
        <div className="product-card" key={index}>
          <div className="product-image-frame">
            <button className="heart-button">
              <FiHeart />
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