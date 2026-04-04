import { useParams, Link } from "react-router-dom";

function Category() {
  const { category, sub } = useParams();

  return (
    <div>
      <h1>Shop All Page</h1>

      {!category && (
        <div>
          <h2>Main Categories</h2>
          <ul>
            <li><Link to="clothing">Clothing</Link></li>
            <li><Link to="bags">Bags</Link></li>
            <li><Link to="shoes">Shoes</Link></li>
            <li><Link to="home">Home</Link></li>
            <li><Link to="accessories">Accessories</Link></li>
          </ul>
        </div>
      )}

      {category === "clothing" && !sub && (
        <div>
          <h2>Clothing</h2>
          <ul>
            <li><Link to="outers">Outers</Link></li>
            <li><Link to="tees">Tees</Link></li>
            <li><Link to="tops">Tops</Link></li>
            <li><Link to="boleros">Boleros</Link></li>
            <li><Link to="knits">Knits</Link></li>
            <li><Link to="Dresses">Dresses</Link></li>
            <li><Link to="pants">Pants</Link></li>
            <li><Link to="skirts">Skirts</Link></li>
            <li><Link to="sets">Sets</Link></li>
            <li><Link to="swimwear">Swimwear</Link></li>
          </ul>
        </div>
      )}

      {category === "home" && !sub && (
        <div>
          <h2>Home</h2>
          <ul>
            <li><Link to="bras">Bras</Link></li>
            <li><Link to="underwear">Underwear</Link></li>
            <li><Link to="tops">Tops</Link></li>
            <li><Link to="bottoms">Bottoms</Link></li>
            <li><Link to="acc">Acc</Link></li>
          </ul>
        </div>
      )}

      {category === "accessories" && !sub && (
        <div>
          <h2>Accessories</h2>
          <ul>
            <li><Link to="jewelry">Jewelry</Link></li>
            <li><Link to="socks">Socks</Link></li>
            <li><Link to="leather-acc">Leather Acc.</Link></li>
            <li><Link to="iphone-cases">iPhone Cases</Link></li>
          </ul>
        </div>
      )}

      <br />
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Category;