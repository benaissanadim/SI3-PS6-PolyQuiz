const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  id:Joi.string().required(),
  name:Joi.string().required(),
  image:Joi.string().required(),
  withRecap:Joi.boolean().required(),
  deleteFalseAnswer:Joi.boolean().required(),
  hint:Joi.boolean().required(),
  vocal:Joi.boolean().required(),
  stade: Joi.string().required(),

})
