const prompt = require('prompt');
const { Database } = require('sqlite3').verbose();
const db = new Database('./db/bangazon.sqlite');
const {setOrderItems, getOrderItems, deleteItems} = require('./orderItems.js')


let addProducts = () => {
  console.log("What products would you like to add to your order?")
  //list available products, and option to exit sub menu
  let listProducts = () => {
    db.all('SELECT * FROM products', (err, rows) => {
      for (var i = 0; i < rows.length; i++) {
        console.log(`${i + 1}. ${rows[i].name}, $${rows[i].price}`)
      }
      console.log(`${i + 1}. All done! I have added everything I want.`)
      console.log(`${i + 2}. Scrap this! I don't want this stuff.`)
      //prompt user for selection
      prompt.get(["selection"], (err, result) => {
        if (result.selection <= rows.length){
          //save user's selections
          setOrderItems(rows[result.selection - 1])
          listProducts()
        } else if (result.selection == (rows.length + 1)){
          //return to main menu
          console.log("cart saved!")
          require('./main.js')()
        } else if (result.selection == (rows.length + 2)){
          //clear cart and return to main menu
          console.log("cart deleted!")
          deleteItems()
          require('./main.js')()

        }
      })
    })
  }
  listProducts()

}

module.exports = {addProducts}