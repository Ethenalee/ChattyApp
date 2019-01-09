import React, {Component} from 'react';

class ChatBar extends Component {
  pressKey = (e) => {
    if(e.key === "Enter") {
      this.props.addMessage(e.target.parentElement);
      e.target.value = "";
      console.log(this.props.currentUser.name);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.pressKey} />
      </footer>
    );
  }

}
export default ChatBar;


