const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 8888;

// We want to use JSON to send post request to our application
app.use(bodyParser.json());

// We tell express to serve the folder public as static content
app.use(express.static(__dirname + '/'));

app.get('/');

app.listen(port, () => console.log(`Listening on port ${port}!`));