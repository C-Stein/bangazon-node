let orderItems = [];

let setOrderItems = (newOrderItem) => {
  orderItems.push(newOrderItem)
  console.log(`${newOrderItem.name} added to cart`)
}

let getOrderItems = () => {
  return orderItems
}

let deleteItems = () => {
  orderItems  = []
}

module.exports = {setOrderItems, getOrderItems, deleteItems}