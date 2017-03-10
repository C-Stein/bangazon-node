'use strict'

const readlineSync = require('readline-sync');

let createCustomer = () => {
  let name = readlineSync.question("What is your name? ")
  let address = readlineSync.question("What is your address? ")
  let city = readlineSync.question("What is your city? ")
  let state = readlineSync.question("What is your state? ")
  let zipcode = readlineSync.question("What is your zipcode? ")
  let phoneNumber = readlineSync.question("What is your phone number? ")
}

module.exports = { createCustomer }