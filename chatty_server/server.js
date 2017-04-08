const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
// Set the port to 3001
const PORT = 3001;

//keep track of connected users
let connectedUsers = 0;
const USERS =[];

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

SocketServer.prototype.broadcast = function broadcast(data) {
  this.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};

function isUserConnect(connected) {

  const newNotification = {};
  newNotification.id = uuid.v1();
  newNotification.type = 'incomingNotification';
  newNotification.content =  connected ? 'A user connected!' : 'A user disconnected!';
  console.log(newNotification);
  wss.broadcast(newNotification);

  //counting connected users
  connected ? connectedUsers++ : connectedUsers--;
  const usersOnline = {
       type: 'usersOnline',
       content: connectedUsers
  }
  wss.broadcast(usersOnline);
} //function isUserconnect ends here

wss.on('connection', (ws) => {
  console.log('Client connected');

  //counting connected users
  isUserConnect(true);

  ws.on('message', (message) => {
    let chatMessage = JSON.parse(message);
    chatMessage.id = uuid.v1();
    switch(chatMessage.type) {
      case 'postNotification':
        chatMessage.type = 'incomingNotification';
        break;
      case 'postMessage':
        chatMessage.type = 'incomingMessage';
        break;
    }
    wss.broadcast(chatMessage);
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => isUserConnect(false));
});