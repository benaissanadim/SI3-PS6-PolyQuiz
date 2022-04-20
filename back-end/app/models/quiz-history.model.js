const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizHistory', {
  name: Joi.string().required(),
  quizId : Joi.any().required(),
  userId: Joi.any().required(),
  questions : Joi.array(),
})
