const path = require('path');
const generateToken = require('../auth/token');

const router = require('express').Router();
const { User } = require('../config/config');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../page/login.html'));
});

router.post('/', async (req, res) => {
  try{
    const findUser = await User.findOne({
      where: {
        user_id: req.body.id,
        user_password: req.body.pw
      }
    })
    const authToken = generateToken(findUser.user_role, findUser.user_id, findUser.user_name, findUser.user_email, findUser.user_phone);
    res.cookie('authToken', authToken);
    res.redirect('/');
  }
  catch(err){
    res.status(404).send('user not founded');
  }
  
});

module.exports = router;