const path = require('path')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.getuser = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'user.html'))
}

function generatetoken(id, premiumuser) {
  return jwt.sign({ userid: id }, 'secretkey');
}

exports.userlogin = async (req, res, next) => {
  try {
    const email = req.body.Email;
    const password = req.body.password;
    const users = await User.findAll()
    var flag = 0;
    for (let i = 0; i < users.length; i++) {
      console.log(users[i].email)
      if (users[i].email == email) {
        flag = 1;
        bcrypt.compare(password, users[i].password, (err, result) => {
          if (err) {

            res.status(500).json({ message: 'something went wrong' })
            console.log('User not authorized')

          }
          if (result === true) {

            console.log(users[i].premiumuser)
            res.status(202).json({ message: 'login successful', token: generatetoken(users[i].id), premiumuser: users[i].premiumUser })

          }
          else {
            res.status(401).json({ message: 'User not authorized' })
          }
        })
        break;
      }
    }

    if (flag == 0) {
      res.status(404).json({ message: 'User not Found' })
      console.log('User not Found')

    }




  }
  catch (err) { (console.log(err)) }
}

exports.usersignup = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.Email;


    const saltgrounds = 10;
    bcrypt.hash(password, saltgrounds, async (err, hash) => {
      const data = await User.create({
        username: username,
        password: hash,
        email: email,
        totalexpence: 0,
        premiumUser: false
      })
      res.status(201).json({ newuser: data, message: 'signup successful' })
      console.log('signup successful')
    })

  } catch (err) { console.log(err) }
}

exports.deleteuser = (req, res, next) => {
  const uId = req.params.id;
  User.destroy({ where: { id: uId } })
}

