const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const filesRouter = require('./routers/ManageProgram');
require("./db/mongoose");

const app = express();
const PORT = process.env.PORT||5000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(filesRouter);   



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
