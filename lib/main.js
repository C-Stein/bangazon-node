#!/usr/bin/env node

const prompt = require('prompt');
const {mainMenu} = require('./mainMenu')
const {createCustomer} = require('./createCustomer')
const {showCustomers} = require('./listCustomers')
const {createPaymentOption} = require('./createPayment')
const {addProducts} = require('./addProducts')
const {completeOrder} = require('./completeOrder')

let shopping = () => {
  mainMenu()
  prompt.get(['selection'], function (err, result) {
  let selection = result.selection

    switch (selection) {
      case "1"://Create a customer account
        createCustomer()
        break;
      case "2"://Choose active customer
        showCustomers()
        break;
      case "3": //create a payment option
        createPaymentOption();
        break;
      case "4"://Add product to shopping cart
        addProducts()
        break;
      case "5"://Complete an order
        completeOrder()
        break;
      case "6"://See product popularity
        console.log("case 6")
        break;
      case "7":
        shopping = false
        break;

    }
  });
}

shopping()

module.exports = shopping