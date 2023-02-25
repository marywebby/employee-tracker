-- this is where you have have the data for the tables 
-- EXAMPLE 
INSERT INTO department (name)
VALUES ("managment");

INSERT INTO department (name)
VALUES ("customer_service");

INSERT INTO department (name)
VALUES ("support_staff"); 

INSERT INTO role (title, salary, department_id)
VALUES ("manager", 100, 1); 

INSERT INTO role (title, salary, department_id)
VALUES ("barista", 75, 2); 

INSERT INTO role (title, salary, department_id)
VALUES ("custodian", 65, 3); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cat", "Beam", 1, null); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mary", "Webby", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Amy", "Larkin", 3, 1); 