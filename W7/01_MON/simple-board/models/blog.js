const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const blogSchema = mongoose.Schema;

// 접속 초기화 필요(autoIncrement 관련)
autoIncrement.initialize(mongoose);

// title, content, auto increment
const blog = new blogSchema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  no: Number,
},{
  timestamps: true, // UTC 변환 필요
});

// auto increment 설정하기
blog.plugin(autoIncrement.plugin, {
  model: 'blog',
  field: 'no',
  startAt: 1,
  increment: 1,
})

const blogModel = mongoose.model('blog', blog);

module.exports = blogModel;