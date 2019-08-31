//create instance of router
const router = require("express").Router();
const User = require("../model/User");
const { registerValidation } = require("../validation");
const bcrypt=require("bcryptjs");

//creating routes to post /register
//async will finish process before start any new process
router.post("/register", async (req, res) => {
  //check for input level validation returning error by defragmenting validation object
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message); // got methods via fetcing complete error and defragmenting it

  //check for database level validation by checking if email already exist in database
  const emailExist= await User.findOne({email:req.body.email});
  if(emailExist) return res.status(400).send('Email already exist!');

  //hashing password by adding salt value to password
  const salt=await bcrypt.genSalt(10);
  const hashedPassword= await bcrypt.hash(req.body.password,salt);

  //New User data retrived from api
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  console.log(JSON.stringify(user));
  try {
    //await will wait till async process finish so it wont try to save before insertion of new data save is mongoose function to save data
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//exposrting router module
module.exports = router;
