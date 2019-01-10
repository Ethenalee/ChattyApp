import React, {Component} from 'react';

class Message extends Component {
  checkImg = () => {
    if(this.props.message.content.includes('jpg', 'png','gif')) {
      return <img className="img" src={this.props.message.content} />
    } else {
      return this.props.message.content;
    }
  }
  checkMsg = () => {
    if(this.props.message.type === 'client_notification') {
      return (
        <div className="notification">
          <span className="notification-content">{this.props.message.content}</span>
        </div>
      )
    } else if(this.props.message.type === 'client_content') {
      return (
        <div className="usermessage">
          <span className="message-username" style = {{color: this.props.message.color}} >{this.props.message.username}</span>
          <span className="message-content">{this.checkImg()}</span>
        </div>
      )
    }
  }

  render() {
    return (
        <div className="message">
          {this.checkMsg()}
        </div>
    );
  }
}
export default Message;