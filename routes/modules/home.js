// 載入 Expree 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Record Model
const Record = require('../../models/record')
// 引用 totalAmount function 
const totalAmount = require('../../totalAmount')

// redirect route
router.get('/', (req, res) => {
  res.redirect(302, '/records')
})

// 首頁路由
router.get('/records', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const total = totalAmount(records)
      res.render('index', { records, total })
    })
    .catch(error => console.log(error))
})

// filter route
router.get('/records/filter/:category', (req, res) => {
  const category = req.params.category
  return Record.find({ category: category })
    .lean()
    .then(records => {
      const total = totalAmount(records)
      res.render('index', { records, total })
    })
    .catch(error => console.log(error))
})


module.exports = router