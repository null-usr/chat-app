Before deploying, navigate to your build directory and run heroku local web to ensure it runs correctly.

Create a new app on heroku either via heroku.com or using 
```
heroku login
heroku create
```

If you used heroku create, all you need to do is git push heroku main, otherwise you need to initialize git and add the heroku remote using
```
heroku git:remote -a <app-name>
```

git add, commit and then push to heroku main