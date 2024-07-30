import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ProductList from './ProductList';
import OrderModal from './OrderModal';
import '../App.css';

const WelcomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    address: '',
    size: ''
  });
  const [notifiedCategories, setNotifiedCategories] = useState({});
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('notification', (data) => {
      const { category, shoesSold } = data;
      if (!notifiedCategories[category]) {
        alert(`${shoesSold} ${category} shoes are sold recently, make sure to get yours before they become out of stock`);
        setNotifiedCategories(prevState => ({ ...prevState, [category]: true }));
      }
    });

    return () => newSocket.close();
  }, [notifiedCategories]);

  useEffect(() => {
    if (selectedCategory && socket) {
      axios.get('http://localhost:5000/api/products', { params: { category: selectedCategory } })
        .then(response => {
          setProducts(response.data);
          socket.emit('selectCategory', selectedCategory);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    } else {
      setProducts([]);
    }
  }, [selectedCategory, socket]);

  const handleBuyNow = () => {
    setShowOrderForm(true);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setShowThankYouMessage(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const closeOrderModal = () => {
    setShowOrderForm(false);
    setShowThankYouMessage(false);
    setOrderDetails({ name: '', address: '', size: '' });
  };

  return (
    <div className="app-container">
      <div className="welcome-text">Welcome to Shoe Store</div>
      <div className="select-container">
        <label htmlFor="categories">Select Category: </label>
        <select
          id="categories"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <ProductList products={products} onBuyNow={handleBuyNow} />

      <OrderModal 
        show={showOrderForm} 
        onClose={closeOrderModal}
        onSubmit={handleOrderSubmit}
        orderDetails={orderDetails}
        onChange={handleChange}
        showThankYouMessage={showThankYouMessage}
      />
    </div>
  );
};

export default WelcomePage;
