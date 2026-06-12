import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import TopNotice from "../components/TopNotice";
import FixedLogo from "../components/FixedLogo";
import Footer from "../components/Footer";

import "../styles/adminProducts.css";

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const colors = ["Ivory", "Pink", "Black"];
  const getSizesByCategory = (category) => {
    if (["bags", "jewelry", "socks"].includes(category)) {
        return ["OS"];
    }

    if (category === "shoes") {
        return ["225", "230", "235", "240", "245", "250", "255", "260"];
    }

    return ["S", "M", "L"];
    };

  const getProducts = async () => {
    const response = await fetch("http://localhost:3001/products");
    const data = await response.json();

    setProducts(data);
  };

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    if (!loginUser || loginUser.role !== "admin") {
      alert("관리자만 접근할 수 있습니다.");
      navigate("/");
      return;
    }

    getProducts();
  }, [navigate]);

  const toggleStock = async (product, color, size) => {
    const currentValue = product.stock[color][size];

    const newStock = {
      ...product.stock,
      [color]: {
        ...product.stock[color],
        [size]: !currentValue,
      },
    };

    await fetch(`http://localhost:3001/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: newStock,
      }),
    });

    getProducts();
  };

  const changeAllStock = async (product, value) => {
    const newStock = {};

    colors.forEach((color) => {
      newStock[color] = {};

      sizes.forEach((size) => {
        newStock[color][size] = value;
      });
    });

    await fetch(`http://localhost:3001/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: newStock,
      }),
    });

    getProducts();
  };

  const isProductSoldOut = (product) => {
    if (!product.stock) return false;

    return Object.values(product.stock).every((colorStock) =>
      Object.values(colorStock).every((sizeStock) => sizeStock === false)
    );
  };

  return (
    <>
      <TopNotice />
      <Header />
      <FixedLogo />

      <main className="admin-products-page">
        <h2>상품 관리</h2>

        <div className="admin-product-list">
          {products.map((product) => {
            const soldOut = isProductSoldOut(product);

            return (
              <div className="admin-product-card" key={product.id}>
                <div className="admin-product-title">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                  </div>

                  <span className={soldOut ? "admin-soldout" : "admin-selling"}>
                    {soldOut ? "전체 품절" : "판매중"}
                  </span>
                </div>

                <div className="admin-product-actions">
                  <button onClick={() => changeAllStock(product, false)}>
                    전체 품절
                  </button>
                  <button onClick={() => changeAllStock(product, true)}>
                    전체 판매중
                  </button>
                </div>

                {colors.map((color) => (
                  <div className="stock-row" key={color}>
                    <strong>{color}</strong>

                    <div className="stock-buttons">
                      {getSizesByCategory(product.category).map((size) => {
                        const hasStock = product.stock?.[color]?.[size];

                        return (
                          <button
                            key={size}
                            className={hasStock ? "stock-on" : "stock-off"}
                            onClick={() => toggleStock(product, color, size)}
                          >
                            {size}
                            <span>{hasStock ? "판매중" : "품절"}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AdminProducts;