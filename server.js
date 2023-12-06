const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'develop', 'public')));

app.get('/notes', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'develop', 'public') });
});

app.listen(`${PORT}`, (req, res) => {
    console.log(`Listening on PORT: ${PORT}`);
});

