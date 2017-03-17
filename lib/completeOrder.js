const prompt = require('prompt');
const { Database } = require('sqlite3').verbose();
const db = new Database('./db/bangazon.sqlite');
const {getOrderItems, deleteItems} = require('./orderItems.js')
const {getActiveCustomer} = require('./activeCustomer')


const completeOrder = () => {
  let customerId = getActiveCustomer().customer_id
  if (!customerId) {
    console.log("Sorry, you have not selected an active user yet")
    require('./main.js')()
    return;
  } else if (getOrderItems().length === 0) {
    console.log("Sorry, you have not added any items to your cart")
    require('./main.js')()
    return;
  } 
  //confirm cart contents <-------------------extra
  console.log(`Hi ${getActiveCustomer().name}! Let's complete your order
  Does this look right?`)
  let total = 0;
  for (let i = 0; i < getOrderItems().length; i++) {
    total += getOrderItems()[i].price
    console.log(`${i + 1}. ${getOrderItems()[i].name}, $${getOrderItems()[i].price}`)
    console.log(`for a total price of $${total}`)
  }
  var property = {
  name: 'yesno',
  message: 'are you sure?',
  validator: /y[es]*|n[o]?/,
  warning: 'Must respond yes or no',
  default: 'no'
  };

  prompt.get(property, (err, result) => {
    if(result.yesno === "n" || result.yesno === "no" ){
      console.log("Oops! Please fix your cart and come back to complete your order")
      require('./main.js')()
      return;
    }

  console.log("what payment option would you like to use?")
  //select payment option
    //list all payment options
  let query = `SELECT * FROM payment_options WHERE customer_id ="${customerId}"`
  db.all(query, (err, rows) => {
    for (var i = 0; i < rows.length; i++) {
      console.log(`${i + 1}. ${rows[i].name}, ${rows[i].account_number}`)
    }

    if (rows.length === 0){
    console.log("Sorry, you cannot complete your order until you add a payment option")
    //add option to add new payment here
    require('./main.js')()
    return;
  }
    prompt.get(['selection'], (err, result) => {
      let paymentOptionId = rows[result.selection - 1].payment_option_id
      console.log("paymentOptionId", paymentOptionId)
      //insert order into db
      let insertQuery = `INSERT INTO orders VALUES (null, "${customerId}", "${paymentOptionId}", 1)`
      let findIdQuery = `SELECT order_id FROM orders`
      db.run(insertQuery, (err) => {
        if(err){console.log("err:", err)}
        else {console.log("order created")}
      })
        .all(findIdQuery, (err, rows) => {
          //console.log("rows", rows)
          //insert into order_line_items
          let orderId = rows[rows.length - 1].order_id
          //console.log("the id I want", orderId)
          for (var i = 0; i < getOrderItems().length; i++) {
            let insertOrderLine = `INSERT INTO order_line_items VALUES (null, "${orderId}", "${getOrderItems()[i].product_id}")`
            db.run(insertOrderLine)
          }
          deleteItems()
          require('./main.js')()
        })
    })
  })
  })
}

module.exports = {completeOrder}
