// 載入 Model
const Record = require('../record')
// 載入 json 資料 
const data = require('./data.json')
// 引用 mongooose
const db = require('../../config/mongoose')

db.once('open', () => {

  data.records.forEach(record => {
    Record.create({
      name: record.name,
      category: record.category,
      date: record.date,
      amount: record.amount,
      icon: record.icon
    })
  })

  console.log('done')
})