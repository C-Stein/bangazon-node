const prompt = require('prompt');
const {setActiveCustomer} = require('./activeCustomer')
const { Database } = require('sqlite3').verbose();
const db = new Database('./db/bangazon.sqlite');


let createPaymentOption = () => {
  console.log("let's create a payment option")
  prompt.get(['accountType', 'accountNumber'], (err, result) => {
    db.get(`INSERT INTO payment_options VALUES (null, "${result.accountType}", "${result.accountType}")`, (err, row) => {
      console.log("active customer", row)
      setActiveCustomer(row)
    })
  console.log(`customer ${result.customerToActivate}, ${name} is now active`)

})
}

module.exports = {createPaymentOption}