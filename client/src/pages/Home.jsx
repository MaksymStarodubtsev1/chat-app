import React, {Fragment, useEffect, useState} from "react";
import {Row, Col, Button, Image} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuthDispatch} from "../context/auth";
import {gql, useLazyQuery, useQuery} from "@apollo/client";

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

const GET_MESSAGES = gql`
query getMessages($from: String!) {
  getMessages(from: $from) {
    from
    content
    createdAt
  }
}
`


export const Home = () => {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate();
  const [selectedUser, addSelectedUser] = useState(null)
  const [messages, setMessages] = useState(null)
  
  const logOut = () => {
    dispatch({type: 'LOGOUT'})
    navigate('/login')
  }
  
  const [ getMessages, { loading: messageLoading, data: messageData }] = useLazyQuery(GET_MESSAGES)
  
  const { loading, data, error } = useQuery(GET_USERS)
  const usersData = data?.getUsers ?? []
  const usersMessage = loading ? 'loading...' : 'No user have joined yet'
  
  useEffect(() => {
    if(selectedUser) {
      getMessages({ variables: { from: selectedUser }})
    }
  }, [selectedUser])
  
  if(messageData) console.log(messageData);
  
  return (
    <Fragment>
      <Row className="bg-white justify-content-around mb-1">
        <Col>
          <Link to="/login">
            <Button variant="link">Login</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/register">
            <Button variant="link">Register</Button>
          </Link>
        </Col>
        <Col>
          <Button variant="link" onClick={logOut}>Log out</Button>
        </Col>
      </Row>
      <Row className="bg-white">
        <Col sx={4} className="p-0 bg-secondary">
          {usersData.length < 1 ? usersMessage : usersData.map(({username, imageUrl, latestMessage}) => (
            <div className="d-flex p-3" key={username} onClick={() => addSelectedUser(username)}>
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
        </Col>
        <Col sx={8}>
          {messageData?.getMessages?.length > 0 && (
            messageData?.getMessages.map(({content, uuid}) => (
              <p key={uuid}>{content}</p>
          )))}
        </Col>
      </Row>
    </Fragment>
    )
}