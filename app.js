const express=require('express');
const path=require('path')
const mongoose=require('mongoose')
const ejsMate=require('ejs-mate')
const methodOverride=require('method-override');
//const catchAsync=require('./utils/catchAsync')
//const session=require('express-session')

const userRoutes=require('./routes/users')

const connection_url =
    "mongodb+srv://mehul:mehul@cluster0.vgrppay.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(connection_url, {
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
})

console.log(`MongoDB Connected`);

const app=express();

app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))


app.get('/')
app.use('/',userRoutes)

app.get('/',(req,res)=>{
  res.render('home')
}) 
app.listen(8080,()=>{
  console.log('serving on the port')
})  