# Chat-app

Be sure to run commands npm install and npm run dev to start the application. You'll need your own mongo database URI to run functions dependent on data from the DB.
Also, if you wanted to run a build version, the script for that breaks the code, so I still have to figure that out.

The app currently allows for saving new teams (or chatrooms) to a user, loading messages from a selected team, sends messages submitted to the database,
and retrieves messages sent from other users. 

The code that makes use of sockets (among other things) may be spaghetti as I'm still learning to use those.

I would have loved to flesh out proper authentication for user logins and refactored the code to be cleaner where possible.
