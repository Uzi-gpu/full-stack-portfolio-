import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import productData from '../products.json'; // Importing local JSON file

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Simulate a network request delay (1 second) to demonstrate the loading state
    const timer = setTimeout(() => {
      setProducts(productData.products);
      setIsLoading(false);
    }, 1000);

    // Cleanup function
    return () => clearTimeout(timer);
  }, []);

  // Callback function to handle the bonus requirement
  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  return (
    <div className="app-container">
      {/* Navigation / Header Area */}
      <nav className="navbar">
        <div className="nav-brand">
          <h1>📦 The Premium Store</h1>
        </div>
        <div className="cart-container">
          <span className="cart-icon">🛒 Cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </nav>

      <main className="main-content">
        <div className="hero-section">
          <h2>Discover Our Products</h2>
          <p>Browse our collection of high-quality items and add them to your cart.</p>
        </div>

        {/* Conditional Rendering for Loading State */}
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Fetching amazing products...</p>
          </div>
        ) : (
          <div className="product-grid">
            {/* Map over the products array to render ProductCard components */}
            {products.map((product) => (
              <ProductCard 
                key={product.id} // Essential React key prop
                product={product} // Passing the entire product object as a prop
                onAddToCart={handleAddToCart} // Passing the callback function
              />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 The Premium Store. Built with React & local JSON.</p>
      </footer>
    </div>
  );
}

export default App;
