import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Category from "./pages/Category";
import New from "./pages/New";
import Best from "./pages/Best";
import BrandStory from "./pages/BrandStory";
import Album from "./pages/Album";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Review from "./pages/Review";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/new" element={<New />} />
      <Route path="/best" element={<Best />} />
      <Route path="/best/:type" element={<Best />} />

      <Route path="/shop-all" element={<Category />} />
      <Route path="/shop-all/:category" element={<Category />} />
      <Route path="/shop-all/:category/:sub" element={<Category />} />

      <Route path="/brand-story" element={<BrandStory />} />
      <Route path="/album" element={<Album />} />
      <Route path="/search" element={<Search />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Login />} />
      <Route path="/review" element={<Review />} />
    </Routes>
  );
}

export default App;