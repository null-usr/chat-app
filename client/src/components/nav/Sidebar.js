import React from 'react'
import { useEffect, useState, useContext } from 'react';

import { SocketContext } from '../../context/socket';

import '../../styles/sidebar.css';

function Sidebar({setRoom, connectToRoom}) {

	const [serverList, setServerList] = useState([]);
	const socket = useContext(SocketContext);

	useEffect(() => {
		queryServers();
	}, []); //called infinitely unless we pass it something to monitor for a change

	useEffect(() => {
		//wait for it to be initialized
		if(socket){
			socket.on('update_rooms', (data) => {
				console.log(`Received: ${data}`);
				setServerList(data);
			});
		}
	});

	const queryServers = async () => {
		console.log("Querying...");
		if(socket){
			await socket.emit('query_rooms');
		}
		else{
			console.log("Socket is null");
		}
	}

	const connectToExistingRoom = (room) => {
		console.log(`Connecting to existing room: ${room}`);
		setRoom(room);
		connectToRoom(room);
	}

	return (
		<div className="sidebar">
			<div>
				<h2>SERVERS</h2>
				<button onClick={ queryServers }>&#x21bb;</button>
			</div>
			<hr />
			<div className="server-list-container">
				{
					serverList.map( val => {
						return <div 
							onClick={ () => connectToExistingRoom( val ) } 
							className="server-list-item" key={val}>{val}</div>
					})
				}
			</div>
		</div>
	)
}

export default Sidebar

