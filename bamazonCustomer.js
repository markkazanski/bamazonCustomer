var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Arseface04!",
    database: "bamazon",
    multipleStatements: true
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
    var query = `SELECT stock_quantity, price FROM products WHERE item_id=${item_id}`;

    connection.query(query, function(err, results){
        if(err) throw err;

        if(results[0].stock_quantity >= quantity){
            console.log("Processing order");
            makeOrder(item_id, quantity, results[0].price);
        }else    
            console.log("Insufficient stock");
    });
}

function makeOrder(item_id, quantity, price){
    var query1 = `UPDATE products SET stock_quantity = stock_quantity - ${quantity} WHERE ?;`;
    var query2 = `UPDATE products SET product_sales = product_sales + (${quantity} * ${price}) WHERE ?`;
    var params = [
        { item_id: item_id },
        { item_id: item_id }
    ];

    connection.query(query1 + query2, params, function(err, results){
        if(err) throw err;

        //console.log("Query1: " + query1);
        //console.log("Query2: " + query2);
       // console.log(results);
        console.log("Your cost: $" + (price * quantity) );
        listProducts(getUserOrder);
    });
}
