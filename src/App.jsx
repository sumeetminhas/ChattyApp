import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import Messagelist from './MessageList.jsx'


export default class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    currentUser: {name: "Bob"},
    messages:[
    {username: "Bob", content: "Has anyone seen my marbles?", id: 1
    },
    {username: "Anonymous", content: "You lost them for good.", id: 2}
    ]
  }
};

componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }, 3000);
}

  chatbarPost(event) {
    if (event.key === 13) {
      const chatMessage = {type: 'postMessage', username: this.state.currentUser.name, content: event.target.value};
      chatMessage.push(event);
      this.setState({})
    }
  }
  render() {
    return (
      <div>
        <Messagelist messages={this.state.messages} />
        <Chatbar currentUser={this.state.currentUser} chatPost={this.chatbarPost.bind(this)} />
      </div>
    );
  }
}
