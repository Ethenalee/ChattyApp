import React, {Component} from 'react';

class Message extends Component {
  // check content is img or not
  checkImg = () => {
    let regex = /.*(https?:\/\/.*\.(?:png|jpg|gif))/i;
    if(this.props.message.content.match(regex)) {
      return (
        <div>
          <span>{this.props.message.content.match(regex)[0].replace(this.props.message.content.match(regex)[1], '')}</span><br />
          <img className="img" src={this.props.message.content.match(regex)[1]} />
        </div>
        )
    } else {
      return this.props.message.content;
    }
  };
  // check Msg is notification or content user type
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
  };

  render() {
    return (
        <div className="message">
          {this.checkMsg()}
        </div>
    );
  }
}
export default Message;