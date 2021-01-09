const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
// 載入 Record Model
const Record = require('./models/record')
// 引用 totalAmount function
const totalAmount = require('./totalAmount')

const app = express()



// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資了庫連線狀態
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const total = totalAmount(records)
      res.render('index', { records, total })
    })
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('The app is running on http://localhost:3000')
})