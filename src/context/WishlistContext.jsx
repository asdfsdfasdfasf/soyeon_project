import { useEffect, useState } from "react";
import { WishlistContext } from "./wishlist-context";

const API_URL = "http://localhost:3001/wishlist";

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const getLoginUser = () => {
    return JSON.parse(localStorage.getItem("loginUser"));
  };

  const fetchWishlist = async () => {
    const loginUser = getLoginUser();

    if (!loginUser) {
      setWishlist([]);
      return;
    }

    const response = await fetch(`${API_URL}?userId=${loginUser.id}`);
    const data = await response.json();

    setWishlist(data);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const toggleWishlist = async (product) => {
    const loginUser = getLoginUser();

    if (!loginUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    const exists = wishlist.find(
      (item) =>
        item.productId === product.id &&
        item.userId === loginUser.id
    );

    if (exists) {
      await fetch(`${API_URL}/${exists.id}`, {
        method: "DELETE",
      });

      setWishlist(
        wishlist.filter((item) => item.id !== exists.id)
      );
    } else {
      const wishlistItem = {
        ...product,
        id: `${loginUser.id}-${product.id}`,
        productId: product.id,
        userId: loginUser.id,
      };

      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistItem),
      });

      setWishlist([...wishlist, wishlistItem]);
    }
  };

  const isWishlisted = (productId) => {
    const loginUser = getLoginUser();

    if (!loginUser) return false;

    return wishlist.some(
      (item) =>
        item.productId === productId &&
        item.userId === loginUser.id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;