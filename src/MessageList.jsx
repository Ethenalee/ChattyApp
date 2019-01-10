import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {/*render one message component for each message*/}
        {this.props.messages.map(message => <Message message = {message} key = {message.id} />)}
      </main>
    );
  }
}
export default MessageList;