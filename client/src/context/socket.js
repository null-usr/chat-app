//https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65
import React from 'react';
import socketio from "socket.io-client";
// import { SOCKET_URL } from "config";

export const CONNECTION_PORT = 'localhost:8080';
// export const socket = socketio.connect(CONNECTION_PORT);
export const socket = socketio.connect();
export const SocketContext = React.createContext();