const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
  label: Joi.string().required(),
  quizId: Joi.number(),
  indice : Joi.string(),
  answers: Joi.array()
})