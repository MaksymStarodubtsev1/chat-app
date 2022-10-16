import React from "react";
import {useAuthState} from "../../context/auth";
import {OverlayTrigger, Tooltip} from "react-bootstrap";


export const Message = ({message}) => {
  const { user } = useAuthState()
  console.log('message', message.from, user.username)
  const fromUs = user.username === message.from
  return (
    <>
      <OverlayTrigger
        placement={fromUs ? 'right' : 'left'}
        overlay={
          <Tooltip>
            {new Date(message.createdAt).getFullYear()}
          </Tooltip>
        }
      >
        <div className={`d-flex my-3 ${fromUs && 'flex-row-reverse'}`} >
          <div className="py-2 px-3 rounded-pill bg-primary">
            <p className="text-white" key={message.uuid}>{message.content}</p>
          </div>
        </div>
      </OverlayTrigger>
    </>
  )
}