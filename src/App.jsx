import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
const uuid = require('uuid/v4');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')
    this.socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    this.socket.onmessage = payload => {
      console.log('Got message from server', payload);
      const json = JSON.parse(payload.data);

      this.setState({
        messages: [...this.state.messages, json]
      });

      }

    this.socket.onclose = () => {
      console.log('Disconnected from the WebSocket');
    };

  }

  render() {
    return (
    <div>
    <nav className="navbar">
    <img className="navbar-logo" src={require('./logo.png')} />
    <a href="/" className="navbar-brand">Chatty</a>
    </nav>
      {/*Pass messages using props*/}
      <MessageList messages={this.state.messages} />
      {/*Pass currentUser using props*/}
      <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} />
      </div>
    );
  }


  addMessage = content => {
    if(content.firstChild.value !== '' && content.lastChild.value !== '') {
      this.socket.send(JSON.stringify({
        id: uuid(), username: content.firstChild.value, content: content.lastChild.value
      }));
      this.setState({currentUser: {name: content.firstChild.value}})
    }
  }


}
export default App;
