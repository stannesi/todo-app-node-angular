// setup

// import express
var express = require('express');
// create our app w/ express
var app = express();   
// mongoose for mongodb
var mongoose = require('mongoose');
// log requests to the console (express4)
var morgan = require('morgan');
// pull information from HTML Post (express4)
var bodyParser = require('body-parser');
// simulate DELETE and PUT (express4)
var methodOverride = require('method-override');

// port
var port = 8080;

// define model
var Todo = mongoose.model('Todo', {
    text : String
});


// configuration
mongoose.connect('mongodb://stannesi:victory@ds041924.mongolab.com:41924/todo-app-01');

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '../client/public'));

console.log(__dirname);

// log every request to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': 'true'}));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(methodOverride());

// listen (start app with node server.js)
app.listen(port);
console.log('App listening on port %s', port);

