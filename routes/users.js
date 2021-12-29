const { celebrate } = require('celebrate');
const router = require('express').Router();
const {
  getUsers, getMyProfile, updateUserProfile,
} = require('../controllers/users');
const { updateUserCelebrateValidationSettings } = require('../helpers/celebrate-validation-settings');

/**
 * Роут '/users':
 * получение всех пользователей,
 * получение информации о себе,
 * редактирование информации о себе.
 */
router.get('/', getUsers);
router.get('/me', getMyProfile);
router.patch('/me', celebrate(updateUserCelebrateValidationSettings), updateUserProfile);

/**
 * Экспорт роута.
 */
module.exports = router;
