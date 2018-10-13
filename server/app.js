
// ────────────────────────────────────────────────────────────────────────────────
// SERVER 
// ────────────────────────────────────────────────────────────────────────────────

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const app = express();

// ────────────────────────────────────────────────────────────────────────────────

app.use(bodyParser());
app.use(express.static('./public'));

app.listen(8080);

// ────────────────────────────────────────────────────────────────────────────────

app.post('/save', (req, res) => {
    fs.writeFile('./save.json', JSON.stringify(req.body), err => {
        res.send(JSON.stringify({ status: !err }));
    });
})

app.get('/load', (req, res) => res.sendfile('./save.json'))

// ────────────────────────────────────────────────────────────────────────────────