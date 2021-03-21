// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 載入 Model
const Category = require('../category')
// 載入 json 資料 
const data = require('./data.json')
// 引用 mongoose
const db = require('../../config/mongoose')

db.once('open', () => {

  data.categories.forEach(category => {
    Category.create({
      name: category.name,
      icon: category.icon
    })
  })
  console.log('done')
})