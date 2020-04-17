const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/api/appUser');

router.post('/api/signup',[
    body('email', 'All fields are required.').not().isEmpty().isEmail().normalizeEmail().withMessage('Please enter a valid email.'),
    body('password').not().isEmpty().withMessage('All fields are required.').isLength({
        min: 6
    }).withMessage('Password should be at least 6 characters.'),
    body('userType', 'All fields are required.').not().isEmpty()
], userController.signup)

router.post('/api/signin',[
    body('email').not().isEmpty().withMessage('All fields are required.').isEmail().normalizeEmail().withMessage('Please enter a valid email.'),
    body('password').not().isEmpty().withMessage('All fields are required.')
], userController.signin)

router.post('/api/verify-email', userController.confirmEmail)

router.post('/api/reset-password', userController.resetPassword)

router.post('/api/add-password', userController.addNewPassword)

module.exports = router;