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
   
    
    listProducts(getUserOrder);
    
    //runQuery("SELECT product_name, department_name, stock_quantity FROM products");

    //connection.end();
  });


function listProducts(callback){
    var query = "SELECT * FROM products";

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
        callback();
    });
}

function getUserOrder(){
    var questions = [
        {
        name: "orderid",
        type: "input",
        message: "What item do you want? (id number): "
        }, 
        {
            name: "orderqty",
            type: "input",
            message: "How many?: "
        }
    ];

    inquirer
    .prompt(questions)
    .then(function(answer) {
        inStock( answer.orderid, answer.orderqty ); 
    });
}

function inStock(item_id, quantity){
    var query = `SELECT stock_quantity FROM products WHERE item_id=${item_id}`;

    connection.query(query, function(err, results){
        if(err) throw err;

        if(results[0].stock_quantity >= quantity){
            console.log("Processing order");
            makeOrder(item_id, quantity);
        }else    
            console.log("Insufficient stock");
    });
}

function makeOrder(item_id, quantity){
    var query = `UPDATE products SET stock_quantity = stock_quantity - ${quantity} WHERE ?`;
    var params = [
        { item_id: item_id }
    ];

    connection.query(query, params, function(err, results){
        if(err) throw err;

        console.log(results);
    });
}
