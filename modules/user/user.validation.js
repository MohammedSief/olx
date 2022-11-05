const Joi = require("joi");


const userValidation = {
    headers: Joi.object().required().keys({
        authorization: Joi.string().required()
    }).options({allowUnknown:true})
}

module.exports = userValidation