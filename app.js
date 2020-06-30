var mysql = require("mysql");
var inquirer = require("inquirer");
const password = require("./.env");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: password,
  database: "employee_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});


function start() {
    inquirer
    .prompt([
    //     {
    //         type: 'input',
    //         name: "name",
    //         message: 'Enter employee name',
    // },
// {
//         type: "input",
//         name: "email",
//         message: "Enter employees email",
//     },
//     {
//         type: "input",
//         name: "id",
//         message: "Enter employee ID number",
//     },
    {
        type: 'list',
        name: "choice",
        message: 'What would you like to do?',
        choices: [ "View all employees","View all departments", "View all roles", "Add an employee","Add a department","Add a Role", "Exit"],
},
//         {
//             type: "input",
//             name: "portfolio",
//             message: "Enter their portfolio address",
//             when: (answers) => answers.role === "Architect",
//         },
//         {
//             type: "input",
//             name: "school",
//             message: "Enter their school",
//             when: (answers) => answers.role === "Intern",
//         },
//         {
//             type: "confirm",
//             message: "Would you like to add another employee?",
//             name: "addEmployee",
//         },
    ]).then((res) => {
        switch (res.choice) {    
            case "View all employees":  
            connection.query("SELECT * FROM employee", (err, results) => {
                console.log(results);
                console.table(results);
                start();
            }) 
                break;  
                case "View all departments":  
            connection.query("SELECT * FROM department", (err, results) => {
                console.log(results);
                console.table(results);
                start();
            }) 
                break;
                case "View all roles":  
                connection.query("SELECT * FROM role", (err, results) => {
                    console.log(results);
                    console.table(results);
                    start();
                }) 
            case "Add a department":  
            inquirer.prompt([
                {type: "input",
                name: "departName",
                message: "Enter a new department"
                },
            ]).then(({departName}) => {
                connection.query("INSERT INTO department SET ?",[{name: departName}], (err, results) => {
                    console.log(results);
                    start();
            })                     
            });
                break;
            default:                      
                connection.end();
                console.log("End");
        } 

    }).catch((err) => console.log(err))
}
