#!/usr/bin/env node

const prompt = require('prompt');
const {mainMenu} = require('./mainMenu')
const {createCustomer} = require('./createCustomer')
const {showCustomers} = require('./listCustomers')
const {createPaymentOption} = require('./createPayment')

let shopping = () => {
  mainMenu()
  prompt.get(['selection'], function (err, result) {
  let selection = result.selection

    switch (selection) {
      case "1"://Create a customer account
        console.log("case 1")
        createCustomer()
        break;
      case "2"://Choose active customer
        console.log("case 2")
        showCustomers()
        break;
      case "3": //create a payment option
        console.log("case 3")
        createPaymentOption();
        break;
      case "4"://Add product to shopping cart
        console.log("case 4")
        break;
      case "5"://Complete an order
        console.log("case 5")
        break;
      case "6"://See product popularity
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