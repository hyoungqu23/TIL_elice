const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("post");
});

router.post("/", (req, res, next) => {
  const name = req.body.name; // req.body: form의 name input의 값을 전달 받음
  const phoneNumber = req.body.phoneNumber; // req.body: form의 phoneNumber input의 값을 전달 받음
  const bDay = req.body.bDay; // req.body: form의 bDay input의 값을 전달 받음

  // JSON 형식으로 응답 받기
  res.json({
    name: name,
    phoneNumber: phoneNumber,
    bDay: bDay,
  });
});

module.exports = router;