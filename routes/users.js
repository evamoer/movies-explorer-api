const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUsers, getMyProfile, updateUserProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMyProfile);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

module.exports = router;
