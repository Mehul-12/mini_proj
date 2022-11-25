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
app.get('/',(req,res)=>{
    res.send("Hi")
});
app.get('/xyz', (req, res) => {
  const { runstr } = req.body;
  try{var dataToSend;
      var args= ['./Mini_3/main.py'];
      var arr = runstr.split(" ");
      arg=args.concat(arr);
      // console.log(args);
      // res.send("hello");
      // ['main.py','bnr', 'lgr', 'saga', 'l1', '3']
      const python = spawn('python', arg);
      // console.log(arg)
      python.stdout.on('data', function (data) {
       console.log('Pipe data from python script ...');
       dataToSend = data.toString();
      });
      python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend)
      });
  }
 catch (error) {
  res.status(500).json({ message: "No args posted" }); 
}
  
}); 


const port= 3000
app.listen(port, () => {
  console.log(`serving on the port ${port}`);
})