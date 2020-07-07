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
    {
        type: 'list',
        name: "choice",
        message: 'What would you like to do?',
        choices: [ "View all employees","View all departments", "View all roles", "Add an employee","Add a department","Add a Role", "Update employee" "Exit"],
},
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
                break;
            case "Add an employee":  
            inquirer.prompt([
                {type: "input",
                name: "firstName",
                message: "Enter employee's first name",
                },
                {type: "input",
                name: "lastName",
                message: "Enter employee's last name",
                },
                {type: "input",
                name: "role",
                message: "Enter employee's role",
                }, 
                {type: "input",
                name: "managerId",
                message: "Enter employee's manager",
                },
            ]).then(({firstName, lastName}) => {
                connection.query("INSERT INTO employee SET ?",[{first_name: firstName, last_name: lastName}], (err, results) => {
                    console.log(results);
                    start();
            })                     
            });
                break;
                case "Update employee":  
                inquirer.prompt([
                    {type: "input",
                    name: "employeeId",
                    message: "Enter employee's id number",
                    },
                    {type: "input",
                    name: "newRole",
                    message: "Enter employee's role",
                    },
                ]).then(({employeeId, newRole}) => {
                    connection.query("UPDATE employee SET ? WHERE ?",[{id: employeeId, role: newRole}], (err, results) => {
                        console.log(results);
                        start();
                })                     
                });
                    break;
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
                    case "Add a role":  
                    inquirer.prompt([
                        {type: "input",
                        name: "newRole",
                        message: "Enter a new role",
                        },
                    ]).then(({newRole}) => {
                        connection.query("INSERT INTO role SET ?",[{role: newRole}], (err, results) => {
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
