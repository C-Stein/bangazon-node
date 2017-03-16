const prompt = require('prompt');
const {getActiveCustomer} = require('./activeCustomer')
const { Database } = require('sqlite3').verbose();
const db = new Database('./db/bangazon.sqlite');


let createPaymentOption = () => {
  let customerId = getActiveCustomer().customer_id
  if (!customerId) {
    console.log("sorry, you have to select an active user first")
    require('./main.js')()
    return;
  }
  console.log("customerId", customerId)
  prompt.get(['accountType', 'accountNumber'], (err, result) => {
    db.run(`INSERT INTO payment_options VALUES (null, "${result.accountType}", "${result.accountType}", "${customerId}")`, (err) => {
      console.log("payment added")
      require('./main.js')()
    })
  //console.log(`customer ${result.customerToActivate}, ${name} is now active`)

})
}

module.exports = {createPaymentOption}