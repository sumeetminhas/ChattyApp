import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: '',
      username: this.props.currentUser.name
    };
    this.updateMessage = this.updateMessage.bind(this);
    this.enterMessage = this.enterMessage.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.enterUsername = this.enterUsername.bind(this);
  }

  updateMessage(event) {
    this.setState({newMessage: event.target.value});
  }

  enterMessage(event) {
    if (event.key === 'Enter') {
      const data = {
        username: this.state.username,
        content: event.target.value
      }
      {this.props.appendMessage(data)}
  }
}
enterUsername(event) {
  if (event.key === 'Enter') {
    const newNotification = {
      username: event.target.value
    }
    {this.props.postNotification(newNotification)}
  }
}

updateUsername(event) {
  console.log(event);
  this.setState({username: event.target.value});

}
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
        type="text" placeholder="Your Name (Optional)"
        value={this.state.username}
        onChange={this.updateUsername}
        onKeyPress={this.enterUsername} />

        <input className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        value={this.state.newMessage}
        onChange={this.updateMessage}
        onKeyPress={this.enterMessage} />
      </footer>
    );
  }
}
export default Chatbar;
