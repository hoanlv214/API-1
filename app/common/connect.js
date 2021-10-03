var mysql =require("mysql");

var connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api'
});
connection.connect(function(err){
    if(err){console.log("net noi databae khong thanh cong")};
});
module.exports=connection;