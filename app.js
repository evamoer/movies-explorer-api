const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '61c9b398435051c0c75484d0',
  };

  next();
});

app.use(routes);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
