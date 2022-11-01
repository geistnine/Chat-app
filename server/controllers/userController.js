const User = require('../models/chatAppModels');

const userController = {}

userController.createUser = (req, res, next) => {
  console.log(req.body);
  const newUser = new User({username: req.body.name, password: req.body.password});
  newUser.save(function (err) {
    if (err) res.status(400).send('Error saving to database: ', err)
    res.status(200).json(newUser);
  })
}

userController.verifyUser = (req, res, next) => {
  User.findOne({username: req.body.name}).exec()
    .then(data => {
      console.log(data);
      if (data.password === req.body.password){
        res.locals.user = {username: data.username, password: data.password};
        return next();
      } else res.status(400).send('Error, password mismatch in database');
    })
    .catch(err => res.status(400).send('Error in database query, ', err))
}

module.exports = userController;