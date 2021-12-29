require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { celebrate, errors } = require('celebrate');
const routes = require('./routes/index');
const { createUser, loginUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signupCelebrateValidationSettings, signinCelebrateValidationSettings } = require('./helpers/celebrate-validation-settings');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errors-handler');
const NotFoundError = require('./errors/not-found-err');
const { DB_URI_DEV } = require('./config/config');

/**
 * Подключение к базе данных. В режиме 'production' адрес базы данных берётся из process.env.
 */
const { NODE_ENV, DB_URI_ENV } = process.env;
mongoose.connect(NODE_ENV === 'production' ? DB_URI_ENV : DB_URI_DEV, {
  useNewUrlParser: true,
});

/**
 * Создание сервера. Подключение мидлвэров.
 */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(requestLogger);

/**
 * Роутинг приложения:
 * без авторизации - роуты регистрации и авторизации пользователя,
 * с авторизацией - все остальные роуты приложения.
 * Проверка авторизации пользователя осуществляется миддлвэром auth.
 */
app.post('/signup', celebrate(signupCelebrateValidationSettings), createUser);
app.post('/signin', celebrate(signinCelebrateValidationSettings), loginUser);
app.use(auth);
app.use(routes);

/**
 * Операции по обработке ошибок сервера:
 * errorLogger, обработка перехода на несуществующий роут, celebrate и локальный обработчик ошибок.
 */
app.use(errorLogger);
app.use('/', (req, res) => {
  throw new NotFoundError('Такая страница отсутствует.');
});
app.use(errors());
app.use(errorsHandler);

/**
 * Подключение сервера к 3000-ому порту.
 */
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
