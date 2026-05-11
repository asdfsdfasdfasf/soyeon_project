import { useEffect, useState } from "react";
import { WishlistContext } from "./wishlist-context";

const API_URL = "http://localhost:3001/wishlist";

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setWishlist(data);
    };

    fetchWishlist();
  }, []);

  const toggleWishlist = async (product) => {
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      await fetch(`${API_URL}/${product.id}`, {
        method: "DELETE",
      });

      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      setWishlist([...wishlist, product]);
    }
  };

  const isWishlisted = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;