const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// Get all blogs
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single blog by ID
router.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new blog
router.post('/blogs', async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content
    });
    try {
        const newBlog = await blog.save();
        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a blog
router.put('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        const updatedBlog = await blog.save();
        res.json({ message: 'Blog updated successfully', blog: updatedBlog });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a blog
router.delete('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        await Blog.deleteOne({ _id: req.params.id });
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
