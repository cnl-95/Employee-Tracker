USE employee_DB;

INSERT INTO department(name)
VALUES ("Engineering"), ("Sales"), ("Finance"), ("Marketing"), ("Human Resource Management"), ("Legal");

INSERT INTO role(title, salary, department_id)
VALUES ("Software Engineer", 80000, 1), 
	("Photographer", 65000, 1), 
	("Librarian",75000,1),
	("Professional athlete",50000, 2),
	("Statistician", 60000,2),
	("Market Research Analyst", 55000, 3),
	("Actor", 50000, 3),
	("Electrical Engineer",75000, 4),
	("Urban Planner", 75000, 5),
	("Landscape Architect", 65000, 6),
	("Massage Therapist", 70000, 6)
    ;
    
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Elise", "Huffman", 3, NULL),
	("Musab", "Boyer", 1, 1),
	("Zayne", "Wharton", 2, 1),
	("Isadora", "Myers", 5, NULL),
	("Sherry", "Hess", 4, 4),
	("Dominick","Lopez",7, NULL),
	("Kairon","Hogan", 11, NULL),
	("Carole", "Ware",10, 7)
    ;

