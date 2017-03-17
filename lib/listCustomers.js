const prompt = require('prompt');
const {setActiveCustomer} = require('./activeCustomer')
const { Database } = require('sqlite3').verbose();
const { createCustomer} = require('./createCustomer')

const db = new Database('./db/bangazon.sqlite');

let listCustomers = () => { 
  return new Promise((resolve, reject) => {
    db.all(`SELECT name, customer_id FROM customers`, (err, rows) => {
      if (err) {
        console.log ("error listing customers", err)
      }
      resolve(rows)
    })
  })
}

let showCustomers = () => {
  listCustomers().then((rows) => {
    if (rows.length == 0) {
      console.log("no customers to see - please add one now")
      createCustomer()
      return;
    }
    for (var i = 0; i < rows.length; i++) {
      console.log(`${i + 1}. ${rows[i].name}`)
    }

    prompt.get(['customerToActivate'], (err, result) => {
      let customer_id = rows[result.customerToActivate - 1 ].customer_id
      let name = rows[result.customerToActivate - 1 ].name
      console.log("customer_id", customer_id)
      db.get(`SELECT * from customers WHERE customer_id="${customer_id}"`, (err, row) => {
        setActiveCustomer(row)
        console.log(`customer ${result.customerToActivate}, ${name} is now active`)
        require('./main.js')()
      })

    })
  })
}

module.exports = { showCustomers }
