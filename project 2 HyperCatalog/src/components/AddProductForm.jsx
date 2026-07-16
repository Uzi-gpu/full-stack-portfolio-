import { useState } from 'react';

function AddProductForm({ onProductAdded }) {
  // Controlled inputs state
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle generic input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file uploads by converting the image to a Base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission logic
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setIsSubmitting(true);

    // Prepare payload
    const payload = {
      title: formData.title,
      price: Number(formData.price), // Ensure price is a number
      description: formData.description,
      category: formData.category
    };

    // Make the POST request
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(newProduct => {
        // Provide a default thumbnail so the UI doesn't look broken for new items
        const productWithImage = {
          ...newProduct,
          thumbnail: formData.image || 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
        };
        
        // Pass the newly created product back to the App via the callback prop
        onProductAdded(productWithImage);
        
        // Reset the form
        setFormData({ title: '', price: '', description: '', category: '', image: '' });
        setIsSubmitting(false);
      })
      .catch(error => {
        console.error("Failed to add product", error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="form-card">
      <h3>➕ Add New Product</h3>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            placeholder="e.g., Wireless Headphones"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="price">Price ($)</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            required 
            min="0"
            step="0.01"
            placeholder="99.99"
          />
        </div>

        <div className="input-group">
          <label htmlFor="category">Category</label>
          <input 
            type="text" 
            id="category" 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            required 
            placeholder="e.g., electronics"
          />
        </div>

        <div className="input-group">
          <label htmlFor="image">Upload Image (Optional)</label>
          <input 
            type="file" 
            id="image" 
            name="image" 
            accept="image/*"
            onChange={handleImageChange} 
            className="file-input"
          />
          {formData.image && <span className="upload-success">✅ Image loaded!</span>}
        </div>

        <div className="input-group full-width">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            placeholder="Describe the product..."
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Product...' : 'Submit Product'}
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;
