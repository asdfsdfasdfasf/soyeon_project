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

    const handleWishlistReload = () => {
      loadWishlist();
    };

    window.addEventListener("wishlistReload", handleWishlistReload);

    return () => {
      window.removeEventListener("wishlistReload", handleWishlistReload);
    };
  }, []);

  const toggleWishlist = async (product) => {
    const loginUser = getLoginUser();

    if (!loginUser) {
      const guestWishlist = getGuestWishlist();

      const exists = guestWishlist.find(
        (item) => item.productId === product.id
      );

      let newWishlist;

      if (exists) {
        newWishlist = guestWishlist.filter(
          (item) => item.productId !== product.id
        );
      } else {
        newWishlist = [
          ...guestWishlist,
          {
            ...product,
            productId: product.id,
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
        item.productId === product.id &&
        item.userId === loginUser.id
    );

    if (exists) {
      await fetch(`${API_URL}/${exists.id}`, {
        method: "DELETE",
      });

      setWishlist(wishlist.filter((item) => item.id !== exists.id));
    } else {
      const newWish = {
        productId: product.id,
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
      setWishlist([...wishlist, savedWish]);
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.productId === productId);
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