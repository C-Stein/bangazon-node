const prompt = require('prompt');
const {setActiveCustomer} = require('./activeCustomer')
const { Database } = require('sqlite3').verbose();

const db = new Database('./db/bangazon.sqlite');

let listCustomers = new Promise((resolve, reject) => {
  //console.log("finding customers")
  db.all(`SELECT name FROM customers`, (err, rows) => {

    if (err) {
      console.log ("error listing customers", err)
    }
    resolve(rows)
  })
})

let showCustomers = () => {
  listCustomers.then((rows) => {
    console.log("")
    if (rows.length == 0) {
      console.log("looks like there aren't any customers  yet!")
    }
    for (var i = 0; i < rows.length; i++) {
      console.log(`${i + 1}. ${rows[i].name}`)
    }

    prompt.get(['customerToActivate'], (err, result) => {
      let name = rows[result.customerToActivate - 1 ].name
      db.get(`SELECT * from customers WHERE name="${name}"`, (err, row) => {
        console.log("active customer", row)
        setActiveCustomer(row)
      })
      console.log(`customer ${result.customerToActivate}, ${name} is now active`)

    })
  })
}

module.exports = { showCustomers }
