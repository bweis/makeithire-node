# Make It Hire

[![TravisCI](https://travis-ci.org/mozrila/makeithire-node.svg?branch=master)](https://travis-ci.org/mozrila/makeithire-node)

## Running locally

```
git clone https://github.com/mozrila/makeithire-node.git
cd MakeItHire
npm i           // This installs all your node modules

gulp tranform   // This builds the WebApp if you made any changes **Might need to install gulp-cli globally to run**

npm start       // This starts both the web server and API server

// MAKE SURE YOU HAVE ALL THE ENVIRONMENT VARIABLES SET WHEN RUNNNG LOCALLY
```

## Automatic Deployment

The app is ready to be deployed to Heroku.

In production, Heroku will use `Procfile` which boots just the server:

```
web: npm run server
```
