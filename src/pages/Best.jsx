import { useParams } from "react-router-dom";
import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import ProductList from "../components/ProductList";
import "../styles/main.css";


function Best() {
  const { type } = useParams();

  const title =
    type === "last-chance"
      ? "LAST CHANCE"
      : type === "best-sellers"
      ? "BEST SELLERS"
      : "BEST THINGS";

  return (
    <div>
      <TopNotice />
      <Header />

      <main className="category-page">
        <div className="breadcrumb">
          <span>BEST THINGS</span>
          {type && <span>&gt;</span>}
          {type && <strong>{title}</strong>}
        </div>
        <ProductList filter={type || "best-sellers"} />
      </main>
    </div>
  );
}

export default Best;