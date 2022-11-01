const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const userController = require('./controllers/userController');
const mongoose = require('mongoose');
const User = require('./models/chatAppModels');
const mongoURI = 'mongodb+srv://CSSteve:codesmith@testcluster.28mgi2o.mongodb.net/?retryWrites=true&w=majority';



console.log('ay')
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'chatapp'
})
  .then(() => console.log('Connected to Mongo DB'))
  .catch(err => console.log(err));



app.use(express.json());
app.use(cors());

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

const server = app.listen(3000, () => {
  console.log('Listening on port 3000');
})
