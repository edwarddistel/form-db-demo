import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import schemas from "../../src/schemas";
import formUtils, { stateAbbrev } from "../../utils/formUtils";

export default function CustomerList() {
  const [customers, setCustomers] = useState(0);

  useEffect(() => {
    formUtils.getCustomers().then((data) => {
      setCustomers(data);
    });
  }, []);

  return (
    <div className>
      <Formik
        initialValues={{
          customerSelected: "",
          nameFirst: "",
          nameLast: "",
          address: "",
          city: "",
          state: "",
          zipcode: "",
        }}
        validate={(values) => {
          const errors = schemas.customerTest(values);
          if (values.customerSelected === "" || values.customerSelected < 0) {
            errors.customerSelected = "Please select a customer";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("values", values);
          const res = await axios.post(
            "http://localhost:8080/customer-update",
            values
          );
          console.log("res", res);
          alert(res.data.msg);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <select
              id="customerSelected"
              name="customerSelected"
              onChange={(value) => {
                formUtils.updateCustomer(
                  value.target.value,
                  customers,
                  setFieldValue
                );
              }}
            >
              <option selected value="">
                Select a customer
              </option>
              {customers &&
                Object.values(customers).map((customer) => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.name_first} {customer.name_last}
                    </option>
                  );
                })}
            </select>
            {errors.customerSelected &&
              touched.customerSelected &&
              errors.customerSelected}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    for="nameFirst"
                  >
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                    id="nameFirst"
                    name="nameFirst"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.nameFirst && touched.nameFirst && errors.nameFirst}
                </div>
                <div className="md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    for="nameLast"
                  >
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    id="nameLast"
                    name="nameLast"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.nameLast && touched.nameLast && errors.nameLast}
                </div>
              </div>
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    for="address"
                  >
                    Address
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                    id="address"
                    name="address"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address && touched.address && errors.address}
                </div>
              </div>
              <div className="-mx-3 md:flex mb-2">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    for="city"
                  >
                    City
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    id="city"
                    name="city"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.city && touched.city && errors.city}
                </div>
                <div className="md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    for="state"
                  >
                    State
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                      id="state"
                      name="state"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value=""></option>
                      {stateAbbrev &&
                        stateAbbrev().map((stateAb, i) => {
                          return (
                            <option key={i} value={stateAb}>
                              {stateAb}
                            </option>
                          );
                        })}
                    </select>
                    {errors.state && touched.state && errors.state}
                    <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    for="zipcode"
                  >
                    Zip
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    id="zipcode"
                    name="zipcode"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.zipcode && touched.zipcode && errors.zipcode}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
