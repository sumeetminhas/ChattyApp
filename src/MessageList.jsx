import React, {Component} from 'react';
import Message from './Message.jsx'


class MessageList extends Component {

  render() {
    return (
      <main className="messages">
      {this.props.messages.map((currentMessage)=>{
        if (message.type === 'incomingMessage') {
          return(
            <Message username={currentMessage.username} content={currentMessage.content} key={currentMessage.id} />
        );
    } else {
        return( <div className="message system">{message.content}</div>
          );
      }
    })}
    </main>
    );
  }
}
export default MessageList;