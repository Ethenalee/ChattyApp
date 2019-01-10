import React, {Component} from 'react';

class Message extends Component {
  checkImg = () => {
    if(this.props.message.content.includes('jpg', 'png','gif')) {
      return <img className="img" src={this.props.message.content} />
    } else {
      return this.props.message.content;
    }
  }


  render() {
    return (
        <div className="message">
          <span className="message-username" style = {{color: this.props.message.color}} >{this.props.message.username}</span>
          <span className="message-content">{this.checkImg()}</span>
        </div>
    );
  }
}
export default Message;