// what i need to set up mysql 
const inquirer = require('inquirer');
const mysql = require('mysql2') 
const cTable = require('console.table');
const { default: Choices } = require('inquirer/lib/objects/choices');

// connection to mysql
const connection = mysql.createConnection(
    {
    host: '127.0.0.1',
    user: 'root',
    password: 'Teddyteddy!99',
    database: 'company_db'
    },
  );

// first initial question i will prompt to the user to ask what they want to do 
const initialQuestion = [
  {
    type: 'list', 
    name: 'wwyd',
    message: 'Please choose one of the choices below',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
  }
];

// dont need questions for viewing dept, roles, or employee because no input is needed

// question for adding a department 
const addDeptQ = [
  {
    type: 'input', 
    name: 'departmentQ', 
    message: 'What would you like your department name to be called?',
  }
]; 

// question for adding a role 
const addRoleQ = [
  {
    type: 'input', 
    name: 'roleQ', 
    message: 'What is the name of this new role?'
  }, 
  {
    type: 'input', 
    name: 'salaryQ', 
    message: 'What is the salary of this new role?'
  }, 
  {
    type: 'input', 
    name: 'departmentQ', 
    message: 'Which department ID does this role fall under?'
  }
];

// question for adding an employee 
const addEmployQ = [
  {
    type: 'input', 
    name: 'first_nameQ', 
    message: 'What is the first name of this employee?'
  }, 
  {
    type: 'input', 
    name: 'last_nameQ', 
    message: 'What is the last name of this employee?'
  }, 
  {
    type: 'input', 
    name: 'role_idQ', 
    message: 'What will the role ID be for this employee'
  },
  {
    type: 'input', 
    name: 'manager_idQ', 
    message: 'What will the manager ID be for this employee'
  }
];

// question for updating an employee 
const updateEmployQ = [
  {
    type: 'input', 
    name: 'currentIDQ', 
    message: 'What is the current ID of the employee you would like to update?'
  },
  {
    type: 'input', 
    name: 'newIDQ', 
    message: 'What is the new ID of the employee you would like to update?'
  }
];

// function to intialize the list of questions and then switch between the different ones selected 
function answerToInitalQ({wwyd}) {
  switch(wwyd) {
    case 'View All Departments':
        
        viewDeptsFunc();

      break;

    case 'View All Roles':

      viewRolesFunc();
        
      break;

    case 'View All Employees':

      viewEmployFunc();
      
      break;

    case 'Add A Department':

      addDeptFunc();
     
      break;

    case 'Add A Role':

      addRoleFunc();
      
      break;

    case 'Add An Employee':

      addEmployFunc();
      
      break;

    case 'Update An Employee Role':
      
      updateRoleFunc();
    
      break;

      default:
        console.log(`Come again soon 👋`);
    }
};


// /////////////// start of prompting the questions /////////////////

// function to add a new department to the company_db 
function addDeptFunc() {
  inquirer.prompt(addDeptQ)
  .then((answers) => {
    connection.query(
      // connection.query(mysql, params, function)
      `INSERT INTO department (name) VALUES (?);`, 
      [answers.departmentQ], 
      (err, results) => { 
        err
        ? console.log(err)
        : viewDeptsFunc() &&
        console.log("Successfully added Department to database!")
      }
    )
  })
}; 
 

// function to add a new role to the company_db 
function addRoleFunc() {
  inquirer.prompt(addRoleQ)
  .then((answers) => {
    connection.query(
      // connection.query(mysql, params, function)
      `INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ?);`, 
      [answers.roleQ, answers.salaryQ, answers.departmentQ], 
      (err, results) => { 
        err
        ? console.log(err)
        : viewRolesFunc();
      }
    )
  })
}; 

// function to add a new employee to the company_db 
function addEmployFunc() {
  inquirer.prompt(addEmployQ)
  .then((answers) => {
    connection.query(
      // connection.query(mysql, params, function)
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES( ?, ?, ?, ?)`, 
      [answers.first_nameQ, answers.last_nameQ, answers.role_idQ, answers.manager_idQ], 
      (err, results) => { 
        err
        ? console.log(err)
        : viewEmployFunc();
      }
    )
  })
}; 


// function to view all departments 
function viewDeptsFunc() {
  connection.query (
    `SELECT department.name AS 'Department', department.id AS 'Department ID' FROM department`, 
    (err, results) => { 
      err
      ? console.log(err)
      : console.table(results)
      init();
    }
  )
};

// function to view all roles 
function viewRolesFunc() {
  connection.query (
    `SELECT role.title AS 'Role Title', role.id AS 'Role ID' ,role.salary AS 'Salary', role.department_id AS 'Department ID' FROM role`, 
    (err, results) => { 
      err
      ? console.log(err)
      : console.table(results)
      init();
    }
  )
};

// function to view all employees
function viewEmployFunc() {
  connection.query (
    `SELECT 
      employee.id AS 'Employee ID',
      employee.first_name AS 'First Name', 
      employee.last_name AS 'Last Name', 
      role.title AS 'Title', 
      role.department_id AS 'Department', 
      role.salary AS 'Salary',
      employee.manager_id AS 'Manager ID'
     FROM 
      employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id 
        LEFT JOIN employee manager ON manager.id = employee.manager_id`,
        (err, results) => { 
          err
          ? console.log(err)
          : console.table(results)
          init();
    }
  )
}; 

// function to update a role id 
function updateRoleFunc() {
  inquirer
  .prompt(updateEmployQ)
  .then((answers) =>{
      connection.query(
          `UPDATE employee SET role_id = ? WHERE id = ?`,
              [answers.currentIdQ, answers.newIDQ],
          (err, results) => { 
              err
              ? console.log(err)
              : viewEmployFunc();
          }
      );
  })
};

// last function to start the process 
function init() {
  inquirer
  .prompt(initialQuestion)
      .then((answer) => {
          answerToInitalQ(answer)
  });
}

init();