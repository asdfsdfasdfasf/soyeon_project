import {
  FiSearch,
  FiX,
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";

import { FaHeart } from "react-icons/fa";

import { useState, useContext } from "react";

import { Link } from "react-router-dom";

import products from "../data/products";

import { WishlistContext } from "../context/wishlist-context";

function SearchBar({ open, setOpen }) {
  const [keyword, setKeyword] = useState("");

  const { toggleWishlist, isWishlisted } =
    useContext(WishlistContext);

  const searchedProducts = products.filter((product) => {
    const searchText = keyword.toLowerCase();

    return (
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.group?.some((item) =>
        item.toLowerCase().includes(searchText)
      )
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

        <FiX
          onClick={closeSearch}
          className="search-close-icon"
        />
      </div>

      {keyword && (
        <div className="search-result-area">
          {searchedProducts.length > 0 ? (
            <div className="search-result-grid">
              {searchedProducts.map((product) => (
                <Link
                  to={`/category/${product.category}`}
                  className="search-result-card"
                  key={product.id}
                  onClick={closeSearch}
                >
                  <div className="search-result-image">
                    <button
                      className="heart-button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                      }}
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

                  <div className="search-result-info">
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="no-search-result">
              No results found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;