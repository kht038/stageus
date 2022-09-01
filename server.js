require('dotenv').config();


const { urlencoded } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;
const cookieParser = require('cookie-parser');
const { dbInit } = require('./config/config');

dbInit();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(cors());

const mainApi = require('./router/main');
app.use('/', mainApi);

const regiseterApi = require('./router/register');
app.use('/register', regiseterApi);

const loginApi = require('./router/login');
app.use('/login', loginApi);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});