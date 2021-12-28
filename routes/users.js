const router = require('express').Router();
const {
  getUsers, getMyProfile, updateUserProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMyProfile);
router.patch('/me', updateUserProfile);

module.exports = router;
