function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.color}</p>

      <div className="product-footer">
        <span>$ {product.price}</span>
        <button onClick={() => onAddToCart(product)}>Add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;