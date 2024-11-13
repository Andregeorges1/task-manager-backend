const express = require('express');
const { registerUser, loginUser, verifyOTP } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware'); 
const router = express.Router();

router.post('/register', authenticateToken,registerUser); 
router.post('/login', loginUser);       
router.post('/verify-otp', verifyOTP);  

module.exports = router;
