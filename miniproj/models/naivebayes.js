<<<<<<< HEAD
const mongoose=require('mongoose');
const internal = require('stream');
const Schema=mongoose.Schema

const naivebayes=new Schema({
  subclass:{
    type:String,
    allowedValues: ['BernoulliNB', 'MultinomialNB','GaussianNB'],
    required:true
  }
});

module.exports=mongoose.model('naivebayes',naivebayesSchema)
=======
const mongoose=require('mongoose');
const internal = require('stream');
const Schema=mongoose.Schema

const naivebayes=new Schema({
  subclass:{
    type:String,
    allowedValues: ['BernoulliNB', 'MultinomialNB','GaussianNB'],
    required:true
  }
});

module.exports=mongoose.model('naivebayes',naivebayesSchema)
>>>>>>> master
