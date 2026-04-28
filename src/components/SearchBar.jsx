import { FiSearch, FiX } from "react-icons/fi";


function SearchBar({ open, setOpen }) {
  return (
    <div className={`search-overlay ${open ? "active" : ""}`}>
      
      <div className="search-box">
        {/* 돋보기 */}
        <FiSearch />

        {/* 입력창 */}
        <input
          type="text"
          placeholder="Search"
        />

        {/* 닫기 */}
        <FiX onClick={() => setOpen(false)} />
      </div>

    </div>
  );
}

export default SearchBar;