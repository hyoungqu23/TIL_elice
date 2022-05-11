const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('Test hello router.');
  res.send("Hello Express!");
})

module.exports = router;