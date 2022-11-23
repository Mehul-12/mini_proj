const mongoose=require('mongoose');
const internal = require('stream');
const Schema=mongoose.Schema

const adaboost=new Schema({  
  estimators:{
    type:Number
  },  
  learningrate:{
    type:Number
  }
});

module.exports=mongoose.model('adaboost',adaboostSchema)
