const express = require('express');
const router = express.Router();

// http://localhost:3000/hello
router.get("/", (req, res, next) => {
  console.log("Test hello router."); // 터미널 출력
  res.send("Hello Express!"); // 화면 출력
});

module.exports = router;