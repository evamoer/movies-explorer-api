require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errors-handler');
const { DB_URI_DEV, rateLimitSettings } = require('./config/config');

/**
 * Подключение к базе данных. В режиме 'production' адрес базы данных берётся из process.env.
 */
const { NODE_ENV, DB_URI_ENV, PORT = 3000 } = process.env;
mongoose.connect(NODE_ENV === 'production' ? DB_URI_ENV : DB_URI_DEV, {
  useNewUrlParser: true,
});

/**
 * Создание сервера. Подключение мидлвэров.
 */
const app = express();
app.use(requestLogger);
app.use(rateLimit(rateLimitSettings));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

/**
 * Роутинг на сервере.
 */
app.use(routes);

/**
 * Операции по обработке ошибок сервера:
 * errorLogger, celebrate и обработчик ошибок.
 */
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

/**
 * Подключение сервера к порту.
 */
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on port ${PORT}`);
});
