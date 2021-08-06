import React from 'react'
import '../../styles/header.css';

function Header({room}) {
	return (
		<div className="header">
			<h1> ◇ Scream into the {room} ◇ </h1>
		</div>
	)
}

export default Header

