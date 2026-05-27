import { useEffect, useState } from "react";
import { WishlistContext } from "./wishlist-context";

const API_URL = "http://localhost:3001/wishlist";

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const getLoginUser = () => {
    return JSON.parse(localStorage.getItem("loginUser"));
  };

  const getGuestWishlist = () => {
    return JSON.parse(sessionStorage.getItem("guestWishlist")) || [];
  };

  const saveGuestWishlist = (data) => {
    sessionStorage.setItem("guestWishlist", JSON.stringify(data));
  };

  const getProductId = (product) => {
    return Number(product.productId ?? product.id);
  };

  const loadWishlist = async () => {
    const loginUser = getLoginUser();

    if (!loginUser) {
      setWishlist(getGuestWishlist());
      return;
    }

    const response = await fetch(`${API_URL}?userId=${loginUser.id}`);
    const data = await response.json();

    setWishlist(data);
  };

  useEffect(() => {
    loadWishlist();

    window.addEventListener("wishlistReload", loadWishlist);

    return () => {
      window.removeEventListener("wishlistReload", loadWishlist);
    };
  }, []);

  const toggleWishlist = async (product) => {
    const loginUser = getLoginUser();
    const productId = getProductId(product);

    if (!loginUser) {
      const guestWishlist = getGuestWishlist();

      const exists = guestWishlist.find(
        (item) => Number(item.productId) === productId
      );

      let newWishlist;

      if (exists) {
        newWishlist = guestWishlist.filter(
          (item) => Number(item.productId) !== productId
        );
      } else {
        newWishlist = [
          ...guestWishlist,
          {
            productId,
            name: product.name,
            price: product.price,
            category: product.category,
            group: product.group || [],
            id: Date.now(),
          },
        ];
      }

      saveGuestWishlist(newWishlist);
      setWishlist(newWishlist);
      return;
    }

    const exists = wishlist.find(
      (item) =>
        Number(item.productId) === productId &&
        Number(item.userId) === Number(loginUser.id)
    );

    if (exists) {
      await fetch(`${API_URL}/${exists.id}`, {
        method: "DELETE",
      });

      setWishlist((prev) =>
        prev.filter((item) => Number(item.productId) !== productId)
      );
    } else {
      const newWish = {
        productId,
        userId: loginUser.id,
        name: product.name,
        price: product.price,
        category: product.category,
        group: product.group || [],
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWish),
      });

      const savedWish = await response.json();

      setWishlist((prev) => [...prev, savedWish]);
    }
  };

  const isWishlisted = (productId) => {
    const loginUser = getLoginUser();
    const targetProductId = Number(productId);

    if (!loginUser) {
      return wishlist.some(
        (item) => Number(item.productId) === targetProductId
      );
    }

    return wishlist.some(
      (item) =>
        Number(item.productId) === targetProductId &&
        Number(item.userId) === Number(loginUser.id)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;