function totalAmount(array) {
  let totalAmount = 0
  array.forEach(element => {
    totalAmount += element.amount
  })
  return totalAmount
}

module.exports = totalAmount