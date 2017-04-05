import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import Messagelist from './MessageList.jsx'


export default class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    currentUser: {name: "Bob"},
    messages:[
    {username: "Bob", content: "Has anyone seen my marbles?",
    },
    {username: "Anonymous", content: "You lost them for good."}
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

render() {
}
  render() {
    return (
      <div>
        <Messagelist messages={this.state.messages} />
        <Chatbar currentUser={this.state.currentUser} />
      </div>
    );
  }
}
