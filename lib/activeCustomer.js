let activeCustomer = {}

const getActiveCustomer = () => {
  return activeCustomer;
}

const setActiveCustomer = (newActiveCustomer) => {
  console.log("setting active customer")
  activeCustomer = newActiveCustomer;
}

module.exports = { getActiveCustomer, setActiveCustomer}