# What is this? 🤔
A simple javascript 'changelogs' website that connects to a repository of choice and displays the data.

# WARNING ⚠️
The CSS is dangerously bad, tread carefully.

# Building & Setup 🔨
Clone the project
In the server directory, create a .env file with the following variables:

*You can get your github api key from : `https://github.com/settings/tokens`*

`GITHUB = ''` < Github Access Token

`REPO = ''` < Repository to fetch from

`OWNER = ''` < Owner of repository

cd into server directory and run `npm start` or `node server.js`

Open another terminal and start the frontend with whatever tools you wish to use, live server, etc.


# Dependencies
> /server

Octokit @ https://www.npmjs.com/package/octokit?activeTab=readme

dotenv @ https://www.npmjs.com/package/dotenv

Express.js @ https://expressjs.com/

Cors @ https://www.npmjs.com/package/cors

Node.JS

> front-end

Node.JS
