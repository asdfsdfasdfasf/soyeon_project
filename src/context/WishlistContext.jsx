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

    const response = await fetch(
      `${API_URL}?userId=${Number(loginUser.id)}`
    );
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

      const exists = guestWishlist.some(
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
          },
        ];
      }

      saveGuestWishlist(newWishlist);
      setWishlist(newWishlist);
      return;
    }

    const exists = wishlist.find(
      (item) => Number(item.productId) === productId
    );

    if (exists) {
      await fetch(`${API_URL}/${exists.id}`, {
        method: "DELETE",
      });

      setWishlist((prev) =>
        prev.filter((item) => Number(item.productId) !== productId)
      );

      return;
    }

    const newWish = {
      userId: Number(loginUser.id),
      productId,
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
  };

  const isWishlisted = (productId) => {
    const targetProductId = Number(productId);

    return wishlist.some(
      (item) => Number(item.productId) === targetProductId
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