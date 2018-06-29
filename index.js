const express = require('express');
const mysql = require('mysql');

const app = express();

const port = 3010;
let students = {};
let selectorPrototype = 'SELECT * FROM students Where id=';
let selectorArgument = 0

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ah'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM students Where 1', function (err, result, fields) {
    students = result;
});

app.all('/', (req, res) => res.send(students))

app.get('/id/:selectorArgument', function (request, response) {
    let id = parseInt(request.params.selectorArgument)
    if (isNaN(id)) {
        response.send('You tried to load a result with invalid argument');
    }
    connection.query('SELECT * FROM students Where id=' + id, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result === undefined || result.length == 0) {
            response.send('We do not have a data with this id');
        }
        console.log(result);
        response.send(result);
    });

})

app.listen(port, () => console.log('Example app listening on port ' + port + '!'))
