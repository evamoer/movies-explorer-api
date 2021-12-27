const router = require('express').Router();
const {
  getUsers, createUser, getMyProfile, updateUserProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/me', getMyProfile);
router.patch('/me', updateUserProfile);

module.exports = router;
