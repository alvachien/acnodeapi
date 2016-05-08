var mysql = require('mysql');
var poolconf = require('./dbconfig');

var pool = mysql.createPool(poolconf);

var getdata = function (strsql, rtnFn) {
    console.log(strsql);
    pool.getConnection(function (err, connection) {
        if (err) {
            rtnFn(err, null);
            return;
        } else {
            connection.query(strsql, function (err, rows) {
                if (err) {
                    rtnFn(err, null);
                    return;
                } else {
                    rtnFn(null, rows);
                }
                
                connection.release();
            });
        }
    });
}

var savedata = function (strsql, arParams, rtnFn) {
    console.log(strsql);
    pool.getConnection(function (err, connection) {
        if (err) {
            rtnFn(err, null);
            return;
        } else {
            connection.query(strsql, arParams, function(err, results) {
                if (err) {
                    rtnFn(err, null);
                    return;
                } else {
                    rtnFn(null, results);
                }

                connection.release();
            });
        }
    });
}

exports.getdatafromdb = getdata;
exports.savedatatodb = savedata;
