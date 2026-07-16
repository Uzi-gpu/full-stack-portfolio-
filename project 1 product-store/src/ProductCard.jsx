function ProductCard({ product, onAddToCart }) {
  // Destructure the product properties for easier usage
  const { title, price, description, category, thumbnail, rating } = product;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={thumbnail} alt={title} className="product-image" loading="lazy" />
        <span className="product-category">{category}</span>
      </div>
      
      <div className="product-details">
        <div className="product-header">
          <h3 className="product-title" title={title}>{title}</h3>
          <span className="product-price">${price.toFixed(2)}</span>
        </div>
        
        <div className="product-rating">
          <span className="star">★</span> {rating}
        </div>

        <p className="product-description">{description}</p>
        
        <button className="add-to-cart-btn" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
