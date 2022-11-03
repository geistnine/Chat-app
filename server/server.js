const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const userController = require('./controllers/userController');
const teamController = require('./controllers/teamController');

// MONGODB
const mongoose = require('mongoose');
const User = require('./models/chatAppModels');
const mongoURI = 'mongodb+srv://CSSteve:codesmith@testcluster.28mgi2o.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'chatapp'
})
.then(() => console.log('Connected to Mongo DB'))
.catch(err => console.log(err));


// SERVER
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
const io = socketio(server);

app.get('/api/', (req, res) => {
  return res.status(200).send('I got nothing yet!');
})

// create a new user
app.post('/register', userController.createUser, (req, res) => {
  
})

// find user
app.get('/users/:name', userController.findUser, (req, res) => {
  res.status(200).json(res.locals.user)
})

// login using existing credentials
app.post('/users', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.user);
})

// update the teams of an existing user
app.put('/users', userController.addTeam, (req, res) => {
  res.status(200).send('Updated teams');
})


// create a new team in db
app.get('/teams/:team', teamController.createTeam, (req, res) => {
  res.status(200).send('Created new team in db')
})

// post messages to a particular team entry in database
app.post('/messages/:team', teamController.postMessage, (req, res) => {
  res.status(200).send('Posted message to db')
})

// retrieve messages from db
app.get('/messages/:team', teamController.getMessages, (req, res) => {
  res.status(200).json(res.locals.messages);
})


app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
})

io.on('connection', socket => {
  console.log('New websocket connection!');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// TODO: socket.on chat message listener, should emit message to all connected sockets

server.listen(3000, () => console.log('Server listening on port 3000'))