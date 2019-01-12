import React, {Component} from 'react';

class ChatBar extends Component {
  // add message
  pressKey = (event) => {
    if(event.key === "Enter") {
      this.props.addMessage(event.target.parentElement);
      event.target.value = "";
    }
  };
  // change name
  changeName = (event) => {
    if(event.key === "Enter") {
      this.props.changeName(event.target.value);
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


