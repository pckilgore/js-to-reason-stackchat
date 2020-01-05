import React from "react";
import PropTypes from "prop-types";
import NameEntry from "./NameEntry";
import { connect } from "react-redux";

export default connect(({ channels }) => ({ channels }))(Navbar);

function Navbar({ location, channels }) {
  const view = location.pathname.split("/").pop();

  let channelName = "Loading...";
  if (view && channels.length) {
    let channel = channels[view - 1];
    channelName = channel ? channel.name : view ? view : "Error";
  }

  return (
    <nav>
      <h3># {channelName}</h3>
      <NameEntry />
    </nav>
  );
}

Navbar.propTypes = {
  location: PropTypes.object.isRequired,
  channels: PropTypes.array.isRequired
};
