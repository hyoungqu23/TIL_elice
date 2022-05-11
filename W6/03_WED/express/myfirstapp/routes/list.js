const express = require('express');
const router = express.Router();

// http://localhost:3000/list
router.get("/", (req, res, next) => {
  console.log("Test list router."); // 터미널 출력
  res.send("This page shows list."); // 화면 출력
  next();
});

router.get("/", (req, res, next) => {
  console.log("Test item router."); // 
  // res.render('list', {title: "LIST", item: "list-items"})
})

module.exports = router;