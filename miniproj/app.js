if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const fs = require('fs');

const fse = require('fs-extra');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const dbUrl = process.env.DB_URL;

const userRoutes = require('./routes/users');
const {spawn} = require('child_process');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { isLoggedIn} = require('./middleware');
const User = require('./models/user');
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
app.use(express.static(__dirname + '/uploads'));
// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.use('/', userRoutes);
app.get('/',(req,res)=>{
    res.send("Hi")
});
app.post('/xyz',isLoggedIn, (req, res) => {
  const { runstr } = req.body;
  const userid=req.user._id;
  try{var dataToSend;
      var args= ['main.py'];
      var arr = runstr.split(" ");
      arg=args.concat(arr);
      let namefile=userid+"-"+Date.now().toString();
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
        let src1 = "test_clf_rep.png";
        let dest1 = `uploads/${namefile}_test_clf_rep.png`;
        fse.move(src1, dest1, (err) => {
          if (err) return console.log(err);
          console.log(`File successfully moved!!`);
        });
        let src2 = "test_conf_mat.png";
        let dest2 = `uploads/${namefile}_test_conf_mat.png`;
        fse.move(src2, dest2, (err) => {
          if (err) return console.log(err);
          console.log(`File successfully moved!!`);
        });
        let src3 = "training_clf_rep.png";
        let dest3 = `uploads/${namefile}_training_clf_rep.png`;
        fse.move(src3, dest3, (err) => {
          if (err) return console.log(err);
          console.log(`File successfully moved!!`);
        });
        let src4 = "training_conf_mat.png";
        let dest4 = `uploads/${namefile}_training_conf_mat.png`;
        fse.move(src4, dest4, (err) => {
          if (err) return console.log(err);
          console.log(`File successfully moved!!`);
        });
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