const path = require('path');
const jwt = require('jsonwebtoken');

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

module.exports = router;
