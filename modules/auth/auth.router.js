const router = require('express').Router();
const validation = require('../../middleware/validation');
const { signupValidation, signinValidation, confirmEmailValidation,
    forgetPassword, sendCodeValidation } = require('./auth.validation');
const signup = require('./controller/signup');
const signin = require('./controller/signin');
const confirmEmail = require('./controller/confirmEmail');
const reSendEmail = require('./controller/reSendEmail');

router.post('/signup', validation(signupValidation), signup);

router.post('/signin', validation(signinValidation), signin);

router.get("/api/v1/auth/confirmEmail/:token", validation(confirmEmailValidation), confirmEmail)

router.get('/api/v1/auth/reSendEmail/:id', reSendEmail)



module.exports = router