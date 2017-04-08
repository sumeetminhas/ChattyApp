import React, {Component} from 'react';
import Message from './Message.jsx'
import Notices from './Notices.jsx'

class MessageList extends Component {

  render() {
    return(
      <main className="messages">
      {this.props.messages.map((currentMessage)=>{
        return <Message username={currentMessage.username}
          content={currentMessage.content}
          key={currentMessage.id} />
      })
    }
      <Notices notice = {this.props.notice} />
    </main>
    );
  } //for the render part
} //for the Component part
export default MessageList;