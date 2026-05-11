import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";

function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <>
      <SearchBar
        onSearch={setSearchKeyword}
        onClose={() => window.history.back()}
      />

      {searchKeyword && (
        <div className="search-result-area">
          <p className="search-result-text">
            "{searchKeyword}" 검색 결과
          </p>

          <ProductList searchKeyword={searchKeyword} />
        </div>
      )}
    </>
  );
}

export default Search;