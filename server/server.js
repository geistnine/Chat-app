const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const userController = require('./controllers/userController');

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

// login using existing credentials
app.post('/users', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.user);
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