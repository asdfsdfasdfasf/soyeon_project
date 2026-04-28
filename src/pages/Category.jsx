import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import TopNotice from "../components/TopNotice";
import "../styles/main.css";

function Category() {
  const { category, sub } = useParams();

  const currentTitle = sub || category || "shop all";

  return (
    <div>
      <TopNotice />
      <Header />

      <main className="category-page">
        <div className="breadcrumb">
          <Link to="/shop-all">SHOP ALL</Link>
          {category && <span>&gt;</span>}
          {category && <strong>{currentTitle}</strong>}
        </div>

        {!sub && category === "clothing" && (
          <div className="sub-category-list">
            <Link to="outers">Outers</Link>
            <Link to="tees">Tees</Link>
            <Link to="tops">Tops</Link>
            <Link to="boleros">Boleros</Link>
            <Link to="knits">Knits</Link>
            <Link to="dresses">Dresses</Link>
            <Link to="pants">Pants</Link>
            <Link to="skirts">Skirts</Link>
            <Link to="sets">Sets</Link>
            <Link to="swimwear">Swimwear</Link>
          </div>
        )}

        <ProductList filter={sub || category} />
      </main>
    </div>
  );
}

export default Category;