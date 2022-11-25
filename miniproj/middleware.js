
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
const User = require('./models/user');

module.exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[0];
    const isCustomAuth = token.length < 500;
    // console.log(token)
    let decodedData;
    if (token && isCustomAuth) {     
      decodedData = jwt.verify(token, secret);
      // console.log(decodedData)
      const founduser= await User.findById(decodedData.id).select('-password');
      if(!founduser) {throw new Error('User not found')};
      req.user=founduser;
    }  
    next();
  } catch (error) {
    res.status(401).json('Unauthorized: No token provided');
    // console.log(error);
  }
};