const { Schema } = require('mongoose');
const shortId = require('./types/shortId');    // shortId 불러오기

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: 'H',  // 사용은 해야하니까 기본값 설정해주기
    },
    shortId: shortId,
}, {
    timestamps: true,
});

module.exports = PostSchema;