USE employee_DB;

INSERT INTO department(name)
VALUES ("Engineering"), ("Sales"), ("Finance"), ("Marketing"), ("Human Resource Management"), ("Legal");

INSERT INTO role(title, salary, department_id)
VALUES ("Influencer", 80000, 1), 
	("Software Engineer", 65000, 1), 
	("Doctor",75000,1),
	("Artist",50000, 2),
	("Manager", 60000,2),
	("Bank Teller", 55000, 3),
	("Cook", 50000, 3),
	("Account Manager",75000, 4),
	("Intern", 75000, 5),
	("Graphic Designer", 65000, 6),
	("Content Creator", 70000, 6)
    ;
    
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Blair", "Waldorf", 3, NULL),
	("Wednesday", "Addams", 1, 1),
	("John", "Smith", 2, 1),
	("Randy", "Savage", 5, NULL),
	("Sen", "Tenz", 4, 4),
	("George","Bush",7, NULL),
	("Chistina","Ricci", 11, NULL),
	("Sailor", "Moon",10, 7)
    ;