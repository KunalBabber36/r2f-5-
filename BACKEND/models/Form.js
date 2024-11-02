// models/Form.js
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  image: String, // URL or path for the image of the first letter
  rating: Number,
  description: String,
  name: String,
});

module.exports = mongoose.model('Form', formSchema);