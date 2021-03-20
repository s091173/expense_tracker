const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')

const usePassport = require('./config/passport')

const app = express()

const PORT = process.env.PORT || 3000

require('./config/mongoose')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))


app.use(bodyParser.urlencoded({ extended: true }), methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

app.use(routes)

// register helper
handlebars.registerHelper('ifEqual', function (category, targetCategory, options) {
  if (category === targetCategory) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})


app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:${PORT}/records`)
})