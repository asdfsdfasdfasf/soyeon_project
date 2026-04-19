import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrandStory from "./pages/BrandStory";
import Album from "./pages/Album";
import Best from "./pages/Best";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Category from "./pages/Category";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/brand-story" element={<BrandStory />} />
      <Route path="/album" element={<Album />} />
      <Route path="/search" element={<Search />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />

      {/* Shop All */}
      <Route path="/shop-all" element={<Category />} />
      <Route path="/shop-all/:category" element={<Category />} />
      <Route path="/shop-all/:category/:sub" element={<Category />} />

      {/* Best */}
      <Route path="/best" element={<Best />} />
      <Route path="/best/best-sellers" element={<Best />} />
      <Route path="/best/last-chance" element={<Best />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;