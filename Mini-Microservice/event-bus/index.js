const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);
    axios.post('http://localhost:4003/events', event);
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Event-Bus Listening on 4005');
});