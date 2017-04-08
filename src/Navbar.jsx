import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a className="navbar-brand">Chatty</a>
        <h2 className="navbar-usersCount">Users Online: {this.props.usersCount} </h2>
      </nav>
    );
  }
}
export default Navbar;