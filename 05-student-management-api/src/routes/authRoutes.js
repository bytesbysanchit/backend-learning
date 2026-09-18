const express= require('express');
const router = express.Router();

const {register, login, profile}= require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize= require('../middleware/authorize')

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.get('/admin', authMiddleware, authorize('admin'), (req, res) => {
  res.status(200).json({
    message: 'Welcome Admin'
  });
});

module.exports = router;