const router = require('express').Router();
const path = require('path');
const redis = require('redis').createClient();
const jwt = require('jsonwebtoken');

router.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, '../page/ranking.html'));
})

router.post('/', async(req, res) => {
  const result = {
    "success": false,
    "message": "",
    "data": null,
  };

  try{
    jwt.verify(req.cookies.authToken, process.env.SECRET_KEY);

    await redis.connect();
    const daily = await redis.get('daily');
    await redis.disconnect();

    result.success = true;
    result.message = "값 반환"
    result.data = daily;
    console.log(daily);
    console.log('1');
    res.send(result);
  }
  catch(err){
    result.message = `에러 발생 ${err.stack}`
    res.send(result);
  }
})


module.exports = router;