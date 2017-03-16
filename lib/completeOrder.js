const prompt = require('prompt');
const { Database } = require('sqlite3').verbose();
const db = new Database('./db/bangazon.sqlite');
const {getOrderItems} = require('./orderItems.js')
const {getActiveCustomer} = require('./activeCustomer')


const completeOrder = () => {
  let customerId = getActiveCustomer().customer_id
  console.log("customerID", customerId)
  if (!customerId) {
    console.log("SOrry, you have not selected an active user yet")
    require('./main.js')()
    return;
  } else if (getOrderItems.length === 0) {
    console.log("Sorry, you have not added any items to your cart")
    require('./main.js')()
    return;
  }
  console.log("ready to complete order")
  //confirm cart contents <-------------------extra
  //select payment option
    //list all payment options
  let query = `SELECT * FROM payment_options WHERE customer_id ="${customerId}"`
  db.all(query, (err, rows) => {
    for (var i = 0; i < rows.length; i++) {
      console.log(`${i + 1}. ${rows[i].name}, $${rows[i].account_number}`)
    }
    prompt.get(['selection'], (err, result) => {
      //insert into db
      require('./main.js')()
    })
  })
}

module.exports = {completeOrder}
