const BlogPost = require('../models/BlogPost');
const Author = require('../models/Author');

exports.createBlogPost = async (req, res) => {
    try {
        const authorExists = await Author.findById(req.body.author);
        if (!authorExists) {
            return res.status(404).json({ error: 'Author not found' });
        }
        const blogPost = new BlogPost(req.body);
        await blogPost.save();
        res.status(201).json(blogPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.find().populate('author', 'name email');
        res.json(blogPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlogPostById = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id).populate('author', 'name email');
        if (!blogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.json(blogPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};