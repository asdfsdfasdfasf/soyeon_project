function ProductCard() {
  return (
    <div className="product-card">
      <img
        src="https://via.placeholder.com/200"
        alt="상품 이미지"
      />
      <h3>기본 상품</h3>
      <p>가격: 10,000원</p>
      <button>장바구니 담기</button>
    </div>
  );
}

export default ProductCard;