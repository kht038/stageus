const path = require('path');
const jwt = require('jsonwebtoken');
const { User } = require('../config/config');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../page/game.html'));
});

router.post('/', (req, res) => {
  const token = req.cookies.authToken;

  try{
    jwt.verify(token, process.env.SECRET_KEY);
    const {role, id, name, email, phone} = jwt.decode(token, process.env.SECRET_KEY);
    const response = {
      "success": true,
      "role": role,
      "id": id,
      "name": name,
      "email": email,
      "phone": phone
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

router.post('/history', async (req, res) => {
  const token = req.cookies.authToken;
  const response = {
    "update": false,
    "success": true
  }
  try{
    jwt.verify(token, process.env.SECRET_KEY);
    const { email } = jwt.decode(token, process.env.SECRET_KEY);
    const findUser = await User.findOne({
      where: {
        user_email: email
      }
    })
    if(findUser.user_history == null){
      response.update = true;
      findUser.user_history = num;
      await findUser.save();
    }
    else{
      if(findUser.user_history < num){
        response.update = true;
        findUser.user_history = num;
        await findUser.save();
      }
    }
    
    res.send(response);
  }
  catch(err){
    const response = {
      "success": false
    }
    res.send(response);
  }
})

module.exports = router;
