import {Image} from "react-bootstrap";
import React from "react";
import {useMessageDispatch} from "../context/message";

export const Friends = ({usersData, onHide}) => {
  const dispatch = useMessageDispatch()

  return usersData.map(({username, imageUrl, latestMessage, selected}) => (
      <div
        className={`user-div d-flex p-3 ${selected && 'bg-white'}`}
        key={username}
        onClick={() => dispatch({type: 'SET_SELECTED_USER', payload: username})}
        role="button"
      >
        {
          imageUrl
            ? <Image
              src={imageUrl ?? ''}
              className="mr-2 user-image"

            />
            : <span className="icon-user user-image text-center flex align-items-center" />
        }
        <div className="ps-3 d-none d-md-block">
          <p className="text-success">{username}</p>
          <p className="font-weight-light">{latestMessage?.content ?? 'you are now connected'}</p>
        </div>
      </div>
    ))
}