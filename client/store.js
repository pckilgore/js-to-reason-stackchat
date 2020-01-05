import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import loggingMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import socket from "./socket";

// INITIAL STATE

const initialState = {
  messages: [],
  name: "ReasonML Worldstar",
  newMessageEntry: "",
  channels: []
};

// ACTION TYPES

const UPDATE_NAME = "UPDATE_NAME";
const GET_MESSAGE = "GET_MESSAGE";
const GET_MESSAGES = "GET_MESSAGES";
const WRITE_MESSAGE = "WRITE_MESSAGE";
const GET_CHANNELS = "GET_CHANNELS";
const GET_CHANNEL = "GET_CHANNEL";

// ACTION CREATORS

export const updateName = name => {
  return { type: UPDATE_NAME, name };
};

export const getMessage = message => {
  return { type: GET_MESSAGE, message };
};

export const getMessages = messages => {
  return { type: GET_MESSAGES, messages };
};

export const writeMessage = content => {
  return { type: WRITE_MESSAGE, content };
};

export const getChannels = channels => {
  return { type: GET_CHANNELS, channels };
};

export const getChannel = channel => {
  return { type: GET_CHANNEL, channel };
};

// THUNK CREATORS

export const fetchChannels = channels => {
  return async dispatch => {
    const response = await axios.get("/api/channels");
    const channels = response.data;
    dispatch(getChannels(channels));
  };
};

export const postChannel = (channel, history) => {
  return async dispatch => {
    const { data: newChannel } = await axios.post("/api/channels", channel);
    dispatch(getChannel(newChannel));
    socket.emit("new-channel", newChannel);
    history.push(`channels/${newChannel.id}`);
  };
};

export const fetchMessages = () => {
  return async dispatch => {
    const response = await axios.get("/api/messages");
    const messages = response.data;
    const action = getMessages(messages);
    dispatch(action);
  };
};

export const postMessage = message => {
  return async dispatch => {
    const response = await axios.post("/api/messages", message);
    const newMessage = response.data;
    const action = getMessage(newMessage);
    dispatch(action);
    socket.emit("new-message", newMessage);
  };
};

// REDUCER

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.channel]
      };

    case GET_CHANNELS:
      return { ...state, channels: action.channels };

    case UPDATE_NAME:
      return {
        ...state,
        name: action.name
      };

    case GET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      };

    case GET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };

    case WRITE_MESSAGE:
      return {
        ...state,
        newMessageEntry: action.content
      };

    default:
      return state;
  }
};

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggingMiddleware))
);

export default store;
