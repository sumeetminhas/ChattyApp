import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import Messagelist from './MessageList.jsx'


class App extends Component {
  render() {
    return (
      <div>
        <Messagelist />
        <Chatbar />
      </div>
    );
  }
}
export default App;
