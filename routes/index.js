const express = require('express')
const router = express.Router()

// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 records 模組程式碼
const records = require('./modules/records')

router.use('/', home)
router.use('/records', records)

module.exports = router