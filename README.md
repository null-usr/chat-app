# Scream into Void

React, Socket.io & Node realtime chat application based on [this tutorial](https://morioh.com/p/03d996fac4a8), using TypeScript.

## Prerequisites

* Node 14.15.4

## Project Structure

```
.
├── client
│   ├── build
│   ├── node_modules
│   ├── package.json
│   ├── public
│   ├── README.md
│   ├── src
│   └── yarn.lock
├── docs
├── package.json
├── README.md
├── scripts
│   ├── build_windows.sh
│   └── deploy_windows.sh
├── server
│   ├── dist
│   ├── node_modules
│   ├── nodemon.json
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   ├── tsconfig.json
│   └── yarn.lock
└── www
    ├── client
    ├── node_modules
    ├── package.json
    └── server.js
```

The React code lives in the client directory while the node app lives in the server.


## Build
```
yarn build
```
Executes a build shell script which runs the build scripts in both the server and client directory and copies the created files into www

## Deploy
```
yarn deploy
```
Deploys the application to heroku.

## To Do
- [ ] Docs
- [ ] Debug "Void" room which appears occassionally when joining a room
- [ ] Create a separate package.json to copy into www for deploy
- [ ] Space-themed CSS styling
- [ ] User Authentication (JWT)
- [ ] Models
- [ ] React propTypes
- [ ] aes Encryption 

## Links
https://scream-into-void.herokuapp.com/
