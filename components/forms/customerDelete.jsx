import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import schemas from "../../src/schemas";
import formUtils, { stateAbbrev } from "../../utils/formUtils";

export default function CustomerDelete() {
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
          const errors = {};
          if (values.customerSelected === "" || values.customerSelected < 0) {
            errors.customerSelected = "Please select a customer";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("values", values);
          const res = await axios.post(
            "http://localhost:8080/customer-delete",
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
                setFieldValue("customerSelected", value.target.value);
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
