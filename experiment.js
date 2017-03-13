'use strict'

const { Database } = require('sqlite3').verbose();

const db = new Database('db/bangazon.sqlite');

//const readlineSync = require('readline-sync');

let createCustomer = () => {
  // let name = readlineSync.question("What is your name? ")
  // let address = readlineSync.question("What is your address? ")
  // let city = readlineSync.question("What is your city? ")
  // let state = readlineSync.question("What is your state? ")
  // let zipcode = readlineSync.question("What is your zipcode? ")
  // let phoneNumber = readlineSync.question("What is your phone number? ")
  console.log("before query")
  let query = `INSERT INTO customers VALUES (null, "experiment", "experiment", "experiment", "experiment", "experiment", "experiment")`
  db.run(query, (err) => {
    console.log("query run!", query)
    if(err){
      console.log("error inserting into db", err)
    }

  })
  console.log("typeof dbInsert", typeof dbInsert)

  require("./closeDB")
}

let listCustomers = () => {
  console.log("finding customers")
  db.all(`SELECT name FROM customers`, (err, rows) => {
    console.log(rows)
    console.log ("error querying customers", err)
  })
  require("./closeDB")
}

console.log("before crreate custmer")
createCustomer()
console.log("between functions")
listCustomers()
console.log("after list customers")
