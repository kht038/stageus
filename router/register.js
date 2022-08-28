const router = require('express').Router();
const path = require('path');
const { User } = require('../config/config');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../page/register.html'));
});

router.post('/', (req, res) => {

});

module.exports = router;