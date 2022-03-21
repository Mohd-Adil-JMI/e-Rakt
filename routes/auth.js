const express = require('express');
const authController = require('../controllers/auth');
const authController2 = require('../controllers/auth2');

const router = express.Router();
          
router.post('/SignUp', authController.SignUp );

router.post('/Login', authController.Login );

router.get('/Logout', authController.Logout );

router.post('/changePassword', authController.changePassword);

router.post('/edit', authController.edit);

router.delete('/users/me', authController.removeUser)

router.post('/admin', authController2.admin );

// router.get('/adminLogout', authController2.logout );


module.exports = router;