import React, {Component} from 'react';

class Notices extends Component {

  render() {
    return (
      <div className = "message-system">
        <span>{this.props.notice}</span>
      </div>
    );//return ends here
  }//render ends here
} //component ends here
export default Notices;