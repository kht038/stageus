require('dotenv').config();


const { urlencoded } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;
const { dbInit } = require('./config/config');
const path = require('path');

dbInit();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './page/game.html'))
});

const regiseterApi = require('./router/register');
app.use('/register', regiseterApi);

const loginApi = require('./router/login');
app.use('/login', loginApi);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});