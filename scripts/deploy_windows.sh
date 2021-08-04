#!/usr/bin/sh

cd wwww
git init
heroku repo:reset --app scream-into-void && heroku git:remote -a scream-into-void
git add . && git commit -m "Deploying" && git push heroku main
cd ..