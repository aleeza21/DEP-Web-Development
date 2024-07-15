const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Database connection
mongoose.connect('mongodb://localhost:27017/haircare-blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api', blogRoutes);

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/create.html', (req, res) => {
    res.sendFile(__dirname + '/views/create.html');
});

app.get('/read.html', (req, res) => {
    res.sendFile(__dirname + '/views/read.html');
});

app.get('/edit.html', (req, res) => {
    res.sendFile(__dirname + '/views/edit.html');
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
