'use strict';

const util = require('util');
const mysql = require('mysql');


const connection = mysql.createConnection({
    host : 'localhost',

    
    user : 'root',

    
    password : 'asdf@123',

   
    database : 'employee_DB'
});


connection.connect(function(err){
    if(err) throw err;
});


connection.query = util.promisify(connection.query);


module.exports = connection;