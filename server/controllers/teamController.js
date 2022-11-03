const Team = require('../models/teamsModel');

const teamController = {};

teamController.createTeam = (req, res, next) => {
  // first search for the team passed in by request params
  Team.findOne({name: req.params.team}).exec()
    .then(data => {
      if (data !== null) return next()
      const newTeam = new Team({name: req.params.team, messages: []});
      newTeam.save(function(err) {
        if (err) return res.status(400).json(err);
        console.log(newTeam);
        return next();
      })
    })
  // if data comes back null, create the team in the db
  // if we have a valid result, invoke next without doing anything
}

teamController.postMessage = (req, res, next) => {
  Team.findOne({name: req.params.team}).exec()
    .then(data => {
      if (data !== null) {
        const newMessageArr = [...data.messages]
        newMessageArr.push({
          text: req.body.text,
          sentBy: req.body.sentBy,
          timeSent: req.body.timeSent
        })
        Team.updateOne({name: req.params.team}, {messages: newMessageArr}).exec()
          .then(() => { return next()})

      }
    })
}

module.exports = teamController;