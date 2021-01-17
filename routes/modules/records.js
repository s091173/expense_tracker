const express = require('express')
const router = express.Router()
// 引用 Record Model
const Record = require('../../models/record')
// 引用 generateIcon function 
const generateIcon = require('../../generateIcon')

// New 頁面路由
router.get('/new', (req, res) => {
  res.render('new')
})

// Create route
router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  const icon = generateIcon(category)
  return Record.create({
    name,
    date,
    category,
    amount,
    icon
  })
    .then(() => res.redirect('/records'))
    .catch(error => console.log(error))
})

// edit 頁面 
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

// update route
router.put('/:id', (req, res) => {
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
    .then(() => res.redirect('/records'))
    .catch(error => console.log(error))
})

// delete route 
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/records'))
    .catch(error => console.log(error))
})

module.exports = router