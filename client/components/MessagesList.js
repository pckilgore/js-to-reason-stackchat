import React, { Component } from "react";
import { connect } from "react-redux";
import Message from "./Message";
import NewMessageEntry from "./NewMessageEntry";

class Messages extends Component {
  render() {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.props.messages;
    const filteredMessages = messages.filter(
      message => message.channelId === channelId
    );

    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map(message => (
            <Message message={message} key={message.id} />
          ))}
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Messages);
