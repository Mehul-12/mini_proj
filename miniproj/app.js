// const express=require('express');
// const path=require('path')
// const mongoose=require('mongoose')
// const ejsMate=require('ejs-mate')
// const methodOverride=require('method-override');
// //const catchAsync=require('./utils/catchAsync')
// //const session=require('express-session')

// const userRoutes=require('./routes/users')

// const connection_url =
//     "mongodb+srv://mehul:mehul@cluster0.vgrppay.mongodb.net/?retryWrites=true&w=majority";
//     mongoose.connect(connection_url, {
// });

// const db = mongoose.connection;
// db.once("open", () => {
//   console.log("DB connected");
// })

// console.log(`MongoDB Connected`);

// const app=express();

// app.engine('ejs',ejsMate)
// app.set('view engine','ejs')
// app.set('views',path.join(__dirname,'views'))

// app.use(express.urlencoded({extended:true}))
// app.use(methodOverride('_method'))
// app.use(express.static(path.join(__dirname,'public')))



if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const dbUrl = process.env.DB_URL;

const userRoutes = require('./routes/users');
const {spawn} = require('child_process');
const cors = require('cors');
const cookieParser = require("cookie-parser");
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.use('/', userRoutes);
// app.use('/', postRoutes);
// app.use('/', commentRoutes);
app.get('/',(req,res)=>{
    res.send("Hi")
}) 

const port= 3000
app.listen(port, () => {
  console.log(`serving on the port ${port}`);
})