const User = require('../models/chatAppModels');

const userController = {}

userController.createUser = (req, res, next) => {
  console.log(req.body);
  const newUser = new User({username: req.body.name, password: req.body.password, teams: ['default']});
  newUser.save(function (err) {
    if (err) res.status(400).send('Error saving to database: ', err)
    res.status(200).json(newUser);
  })
}

userController.findUser = (req, res, next) => {
  User.findOne({username: req.params.name}).exec()
    .then(data => {
      res.locals.user = data
      return next();
    })
    .catch(err => res.status(400).send('Error in findUser middleware, ', err));
}

userController.verifyUser = (req, res, next) => {
  User.findOne({username: req.body.name}).exec()
    .then(data => {
      console.log(data);
      if (data.password === req.body.password){
        res.locals.user = {username: data.username, password: data.password, teams: data.teams};
        return next();
      } else res.status(400).send('Error, password mismatch in database');
    })
    .catch(err => res.status(400).send('Error in database query, ', err))
}

userController.addTeam = (req, res, next) => {
  User.findOneAndUpdate({username: req.body.name}, {teams: req.body.teams}).exec()
    .then(data => {
      return next();
    })
    .catch(err => res.status(400).send('Error in database update query, ', err));
}

module.exports = userController;