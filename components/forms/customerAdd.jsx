import React from "react";
import { Formik } from "formik";
import axios from "axios";
import schemas from "../../src/schemas";
import { stateAbbrev } from "../../utils/formUtils";

export default function CustomerAdd() {
  return (
    <div className>
      <Formik
        initialValues={{
          nameFirst: "",
          nameLast: "",
          address: "",
          city: "",
          state: "",
          zipcode: "",
        }}
        validate={(values) => {
          const errors = schemas.customerTest(values);
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("values", values);
          const res = await axios.post(
            "http://localhost:8080/customer-add",
            values
          );
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
        }) => (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
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
                    placeholder="John"
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
                    placeholder="Doe"
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
                    placeholder="123 Main St"
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
                    placeholder="Albuquerque"
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
                    placeholder="90210"
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
