import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import formUtils from "../../utils/formUtils";

export default function CustomerList() {
  const [customers, setCustomers] = useState(0);

  useEffect(() => {
    formUtils.getCustomers().then((data) => {
      setCustomers(data);
    });
  }, []);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      {console.log(customers)}
      {customers &&
        Object.values(customers).map((customer) => {
          return (
            <p className="mb-5 font-mono" key={customer.id}>
              <strong>id: </strong> {customer.id}
              <br />
              <strong>name: </strong> {customer.name_first} {customer.name_last}
              <br />
              <strong>address: </strong> {customer.street_address}
              <br />
              <strong>city: </strong> {customer.city}
              <br />
              <strong>state: </strong> {customer.cust_state}
              <br />
              <strong>zipcode: </strong> {customer.zipcode}
              <br />
            </p>
          );
        })}
    </div>
  );
}
