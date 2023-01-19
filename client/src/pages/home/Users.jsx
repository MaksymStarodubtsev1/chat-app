import React from "react";
import {gql, useQuery} from "@apollo/client";
import {useMessageDispatch, useMessageState} from "../../context/message";
import {Friends} from "../../elements/Friends";

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
  const { loading } = useQuery(GET_USERS,{
    variables: {friendsRequests: true},
    onCompleted: data => dispatch({type: 'SET_USERS', payload: data.getUsers})
  })
  const usersData = users ?? []

  const usersMessage = loading ? 'loading...' : 'No user have joined yet'
  
  return (
    <>
      {usersData.length < 1
        ? usersMessage
        : <Friends usersData={usersData}/>
      }
    </>
  )
}