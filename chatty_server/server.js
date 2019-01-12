const express = require('express');
const SocketServer = require('ws').Server;
const http = require('http');
const uuid = require('uuid/v4');
const WebSocket = require('ws');
require('dotenv').config();
const fetch = require('node-fetch');
const querystring = require('querystring');
const color = ['CornflowerBlue ', 'DarkBlue', 'SlateBlue', 'MidnightBlue'];
let key = process.env.GIPHY_TOKEN;
//initial user is zero
let user = 0;
// add users
const addUsers = () => {
  user += 1;
  return user
}
//delete users
const deleteUsers = () => {
  user -= 1;
  return user
}
//select color from array
const setColor = (color) => {
    const last = color.shift();
    color.push(last);
    return last;
}

// Set the port to 3001
const PORT = 3001;
// Create a new express server
const app = express();

app.get('/', (req, res) => {
  res.send('Hello!');
});

const server = http.createServer(app);
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

wss.on('connection', (ws) => {
  // once its connect send users with updated num
  wss.broadcastJSON({
    users: wss.clients.size,
    type: 'userlogin'
  });
  // receiving message from client
  ws.on('message', function incoming(data) {
    const obj = JSON.parse(data);
    //check message contain giphy or not if contain connect to giphy
    const regex = /^\/giphy(.*)/;
    const matches = obj.content.match(regex);
    if(matches) {
      const qs = querystring.stringify({
        api_key: key,
        tag: matches[1]
      })
      fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
        .then( resp => resp.json())
        .then( json => {
          obj.content = json.data.images.original.url;
          wss.broadcastJSON({
            id: obj.id,
            content: obj.content,
            username: obj.username,
            type: obj.type,
            color: obj.color
          });
        })
    } else {
      const objectToBroadcast = {
        id: obj.id,
        content: obj.content,
        username: obj.username,
        color: obj.color,
        type: obj.type
      };
      wss.broadcastJSON(objectToBroadcast);
    }
  });
  ws.on('close', function close() {
    // once its disconnect send users with updated num
    wss.broadcastJSON({
      users: wss.clients.size,
      type: 'userlogout'
    });
    }
  );
  //once user connect send set color info
  ws.send(JSON.stringify({
    color: setColor(color),
    type: 'client_connect'
  }));
});

server.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));