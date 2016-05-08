var express = require('express');
var Token = require('../models/token');
var dbconn = require('../dataaccess/dbconn');

exports.createClient = function (req, res) {
    var client = new Client();
    
    client.Name = req.body.Name;
    client.ID = req.body.ID;
    client.Secret = req.body.Secret;
    client.UserID = req.body.UserID;
    
    // Save it
    dbconn.savedatatodb("INSERT INTO actest.client VALUES (?, ?, ?, ?) ", 
        [client.Name, client.ID, client.Secret, client.UserID],
        function (err, result) {
    })
};

exports.getClients = function (req, res) {

};

exports.readClient = function (req, res) {

};