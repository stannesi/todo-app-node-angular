// setup

// import express
var express = require('express');

// create our app with express
var app = express();

// path
var path = require('path');

// mongoose for mongodb
var mongoose = require('mongoose');

// log requests to the console (express4)
var morgan = require('morgan');

// pull information from HTML Post (express4)
var bodyParser = require('body-parser');

// simulate DELETE and PUT (express4)
var methodOverride = require('method-override');

// mongoos Schema
var Schema = mongoose.Schema;

// port
var port = 8080;

// todo schema
var todoSchema = new Schema({
    text : String,
    date : {
        type: Date,
        default: Date.now
    }
});

// create the model
var Todo = mongoose.model('Todo', todoSchema);

// configuration
mongoose.connect('mongodb://stannesi:victory@ds041924.mongolab.com:41924/todo-app-01');

// set the static files location /public/img will be /img for users
app.use(express.static(path.resolve(__dirname, '../client/public/')));

// log every request to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': 'true'}));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

// ROUTES *************************


// API's

// get all todos
app.get('/api/todos', function(req, res ) {
    
    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {        
        
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);
            
        // return all todos in JSON format
        res.json(todos);
    });
});

// get application
app.get('*', function(req, res) {
    // load the single view file (angular will handle the page changes on the front-end)
    res.sendfile(path.resolve(__dirname, '../client/public/index.html'));
});

// create todo and send back all todos aftyer creation
app.post('/api/todos', function(req, res) {
    
    // create a todo, information comes from AJAX request from angular
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todos) {
        
        if (err)
            res.send(err);
        
        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            
            if (err)
                res.send(err);
            
            // return all todos in JSON format  
            res.json(todos);
        })
    });
});

// delete a todo
app.delete('/api/todos/:id', function(req, res) {
   Todo.remove({
       _id : req.params.id
   }, function(err, todo) {
       
       if (err)
           res.send(err);
       
       // get and return all the todos after you create another
       Todo.find(function(err, todos) {
           
       if (err)
           res.send(err);
       
            // return all todos in JSON format
           res.json(todos);
       });
   });
});

// listen (start app with node server.js)
app.listen(port);
console.log('App listening on port %s', port);