const express = require('express')
const router = express.Router()

// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 records 模組程式碼
const records = require('./modules/records')
// 引入 users 模組
const users = require('./modules/users')
// auth middleware
const { authenticator } = require('../middleware/auth')


router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/', authenticator, home)


module.exports = router