const path = require('path');
const generateToken = require('../auth/token');

const router = require('express').Router();
const { User } = require('../config/config');
const jwt = require('jsonwebtoken');
const redis = require('redis').createClient();

router.get('/', (req, res) => {
  try{
    jwt.verify(req.cookies.authToken, process.env.SECRET_KEY);
    res.sendFile(path.join(__dirname, '../page/game.html'));
  }
  catch(err){
    res.sendFile(path.join(__dirname, '../page/login.html'));
  }
});

router.post('/', async (req, res) => {
  try{
    const findUser = await User.findOne({
      where: {
        user_id: req.body.id,
        user_password: req.body.pw
      }
    });

    await redis.connect();
    redis.sadd("daily2", findUser.user_email);
    await redis.disconnect();
    const authToken = generateToken(findUser.user_role, findUser.user_id, findUser.user_name, findUser.user_email, findUser.user_phone);
    res.cookie('authToken', authToken);
    res.redirect('/');
  }
  catch(err){
    res.status(404).send(err.stack);
  }
  
});

module.exports = router;