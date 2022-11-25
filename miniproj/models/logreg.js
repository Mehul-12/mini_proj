<<<<<<< HEAD
const mongoose=require('mongoose');
const internal = require('stream');
const Schema=mongoose.Schema

const logreg=new Schema({
  solved:{
    type:String,
    allowedValues: ['newton-cg', 'lbfgs','liblinear','sag','saga'],
    required:true
  },
  penaltytype:{
    type:String,
    allowedValues: ['l1', 'l2','elasticnet','none']
  },
  iterations:{
    type:Number
  }
});

module.exports=mongoose.model('logreg',logregSchema)
=======
const mongoose=require('mongoose');
const internal = require('stream');
const Schema=mongoose.Schema

const logreg=new Schema({
  solved:{
    type:String,
    allowedValues: ['newton-cg', 'lbfgs','liblinear','sag','saga'],
    required:true
  },
  penaltytype:{
    type:String,
    allowedValues: ['l1', 'l2','elasticnet','none']
  },
  iterations:{
    type:Number
  }
});

module.exports=mongoose.model('logreg',logregSchema)
>>>>>>> master
