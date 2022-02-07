const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get route test
// app.get('/api/candidates', (req, res) => {
//     const sql = `SELECT * FROM candidates`;

//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

//Get a single candidate
// app.get('/api/candidates/:id', (req, res) => {
//     const sql = `SELECT * FROM candidates WHERE id = ?`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, rows) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

// Delete a candidate
// app.delete('/api/candidates/:id', (req, res) => {
//     const sql = `DELETE FROM candidates WHERE id = ?`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.statusMessage(400).json({ error: res.message });
//         } else if (!result.affectedRows) {
//             res.json({
//                 message: 'Candidate not found'
//             });
//         } else {
//             res.json({
//                 message: 'deleted',
//                 changes: result.affectedRows,
//                 id: req.params.id
//             });
//         }

//     });
// });

//Create a  candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');

    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });

});


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
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// get a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

//Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

//Create query for create operation
//create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// add route to handle user request at the end before add.listen
//Default response for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
});

// Add function listening on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});