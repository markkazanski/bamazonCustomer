DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(20),
    department_name VARCHAR(20),
    price DECIMAL(13, 2),
    stock_quantity INTEGER(10)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("ASUS Laptop", "Electronics", 999.98, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Monkey", "Zoo", 123456789.01, 999);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Toaster", "Kitchen", 24.99, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Leather Couch", "Furniture", 199.201, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Toyota Corolla", "Car", 10500.84, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Unicorn", "Fantasy", 99999999999.99, 0);
