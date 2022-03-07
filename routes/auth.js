const express = require('express');
const authController = require('../controllers/auth');
const authController2 = require('../controllers/auth2');

const router = express.Router();
          
router.post('/register', authController.register );

router.post('/login', authController.login );

router.get('/logout', authController.logout );



router.post('/admin', authController2.admin );

// router.get('/adminLogout', authController2.logout );


module.exports = router;