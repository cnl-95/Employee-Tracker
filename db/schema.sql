
DROP DATABASE IF EXISTS employee_DB;


CREATE DATABASE employee_DB;

USE employee_DB;


CREATE TABLE department(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);


CREATE TABLE role(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL,
    department_id INT,
    CONSTRAINT fk_department FOREIGN KEY (department_id) 
    REFERENCES department(id)
		ON UPDATE CASCADE
        ON DELETE CASCADE,
    PRIMARY KEY(id)
);



CREATE TABLE employee(
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
	CONSTRAINT fk_role FOREIGN KEY (role_id) 
    REFERENCES role(id) 
		ON UPDATE CASCADE 
        ON DELETE CASCADE,
    CONSTRAINT fk_employee FOREIGN KEY (manager_id) 
    REFERENCES employee(id) 
		ON UPDATE CASCADE 
        ON DELETE CASCADE,
    PRIMARY KEY (id)
);

SELECT * FROM role;

SELECT * FROM department;

SELECT * FROM employee;