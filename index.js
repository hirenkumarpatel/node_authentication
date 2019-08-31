/**
 * Node Api Authentication using JWT
 * install express ,mangoose and nodemon add to script in package.json script["start":"nodemon index.js"]
 * create routes in separate folder
 * We will connect to mongodb-atlas(online cluster) and following is the link to connect 
 * mongodb+srv://<username>:<password>@nodecluster-okay0.mongodb.net/test?retryWrites=true&w=majority
 * install dotenv to hide user and password from above string so that can prevent unauthorised access
 * importing body-parser to parse json data on http request like post and get
 * install bcryptjs for hashing password
 * install jsonwebtoken
 */
const express=require('express');
const app=express();
const port=process.env.PORT ||3000;
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const authRoute=require("./routes/auth");
const postRoute=require("./routes/posts");

//to configure dotenv variable to process's environment variable
dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true },()=>console.log("Conncted to database"));

//Body Parser middleware to handle http request with json data
app.use(express.json());

//Route middleware to handle route to be used while accessing authroute's post method 
app.use("/api/user",authRoute);
//Middleware to route when user type/api/posts
app.use("/api/posts",postRoute);


//listeninig to server
app.listen(port,console.log(`server is runing on port: ${port}`));