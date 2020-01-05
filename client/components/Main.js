import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MessagesList from "./MessagesList";
import NewChannelEntry from "./NewChannelEntry";
import { fetchMessages, fetchChannels } from "../store";

class Main extends Component {
  componentDidMount() {
    this.props.fetchInitialMessages();
    this.props.fetchChannels();
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Navbar location={this.props.location} />
        <main>
          <Switch>
            <Route path="/new-channel" component={NewChannelEntry} />
            <Route path="/channels/:channelId" component={MessagesList} />
            <Redirect to="/channels/1" />
          </Switch>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  fetchInitialMessages: PropTypes.func,
  fetchChannels: PropTypes.func,
  location: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialMessages: () => dispatch(fetchMessages()),
    fetchChannels: () => dispatch(fetchChannels())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Main));
