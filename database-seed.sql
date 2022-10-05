CREATE TABLE customers
(
    id SERIAL PRIMARY KEY,
    name_first TEXT,
    name_last TEXT,
    street_address TEXT,
    city TEXT,
    cust_state TEXT,
    zipcode INTEGER

);

INSERT INTO customers(name_first, name_last, street_address, city, cust_state, zipcode) VALUES
('Edward','Distel', '123 Main St', 'New York', 'NY', 10005),
('Cronus', 'Bolognus', '456 Cat Avenue', 'Beverly Hills', 'CA', 90210),
('Athena', 'Thelab', '789 Dog Lane', 'Portland', 'OR', 97035);