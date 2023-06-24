const express = require("express");
const router = express.Router();
const users = require("../model/users.json");

router.get("/users", (req, res) => {
  res.send(users);
});

module.exports = router;
