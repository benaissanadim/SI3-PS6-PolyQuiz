const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const HistoryRouter = require('./history')

const HistoryAnswerRouter = require('./history/history-answer')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/history',HistoryRouter)
router.use('/answerHistory', HistoryAnswerRouter)
module.exports = router
