"use strict";

const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const prompts = require("./prompts");
const db = require("./db");
require("console.table");


async function viewAllEmployees() {
	
	
	const empData = await db.viewAllEmployees();

	console.log("\n");

	
	console.table(empData);

	
	mainPrompt();
}


async function viewAllEmployeesByManager() {

	
	const empData = await db.viewAllEmployeesByManager();

	console.log("\n");
	console.table(empData);

	mainPrompt();
}


async function viewAllRoles() {

	
	const roles = await db.viewAllRoles();

	console.log("\n");
	console.table(roles);

	mainPrompt();
}


async function viewAllDepartments() {

	
	const departments = await db.viewAllDepartments();

	console.log("\n");
	console.table(departments);

	mainPrompt();
}


async function viewEmployeesByDepartment() {

	
	const emp = await db.viewEmployeesByDepartment();

	console.log("\n");
	console.table(emp);

	mainPrompt();
}


async function addEmployee() {

	
	const rolesResult = await db.getRoles();

	
	let roleNames = [];
	for (let i = 0; i < rolesResult.length; i++) {
		roleNames.push(rolesResult[i].title);
	}

	
	const employeeResult = await db.getEmployees();

	
	let employeeNames = [];
	for (let i = 0; i < employeeResult.length; i++) {
		employeeNames.push(
			employeeResult[i].first_name + " " + employeeResult[i].last_name
		);
	}

	
	prompts.addEmployee.push({
		type: "list",
		name: "roleName",
		message: "What is role ?",
		choices: roleNames,
	});

	 
	prompts.addEmployee.push({
		type: "list",
		name: "managerName",
		message: "What is manager name ?",
		choices: employeeNames,
	});

	
	const {	firstName, lastName, roleName, managerName } = await inquirer.prompt(prompts.addEmployee);

	
	const managerFirstName = managerName.split(" ")[0];
	const managerLastName = managerName.split(" ")[1];

	
	const roleId = rolesResult.filter((role) => role.title === roleName)[0].id;
	
	 
	const managerId = employeeResult.filter(
		(employee) =>
			employee.first_name === managerFirstName &&
			employee.last_name === managerLastName
	)[0].id;

	
	const addEmployeeResult = await db.addEmployee( firstName, lastName, roleId, managerId );

	viewAllEmployees();
}


async function addDepartment() {

	
	const { deptName } = await inquirer.prompt(prompts.addDepartment);

	
	const result = await db.addDepartment(deptName);

	viewAllDepartments();
}



async function addRole() {

	
	const departmentsResult = await db.getDepartments();

	
	let departments = [];
	for (let i = 0; i < departmentsResult.length; i++) {
		departments.push(departmentsResult[i].name);
	}

	
	prompts.addRole.push({
		type: "list",
		name: "departmentName",
		message: "What is role's department Name ?",
		choices: departments,
	});

	
	const { roleTitle, roleSalary, departmentName } = await inquirer.prompt(prompts.addRole);

	
	const departmentId = departmentsResult.filter((res) => res.name === departmentName)[0].id;
	
	
	const addRoleResult = await db.addRole( roleTitle, roleSalary, departmentId);

	viewAllRoles();
}


async function updateEmployeeRole() {

	
	const rolesResult = await db.getRoles();

	
	let roleNames = [];
	for (let i = 0; i < rolesResult.length; i++) {
		roleNames.push(rolesResult[i].title);
	}

	
	const employeeResult = await db.getEmployees();

	
	let employeeNames = [];
	for (let i = 0; i < employeeResult.length; i++) {
		employeeNames.push(
			employeeResult[i].first_name + " " + employeeResult[i].last_name
		);
	}

	let updateEmpRole = [];

	
	updateEmpRole.push({
		type: "list",
		name: "empName",
		message: "Which employee's role to update?",
		choices: employeeNames,
	});

	
	updateEmpRole.push({
		type: "list",
		name: "roleName",
		message: "Which role to update for current employee?",
		choices: roleNames,
	});

	
	const { empName, roleName } = await inquirer.prompt(updateEmpRole);

	
	const empFirstName = empName.split(" ")[0];
	const empLastName = empName.split(" ")[1];

	
	const empId = employeeResult.filter(
		(employee) =>
			employee.first_name === empFirstName &&
			employee.last_name === empLastName
	)[0].id;

	
	const roleId = rolesResult.filter((role) => role.title === roleName)[0].id;

	
	const updateRoleResult = await db.updateEmployeeRole(empId, roleId);

	viewAllEmployees();
}


