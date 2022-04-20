const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('AnswerHistory', {
  questionHistoryId: Joi.any().required(),
  userId : Joi.any().required(),
  answer: Joi.string().required(),
  correct: Joi.boolean().required(),
  date : Joi.any().required()
})
