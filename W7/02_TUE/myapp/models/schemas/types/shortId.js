const { nanoid } = require('nanoid');
// [참고](https://www.npmjs.com/package/nanoid)

const shortId = {
  type: String,
  default: () => {
    return nanoid() // 아무 아이디 하나 만들어줌~
  },
  required: true,
  index: true,
}

module.exports = shortId;