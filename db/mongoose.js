//create the databse 
const mongoose = require("mongoose"); //require modules
const env = require("dotenv").config();


//need to be .env
mongoose
  .connect("mongodb+srv://ofir08:ofir08@cluster0-skj1j.mongodb.net/Chinuch?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((d) => {
    console.log("database was connected");
  })
  .catch((e) => {
    console.log("cant connect to database");
    console.log(e);
  });

  
  