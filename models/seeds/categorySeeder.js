// 載入 mongoose
const mongoose = require('mongoose')
// 載入 Model
const Category = require('../category')
// 載入 json 資料 
const data = require('./data.json')

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資了庫連線狀態
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  data.categories.forEach(category => {
    Category.create({
      name: category.name,
      icon: category.icon
    })
  })
  console.log('done')
})