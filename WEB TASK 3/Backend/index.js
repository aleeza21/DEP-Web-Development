// Backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/shoe_store';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
// Routes
const productRoutes = require('./routes/products-route');
const categoriesRoutes = require('./routes/categories-route');

app.use('/api/products', productRoutes);
app.use('/api/categories', categoriesRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
