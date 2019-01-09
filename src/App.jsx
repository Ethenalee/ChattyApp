import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
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

  getRandom = (min) => {
    return Math.random() + min;
  }

  addMessage = (content) => {
    const newMessage = {id: this.getRandom(3), username: this.state.currentUser.name, content: content};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }


}
export default App;
