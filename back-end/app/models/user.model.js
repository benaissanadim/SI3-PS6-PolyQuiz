const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  id:Joi.string().required(),
  name:Joi.string().required(),
  picture:Joi.string().required(),
  withRecap:Joi.string().required(),
  deleteFalseAnswer:Joi.string().required(),
  hint:Joi.string().required(),
})
