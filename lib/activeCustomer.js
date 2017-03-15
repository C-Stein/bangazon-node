let activeCustomer = {}

const getActiveCustomer = () => {
  return activeCustomer;
}

const setActiveCustomer = (newActiveCustomer) => {
  activeCustomer = newActiveCustomer;
}

module.exports = { getActiveCustomer, setActiveCustomer}