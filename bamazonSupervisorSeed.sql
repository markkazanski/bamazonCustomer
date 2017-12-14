USE bamazon;

CREATE TABLE departments(
    dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(20),
    over_head_costs DECIMAL(13, 2)
);

INSERT INTO departments (dept_name , over_head_costs) 
VALUES ("Kitchen", 200);

INSERT INTO departments (dept_name , over_head_costs) 
VALUES ("Electronics", 500);

INSERT INTO departments (dept_name , over_head_costs) 
VALUES ("Car", 2000);

INSERT INTO departments (dept_name , over_head_costs) 
VALUES ("Bathroom", 50);