USE employeesDB;

INSERT INTO department (name)
VALUES ("Operations");
INSERT INTO department (name)
VALUES ("Compliance");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Human Resources");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Operations Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Compliance Liason", 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 85000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Hiring Manager", 80000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Attorney", 200000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Scott", "Siegel", 5, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Siegel", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Stan", "Siegel", 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Siegel", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sue", "Gallucci", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jaime", "Wu", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shia", "Lu", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Pooh", "Bear", 1, 7);
