import React from 'react';
import { useState} from 'react';
import '../styles/login.css';

function Login({userName, setUserName, setRoom, connectToRoom}) {

    const [tmpRoom, setTmpRoom] = useState('');

    const connect = () => {
        setRoom(tmpRoom);
        connectToRoom(tmpRoom);
    }

	return (
		<div className="logIn">
          
            <input type="text" value={userName} placeholder="Name..." onChange={ (e) => {setUserName(e.target.value)} } />
            {/* Change this to optimize, arrow function creates a new function each time component renders
                which isn't great for performance  https://reactjs.org/docs/faq-functions.html*/}
            <input type="text" placeholder="Room..." onChange={ (e) => {setTmpRoom(e.target.value)} } />
            <button onClick={ connect }>Create/Join Chat</button>

        </div>
	)
}

export default Login
