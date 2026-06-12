import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Category from "./pages/Category";
import New from "./pages/New";
import Best from "./pages/Best";
import BrandStory from "./pages/BrandStory";
import Album from "./pages/Album";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import ReviewPage from "./pages/ReviewPage";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Mypage from "./pages/Mypage";
import ResetPassword from "./pages/ResetPassword";
import Returns from "./pages/Returns";
import FAQs from "./pages/FAQs";
import Shipping from "./pages/Shipping";
import Contact from "./pages/Contact";
import AdminContacts from "./pages/AdminContacts";
import AdminProducts from "./pages/AdminProducts";
import AdminReviews from "./pages/AdminReviews";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/new" element={<New />} />
      <Route path="/best" element={<Best />} />
      <Route path="/best/:type" element={<Best />} />

      <Route path="/shop-all" element={<Category />} />
      <Route path="/shop-all/:category" element={<Category />} />
      <Route path="/shop-all/:category/:sub" element={<Category />} />
      <Route path="/product/:id" element={<ProductDetail />} />

      <Route path="/brand-story" element={<BrandStory />} />
      <Route path="/album" element={<Album />} />
      <Route path="/search" element={<Search />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Login />} />
      <Route path="/review" element={<ReviewPage />} />

      <Route path="/mypage" element={<Mypage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/returns" element={<Returns />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/shipping" element={<Shipping />} />

      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/contacts" element={<AdminContacts />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/reviews" element={<AdminReviews />} />
    </Routes>
    </>
  );
}

export default App;