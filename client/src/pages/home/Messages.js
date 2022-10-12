import React, {Fragment, useEffect} from "react";
import {gql, useLazyQuery } from "@apollo/client";
import {useMessageDispatch, useMessageState} from "../../context/message";
import {Message} from "./Message";

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
  
  const messagesList = messageData?.getMessages
  
  return (
    <>
      {messagesList?.length > 0 && (
        messagesList.map((message, index) => (
          <>
            <Message key={message.key} message={message}/>
            { index === messagesList.at(-1) && (
              <div className="invisible">
                <hr className="m-0" />
              </div>
            )}
          </>
        ))
        )
      }
    </>
  )
}