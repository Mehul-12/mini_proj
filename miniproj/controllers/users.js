require('dotenv').config();
const User = require('../models/user');

const secret = process.env.SECRET;
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.register = async(req, res, next) => {
  console.log(req.body);
  const { email, password, name, username } = req.body;
  try {
    const oldUser = await User.findOne({username});  
    if (oldUser) return res.status(400).json({ message: "User already exists" });
  
    const hashedPassword = await bcrypt.hash(password, 12);   
    const result = await User.create({ email, password: hashedPassword, name , username});
  
    const token = jwt.sign( { email: result.email, id: result._id }, secret);
    res.status(201).json({ result, token });
  } 
  catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};