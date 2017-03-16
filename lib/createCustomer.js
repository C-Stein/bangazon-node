'use strict'
const prompt = require('prompt');

const { Database } = require('sqlite3').verbose();

const db = new Database('./db/bangazon.sqlite');

let createCustomer = () => {
  console.log("creating customer")
    prompt.get(['name', 'address', 'city', 'state', 'zipcode', 'phoneNumber'], 
        function (err, result) {

          let query = `INSERT INTO customers VALUES (null, "${result.name}", "${result.address}", "${result.city}", "${result.state}", "${result.zipcode}", "${result.phoneNumber}")`
          console.log("query", query)
          db.run(query, (err) => {
            console.log("insert run!")
            console.log("ERR:", err)
    require('./main.js')()
          })
  });

}



module.exports = { createCustomer}
