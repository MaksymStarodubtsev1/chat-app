import React, {useContext, useEffect} from "react";
import {gql, useLazyQuery } from "@apollo/client";

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
  const { users } = useContext()
  const seln   
  const [ getMessages, { loading: messageLoading, data: messageData }] = useLazyQuery(GET_MESSAGES)
  
  useEffect(() => {
    if(selectedUser) {
      getMessages({ variables: { from: selectedUser }})
    }
  }, [selectedUser])
  
  return (
    <>
      {messageData?.getMessages?.length > 0 && (
        messageData?.getMessages.map(({content, uuid}) => (
          <p key={uuid}>{content}</p>
        )))}
    </>
  )
}