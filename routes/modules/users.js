const express = require('express')
const router = express.Router()

const passport = require('passport')

// 載入 User Model
const User = require('../../models/user')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// login submit
// 加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register submit 
router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  // 檢查使用者是否已經註冊
  User.findOne({ email })
    .then(user => {
      // 如果已經註冊：退回原本畫面
      if (user) {
        console.log('User already exists.')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        // 如果還沒註冊：寫入資料庫
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
})

module.exports = router