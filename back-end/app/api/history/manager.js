const buildHistory = (uId, qId) => 
History.get().filter((history) => (history.userId === uId))
.filter((history) => (history.quizId === qId))

module.exports = {
    buildHistory,
  }
  