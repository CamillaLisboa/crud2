const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password:'',
    database: 'tasksystem',
});

app.post('/new', (req, res) => {
    const title = req.body.title
    const duedate = req.body.duedate
    const description = req.body.description

    db.query(
        "INSERT INTO tasks (title, dueDate, description) VALUES (?, ?, ?)",
        [title, duedate, description],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    );
});

app.get('/tasks', (req, res) => {
    db.query("SELECT * FROM tasks", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/update', (req, res) =>{
    const id = req.body.id
    const title = req.body.title
    db.query("UPDATE tasks SET title = ? WHERE id = ?", [title, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.delete('/delete/:id', (req, res) =>{
    const id = req.params.id
    db.query("DELETE FROM tasks WHERE id = ?" , id,(err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.listen(3001, () => {
    console.log("Yay, your server is running on port 3001")
})