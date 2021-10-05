
var express= require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

require('./app/routers/user.router')(app);
require('./app/routers/post.router')(app);

app.listen(3000,function(){
console.log("Server ok");

})