const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const methodOverride = require('method-override')
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

app.use(
  bodyParser.urlencoded({ extended: true }),
  methodOverride('_method')
)

// register helper
handlebars.registerHelper('ifEqual', function (category, targetCategory, options) {
  if (category === targetCategory) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})


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

// edit 頁面 
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

// update route
app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  const icon = generateIcon(category)
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.icon = icon
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// delete route 
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// filter route
app.get('/records/filter/:category', (req, res) => {
  const category = req.params.category
  return Record.find({ category: category })
    .lean()
    .then(records => {
      const total = totalAmount(records)
      res.render('index', { records, total })
    })
    .catch(error => console.log(error))
})


app.listen(3000, () => {
  console.log('The app is running on http://localhost:3000')
})