'use strict'

const mainMenu = function(){
  let menu = "  ***********************************************************"
      menu += "\n    Welcome to Bangazon! Command Line Ordering System"
      menu += "\n  ***********************************************************" 
      menu += "\n  1. Create a customer account"
      menu += "\n  2. Choose active customer"
      menu += "\n  3. Create a payment option"
      menu += "\n  4. Add product to shopping cart"
      menu += "\n  5. Complete an order"
      menu += "\n  6. See product popularity"
      menu += "\n  7. Leave Bangazon!"
      menu += "\n  >"
  console.log(menu)
}

// console.log("mainMenu from menu", mainMenu)
module.exports = { mainMenu }