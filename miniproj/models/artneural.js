const mongoose=require('mongoose');
const internal = require('stream');
const Schema=mongoose.Schema

const artneural=new Schema({  
  activation:{
    type:String,
    allowedValues: ['identity','logistic','tanh','relu'],
    required:true
  },
  solver:{
    type:String,
    allowedValues: [ 'lbfgs','sgd','adam'],
    required:true
  },
  batchsize:{
    type:Number
    //less than 20k
  },
  iterations:{
    type:Number
  },
  alpha:{
    type:Number
  }
});

module.exports=mongoose.model('artneural',artneuralSchema)
