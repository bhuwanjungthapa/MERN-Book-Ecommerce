const { string } = require('joi');
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    discount: {
        type: String
    },
    image: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Book', bookSchema);