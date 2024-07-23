// Backend/routes/categories-route.js
const express = require('express');
const router = express.Router();

const categories = ['Running', 'Casual', 'Formal']; // Define three categories

router.get('/', (req, res) => {
  res.json(categories);
});

module.exports = router;
