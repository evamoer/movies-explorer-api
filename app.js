const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { auth } = require('./middlewares/auth');
const { createUser, loginUser } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', loginUser);

app.use(auth);
app.use(routes);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
