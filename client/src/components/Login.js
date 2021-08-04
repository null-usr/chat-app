import React from 'react';
import '../styles/login.css';

function Login({userName, setUserName, setRoom, connectToRoom}) {
	return (
		<div className="logIn">
          
            <input type="text" value={userName} placeholder="Name..." onChange={ (e) => {setUserName(e.target.value)} } />
            <input type="text" placeholder="Room..." onChange={ (e) => {setRoom(e.target.value)} } />
            <button onClick={ connectToRoom }>Create/Join Chat</button>

        </div>
	)
}

export default Login
