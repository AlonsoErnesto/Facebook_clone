const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {readdirSync} = require("fs");
const dotenv = require("dotenv");
dotenv.config();


//CORS and JSON
const app = express();
app.use(express.json());
app.use(cors());


//Routes
readdirSync("./routes").map((r) => app.use('/',require('./routes/' + r)));


//Database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
}).then(() => {console.log("Database connected successfully")})
  .catch((err)=>{console.log("Database not connected error",err)})
;


// Create server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`)
})


