import React, { PropTypes } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import axios from 'axios';
import { Media } from 'react-bootstrap';

/*
Note to user: 
This file is the rendered list of messages that are downloaded from the database. 
"Messages" is a prop passed in from the store. 
See that those that render are only those that will be specific to the room, i.e. 
through the "filtered" variable declared upfront

Each message is a Message component, written in the Message.js file

In the return statement, you'll see that the name of the current room is initially rendered,
based on whether the room itself is marked as a Channel vs. Direct Message room
*/

class MessageList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      socket: false,
    }
  }

  componentDidMount() {
    this.node.scrollTop = this.node.scrollHeight
  }

  componentDidUpdate() {
    // this.node.scrollIntoView();
    console.log(this.node.scrollTop, this.node.scrollHeight, this.node.clientHeight);
    if(!this.state.socket) this.node.scrollTop = this.node.scrollHeight;
    else if(this.node.scrollTop - this.node.scrollHeight === this.node.clientHeight)  this.node.scrollTop = this.node.scrollHeight;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.messages[nextProps.messages.length - 1].id > 1000000000) {
      this.setState({socket: true});
    }
    // Scroll to the bottom on initialization
    // var len = this.filtered.length - 1;
    // const node = ReactDOM.findDOMNode(this['_div' + len]);
    // console.log("len: ",len," ","node: ",node)
    // if (node) {
    //   node.scrollIntoView();
    // }
  }

  // componentDidUpdate() {
  //   // Scroll as new elements come along
  //   var len = this.filtered.length - 1;
  //   const node = ReactDOM.findDOMNode(this['_div' + len]);
  //   if (node) {
  //     node.scrollIntoView();
  //   }
  // }

  render() {
    this.filtered = this.props.messages.filter(message => {
      return message.channelName === this.props.currentRoom.channelName || message.channelName === undefined;
    })    
    return (
      <div>
        <h4>
          {(this.props.currentRoom.aliasName === "Channel_NotDM") ? ("You are in channel: " + this.props.currentRoom.channelName) : 
          ("Private chat between " + this.props.currentRoom.user2username + " and " + this.props.currentRoom.user1username) }
        </h4>
        
        <div className="chatBody" ref={node => this.node = node}>
          <div id="messages">
            {this.filtered.map((message,i) => 
              <Message
                key={message.id}
                username={message.username}
                text={message.text}
                created_at={message.created_at}
                url={message.url}
                picture={message.picture}
                ref={(ref) => this['_div' + i] = ref }
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    messages: state.allReducers.ChatReducer,
    currentRoom: state.allReducers.CurrentRoomReducer
  }
};

export default connect(mapStateToProps)(MessageList);