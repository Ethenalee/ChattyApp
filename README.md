# Chatty App
> Chatty will allow users to communicate with each other without having to register accounts. It will assign different color for different user and also can send img if you type img address.
It will use React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

## Final project

When first user login
!["firstuser"](https://github.com/Ethenalee/ChattyApp/blob/master/doc/one%20client.png?raw=true)
When second user login
When they change their name there is the notification also when they type message show to every user
!["twouser"](https://github.com/Ethenalee/ChattyApp/blob/master/doc/two%20client.png?raw=true)
When third user login
Each user have their own color
Although client change their username, their color does not change
!["three user"](https://github.com/Ethenalee/ChattyApp/blob/master/doc/three%20client.png?raw=true)
Send img valification
only http://--.jpg type address can be shown img
!["img"](https://github.com/Ethenalee/ChattyApp/blob/master/doc/img.png?raw=true)
Send img with message
whatever you type it will popup with img
!["img"](https://github.com/Ethenalee/ChattyApp/blob/master/doc/img%20with%20message.png?raw=true)
When user logout the count change
!["oneuserlogout"](https://github.com/Ethenalee/ChattyApp/blob/master/doc/logout.png?raw=true)
Still they can chat after other user left
!["oneuserlogout"](https://github.com/Ethenalee/ChattyApp/blob/master/doc/after%20one%20user%20logout.png?raw=true)
Send by typing /giphy
!["giphyfeature"](https://github.com/Ethenalee/ChattyApp/blob/master/doc/giphy.png?raw=true)


## Usage
Share messages and pictures without having to register accounts.

## Features
* When any connected user sends a chat message, all connected users receive and display the message
* When any connected user changes their name, all connected users are notified of the name change
* Header will display the count of connected users
* When the number of connected users changes, this count will be updated for all connected users
* Different users' names will each be coloured differently
* Send image with image address only
* Send gif through Giphy API

## Dependencies
- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- babel-preset-stage-0
- css-loader
- eslint
- eslint-plugin-react
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- babel-install
- react
- react-dom
- url-loader
- uuid
- webpack-dev-server

## Server side Dependencies
- dotenv
- exact
- express
- node-fetch
- querystring
- uuid
- ws

## Development setup

- Install all dependencies using 'npm install' command
- Go to chatty_server folder and Install all server side dependencies using 'npm install' command
- create .env file in chatty_server folder and type gipy API in order to use giphy feature. Type this 'GIPHY_TOKEN=yourOwnAPIAddress' into .env file

## Release History

* 0.0.1 First release
