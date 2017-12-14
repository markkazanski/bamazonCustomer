var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Arseface04!",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
   
    //execute
    supervisorDashboard();
    //console.log( getTotalSales("Bathroom") );
  });

  function supervisorDashboard(){
    var questions = [
        {
            name: "whatdo",
            type: "list",
            message: "What do?",
            choices: ["View", "Create"]
        }
    ];

    inquirer
    .prompt(questions)
    .then(function(answer) {
        switch(answer.whatdo){
            case "View":
                viewDepartments();
                break;
            case "Create":
                createDepartment();
                break;
            default:
                break;
        }
    });
}

function viewDepartments(){

   // var query = `select price from products where department_name="Bathroom";`;
   var query = "SELECT * FROM departments";

    connection.query(query, function(err, results){
        if(err) throw err;

        var keyList = "";
        for(var key in results[0]){
            keyList += key + " | ";
        }
        console.log(keyList.substring(0, keyList.length-3));

        for(var i=0; i<results.length; i++){
            var resultsList = "";
            for(var key in results[i]){
                resultsList += results[i][key] + " | ";
            }
            console.log(resultsList.substring(0, resultsList.length-3));
        }
        supervisorDashboard();
    });
}

function getTotalSales(dept_id){
    var query = `select SUM(price) from products where department_name="${dept_id}"`;

    connection.query(query, function(err, results){
        if(err) throw err;

        return ("Total sales: " + results[0]['SUM(price)']);
    });
}

function createDepartment(){
    var questions = [
        {
            name: "dept_name",
            type: "input",
            message: "Department Name?"
        },
        {
            name: "over_head_costs",
            type: "input",
            message: "Overhead costs?"
        }
    ];

    inquirer
    .prompt(questions)
    .then(function(answer) {
       // console.log(answer);
        //console.log( "Product name: " + answer.product_name);
        
        var query = `INSERT INTO departments (dept_name , over_head_costs) 
        VALUES ("${answer.dept_name}", ${answer.over_head_costs});`;

        connection.query( query, function(err, results){
            if(err) throw err;
            
            console.log(results);
            
            supervisorDashboard(); 
        });
    });

}
    