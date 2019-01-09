import React, {Component} from 'react';

class ChatBar extends Component {
  pressKey = (e) => {
    if(e.key === "Enter") {
      this.props.addMessage(e.target.value);
      e.target.value = "";
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.pressKey} />
      </footer>
    );
  }

}
export default ChatBar;


