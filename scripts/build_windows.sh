#!/usr/bin/sh

cd client
yarn build -p 
cd ../server
yarn build:windows
cd .. 
mkdir www
cp server/dist/* www
mkdir www/client
cp -R client/build/* www/client/
cp .gitignore www