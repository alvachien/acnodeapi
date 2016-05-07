﻿var express = require('express');
var User = require('../models/user');
var dbconn = require('../util/dbconn');

exports.getUsers = function (req, res) {
    dbconn.getdatafromdb('SELECT Name, DisplayAs, RegisterDate FROM actest.user', function (err, rows) {
        if (err) {
            res.send(err);
        } else {
            var users = [];
            for (var i = 0; i < rows.length; i++) {
                var usr = new User();
                usr.initFromDBModel(rows[i]);
                users.push(usr);
            }
            
            res.json(users);
        }
    });
};

exports.readUser = function (req, res) {
    dbconn.getdatafromdb('SELECT Name, DisplayAs, RegisterDate FROM actest.user WHERE Name = ' + req.params.Name, function (err, rows) {
        if (err) {
            res.send(err);
        } else {
            var usr = new User();
            if (rows && rows.length > 0) {
                usr.initFromDBModel(rows[0]);
            }
            
            res.json(usr);
        }
    });
};

exports.checkUserExist = function (req, res) {

};

exports.registerUser = function (req, res) {
    //res.setHeader('Content-Type', 'text/json');
    
    // Register an user
    var usr = new User();
    usr.initFromUIBody(req.body);
    usr.UserID = req.body.UserID;
    usr.Password = req.body.Password;

    dbconn.getdatafromdb("SELECT * FROM actest.user WHERE Name = " + usr.UserID, function (err, rows) {
        if (err) {
            res.status(500);
            res.json({
                error: true,
                message: "Failed to execute the SQL"
            });
        } else {
            if (rows && rows.length > 0) {
                res.status(500);
                res.json({
                    error: true,
                    message: "User registered already: " + usr.UserID,
                });
            }
        }
    });
    
    // Perform the checks

    res.status(500);
    res.json({
        error: true,
        message: "Not yet ready!"
    });
};

exports.updateUser = function (req, res) {

};

exports.deleteUser = function (req, res) {

};
