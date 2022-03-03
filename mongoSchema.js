const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');

let productSchema = mongoose.Schema({
  product_id: {
    type: Number,
    unique: true
  }
});

let reviewsSchema = mongoose.Schema({
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: String,
  helpfulness: Number
});

let reviewersSchema = mongoose.Schema({
  nickname: String,
  email: String
});

let photosSchema = mongoose.Schema({
  url: String
});

let charSchema = mongoose.Schema({
  name: String,
  char_id: Number,
  value: String
});