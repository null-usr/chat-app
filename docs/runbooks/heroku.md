Before deploying, navigate to your build directory and run heroku local web to ensure it runs correctly.

Create a new app on heroku either via heroku.com or using 
```
heroku login
heroku create
```

If you used heroku create, all you need to do is git push heroku master, otherwise you need to initialize git and add the heroku remote using
```
heroku git:remote -a <app-name>
```

git add, commit and then push to heroku master

Log in with your username and auth token

NOTE: It MUST be heroku master, not heroku main
NOTE: If you have a build and clean in your package.json it must work