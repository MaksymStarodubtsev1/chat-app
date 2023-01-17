import React from "react";
import {gql, useQuery} from "@apollo/client";
import {Image} from "react-bootstrap";
import {useMessageDispatch, useMessageState} from "../../context/message";

const GET_USERS = gql`
  query getUsers($friendsRequests: Boolean) {
    getUsers(friendsRequests: $friendsRequests) {
      username imageUrl createdAt
      latestMessage {
        content
        from
        to
      }
    }
  }
`

export const Users = () => {
  const dispatch = useMessageDispatch()
  
  const { users } = useMessageState()
  const selectedUser = users?.find(u => u.selected === true)?.username
  const { loading } = useQuery(GET_USERS,{
    variables: {friendsRequests: true},
    onCompleted: data => dispatch({type: 'SET_USERS', payload: data.getUsers})
  })
  const usersData = users ?? []
console.log('users', users)
  const usersMessage = loading ? 'loading...' : 'No user have joined yet'
  
  return (
    <>
      {usersData.length < 1
        ? usersMessage
        : usersData.map(({username, imageUrl, latestMessage, selected}) => (
          <div
            className={`user-div d-flex p-3 ${selected && 'bg-white'}`}
            key={username}
            onClick={() => dispatch({type: 'SET_SELECTED_USER', payload: username})}
            role="button"
          >
            <Image
              src={imageUrl ?? ''}
              className="mr-2 user-image"

            />
            <div className="ps-3 d-none d-md-block">
              <p className="text-success">{username}</p>
              <p className="font-weight-light">{latestMessage?.content ?? 'you are now connected'}</p>
            </div>
          </div>
      ))}
    </>
  )
}