const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'develop', 'public')));
app.use(express.json())

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


  app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'develop', 'db', 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const notes = JSON.parse(data);
  
        const newNote = {
          id: uuidv4(),
          title: req.body.title,
          text: req.body.text, 
        };
  
        notes.push(newNote);
  
        fs.writeFile(
          path.join(__dirname, 'develop', 'db', 'db.json'),
          JSON.stringify(notes),
          (err) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              res.json(newNote);
            }
          }
        );
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

