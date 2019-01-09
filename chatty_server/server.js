const express = require('express');
const SocketServer = require('ws').Server;
const http = require('http');
const uuid = require('uuid/v4');
const WebSocket = require('ws');


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

  ws.on('message', function incoming(data) {
    const obj = JSON.parse(data);
    console.log(`user ${obj.username} said ${obj.content}`);

    const objectToBroadcast = {
      id: obj.id,
      content: obj.content,
      username: obj.username
    };

  wss.broadcastJSON(objectToBroadcast);

  });

  ws.on('close', () => console.log('Client disconnected'));
});

server.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));