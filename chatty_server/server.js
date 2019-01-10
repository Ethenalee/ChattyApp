const express = require('express');
const SocketServer = require('ws').Server;
const http = require('http');
const uuid = require('uuid/v4');
const WebSocket = require('ws');
const color = ['CornflowerBlue ', 'DarkBlue', 'SlateBlue', 'MidnightBlue'];
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
   // Make the express server serve static assets (html, javascript, css) from the /public folder

// Create the WebSockets server
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
  console.log('Client connected');
  // once its connect send users with updated num
  wss.broadcastJSON({
    users: addUsers(user),
    type: 'userlogin'
  });
  // receiving message from client
  ws.on('message', function incoming(data) {
    const obj = JSON.parse(data);
    console.log(`user ${obj.username} said ${obj.content}`);
    const objectToBroadcast = {
      id: obj.id,
      content: obj.content,
      username: obj.username,
      color: obj.color,
      type: obj.type
    };
    wss.broadcastJSON(objectToBroadcast);
  });
  ws.on('close', function close() {
    console.log('Client disconnected')
    // once its disconnect send users with updated num
    wss.broadcastJSON({
      users: deleteUsers(user),
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