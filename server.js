const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get route test
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });

//connect to database
const db = mysql.createConnection({
        host: 'localhost',
        //Your MySQL username
        user: 'root',
        //Your MySQL password
        password: 'Osara23!',
        database: 'election'
    },
    console.log('Connected to the election database.')
);



//query database to test the connection
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});


// add route to handle user request at the end before add.listen
//Default response for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
});

// Add function listening on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});