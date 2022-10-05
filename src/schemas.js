const modelCustomer = {
  nameFirst: {
    type: "text",
    desc: "first name",
    db_name: "name_first",
    req: true,
  },
  nameLast: {
    type: "text",
    desc: "last name",
    db_name: "name_last",
    req: true,
  },
  address: {
    type: "text",
    desc: "street address",
    db_name: "street_address",
    req: true,
  },
  city: {
    type: "text",
    desc: "city",
    req: true,
  },
  state: {
    type: "text",
    desc: "state",
    db_name: "customer_state",
    req: true,
  },
  zipcode: {
    type: "number",
    desc: "zipcode",
    db_name: "zipcode",
    req: true,
  },
};

function customer() {
  return modelCustomer;
}

function customerTest(custVals) {
  const errors = {};
  Object.keys(modelCustomer).forEach((field) => {
    if (!custVals[field] || custVals[field] === "") {
      errors[field] = `invalid ${modelCustomer[field].desc}`;
    }
    if (
      (field.type == "number" && typeof custVals[field] !== "number") ||
      custVals[field] < 10000
    ) {
      errors[field] = `invalid ${modelCustomer[field].desc}`;
    }
  });
  return errors;
}

function customerSelectedTest(custId) {
  let validity = true;
  if (custId === "" || custId < 0) {
    validity = false;
  }
  return validity;
}

module.exports = {
  customer,
  customerTest,
  customerSelectedTest,
};
