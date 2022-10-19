import React, {Fragment, useEffect, useState} from "react";
import {gql, useLazyQuery, useMutation, useSubscription} from "@apollo/client";
import {useMessageDispatch, useMessageState} from "../../context/message";
import { useAuthState } from "../../context/auth";
import {Message} from "./Message";
import {Button, Form} from "react-bootstrap";

const GET_MESSAGES = gql`
query getMessages($from: String!) {
  getMessages(from: $from) {
    from
    content
    createdAt
  }
}
`

const NEW_MESSAGE = gql`
subscription newMessage {
  newMessage {
    to from content uuid
  }
}
`;

const SEND_MESSAGES = gql`
mutation sendMessage($to: String! $content: String!) {
  sendMessage(to: $to, content: $content) {
    to from content uuid
  }
}
`

export const Messages = () => {
  const { user } = useAuthState()
  const { users } = useMessageState()
  const dispatch = useMessageDispatch()
  const [content, setContent] = useState('')
  const selectedUser = users?.find(u => u.selected === true)
  const messages = selectedUser?.messages
  const [ getMessages, { data: messageData }] = useLazyQuery(GET_MESSAGES)
  const [ sendMessage ] = useMutation(SEND_MESSAGES, {
    onCompleted: data => {
      console.log('hello there')
    }
  })
  
  const { data: subscriptionData } = useSubscription(NEW_MESSAGE)
  
  useEffect(() => {
    if(subscriptionData) {
    console.log('subscriptionData', subscriptionData.newMessage);
    const message = subscriptionData.newMessage
    const otherUser = user.username === message.to ? message.from : message.to

    dispatch({type: 'ADD_MESSAGE', payload: {
        user: otherUser,
        message: subscriptionData.newMessage
      }})
    
    }
  }, [subscriptionData])
  
  useEffect(() => {
    if(selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username }})
    }
  }, [selectedUser])
  
  useEffect(() => {
    if(messageData) {
      dispatch({type: 'SET_USER_MESSAGES', payload: {
        user: selectedUser.username,
        messages: messageData.getMessages
        }})
    }
  }, [messageData])
  
  const onSubmit = (e) => {
    e.preventDefault()
    if(content.trim() === '' || !selectedUser) return
  
    sendMessage({variables: { to: selectedUser.username, content}})
  
    setContent('')
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
          <Form.Group className="d-flex align-items-center mb-1">
            <Form.Control
              type="text"
              placeholder="Type a message.."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <Button type="submit" class="btn ms-1">
              <span className="icon-rocket" />
            </Button>
          </Form.Group>
      </Form>
      {messages?.length > 0 && (
        messages.map((message, index) => (
          <>
            <Message key={message.key} message={message}/>
            { index === messages.at(-1) && (
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