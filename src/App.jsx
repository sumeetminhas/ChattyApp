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
    usersOnline: ''
  }
  this.appendMessage = this.appendMessage.bind(this);
  this.postNotification = this.postNotification.bind(this);
};


componentDidMount() {
  console.log("componentDidMount <App />");
  this.socket = new WebSocket('ws://localhost:3001');
  this.socket.onopen = function() {
    console.log("Connected to server");
  };
  this.socket.onmessage = (messageEvent) => {
    const newMessage = JSON.parse(messageEvent.data);
    switch (newMessage.type) {
      case 'incomingNotification':
        this.setState({notice: newMessage.content});
        break;
      case 'incomingMessage':
        const allMessages = this.state.messages.concat(newMessage);
        this.setState({messages: allMessages});
        break;
      case 'usersOnline':
        this.setState({usersOnline: newMessage.content});
        break;
      default:
        console.log('Unknown type', newMessage);
        break;
    }
  }
}

appendMessage(data) {
  let stateMessages = this.state.messages;
  // console.log(data);
  const chatMessage = {
    type: 'postMessage',
    username: data.username,
    content: data.content
  };
  const messages = stateMessages.concat(chatMessage);
  this.socket.send(JSON.stringify(chatMessage));
}

postNotification(content) {
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
        <Navbar usersOnline={this.state.usersOnline} />
        <MessageList messages={this.state.messages} notice={this.state.notice} />
        <Chatbar currentUser={this.state.currentUser} appendMessage={this.appendMessage} postNotification={this.postNotification} />
      </div>
    )
  }
}
