// 載入 bcrypt
const bcrypt = require('bcryptjs')

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 載入 Record Model
const Record = require('../record')
// 載入 User Model 
const User = require('../user')
// 載入 json 資料 
const data = require('./data.json')
// 引用 mongooose
const db = require('../../config/mongoose')

const SEED_USERS = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}, {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]


db.once('open', () => {
  SEED_USERS.forEach((user, index) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(seeduser => {
        const userId = seeduser._id
        const recordData = data.records

        return Promise.all(
          Array.from(
            { length: 2 },
            (v, i) =>
              Record.create({
                merchant: recordData[i + (index * 2)].merchant,
                name: recordData[i + (index * 2)].name,
                category: recordData[i + (index * 2)].category,
                date: recordData[i + (index * 2)].date,
                amount: recordData[i + (index * 2)].amount,
                icon: recordData[i + (index * 2)].icon,
                userId
              })
          ))
      })
      .then(() => {
        console.log('done creating record seed data.')
        process.exit()
      })
  })
})