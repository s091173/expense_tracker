const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  merchant: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId, // 定義 userId 這個項目為 ObjectId
    ref: 'User', // 參考對象為 User Model
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)