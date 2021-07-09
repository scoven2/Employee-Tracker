//required dependencies
const inquirer = rquire("inquirer");
const mysql = require("mysql");
require("console.table");

//mysql connections
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    //your mysql username
    user: 'root',
    //your password
    password: 'EnterYourPassword',
    database: 'employeeDB'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`
    ---------------------------------------------------------------------------------------                                                
     ________                          __                                              
    /        |                        /  |                                             
    $$$$$$$$/  _____  ____    ______  $$ |  ______   __    __   ______    ______       
    $$ |__    /     \/    \  /      \ $$ | /      \ /  |  /  | /      \  /      \      
    $$    |   $$$$$$ $$$$  |/$$$$$$  |$$ |/$$$$$$  |$$ |  $$ |/$$$$$$  |/$$$$$$  |     
    $$$$$/    $$ | $$ | $$ |$$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$    $$ |$$    $$ |     
    $$ |_____ $$ | $$ | $$ |$$ |__$$ |$$ |$$ \__$$ |$$ \__$$ |$$$$$$$$/ $$$$$$$$/      
    $$       |$$ | $$ | $$ |$$    $$/ $$ |$$    $$/ $$    $$ |$$       |$$       |     
    $$$$$$$$/ $$/  $$/  $$/ $$$$$$$/  $$/  $$$$$$/   $$$$$$$ | $$$$$$$/  $$$$$$$/      
                            $$ |                    /  \__$$ |                         
                            $$ |                    $$    $$/                          
                            $$/                      $$$$$$/                           
     __       __                                                                       
    /  \     /  |                                                                      
    $$  \   /$$ |  ______   _______    ______    ______    ______    ______            
    $$$  \ /$$$ | /      \ /       \  /      \  /      \  /      \  /      \           
    $$$$  /$$$$ | $$$$$$  |$$$$$$$  | $$$$$$  |/$$$$$$  |/$$$$$$  |/$$$$$$  |          
    $$ $$ $$/$$ | /    $$ |$$ |  $$ | /    $$ |$$ |  $$ |$$    $$ |$$ |  $$/           
    $$ |$$$/ $$ |/$$$$$$$ |$$ |  $$ |/$$$$$$$ |$$ \__$$ |$$$$$$$$/ $$ |                
    $$ | $/  $$ |$$    $$ |$$ |  $$ |$$    $$ |$$    $$ |$$       |$$ |                
    $$/      $$/  $$$$$$$/ $$/   $$/  $$$$$$$/  $$$$$$$ | $$$$$$$/ $$/                 
                                               /  \__$$ |                              
                                               $$    $$/                               
                                                $$$$$$/                                                                    
-----------------------------------------------------------------------------------------
    `)
    firstPrompt();
});

//asks what the user would like to do
function firstPrompt() {
    inquirer
        .prompt({
            type: "list",
            name: "task",
            message: "What Would You Like To Do?",
            choices: [
                "View Employees",
                "View Employees By Department",
                "Add Employees",
                "Remove Employees",
                "Update Employees Role",
                "Add Role",
                "End"
            ]
        })
        .then(function({ task }) {
            switch (task) {
                case "View Employees":
                    viewEmployee();
                    break;
                case "View Employees By Department":
                    viewEmployeesByDepartment();
                    break;
                case "Add Employees":
                    addEmployees();
                    break;
                case "Remove Employees":
                    removeEmployees();
                    break;
                case "Update Employees Role":
                    updateEmployeesRole();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "End":
                    connection.end();
                    break;
            }
        });
}

//view employees
function viewEmployee() {
    console.log("Viewing Employees\n");
    var query =
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
            LEFT JOIN role r
                ON e.role_id = r.id
            LEFT JOIN department d
                ON d.id = r.department_id
            LEFT JOIN employee m
                ON m.id = e.manager_id`
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("Employees Listed Above!\n");
        firstPrompt();
    });
}

//view employees by department, opens list of departments to choose from
function viewEmployeesByDepartment() {
    console.log("View Employees By Department\n");
    var query =
        `Select d.id, d.name, r.salary AS budget
        FROM employee e
            LEFT JOIN role r
                ON e.role_id = r.id
            LEFT JOIN department d
                ON d.id = r.department_id
            GROUP BY d.id, d.name`
    connection.query(query, function(err, res) {
        if (err) throw err;
        const departmentChoices = res.map(data => ({
            value: data.id,
            name: data.name
        }));
        console.table(res);
        console.log("Departments Listed Above!\n");
        promptDepartment(departmentChoices);
    });
}

//choose department from list or departments, opens list of employees in said department
function promptDepartment(departmentChoices) {
    inquirer
        .prompt([{
            type: "list",
            name: "departmentId",
            message: "Which Department Would You Like To Select?",
            choices: departmentChoices
        }])
        .then(function(answer) {
            console.log("answer ", answer.departmentId);
            var query =
                `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
                    FROM employee e
                        JOIN role r
                            ON e.role_id = r.id
                        JOIN department d
                            ON d.id = r.department_id
                        WHERE d.id = ?`
            connection.query(query, answer.departmentId, function(err, res) {
                if (err) throw err;
                console.table("response ", res);
                console.log(res.affectedRows + " Employees Are Displayed Above!\n");
            });
        });
}