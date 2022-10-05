require("dotenv").config();
const { Pool } = require("pg");

// Database credentials
const credentials = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};

// Connect to database via pool
const pool = new Pool(credentials);
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
(async () => {
  await pool.connect();
})();

// List all customers
async function customersList() {
  const client = await pool.connect();
  try {
    return await client.query("SELECT * FROM customers");
  } catch (err) {
    console.error(err.stack);
    throw new Error("Failed to query customers from database");
  } finally {
    client.release();
  }
}

// Add customer to database using transaction
async function customerAdd(customerData) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText =
      "INSERT INTO customers (name_first, name_last, street_address, city, cust_state, zipcode) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING";
    const res = await client.query(queryText, [
      customerData.nameFirst,
      customerData.nameLast,
      customerData.address,
      customerData.city,
      customerData.state,
      customerData.zipcode,
    ]);
    await client.query("COMMIT");
    return "";
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

// Update customer in the database
async function customerUpdate(customerData) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `UPDATE customers
       SET name_first = $1, 
        name_last = $2, 
        street_address = $3, 
        city = $4, 
        cust_state = $5, 
        zipcode = $6
       WHERE id = $7`;
    const res = await client.query(queryText, [
      customerData.nameFirst,
      customerData.nameLast,
      customerData.address,
      customerData.city,
      customerData.state,
      customerData.zipcode,
      customerData.customerSelected,
    ]);
    await client.query("COMMIT");
    return "";
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

// Delete customer from the database using transaction
async function customerDelete(id) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = "DELETE FROM customers WHERE id = $1";
    const res = await client.query(queryText, [id]);
    await client.query("COMMIT");
    return "";
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

module.exports = {
  customersList,
  customerAdd,
  customerUpdate,
  customerDelete,
};
