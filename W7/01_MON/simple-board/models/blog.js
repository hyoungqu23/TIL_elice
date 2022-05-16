const mongoose = require('mongoose');
const blogSchema = mongoose.Schema;

// title, content
const blog = new blogSchema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
},{
  timestamps: true, // UTC 변환 필요
});

const blogModel = mongoose.model('blog', blog);

module.exports = blogModel;