const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
// 載入 Record Model
const Record = require('./models/record')
// 引用 totalAmount function
const totalAmount = require('./totalAmount')
// 引用 generateIcon fuction
const generateIcon = require('./generateIcon')

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

app.use(bodyParser.urlencoded({ extended: true }))


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

// New 頁面路由
app.get('/records/new', (req, res) => {
  res.render('new')
})

// Create route
app.post('/records', (req, res) => {
  const { name, date, category, amount } = req.body
  const icon = generateIcon(category)
  return Record.create({
    name,
    date,
    category,
    amount,
    icon
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('The app is running on http://localhost:3000')
})