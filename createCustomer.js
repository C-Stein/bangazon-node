'use strict'

const { Database } = require('sqlite3').verbose();

const db = new Database('db/bangazon.sqlite');

const readlineSync = require('readline-sync');

let createCustomer = () => {
  let name = readlineSync.question("What is your name? ")
  let address = readlineSync.question("What is your address? ")
  let city = readlineSync.question("What is your city? ")
  let state = readlineSync.question("What is your state? ")
  let zipcode = readlineSync.question("What is your zipcode? ")
  let phoneNumber = readlineSync.question("What is your phone number? ")

  let query = `INSERT INTO customers VALUES (null, "${name}", "${address}", "${city}", "${state}", "${zipcode}", "${phoneNumber}")`
  console.log("query", query)
  db.run(query, (err) => {
    console.log("insert run!")
    console.log("ERR:", err)
  })

  require("./closeDB")
}

let listCustomers = () => {
  console.log("finding customers")
  db.all(`SELECT name FROM customers`, (err, rows) => {
    for (var i = 0; i < rows.length; i++) {
      console.log(`${i + 1}. ${rows[i].name}`)
    }
    if (err) {
      console.log ("error listing customers", err)
    }
  })
  require("./closeDB")
}

module.exports = { createCustomer, listCustomers }