async function updateEmployeeManager() {
	
	
	const employeeResult = await db.getEmployees();

	
	let employeeNames = [];
	for (let i = 0; i < employeeResult.length; i++) {
		employeeNames.push(
			employeeResult[i].first_name + " " + employeeResult[i].last_name
		);
	}

	
	let updateEmpManager = [];

	
	updateEmpManager.push({
		type: "list",
		name: "empName",
		message: "Which employee's manager to update?",
		choices: employeeNames,
	});

	
	const { empName } = await inquirer.prompt(updateEmpManager);

	
	const empNames = employeeNames.filter((employee) => employee !== empName);

	
	updateEmpManager.push({
		type: "list",
		name: "managerName",
		message: "Who is employee's new manager?",
		choices: empNames,
	});

	
	const { managerName } = await inquirer.prompt(updateEmpManager[1]);

	
	const empFirstName = empName.split(" ")[0];
	const empLastName = empName.split(" ")[1];

	
	const managerFirstName = managerName.split(" ")[0];
	const managerLastName = managerName.split(" ")[1];

	
	const empId = employeeResult.filter(
		(employee) =>
			employee.first_name === empFirstName &&
			employee.last_name === empLastName
	)[0].id;

	
	const managerId = employeeResult.filter(
		(employee) =>
			employee.first_name === managerFirstName &&
			employee.last_name === managerLastName
	)[0].id;

	
	const updatemanagerResult = await db.updateEmployeeManager(
		empId,
		managerId
	);

	viewAllEmployees();
}


async function removeEmployee() {
	
	
	const employeeResult = await db.getEmployees();
	
	let employeeNames = [];
	for (let i = 0; i < employeeResult.length; i++) {
		employeeNames.push(
			employeeResult[i].first_name + " " + employeeResult[i].last_name
		);
	}

	
	let removeEmpPrompt = [];

	
	removeEmpPrompt.push({
		type: "list",
		name: "empName",
		message: "Which employee to remove?",
		choices: employeeNames,
	});

	
	const { empName } = await inquirer.prompt(removeEmpPrompt);

	
	const empFirstName = empName.split(" ")[0];
	const empLastName = empName.split(" ")[1];

	
	const empId = employeeResult.filter(
		(employee) =>
			employee.first_name === empFirstName &&
			employee.last_name === empLastName
	)[0].id;

	
	const removeEmployeeResult = await db.removeEmployee(empId);

	viewAllEmployees();
}


async function mainPrompt() {
	
	
	const { menuAction } = await inquirer.prompt(prompts.mainPrompt);
	
	switch (menuAction) {
		
		case "View all employees":
			viewAllEmployees();
			break;

		case "View all employees by department":
			viewEmployeesByDepartment();
			break;

		case "View all employees by manager":
			viewAllEmployeesByManager();
			break;

		case "View all roles":
			viewAllRoles();
			break;

		case "View all departments":
			viewAllDepartments();
			break;

		case "Add Employee":
			addEmployee();
			break;

		case "Add Department":
			addDepartment();
			break;

		case "Add Role":
			addRole();
			break;

		case "Update employee role":
			updateEmployeeRole();
			break;

		case "Update employee manager":
			updateEmployeeManager();
			break;

		case "Remove Employee":
			removeEmployee();
			break;

		case "Exit":
			db.closeConnection();
			console.log("Connection closed!");
			break;
	}
}


function init() {

	
	console.log(
		logo({
			name: 'Employee Tracker',
			font: 'Standard',
			lineChars: 10,
			padding: 3,
			margin: 4,
			borderColor: 'bold-white',
			logoColor: 'bold-cyan',
		})
		.emptyLine()
		.render()
	);

	
	mainPrompt();
}

init();