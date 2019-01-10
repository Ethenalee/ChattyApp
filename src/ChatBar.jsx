import React, {Component} from 'react';

class ChatBar extends Component {
  // add message
  pressKey = (e) => {
    if(e.key === "Enter") {
      this.props.addMessage(e.target.parentElement);
      e.target.value = "";
    }
  };
  // change name
  changeName = (e) => {
    if(e.key === "Enter") {
      this.props.changeName(e.target.value);
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} onKeyPress={this.changeName} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.pressKey} />
      </footer>
    );
  }
}
export default ChatBar;


