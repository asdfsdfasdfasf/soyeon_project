import Header from "../components/Header";
import ProductList from "../components/ProductList";
import TopNotice from "../components/TopNotice";
import "../styles/main.css";

function New() {
  return (
    <div>
    <TopNotice />
    <Header />
      <main className="category-page">
        <div className="breadcrumb">
          <strong>NEW</strong>
        </div>
        <ProductList filter="new"/>
      </main>
    </div>
  );
}

export default New;