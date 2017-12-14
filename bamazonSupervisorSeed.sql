USE bamazon;

CREATE TABLE departments(
    dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(20),
    over_head_costs DECIMAL(13, 2)
);