const express = require("express");
const bodyParser = require("body-parser");
const packageJson = require("../package.json");
const schemas = require("./schemas");
const database = require("./database");

const app = express();
const port = 8080;

// Location of HTML static files generated by NextJS
app.use(express.static("out"));

(async () => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// List customers
app.get("/customers", async (req, res) => {
  const results = await database.customersList();
  res.setHeader("Content-Type", "application/json");
  if (results.rows) {
    res.status(200);
    res.send(results.rows);
  } else {
    res.status(500);
    res.send({ err: "Problem getting customers" });
  }
});

// Server status
app.get("/status", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  const version = packageJson.version;
  const name = packageJson.name;
  const description = packageJson.description;
  res.send({
    name,
    version,
    description,
    utcTime: new Date().getTime(),
  });
});

// Add customer to database
app.post("/customer-add", async (req, res) => {
  let status = 200;
  let results = { msg: "Error adding customer to the database" };
  const validated = schemas.customerTest(req.body);
  if (Object.keys(validated).length === 0) {
    try {
      const result = await database.customerAdd(req.body);
      results = { msg: "Successfully added customer" };
    } catch (err) {
      console.error("Error adding customer into the database", err);
      status = 500;
    }
  }
  res.setHeader("Content-Type", "application/json");
  res.status(status);
  res.send(results);
});

// Update existing customer
app.post("/customer-update", async (req, res) => {
  let status = 200;
  let results = { msg: "Error updating customer in the database" };
  const validated = schemas.customerTest(req.body);
  const selected = schemas.customerSelectedTest(req.body.customerSelected);
  if (Object.keys(validated).length === 0 && selected) {
    try {
      const result = await database.customerUpdate(req.body);
      results = { msg: "Successfully updated customer" };
    } catch (err) {
      console.error("Error updating customer in the database", err);
      status = 500;
    }
  }
  res.setHeader("Content-Type", "application/json");
  res.status(status);
  res.send(results);
});

// Delete customer from database
app.post("/customer-delete", async (req, res) => {
  let status = 200;
  let results = { msg: "Error deleting customer from the database" };
  const validated = schemas.customerSelectedTest(req.body);
  if (validated) {
    try {
      const result = await database.customerDelete(req.body.customerSelected);
      results = { msg: "Successfully deleted customer" };
    } catch (err) {
      console.error("Error deleting customer from database", err);
      status = 500;
    }
  }
  res.setHeader("Content-Type", "application/json");
  res.status(status);
  res.send(results);
});
