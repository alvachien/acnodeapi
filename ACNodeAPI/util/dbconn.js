var mysql = require('mysql');
var poolconf = require('./dbconncfg.js');

var pool = mysql.createPool(poolconf.dbpoolconfig);

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

var getdata2 = function (strsql, arParams, rtnFn) {
    console.log(strsql);
    pool.getConnection(function (err, connection) {
        if (err) {
            rtnFn(err, null);
            return;
        } else {
            connection.query(strsql, arParams, function (err, rows) {
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
exports.getdatafromdb2 = getdata2;
exports.savedatatodb = savedata;
