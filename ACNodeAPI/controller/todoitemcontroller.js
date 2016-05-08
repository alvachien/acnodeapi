var express = require('express');
var TodoItem = require('../models/todoitem');
var dbconn = require('../dataaccess/dbconn.js');

exports.getTodoItems = function (req, res) {
    dbconn.getdatafromdb('SELECT * FROM actest.todoitem', function (err, rows) {
        if (err) {
            res.send(err);
        } else {
            var todos = [];
            for (var i = 0; i < rows.length; i++) {
                var todo = new TodoItem();
                todo.initFromDBModel(rows[i]);
                todos.push(todo);
            }
            
            res.json(todos);
        }
    });
};

exports.readTodoItem = function (req, res) {
    dbconn.getdatafromdb('SELECT * FROM actest.todoitem WHERE ID = ' + req.params.id, function (err, rows) {
        if (err) {
            res.send(err);
        } else {
            var todo = new TodoItem();
            if (rows && rows.length > 0) {
                todo.initFromDBModel(rows[0]);
            }
            
            res.json(todo);
        }
    });
};

exports.createTodoItem = function (req, res) {
    var todo = new TodoItem();
    todo.Name = req.body.Name;
    todo.Details = req.body.Details;
    //todo.ParentID
    //todo.Assignee
    
    dbconn.savedatatodb("INSERT INTO actest.todoitem (Name, Detail) VALUES(?,?)", 
        [todo.Name, todo.Details], 
        function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            // Success
        }
    });
};

exports.updateTodoItem = function (req, res) {

};

exports.deleteTodoItem = function (req, res) {

};
