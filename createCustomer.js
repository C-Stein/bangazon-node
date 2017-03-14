'use strict'

const { Database } = require('sqlite3').verbose();

const db = new Database('db/bangazon.sqlite');
const readline = require('readline')
// const readlineSync = require('readline-sync');

let createCustomer = new Promise ((resolve, reject) => {

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

    let name, address, city, state, zipcode, phoneNumber;
    rl.question("What is your name? ", (name) => {
      console.log(`YOUR WROTE ${name}`)
      resolve(name)
      })
    //})
    // let address = rl.question("What is your address? ")
    // let city = rl.question("What is your city? ")
    // let state = rl.question("What is your state? ")
    // let zipcode = rl.question("What is your zipcode? ")
    // let phoneNumber = rl.question("What is your phone number? ")

    let query = `INSERT INTO customers VALUES (null, "${name}")`
    console.log("query", query)
    db.run(query, (err) => {
      console.log("error inserting into db:", err)
    })
    rl.close();
    require("./closeDB")
  })



let listCustomers = () => {
  console.log("finding customers")
  db.all(`SELECT name FROM customers`, (err, rows) => {
    //console.log(rows.length)
    for (var i = 0; i < rows.length; i++) {
      console.log(`${i + 1 }. ${rows[i].name}`)
    }
  require("./closeDB")
  })
}

module.exports = { createCustomer, listCustomers }
