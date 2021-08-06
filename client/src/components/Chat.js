import React from 'react'
import { useEffect, useState, useContext } from 'react';
import Message from './Message';

import { SocketContext } from '../context/socket';

import '../styles/chat.css';

function Chat({userName, room}) {

	const socket = useContext(SocketContext);

	//after login
	const [message, setMessage] = useState('');
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		socket.on('rcv_message', (data) => {
			console.log(`Received: ${data}`);
			setMessageList([...messageList, data]);

			//scroll to bottom of message list
			let msgbox = document.getElementById('message-box');
			msgbox.scrollTop = msgbox.scrollHeight;
		});
	  });

	
	//for sending messages
  	const sendMessage = async () => {
		let content = {
		author: userName,
		message: message
		}
		
		let messageContent = {
			room: room,
			content: content
		};

		await socket.emit('send_message', messageContent );

		setMessageList([...messageList, content]);
		// console.log(messageList);
		setMessage('');

		//scroll to bottom of message list
		let msgbox = document.getElementById('message-box');
		msgbox.scrollTop = msgbox.scrollHeight;
  	}

	const handleKeyPress = (event) => {
		if(event.key === 'Enter'){
			sendMessage();
		}
	}
	
	return (
		<div className="chatContainer">
			<div className="messages" id="message-box">
				{ 
					messageList.map((val, key) => {
						{/* additional "me" css added if the message belongs to me to float it to the right instead of left */}
							return <Message key={key} message={val} userName={userName}></Message>
						}
					) 
				}
			</div>
			<div className="message-input">
				{/* https://stackoverflow.com/questions/63550906/clear-input-field-using-react-hooks */}
				<input type="text" value={message} 
					placeholder="Message..." 
					onChange={ (e) => { setMessage(e.target.value)} }
					onKeyPress={ handleKeyPress } />
				<button onClick={ sendMessage } >Send</button>
			</div>
    	</div>
	)
}

export default Chat

