const products = [
  {
  id: 1,
  name: "outer",
  price: "₩00,000",
  category: "outers",
  group: ["new", "best-sellers"],
  stock: {
    Ivory: {
      S: true,
      M: false,
      L: true,
    },
    Pink: {
      S: false,
      M: false,
      L: false,
    },
    Black: {
      S: true,
      M: true,
      L: false,
    },
  },
},

  { id: 2, name: "tee", price: "₩00,000", category: "tees", group: ["best-sellers"] },
  { id: 3, name: "top", price: "₩00,000", category: "tops", group: ["new"] },
  { id: 4, name: "boleros", price: "₩00,000", category: "boleros", group: ["new", "best-sellers"] },
  { id: 5, name: "knits", price: "₩00,000", category: "knits", group: ["best-sellers"] },
  { id: 6, name: "dress", price: "₩00,000", category: "dresses", group: ["new"] },
  { id: 7, name: "pants", price: "₩00,000", category: "pants" },
  { id: 8, name: "skirt", price: "₩00,000", category: "skirts", group: ["new", "best-sellers"] },
  { id: 9, name: "sets", price: "₩00,000", category: "sets", group: ["best-sellers"] },
  { id: 10, name: "swimwear", price: "₩00,000", category: "swimwear" },
  { id: 11, name: "bag", price: "₩00,000", category: "bags", group: ["best-sellers"] },
  { id: 12, name: "shoes", price: "₩00,000", category: "shoes" },
  { id: 13, name: "bra", price: "₩00,000", category: "bras" },
  { id: 14, name: "under", price: "₩00,000", category: "underwear" },
  { id: 15, name: "jewelry", price: "₩00,000", category: "jewelry" },
  { id: 16, name: "socks", price: "₩00,000", category: "socks", group: ["last-chance"] },
];

export default products;