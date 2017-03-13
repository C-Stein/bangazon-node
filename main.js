#!/usr/bin/env node

//const readlineSync = require('readline-sync');
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const {mainMenu} = require('./mainMenu')
const {createCustomer, listCustomers} = require('./createCustomer')
let shopping = true

//do {

  //var selection //= readlineSync.question(mainMenu());
  let menuSelection = new Promise ((resolve, reject) => {
    mainMenu()
    rl.on('line', (input) => {
    console.log(`Received: ${input}`);
    resolve(input)
    rl.close();
    })
  })

menuSelection.then((input) => {

  let selection = input
    switch (selection) {
      case "1":
        console.log("case 1")
        createCustomer()
        break;
      case "2":
        console.log("case 2")
        listCustomers()
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
})
  console.log("end")


//} while(shopping)