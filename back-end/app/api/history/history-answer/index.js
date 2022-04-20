const { Router } = require('express')

const { History, HistoryAnswer } = require('../../../models')

const manageAllErrors = require('../../../utils/routes/error-management')

const router = new Router()


router.post('/:id', (req, res) => {
    try {
      const questionHistoryId = parseInt(req.params.id, 10)
      console.log()
      let answers = HistoryAnswer.create({ date: req.body.date, answer : req.body.answer , correct : req.body.correct,questionHistoryId :  questionHistoryId })
      res.status(201).json(answers)
    } catch (err) {
      manageAllErrors(res, err)
    }
  })

  module.exports = router;