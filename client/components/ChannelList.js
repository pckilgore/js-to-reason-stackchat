import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

function ChannelList(props) {
  const { messages, channels } = props;
  const isMessageInChannel = id => message => message.channelId === id;

  return (
    <ul>
      {channels.map(channel => (
        <li key={channel.id}>
          <NavLink to={`/channels/${channel.id}`} activeClassName="active">
            <span># {channel.name}</span>
            <span className="badge">
              {messages.filter(isMessageInChannel(channel.id)).length}
            </span>
          </NavLink>
        </li>
      ))}
      <li>
        <NavLink to="/new-channel">Create a channel...</NavLink>
      </li>
    </ul>
  );
}

ChannelList.propTypes = {
  channels: PropTypes.array,
  messages: PropTypes.array
};

const mapStateToProps = state => {
  return {
    messages: state.messages,
    channels: state.channels
  };
};

export default withRouter(connect(mapStateToProps)(ChannelList));
