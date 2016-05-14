var express = require('express');
var Client = require('../models/client');
var Token = require('../models/token');
var dbconn = require('../dataaccess/dbconn');

exports.createClient = function (req, res) {
    var client = new Client();
    
    client.Name = req.body.Name;
    client.ID = req.body.ID;
    client.clientSecret = req.body.Secret;
    client.clientID = req.body.UserID;
    
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

exports.findByID = function (id, done) {

};

exports.findByClientID = function (clientID, done) {
    //var clients = [
    //    { id: '1', name: 'Samplr', clientId: 'abc123', clientSecret: 'ssh-secret' }
    //];
    for (var i = 0, len = clients.length; i < len; i++) {
        var client = clients[i];
        if (client.clientId === clientId) {
            return done(null, client);
        }
    }
    return done(null, null);
};