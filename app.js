const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const app = express();

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
