const inquirer = require('inquirer');
const mysql = require('mysql2') 
const cTable = require('console.table');



// middleware for express 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Query database using COUNT() and GROUP BY, 
// POSSIBLY GROUPING THIS INTO A USER.PROMPT FUCNTION AND PROMPTING THIS WHEN SELECTING SPECIFIC ANSWERS 
db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
    console.log(results);
  });