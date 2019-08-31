//create instance of router
const router = require("express").Router();
const User = require("../model/User");
const { registerValidation,loginValidation } = require("../validation");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

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
    res.send(user._id);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Login process
router.post("/login",async (req,res)=>{
    //input level validation
    const {error}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //database level vallidation by checking user and password

    const user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid User !!');
    else{
        //check for password
        const validPassword=await bcrypt.compare(req.body.password,user.password);
        if(!validPassword) return res.status(400).send('Invalid Password !!');

        //assigning the json web token by pasing some unique information and token secret
        const token=jwt.sign({_id:user._id},process.env.SECRET_KEY);
        //now send token along with header
        res.header({"auth-token":token}).send(token);
        
        //res.send("Authentication successful !!");

    }
    
});

//exposrting router module
module.exports = router;
