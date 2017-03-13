'use strict'

const { Database } = require('sqlite3').verbose();

const db = new Database('db/bangazon.sqlite');
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// const readlineSync = require('readline-sync');

let createCustomer = () => {
  let name, address, city, state, zipcode, phoneNumber;
  rl.question("What is your name? ", (name) => {
    name = name;
    let query = `INSERT INTO customers VALUES (null, "${name}", "${address}", "${city}", "${state}", "${zipcode}", "${phoneNumber}")`
    console.log("query", query)
    db.run(query, (err) => {
      console.log("error inserting into db:", err)
    })
  })
  // let address = rl.question("What is your address? ")
  // let city = rl.question("What is your city? ")
  // let state = rl.question("What is your state? ")
  // let zipcode = rl.question("What is your zipcode? ")
  // let phoneNumber = rl.question("What is your phone number? ")

  rl.close();
  require("./closeDB")
}

let listCustomers = () => {
  console.log("finding customers")
  db.all(`SELECT name FROM customers`, (err, rows) => {
    console.log(rows)
  })
  require("./closeDB")
}

module.exports = { createCustomer, listCustomers }
