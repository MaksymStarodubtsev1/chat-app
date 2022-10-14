import React, {Fragment, useEffect, useState} from "react";
import {gql, useLazyQuery, useMutation } from "@apollo/client";
import {useMessageDispatch, useMessageState} from "../../context/message";
import {Message} from "./Message";
import {Form} from "react-bootstrap";

const GET_MESSAGES = gql`
query getMessages($from: String!) {
  getMessages(from: $from) {
    from
    content
    createdAt
  }
}
`

const SEND_MESSAGES = gql`
mutation sendMessage($to: String! $content: String!) {
  sendMessage(to: $to, content: $content) {
    to content
  }
}
`


export const Messages = () => {
  const { users } = useMessageState()
  const dispatch = useMessageDispatch()
  const [content, setContent] = useState('')
  const selectedUser = users?.find(u => u.selected === true)
  const messages = selectedUser?.messages
  const [ getMessages, { loading: messageLoading, data: messageData }] = useLazyQuery(GET_MESSAGES)
  const [ sendMessage ] = useMutation(SEND_MESSAGES, {
    onCompleted: data => {
      console.log('data', data)
      dispatch({type: 'ADD_MESSAGE', payload: {
      user: selectedUser.username,
      message: data.sendMessage
      }})
    }
  })
  
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
  
  const messagesList = messageData?.getMessages
  
  const onSubmit = (e) => {
    e.preventDefault()
    if(content.length < 1) return
  
    sendMessage({variables: { to: selectedUser.username, content}})
  }
  console.log('messagesList', messages)
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            className="mb-1"
            placeholder="Type a message.."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </Form.Group>
      </Form>
      {messages?.length > 0 && (
        messages.map((message, index) => (
          <>
            <Message key={message.key} message={message}/>
            { index === messages  .at(-1) && (
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