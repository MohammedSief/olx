const Joi = require('joi')

const signupValidation = {

    body: Joi.object().required().keys({
        firstName: Joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)),
        lastName: Joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)),
        email: Joi.string().email().required(),
        //age: Joi.number().min(18).required(),
        //gender: Joi.valid('Male', 'Female').required(),
        password: Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        cPassword: Joi.string().valid(Joi.ref('password')).required()
    })
}


const signinValidation = {

    body: Joi.object().required().keys({

        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),

    })
}


const confirmEmailValidation = {

    params: Joi.object().required().keys({
        token: Joi.string().required(),
    })
}


const forgetPassword = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        code: Joi.number().required(),
        newPassword: Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        cPassword: Joi.string().valid(Joi.ref('newPassword')).required()
    })
}

const sendCodeValidation = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required()
    })
}


module.exports =
    { signupValidation, signinValidation, confirmEmailValidation, forgetPassword, sendCodeValidation }