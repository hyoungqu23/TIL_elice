const mongoose = require('mongoose'); // 몽구스 불러오기
const Schema = mongoose.Schema; // 값들의 모음

// 데이터 생성
const book = new Schema({
  bookname: String,
  author: String,
  // price: {
  //   type: Number,
  //   default: 50000
  // },
  price: Number,
  publish: Date,
  sales: {
    type: Boolean,
    default: false
  }
});

// 데이터를 collection에 삽입
const bookData = mongoose.model('book', book);
// collection name, data

module.exports = bookData;