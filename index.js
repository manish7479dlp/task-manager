const express = require("express");
require("dotenv").config();

const app = express();
const dbConncet = require("./src/dbConncet/dbConnect.js")
const DATABASE_URL = process.env.DATABASE_URL;
console.log(DATABASE_URL);

//connect database
dbConncet(DATABASE_URL);

//JSON
app.use(express.json());

app.get("/" , (req , res) => {
    res.send("hlw from the other side...")
})

app.listen(8000 , ()=> {
    console.log("Server is running..");
})
