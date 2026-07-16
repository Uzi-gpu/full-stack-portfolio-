import { useProducts } from './hooks/useProducts';
import ProductCard from './components/ProductCard';
import AddProductForm from './components/AddProductForm';

function App() {
  // Utilizing the Custom Hook
  const { products, isLoading, addProductToState } = useProducts();

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <h1>⚡ HyperCatalog</h1>
        </div>
      </nav>

      <main className="main-content">
        <div className="header-section">
          <h2>Store Dashboard</h2>
          <p>Add new inventory items or browse the existing product catalog using the DummyJSON API.</p>
        </div>

        {/* User Input Form */}
        <div className="form-wrapper">
          <AddProductForm onProductAdded={addProductToState} />
        </div>

        {/* Dynamic Catalog Grid */}
        <div className="catalog-section">
          <h3>Current Inventory ({products.length} Items)</h3>
          
          {isLoading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Fetching inventory from DummyJSON...</p>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 HyperCatalog. Powered by React Custom Hooks.</p>
      </footer>
    </div>
  );
}

export default App;
