const { celebrate } = require('celebrate');
const router = require('express').Router();
const {
  getUsers, getMyProfile, updateUserProfile,
} = require('../controllers/users');
const { updateUserCelebrateValidationSettings } = require('../helpers/celebrate-validation-settings');

router.get('/', getUsers);
router.get('/me', getMyProfile);
router.patch('/me', celebrate(updateUserCelebrateValidationSettings), updateUserProfile);

module.exports = router;
