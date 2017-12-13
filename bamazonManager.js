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
    managerDashboard();
  });

  function listProducts(callback){
    var query = "SELECT * FROM products";

    connection.query(query, function(err, results){
        if(err) throw err;

        displayResults(results);

        callback();
    });
}

function lowInventory(callback){
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    
        connection.query(query, function(err, results){
            if(err) throw err;

            displayResults(results);

            callback();
        });
}

function managerDashboard(){

    var questions = [
        {
            name: "whatdo",
            type: "list",
            message: "What do?",
            choices: ["All", "Low", "Add", "New"]
        }
    ];

    inquirer
    .prompt(questions)
    .then(function(answer) {
        switch(answer.whatdo){
            case "All":
                listProducts(managerDashboard);
                break;
            case "Low":
                lowInventory(managerDashboard);
                break;
            default:
                break;
        }
    });
}


function displayResults(results){
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
}