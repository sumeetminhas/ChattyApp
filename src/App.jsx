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

// componentDidMount() {
//   setTimeout(() => {
//     this.setState({loading: true})
//   }, 3000)
// }

  render() {
    return (
      <div>
        <Messagelist messages={this.state.messages} />
        <Chatbar currentUser={this.state.currentUser} />
      </div>
    );
  }
}
