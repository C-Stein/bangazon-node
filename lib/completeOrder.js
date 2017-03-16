const prompt = require('prompt');
const { Database } = require('sqlite3').verbose();
const db = new Database('./db/bangazon.sqlite');
const {getOrderItems} = require('./orderItems.js')
const {getActiveCustomer} = require('./activeCustomer')


const completeOrder = () => {
  let customerId = getActiveCustomer().customer_id
  console.log("customerID", customerId)
  if (!customerId) {
    console.log("Sorry, you have not selected an active user yet")
    require('./main.js')()
    return;
  } else if (getOrderItems().length === 0) {
    console.log("Sorry, you have not added any items to your cart")
    require('./main.js')()
    return;
  }
  console.log(`Hi ${getActiveCustomer().name}! Let's complete your order`)
  console.log("what payment option would you like to use?")
  //confirm cart contents <-------------------extra
  //select payment option
    //list all payment options
  let query = `SELECT * FROM payment_options WHERE customer_id ="${customerId}"`
  db.all(query, (err, rows) => {
    for (var i = 0; i < rows.length; i++) {
      console.log(`${i + 1}. ${rows[i].name}, ${rows[i].account_number}`)
    }
    //add option to add new payment here
    prompt.get(['selection'], (err, result) => {
      let paymentOptionId = rows[result.selection - 1].payment_option_id
      console.log("paymentOptionId", paymentOptionId)
      //insert order into db
      let insertQuery = `INSERT INTO orders VALUES (null, "${customerId}", "${paymentOptionId}", -1)`
      let findIdQuery = `SELECT order_id FROM orders`
      db.run(insertQuery, (err) => {
        if(err){console.log("err:", err)}
        else {console.log("order created")}
      })
        .all(findIdQuery, (err, rows) => {
          //console.log("rows", rows)
          let orderId = rows[rows.length - 1].order_id
          //console.log("the id I want", orderId)
          for (var i = 0; i < getOrderItems().length; i++) {
            let insertOrderLine = `INSERT INTO order_line_items VALUES (null, "${orderId}", "${getOrderItems()[i].product_id}")`
            db.run(insertOrderLine)
          }
          require('./main.js')()
        })
      //insert into order_line_items
    })
  })
}

module.exports = {completeOrder}
