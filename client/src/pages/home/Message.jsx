import React from "react";
import {useAuthState} from "../../context/auth";


export const Message = ({message}) => {
  const { user } = useAuthState()
  console.log('user', user.username, message);
  const fromUs = user.username === message.from
  return (
    <div className={`d-flex my-3 ${fromUs && 'flex-row-reverse'}`} >
      <div className="py-2 px-3 rounded-pill bg-primary">
        <p className="text-white" key={message.uuid}>{message.content}</p>
      </div>
    </div>
  )
}