import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'
import Navbar from './Navbar.jsx'


export default class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    currentUser: {name: "Anonymous"},
    messages:[],
    notice:'',
    usersCount: 0
  }
  this.appendMessage = this.appendMessage.bind(this);
  this.postNotification = this.postNotification.bind(this);
};


componentDidMount() {
  console.log("componentDidMount <App />");
  this.socket = new WebSocket('ws://localhost:3001');
  this.socket.onopen = function() {
    console.log("Connected to server");
    const that = this;
  };
  this.socket.onmessage = (messageEvent) => {
    const newMessage = JSON.parse(messageEvent.data);
    if (newMessage.type === "incomingNotification") { //set up to generate the Notices that the user has changed name
      this.setState({notice: newMessage.content});
    }
    else { //runs when the user sends a message
      const allMessages = this.state.messages.concat(newMessage);
      this.setState({messages: allMessages});
    }
    case 'users'
  }
}

appendMessage(data) {
  let stateMessages = this.state.messages;
  console.log(data);
  const chatMessage = {
    type: 'postMessage',
    username: data.username,
    content: data.content
  };
  const messages = stateMessages.concat(chatMessage);
  this.socket.send(JSON.stringify(chatMessage));
}

postNotification(content) {
  console.log("state.CurrentUser.name = ",this.state.currentUser.name);
  console.log(content.username);
  const new_username = content.username;
  if (this.state.currentUser.name !== new_username) {

  const newNotification = {
    type: 'postNotification',
    username: content.username,
    content: `**${this.state.currentUser.name}** changed their name to **${new_username}**`
  }
  this.setState ({
    currentUser: {
      name: new_username
    }
  })
  this.socket.send(JSON.stringify(newNotification));
  }
}

  render() {
    return (
      <div>
        <Navbar usersCount={this.state.usersCount} />
        <MessageList messages={this.state.messages} notice={this.state.notice} />
        <Chatbar currentUser={this.state.currentUser} appendMessage={this.appendMessage} postNotification={this.postNotification} />
      </div>
    )
  }
}
