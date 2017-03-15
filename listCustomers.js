const { Database } = require('sqlite3').verbose();

const db = new Database('db/bangazon.sqlite');

let listCustomers = new Promise((resolve, reject) => {
  console.log("finding customers")
  db.all(`SELECT name FROM customers`, (err, rows) => {

    if (err) {
      console.log ("error listing customers", err)
    }
    resolve(rows)
    require("./closeDB")
  })
})

let showCustomers = () => {
  listCustomers.then((rows) => {
    console.log("")
    for (var i = 0; i < rows.length; i++) {
      console.log(`${i + 1}. ${rows[i].name}`)
    }
  })
}

module.exports = { showCustomers }
