require('dotenv').config();


const { urlencoded } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});