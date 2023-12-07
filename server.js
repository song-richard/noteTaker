const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//Port used
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.static(path.join(__dirname, 'Develop', 'public')));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'Develop', 'public') });
});

//GET route and request to retrieve current notes
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'Develop', 'db', 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const notes = JSON.parse(data);
        res.json(notes);
      }
    });
  });

//POST request and route for posting new notes
  app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'Develop', 'db', 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const notes = JSON.parse(data);
        
        //Creates note with a unique ID via UUID, and pulls the inputted user data from the req.body, then pushes the new note to the json db
        const newNote = {
          id: uuidv4(),
          title: req.body.title,
          text: req.body.text, 
        };
  
        notes.push(newNote);
  
        fs.writeFile(
          path.join(__dirname, 'Develop', 'db', 'db.json'),
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
  
//GET route for /notes
app.get('/notes', (req, res) => {
    res.sendFile('notes.html', { root: path.join(__dirname, 'Develop', 'public') });
});

//GET route for '*' wildcard/all other routes
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'Develop', 'public') });
});

//Started server on port listed on 'PORT'
app.listen(`${PORT}`, (req, res) => {
    console.log(`Listening on PORT: ${PORT}`);
});