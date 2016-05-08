var express = require('express');
var crypto = require('crypto');
var User = require('../models/user');
var dbconn = require('../dataaccess/dbconn');

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
    dbconn.getdatafromdb2('SELECT Name, DisplayAs, RegisterDate FROM actest.user WHERE Name = ?', [req.params.Name], function (err, rows) {
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

var checkAliasExist = function (usr, res, callbackFn) {
    // Check for duplicated display as
    dbconn.getdatafromdb2("SELECT * FROM actest.user WHERE DisplayAs = ? ", [usr.DisplayAs], function (err, rows) {
        if (err) {
            res.statusCode = 500;
            res.json({
                error: true,
                message: "Failed to execute the SQL"
            });
            return;
        } else {
            if (rows && rows.length > 0) {
                res.status(500);
                res.json({
                    error: true,
                    message: "User with same DisplayAs already: " + usr.DisplayAs,
                });
                return;
            } else {
                callbackFn();
            }
        }
    });
};

var checkUserIDExist = function (usr, res, callbackFn) {
    // Check for duplicated user ID
    dbconn.getdatafromdb2("SELECT * FROM actest.user WHERE Name = ? ", [usr.UserID], function (err, rows) {
        if (err) {
            res.statusCode = 500;
            res.json({
                error: true,
                message: "Failed to execute the SQL"
            });
            return;
        } else {
            if (rows && rows.length > 0) {
                res.status(500);
                res.json({
                    error: true,
                    message: "User with same ID registered already: " + usr.UserID,
                });
                return;
            } else {
                checkAliasExist(usr, res, callbackFn);
            }
        }
    });
};

exports.registerUser = function (req, res) {
    // Register an user
    var usr = new User();
    usr.initForRegister(req.body);
    
    // Perform the checks
    var arCheckResults = usr.checkForRegister();
    if (arCheckResults.length > 0) {
        res.status(500);
        res.json({
            error: true,
            message: arCheckResults
        });
        return;
    }
    
    checkUserIDExist(usr, res, function () {
        // Okay, it's succeed, write into database
        dbconn.savedatatodb("INSERT INTO `actest`.`user` (`Name`, `DisplayAs`, `HashedPassword`, `PassKey`, `Mailbox`, `Gender`) VALUES (?, ?, ?, ?, ?, ?)",
            usr.prepareForRegister(),
            function (err, rows) {
                if (err) {
                    res.status(500);
                    res.json({
                        error: true,
                        message: err
                    });
                    return;
                }
                else {
                    res.status(200);
                    res.json({
                        error: false,
                        message: "User Registered successfully!"
                    });
                    return;
                }
            });
    });    
};

exports.updateUser = function (req, res) {

};

exports.deleteUser = function (req, res) {

};
