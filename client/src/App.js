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

  //MOVED TO CONTEXT
  //useEffect for whenever we log into the application, we can do this
//   useEffect(() => {
//     //initializes the connection
//     socket = io(CONNECTION_PORT);
//   }, [CONNECTION_PORT]); //called infinitely unless we pass it something to monitor for a change


  	//callbacks =============================================================
  	//for connecting to our room
	const connectToRoom = (room) => {

	console.log(`Room and Username: ${room} ${userName}`);

	if(userName && room && room !== "Void"){
		socket.emit('join_room', room );
		console.log("Joined room");
		setLoggedIn(true);
	}
	else{
		if(!userName){
			alert("Please input a username!");
		}
		if(!room){
			alert("Please input a server name or join an existing server!");
		}
		if(room === "Void"){
			alert("You're already in the void! Scream.");
		}
		
	}

  }

  //for disconnecting
  const disconnectFromRoom = () => {
	  socket.emit('leave_room');
	  console.log("Left room");
	  setRoom('Void');
	  setLoggedIn(false);
  }

  return (
    <div className="App">
		
      {/* HEADER */}
      <div>
		<Header room={room}></Header>

		{/* https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65 */}
		<SocketContext.Provider value={socket}>
			
				<div className="main-content">
					<Sidebar 
						setRoom={setRoom} 
						connectToRoom={connectToRoom}></Sidebar>

					{/* replace this section with either the login or chat */}
					{
						!loggedIn ? 
						(
							<Login userName={userName} setUserName={setUserName} setRoom={setRoom} connectToRoom={connectToRoom}></Login>
						) : 
						(
							<Chat userName={userName} room={room}></Chat>
						)
					}
				</div>

				{/* back button */}
				{
					loggedIn && 
						<button onClick={disconnectFromRoom} className="back-button">
							&larr;
							EXIT
						</button>	
				}

			
		</SocketContext.Provider>
		
      </div>
      
    </div>
  );
}

export default App;
