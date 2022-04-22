const { Router } = require('express')

const { User } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/:name/:password', (req, res) => {
  try {
    res.status(200).json(User.get().filter((user) => (
      user.name.localeCompare(req.params.name)  ===0
      &&   user.password.localeCompare(req.params.password) ===0  )))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/', (req, res) => {
  try {
    res.status(200).json(User.get().filter((user) => (
        user.role===0
         )))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:userId', (req, res) => {
  try {
    res.status(200).json(User.getById(req.params.userId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const user = User.create({ ...req.body })
    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:userId', (req, res) => {
  try {
    res.status(200).json(User.update(req.params.userId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:userId', (req, res) => {
  try {
    User.delete(req.params.userId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})
router.post('/:userId', (req, res) => {
  try {
    res.status(200).json(User.update(req.params.userId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})



module.exports = router
