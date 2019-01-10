import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
const uuid = require('uuid/v4');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      currentColor: '',
      users: ''
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')
    this.socket.onopen = () => {
      console.log('Connected to WebSocket');
    };
    // receiving message from server
    this.socket.onmessage = payload => {
      console.log('Got message from server', payload);
      const json = JSON.parse(payload.data);
      if(json.type === 'client_content') {
        this.setState({
          messages: [...this.state.messages, json]
        });
      } else if(json.type === 'client_connect') {
        this.setState({currentColor: json.color})
      } else if(json.type === 'userlogin') {
        this.setState({users: json.users})
      } else if(json.type === 'userlogout') {
        this.setState({users: json.users})
      }
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
              <h3 className="online"> {this.state.users} Online </h3>
          </nav>
      {/*Pass messages using props*/}
          <MessageList messages={this.state.messages} />
      {/*Pass currentUser using props*/}
          <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} />
      </div>
    );
  }

  //addMessage and change currentUser//
  addMessage = content => {
    if(content.firstChild.value !== '' && content.lastChild.value !== '') {
      this.socket.send(JSON.stringify({
        id: uuid(), username: content.firstChild.value, content: content.lastChild.value, color: this.state.currentColor
      }));
      this.setState({currentUser: {name: content.firstChild.value}})
    }
  }
}
export default App;
