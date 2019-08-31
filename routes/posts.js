const router=require("express").Router();
const verifyToken=require("./verifyToken");

//simple function to receive some random post use verifyToken middleware to check authentication
router.get("/",verifyToken,(req,res)=>{
    res.json({"user":req.user,"data":{"Title":"Private Title","Description":"Private informtion"}}); 
});
module.exports=router;