const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  id:Joi.string().required(),
  name:Joi.string().required(),
  image:Joi.string(),
  withRecap:Joi.boolean(),
  deleteFalseAnswer:Joi.boolean(),
  hint:Joi.boolean(),
  vocal:Joi.boolean(),
  stade: Joi.string(),
  password : Joi.string(),
  role : Joi.number(),
  disabledQuestions: Joi.array().required(),
})
