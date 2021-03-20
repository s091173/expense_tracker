const express = require('express')
const router = express.Router()

// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 records 模組程式碼
const records = require('./modules/records')
// 引入 users 模組
const users = require('./modules/users')
// 引用 auth 模組
const auth = require('./modules/auth')

// auth middleware
const { authenticator } = require('../middleware/auth')


router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)


module.exports = router