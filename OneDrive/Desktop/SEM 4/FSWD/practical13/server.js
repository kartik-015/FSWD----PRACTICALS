require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authorRoutes = require('./routes/authorRoutes');
const blogPostRoutes = require('./routes/blogPostRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/authors', authorRoutes);
app.use('/blogposts', blogPostRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});