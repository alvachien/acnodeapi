var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var dbconn = require('../dataaccess/dbconn');
var Token = require('../models/token');

passport.use(new BearerStrategy(
    function (accessToken, callback) {
        Token.findOne({ value: accessToken }, function (err, token) {
            if (err) { return callback(err); }
            
            // No token found
            if (!token) { return callback(null, false); }
            
            User.findOne({ _id: token.userId }, function (err, user) {
                if (err) { return callback(err); }
                
                // No user found
                if (!user) { return callback(null, false); }
                
                // Simple example with no scope
                callback(null, user, { scope: '*' });
            });
        });
    }
));

passport.use(new LocalStrategy(
    function (username, password, callback) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return callback(err); }
            
            // No user found with that username
            if (!user) { return callback(null, false); }
            
            // Make sure the password is correct
            user.verifyPassword(password, function (err, isMatch) {
                if (err) { return callback(err); }
                
                // Password did not match
                if (!isMatch) { return callback(null, false); }
                
                // Success
                return callback(null, user);
            });
        });
    }
));

passport.use(new BasicStrategy(
    function (username, password, callback) {
        // First check the existence
        dbconn.getdatafromdb("select name from actest.user where name = " + username, function (err, result) {
            if (err) {
                return callback(err);
            }
        });

        //User.findOne({ username: username }, function (err, user) {
        //    if (err) { return callback(err); }
            
        //    // No user found with that username
        //    if (!user) { return callback(null, false); }
            
        //    // Make sure the password is correct
        //    user.verifyPassword(password, function (err, isMatch) {
        //        if (err) { return callback(err); }
                
        //        // Password did not match
        //        if (!isMatch) { return callback(null, false); }
                
        //        // Success
        //        return callback(null, user);
        //    });
        //});
    }
));

passport.use('client-basic', new BasicStrategy(
    function (username, password, callback) {
        Client.findOne({ id: username }, function (err, client) {
            if (err) { return callback(err); }
            
            // No client found with that id or bad password
            if (!client || client.Secret !== password) { return callback(null, false); }
            
            // Success
            return callback(null, client);
        });
    }
));

exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
exports.isAuthenticated = passport.authenticate('basic', { session : false }); // don't use the session