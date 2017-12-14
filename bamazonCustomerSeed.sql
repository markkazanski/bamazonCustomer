DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(20),
    department_name VARCHAR(20),
    price DECIMAL(13, 2),
    stock_quantity INTEGER(10),
    product_sales DECIMAL(13, 2) DEFAULT 0
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("ASUS Laptop", "Electronics", 999.98, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Logitech Mouse", "Electronics", 24.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Blender", "Kitchen", 49.88, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Big Sharp Knife", "Kitchen", 39.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Toyota Corolla", "Car", 105000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Toothbrush", "Bathroom", 5, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Plunger", "Bathroom", 25, 1);
