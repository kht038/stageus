const path = require('path');
const { User } = require('../config/config');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

router.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../page/admin.html'));
});

router.post('/', async (req, res) => {
  try{
    jwt.verify(req.cookies.authToken, process.env.SECRET_KEY);
    const { role } = jwt.decode(req.cookies.authToken, process.env.SECRET_KEY);
    if(role !== '관리자'){
      throw new Error('관리자 아님');
    }
    const allUser = await User.findAll();
    const response = {
      "success": true,
      "users": allUser
    }
    res.send(response);
  }
  catch(err){
    const response = {
      "success": false
    }
    res.send(response);
  }
});

module.exports = router;