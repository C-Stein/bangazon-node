const prompt = require('prompt');
const { Database } = require('sqlite3').verbose();
const db = new Database('./db/bangazon.sqlite');
const {setOrderItems, getOrderItems} = require('./orderItems.js')


let addProducts = () => {
  console.log("What products would you like to add to your order?")
  //list available products, and option to exit sub menu
  let listProducts = () => {
    db.all('SELECT * FROM products', (err, rows) => {
      for (var i = 0; i < rows.length; i++) {
        console.log(`${i + 1}. ${rows[i].name}, $${rows[i].price}`)
      }
      console.log(`${i + 2}. All done! I have added everything I want.`)
      console.log(`${i + 3}. Scrap this! I don't want this stuff.`)
      //prompt user for selection
      prompt.get(["selection"], (err, result) => {
        console.log("result.selection", result.selection)
        console.log("rows[result.selection - 1]", rows[result.selection - 1])
        setOrderItems(rows[result.selection - 1])
      })
    })
  }
  listProducts()
  //save user's selections

}

module.exports = {addProducts}