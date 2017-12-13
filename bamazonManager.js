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
            case "Add":
                addInventory(managerDashboard);
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

function addInventory(callback){
    var questions = [
        {
            name: "product",
            type: "input",
            message: "Add inventory, what product (id)?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How much?"
        }
    ];

    inquirer
    .prompt(questions)
    .then(function(answer) {
       // console.log(answer);

        var query = `UPDATE products SET stock_quantity = stock_quantity + ${answer.quantity} WHERE item_id='${answer.product}'`;

        connection.query( query, function(err, results){
            if(err) throw err;
            
           if(results.changedRows > 0)
                console.log("Product Changed");
            else    
                console.log("No Changes");
           
           callback(); 
        });
    });

}


function addNewProduct(callback){
    var questions = [
        {
            name: "product_name",
            type: "input",
            message: "Product Name?"
        },
        {
            name: "department_name",
            type: "input",
            message: "Department?"
        },
        {
            name: "price",
            type: "input",
            message: "Price?"
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "Stock?"
        }

    ];

    inquirer
    .prompt(questions)
    .then(function(answer) {
       // console.log(answer);

        var query = ``;

        connection.query( query, function(err, results){
            if(err) throw err;
            
            
            
            callback(); 
        });
    });

}