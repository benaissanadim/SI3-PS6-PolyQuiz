const { Router } = require('express')

const { History, HistoryAnswer, HistoryQuestion, Question } = require('../../models')

const HistoryAnswerRouter = require('./history-answer')



const manageAllErrors = require('../../utils/routes/error-management')
const answerHistory = require('../../models/answer-history')



const router = new Router()
router.use('', HistoryAnswerRouter)

router.get('/one/:id', (req, res) => {
  try {
      const history = History.getById(req.params.id)
    
      const questions =  history.questions
      let quest = []
      let questions2 = Question.get().filter((qu)=>
      qu.quizId === history.quizId).forEach((qu)=>
      {
      const ques = {id : qu.id , nom : qu.label , answers : {}, recaps : {}}
      console.log(ques)
      quest.push(ques)
      }
      )

      console.log("final")
        
      console.log(quest)
      console.log("diff")
      console.log(questions)
      const questionsWithAnswers = quest.map((question) => {
          const answerHistory = HistoryAnswer.get()
          const answers = answerHistory.filter((answer) => parseInt(answer.questionHistoryId, 10) === parseInt(question.id, 10) )
          return { ...question, answers: answers }
      })
      const historyUser = {...history, questions: questionsWithAnswers}
    res.status(200).json(historyUser)
  } catch (err) {
    manageAllErrors(res, err)
  }
})



router.get('/:userId/:quizId', (req, res) => {
    try {
      res.status(200).json(History.get().filter((history) => (
        parseInt(history.userId, 10) ===  parseInt( req.params.userId , 10)
        && parseInt(history.quizId, 10)   === parseInt(req.params.quizId, 10)  )))
    } catch (err) {
      manageAllErrors(res, err)
    }
  })

  router.get('/:userId', (req, res) => {
    try {
      res.status(200).json(History.get().filter((history) => (
        parseInt(history.userId, 10) ===  parseInt( req.params.userId , 10))))
    } catch (err) {
      manageAllErrors(res, err)
    }
  })

  router.get('/', (req, res) => {
    try {
      res.status(200).json(History.get())
    } catch (err) {
      manageAllErrors(res, err)
    }
  })

  

router.post('/', (req, res) => {
  try {
    const history = History.create({ ...req.body })
    res.status(201).json(history)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/:id', (req, res) => {
    try {
        res.status(200).json(History.update(req.params.id, req.body))
      } catch (err) {
        manageAllErrors(res, err)
      }
  })
module.exports = router
