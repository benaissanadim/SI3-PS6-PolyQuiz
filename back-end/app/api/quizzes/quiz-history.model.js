const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizHistory', {
    name: Joi.string().required(),
    date: Joi.date().required(),
    userId: Joi.any().required(),
})
