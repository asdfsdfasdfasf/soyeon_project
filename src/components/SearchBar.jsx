import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";

function SearchBar({ open, setOpen }) {
  const [keyword, setKeyword] = useState("");

  const searchedProducts = products.filter((product) => {
    const searchText = keyword.toLowerCase();

    return (
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.group?.some((item) => item.toLowerCase().includes(searchText))
    );
  });

  const closeSearch = () => {
    setOpen(false);
    setKeyword("");
  };

  return (
    <div className={`search-overlay ${open ? "active" : ""}`}>
      <div className="search-box">
        <FiSearch />

        <input
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <FiX onClick={closeSearch} className="search-close-icon" />
      </div>

      {keyword && (
        <div className="search-result-area">
          {searchedProducts.length > 0 ? (
            <div className="search-result-grid">
              {searchedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="search-product-card"
                  onClick={closeSearch}
                >
                  <div className="search-product-image"></div>

                  <div className="search-product-info">
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="no-search-result">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;