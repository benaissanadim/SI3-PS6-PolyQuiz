const { User } = require('../../models')

const findUserLogin = (name, password) => 
{
return User.get().filter((user) => (
    user.name.localeCompare(name)  ===0 &&  user.password.localeCompare(password) ===0  ))
}

const findUsers = ()=>{
   return User.get().filter((user) => (user.role===0))
}
module.exports = {
    findUserLogin, findUsers
  }
  