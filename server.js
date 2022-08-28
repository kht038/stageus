require('dotenv').config();


const { urlencoded } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;
const { dbInit } = require('./config/config');



dbInit();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

const regiseterApi = require('./router/register');
app.use('/register', regiseterApi);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});