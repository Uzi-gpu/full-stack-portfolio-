function ProductCard({ product }) {
  // Destructuring for cleaner code
  const { title, price, description, category, thumbnail } = product;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={thumbnail} alt={title} className="product-image" loading="lazy" />
        <span className="product-category">{category}</span>
      </div>
      
      <div className="product-details">
        <div className="product-header">
          <h4 className="product-title" title={title}>{title}</h4>
          <span className="product-price">${Number(price).toFixed(2)}</span>
        </div>
        
        <p className="product-description">{description}</p>
      </div>
    </div>
  );
}

export default ProductCard;
