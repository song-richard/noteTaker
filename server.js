const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'develop', 'public')));

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'develop', 'db', 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const notes = JSON.parse(data);
        res.json(notes);
      }
    });
  });

app.get('/notes', (req, res) => {
    res.sendFile('notes.html', { root: path.join(__dirname, 'develop', 'public') });
});

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'develop', 'public') });
});

app.listen(`${PORT}`, (req, res) => {
    console.log(`Listening on PORT: ${PORT}`);
});

