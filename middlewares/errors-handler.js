const errorsHandler = (err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Произошла ошибка на сервере.' : message,
  });
};

module.exports = {
  errorsHandler,
};
