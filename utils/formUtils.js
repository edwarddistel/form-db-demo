const axios = require("axios");
const schemas = require("../src/schemas");

function stateAbbrev() {
  return [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
}

async function getCustomers() {
  const results = await axios.get("http://localhost:8080/customers");
  return results.data
    ? results.data.sort(function (a, b) {
        return a.id - b.id;
      })
    : {};
}

function updateCustomer(custId, custList, updateVal) {
  const customerModel = schemas.customer();
  const cid = custId - 1;
  const customer = {
    customerSelected: custId,
    nameFirst: custList[cid].name_first,
    nameLast: custList[cid].name_last,
    address: custList[cid].street_address,
    city: custList[cid].city,
    state: custList[cid].cust_state,
    zipcode: custList[cid].zipcode,
  };
  Object.keys(customerModel).forEach((field) => {
    document.getElementById(field).value = customer[field];
    updateVal(field, customer[field]);
  });
  updateVal("customerSelected", custId);
}

module.exports = {
  getCustomers,
  stateAbbrev,
  updateCustomer,
};
