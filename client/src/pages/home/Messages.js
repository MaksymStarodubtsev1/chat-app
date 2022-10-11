import React, {useContext, useEffect} from "react";
import {gql, useLazyQuery } from "@apollo/client";
import {useMessageDispatch, useMessageState} from "../../context/message";

const GET_MESSAGES = gql`
query getMessages($from: String!) {
  getMessages(from: $from) {
    from
    content
    createdAt
  }
}
`


export const Messages = () => {
  const { users } = useMessageState()
  const dispatch = useMessageDispatch()
  const selectedUser = users?.find(u => u.selected === true)
  const [ getMessages, { loading: messageLoading, data: messageData }] = useLazyQuery(GET_MESSAGES)
  
  useEffect(() => {
    if(selectedUser && !selectedUser.messages) {
      console.log('selectedUser', selectedUser)
      getMessages({ variables: { from: selectedUser.username }})
    }
  }, [selectedUser])
  
  useEffect(() => {
    if(messageData) {
      dispatch({type: 'SET_USER_MESSAGES', payload: {
        username: selectedUser.username,
        messages: messageData.getMessages
        }})
    }
  }, [messageData])
  
  return (
    <>
      {messageData?.getMessages?.length > 0 && (
        messageData?.getMessages.map(({content, uuid}) => (
          <p key={uuid}>{content}</p>
        )))}
    </>
  )
}