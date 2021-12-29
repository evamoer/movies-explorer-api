const router = require('express').Router();
const { celebrate } = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { signupCelebrateValidationSettings, signinCelebrateValidationSettings } = require('../helpers/celebrate-validation-settings');
const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

/**
 * Роутинг приложения:
 * без авторизации - роуты регистрации и авторизации пользователя,
 * с авторизацией - все остальные роуты приложения.
 * Проверка авторизации пользователя осуществляется миддлвэром auth.
 * При несуществующем роуте выдается ошибко об отсутствии страницы.
 */
router.post('/signup', celebrate(signupCelebrateValidationSettings), createUser);
router.post('/signin', celebrate(signinCelebrateValidationSettings), loginUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/', (req, res) => {
  throw new NotFoundError('Такая страница отсутствует.');
});

module.exports = router;
