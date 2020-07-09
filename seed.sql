DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
 title VARCHAR(30) NOT NULL,
 salary DECIMAL(8,2),
 department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
 first_name VARCHAR(30) NOT NULL,
 last_name VARCHAR(30) NOT NULL,
 role_id INT NOT NULL,
 manager_id INT,
  PRIMARY KEY (id)
);


INSERT INTO department(name)
VALUES ("design");

INSERT INTO department(name)
VALUES ("engineering");

INSERT INTO department(name)
VALUES ("HR");

INSERT INTO employee(first_name, last_name, role_id)
VALUES ("Jane", "Smith", 1);

INSERT INTO employee(first_name, last_name, role_id)
VALUES ("Christina", "Salehi", 1);

INSERT INTO employee(first_name, last_name, role_id)
VALUES ("Sandeep", "Vandel", 2);

INSERT INTO role(title, salary, department_id)
VALUES ("engineer", 120000.00, 2);

INSERT INTO role(title, salary, department_id)
VALUES ("architect", 100000.00, 1);

INSERT INTO role(title, salary, department_id)
VALUES ("human resources", 100000.00, 3);

INSERT INTO role(title, salary, department_id)
VALUES ("interior designer", 90000.00, 1);

-- view all departments
SELECT * FROM department;

-- view all employees
SELECT * FROM employee;

-- view all roles
SELECT * FROM role;

SELECT  role.id, department_id, title, salary
FROM role INNER JOIN department 
ON (role.department_id = department.id);