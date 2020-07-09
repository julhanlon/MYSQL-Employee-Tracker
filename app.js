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
        choices: [ "View all employees","View all departments", "View all roles", "Add an employee","Add a department","Add a role", "Update employee", "Exit"],
},
    ]).then((res) => {
        switch (res.choice) {    
            case "View all employees":  
            connection.query("SELECT * FROM employee", (err, results) => {
                console.table(results);
                start();
            }) 
                break;  
                case "View all departments":  
            connection.query("SELECT * FROM department", (err, results) => {
                console.table(results);
                start();
            }) 
                break;
                case "View all roles":  
                connection.query("SELECT * FROM role", (err, results) => {
                    console.table(results);
                    start();
                }) 
                break;
            case "Add an employee":  
                newEmployee();
                break;
                // update an employee
                case "Update employee": 
                connection.query("SELECT * FROM role", (err, roleResults) => {
                    connection.query("SELECT * FROM employee", (err, employeeResults) => {
                        console.table(employeeResults); 
                inquirer.prompt([
                    {
                    name: "employeeId",
                    message: "Enter employee's id number",
                    type: "list",
                    choices: employeeResults.map((employRow) => {
                        return {name: `${employRow.first_name} ${employRow.last_name}`, value: employRow.id}
                    })  
                    },
                    {
                    name: "newRole",
                    message: "choose a role",
                    type: "list",
                    choices: roleResults.map((roleRow) => {
                        return {name: roleRow.title, value: roleRow.id}
                    })  
                    },
                ]).then(({employeeId, newRole}) => {
                    connection.query("UPDATE employee SET ? WHERE ?",[{role_id: newRole}, {id: employeeId}], (err, results) => {
                        if (err) throw (err);
                        console.log("updated");
                        start();
                    })  
                    })    
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
                        {type: "input",
                        name: "newSalary",
                        message: "Enter salary for role",
                        },
                        {type: "input",
                        name: "departmentId",
                        message: "Enter department for the role",
                        },
                    ]).then(({newRole}) => {
                        connection.query("INSERT INTO role SET ?",[{title: newRole, salary: newSalary, department_id: departmentId}], (err, results) => {
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

const newEmployee = () => {
    try {
        connection.query("SELECT * FROM role", (err, roleResults) => {
            connection.query("SELECT * FROM employee", (err, employeeResults) => {
                console.table(employeeResults);
        inquirer.prompt([
            {
                name: "first_name",
                message: "Enter employee's first name",
                type: "input",
            },
            {
                name: "last_name",
                message: "Enter employee's last name",
                type: "input",
            },
            {
                name: "employeeRole",
                message: "Enter employee's role",
                type: "list",
                choices: roleResults.map((roleRow) => {
                    return {name: roleRow.title, value: roleRow.id}
                })                    
            },
            {
                name: "managerId",
                message: "Enter employee's Manager",
                type: "list",
                choices: employeeResults.map((employRow) => {
                    return {name: `${employRow.first_name} ${employRow.last_name}`, value: employRow.id}
                })  
            }
        ]).then((res) => {

            const first_name = res.first_name;
            const last_name = res.last_name;
            const role_id = res.employeeRole;
            const manager_id = res.managerId;

            const newEmployee = { first_name, last_name, role_id, manager_id }
        
         addEmployee(newEmployee);
         start();
        });
    });
    });
    } catch (err) {
        console.log(err);

    }
}

const addEmployee = (anotherEmployee) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO employee SET ?`, [anotherEmployee], (err) => {
                if (err) { reject(err);
                } else {
                    console.log("New employee added")
                };
            });
            connection.query("SELECT * FROM employee", (err, results) => {
                console.table(results);
            });
    });
}