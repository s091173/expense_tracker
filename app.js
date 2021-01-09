const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')

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
  methodOverride('_method'),
  routes
)

// register helper
handlebars.registerHelper('ifEqual', function (category, targetCategory, options) {
  if (category === targetCategory) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})


app.listen(3000, () => {
  console.log('The app is running on http://localhost:3000')
})