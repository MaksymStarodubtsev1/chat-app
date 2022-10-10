import React from "react";
import {gql, useQuery} from "@apollo/client";
import {Image} from "react-bootstrap";
import {useMessageDispatch, useMessageState} from "../../context/message";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username imageUrl createdAt
      latestMessage {
        content
        from
        to
      }
    }
  }
`

export const Users = ({ addSelectedUser, selectedUser }) => {
  const dispatch = useMessageDispatch()
  const { users } = useMessageState()
  const { loading } = useQuery(GET_USERS,{
    onCompleted: data => dispatch({type: 'SET_USERS', payload: data.getUsers})
  })
  const usersData = users ?? []
  const usersMessage = loading ? 'loading...' : 'No user have joined yet'
  
  return (
    <>
      {usersData.length < 1 ? usersMessage : usersData.map(({username, imageUrl, latestMessage}) => (
        <div
          className={`user-div d-flex p-3 ${username === selectedUser && 'bg-white'}`}
          key={username}
          onClick={() => addSelectedUser(username)}
          role="button"
        >
          <Image
            src={imageUrl}
            roundedCircle={true}
            className="mr-2"
            style={{width: 50, height: 50, objectFit: 'cover'}}
          />
          <div className="ps-3">
            <p className="text-success">{username}</p>
            <p className="font-weight-light">{latestMessage?.content ?? 'you are now connected'}</p>
          </div>
        </div>
      ))}
    </>
  )
}