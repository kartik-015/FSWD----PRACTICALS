const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => /^\S+@\S+\.\S+$/.test(value),
            message: 'Invalid email format'
        }
    }
});

module.exports = mongoose.model('Author', authorSchema);