const router = require('express').Router();
const path = require('path');
const { User } = require('../config/config');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../page/register.html'));
});

router.post('/', async (req, res) => {
  try{
    const createdUser = await User.create({
      user_role: req.body.role,
      user_id: req.body.id,
      user_password: req.body.pw,
      user_name: req.body.name,
      user_email: req.body.email,
      user_phone: req.body.phone
    });
    await createdUser.save();
    res.redirect('/');
  }
  catch(err){
    res.send(err);
  }
  
});

module.exports = router;