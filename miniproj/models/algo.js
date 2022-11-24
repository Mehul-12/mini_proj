const mongoose=require('mongoose');
const internal = require('stream');
const Schema=mongoose.Schema

const AlgoSchema=new Schema({
  classtype:{
    type:String,
    allowedValues: ['binary', 'multiclass'],
    required:true
  },
  algorithm:{
    type:String,
    algo:Schema.ObjectId
  }
});

module.exports=mongoose.model('User',UserSchema)
