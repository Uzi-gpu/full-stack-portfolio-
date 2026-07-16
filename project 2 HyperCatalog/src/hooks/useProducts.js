import { useState, useEffect } from 'react';

/**
 * Custom Hook: useProducts
 * Encapsulates the logic for fetching and adding products to separate concerns from the UI.
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial Fetch Effect
  useEffect(() => {
    setIsLoading(true);
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []); // Empty dependency array means this runs once on component mount

  // Helper function to push a new product into the local state
  const addProductToState = (newProduct) => {
    // Add the new product to the beginning of the list so it's instantly visible
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  return { products, isLoading, addProductToState };
}
