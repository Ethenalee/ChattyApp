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
      if(json.type === 'client_content' || json.type === 'client_notification') {
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
          <MessageList messages={this.state.messages} currentUser={this.state.currentUser}/>
      {/*Pass currentUser using props*/}
          <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} changeName={this.changeName} />
      </div>
    );
  }

  changeName = (newName) => {
    if(this.state.currentUser.name !== newName) {
      this.socket.send(JSON.stringify({
        id: uuid(),
        username: '',
        content: `${this.state.currentUser.name} has changed their username to ${newName}`,
        type: 'client_notification'
      }))
      this.setState({currentUser: {name: newName}})
    }
  };
  //addMessage and change currentUser//
  addMessage = content => {
    if(content.firstChild.value !== '' && content.lastChild.value !== '') {
      if(this.state.currentUser.name != content.firstChild.value) {
        this.changeName(content.firstChild.value)
      }
      this.socket.send(JSON.stringify({
        id: uuid(), username: this.state.currentUser.name, content: content.lastChild.value, color: this.state.currentColor, type: 'client_content'
      }));
    }
  };
}
export default App;
