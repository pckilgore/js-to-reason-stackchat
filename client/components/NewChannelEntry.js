import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postChannel } from "../store";

const NewChannelEntry = props => {
  const [name, setName] = React.useState("");
  const handleSubmit = () => {
    props.postChannel({ name });
    setName("");
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Create a Channel</label>
        <input
          className="form-control"
          type="text"
          name="channelName"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter channel name"
        />
      </div>
      <div className="form-group">
        <button
          type="button"
          className="btn btn-default"
          onClick={handleSubmit}
        >
          Create Channel
        </button>
      </div>
    </form>
  );
};

NewChannelEntry.propTypes = {
  postChannel: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postChannel: channel => dispatch(postChannel(channel, ownProps.history))
  };
};

export default connect(null, mapDispatchToProps)(NewChannelEntry);
