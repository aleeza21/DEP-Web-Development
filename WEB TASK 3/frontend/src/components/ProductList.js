// frontend/src/components/ProductList.js
import React from 'react';

const ProductList = ({ products, onBuyNow }) => {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => onBuyNow(product)}>Buy Now</button>
          </div>
        ))
      ) : (
        <p>Please select a category to see products</p>
      )}
    </div>
  );
};

export default ProductList;
