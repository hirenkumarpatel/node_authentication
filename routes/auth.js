//create instance of router
const router = require("express").Router();

//creating routes to post /register
router.post("/register", (req, res) => {
  res.send("register");
});
//exposrting router module
module.exports = router;
