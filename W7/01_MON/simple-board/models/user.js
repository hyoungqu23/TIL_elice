const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  userid: {
    type: String,
    required: true, // 필수 -> validation error 발생
    unique: true, // collection에서 유일 -> duplicate error 발생
  },
  job: {
    type: String,
    required: true,
  }
});

const userData = mongoose.model('User', user)

module.exports = userData;