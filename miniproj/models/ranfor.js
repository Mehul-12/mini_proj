const mongoose=require('mongoose');
const internal = require('stream');
const Schema=mongoose.Schema

const ranfor=new Schema({  
  estimators:{
    type:Number
  },  
  maxdepth:{
    type:Number
  },
  maxsplit:{
    type:String,
    allowedValues: ['newton-cg', 'lbfgs','liblinear','sag','saga'],
    required:true
  },
  maxfeat:{
    type:String,
    allowedValues: ['auto', 'sqrt','log2','none']
  }
});

module.exports=mongoose.model('ranfor',ranforSchema)
