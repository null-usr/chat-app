import React from 'react'

function Message({message, userName}) {
	return (
		<div className={ "message-container" + (message.author == userName ? " me" : "") }>
			<div>
				<div className={"message-name"}>
					<i>{message.author}</i>
				</div>
				<div className={"message" + (message.author == userName ? " my-message" : " other-message")} >
					{message.message} 
				</div>
			</div>
		</div>
	)
}

export default Message
