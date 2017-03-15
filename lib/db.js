'use strict'

const { Database } = require('sqlite3').verbose();

const db = new Database('./db/bangazon.sqlite');

const errorHandler = (err) => {
  if (err) { // If there is an error obj, it will be console logged
    console.log(`Msg: ${err}`);
  };
};

const createTables = () => {
  db.run("CREATE TABLE IF NOT EXISTS customers (customer_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, city TEXT, state TEXT, zip TEXT, phone TEXT)", 
        errorHandler());

  db.run("CREATE TABLE IF NOT EXISTS payment_options (payment_option_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, account_number TEXT)", 
        errorHandler());

  db.run("CREATE TABLE IF NOT EXISTS orders (order_id INT, customer_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, payment_option_id INT, paid_in_full INT)", 
        errorHandler());

  db.run("CREATE TABLE IF NOT EXISTS products (product_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, price NUMERIC)", 
        errorHandler());

  db.run("CREATE TABLE IF NOT EXISTS order_line_items (lineitem_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, order_id INT, product_id INT)",
        errorHandler());
}

const dropTables = () => {
  db.run(`DELETE FROM order_line_items`)
    .run(`DELETE FROM products`)
    .run(`DELETE FROM orders`)
    .run(`DELETE FROM payment_options`)
    .run(`DELETE FROM customers`)
    .run(`DROP TABLE customers`)
    .run(`DROP TABLE payment_options`)
    .run(`DROP TABLE orders`)
    .run(`DROP TABLE products`)
    .run(`DROP TABLE order_line_items`)
}

//dropTables()
createTables()

require("./closeDB")
// db.close(err => {
//   errorHandler(err); // Use custom error handling function
//   console.log('Database closed'); // Will only log on successful close
// })