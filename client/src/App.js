import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

import { SocketContext, socket } from './context/socket';

import Header from './components/nav/Header';
import Sidebar from './components/nav/Sidebar';
import Login from './components/Login';
import Chat from './components/Chat';

//create our socket and port for the connection port
// let socket;
// const CONNECTION_PORT = 'localhost:8080';

function App() {

  //states and inputs
  //before login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState('Void');
  const [userName, setUserName] = useState('');

  //useEffect for whenever we log into the application, we can do this
//   useEffect(() => {
//     //initializes the connection
//     socket = io(CONNECTION_PORT);
//   }, [CONNECTION_PORT]); //called infinitely unless we pass it something to monitor for a change


  //callbacks ========================================================
  //for connecting to our room
  const connectToRoom = () => {
	if(userName){
		socket.emit('join_room', room );
		console.log("Joined room");
		setLoggedIn(true);
	}
	else{
		alert("Please input a username!");
	}
  }

  const disconnectFromRoom = () => {
	  socket.emit('leave_room');
	  console.log("Left room");
	  setLoggedIn(false);
  }

  return (
    <div className="App">
		
      {/* HEADER */}
      <div>
		<Header></Header>

		{/* https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65 */}
		<SocketContext.Provider value={socket}>
			{
				!loggedIn ? 
				(
					<div className="main-content">
						<Sidebar 
							setRoom={setRoom} 
							connectToRoom={connectToRoom}></Sidebar>
						<Login userName={userName} setUserName={setUserName} setRoom={setRoom} connectToRoom={connectToRoom}></Login>
					</div>
				) : 
				(
					<div>
						<div className="main-content">
							<Sidebar 
								setRoom={setRoom} 
								connectToRoom={connectToRoom}></Sidebar>
							<Chat userName={userName} room={room}></Chat>
						</div>
						{/* back button */}
						<button onClick={disconnectFromRoom} className="back-button">
							&larr;
							EXIT
						</button>
					</div>
					
				)
			}
		</SocketContext.Provider>
		
      </div>
      
    </div>
  );
}

export default App;
