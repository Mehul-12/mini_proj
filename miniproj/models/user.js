const mongoose=require('mongoose');
const internal = require('stream');
const Schema=mongoose.Schema

const UserSchema=new Schema({
  name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique: true
  },
  password: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports=mongoose.model('User',UserSchema)
