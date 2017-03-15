#!/usr/bin/env node

const prompt = require('prompt');
const {mainMenu} = require('./mainMenu')
const {createCustomer} = require('./createCustomer')
const {showCustomers} = require('./listCustomers')

let shopping = () => {
  mainMenu()
  prompt.get(['selection'], function (err, result) {
  let selection = result.selection

    switch (selection) {
      case "1":
        console.log("case 1")
        createCustomer()
        break;
      case "2":
        console.log("case 2")
        showCustomers()
        break;
      case "3":
        console.log("case 3")
        break;
      case "4":
        console.log("case 4")
        break;
      case "5":
        console.log("case 5")
        break;
      case "6":
        console.log("case 6")
        break;
      case "7":
        console.log("case 7")
        shopping = false
        break;

    }
  });
}

shopping()

module.exports = { shopping }