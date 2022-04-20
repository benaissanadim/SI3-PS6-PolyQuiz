const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuestionHistory', {
    id : Joi.any().required(),
    nom : Joi.string().required(),
    answers :  Joi.array().required(),
    recaps : Joi.array(),
})