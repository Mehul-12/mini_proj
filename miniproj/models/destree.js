<<<<<<< HEAD
const mongoose=require('mongoose');
const internal = require('stream');
const Schema=mongoose.Schema

const destree=new Schema({  
  spiltcrit:{
    type:String,
    allowedValues: ['gini-index','entropy'],
    required:true
  },  
  maxdepth:{
    type:Number
  },
  minsplit:{
    type:Number,
    required:true
  },
  maxfeat:{
    type:String,
    allowedValues: ['auto', 'sqrt','log2','none']
  }
});

module.exports=mongoose.model('destree',destreeSchema)
=======
const mongoose=require('mongoose');
const internal = require('stream');
const Schema=mongoose.Schema

const destree=new Schema({  
  spiltcrit:{
    type:String,
    allowedValues: ['gini-index','entropy'],
    required:true
  },  
  maxdepth:{
    type:Number
  },
  minsplit:{
    type:Number,
    required:true
  },
  maxfeat:{
    type:String,
    allowedValues: ['auto', 'sqrt','log2','none']
  }
});

module.exports=mongoose.model('destree',destreeSchema)
>>>>>>> master
