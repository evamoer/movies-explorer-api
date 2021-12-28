const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsHandler } = require('./middlewares/errors-handler');
const { createUser, loginUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', createUser);
app.post('/signin', loginUser);
app.use(auth);
app.use(routes);

app.use(errorLogger);

app.use('/', (req, res) => {
  throw new NotFoundError('Такая страница отсутствует.');
});

app.use(errorsHandler);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
