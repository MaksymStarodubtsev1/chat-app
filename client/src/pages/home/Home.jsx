import React, {Fragment, useState} from "react";
import {Row, Col, Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuthDispatch} from "../../context/auth";
import {Users} from "./Users";
import {Messages} from "./Messages";
import Requests from "./Requests";

export const Home = () => {
  const dispatch = useAuthDispatch()
  
  const [selectedUser, addSelectedUser] = useState(null)
  
  const logOut = () => {
    dispatch({type: 'LOGOUT'})
    window.location.href = '/login'
  }
  
  return (
    <Fragment>
      <Row className="bg-white justify-content-around mb-1">
        <Col>
          <Link to="/contacts">
            <Button variant="link">Users</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/requests">
            <Button variant="link">Request</Button>
          </Link>
        </Col>
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
        <Col xs={2} md={4} className="p-0 bg-secondary flex">
          <Users addSelectedUser={addSelectedUser} selectedUser={selectedUser}/>
        </Col>
        <Col xs={10} md={8} className="messages-box d-flex flex-column-reverse">
          <Messages selectedUser={selectedUser}/>
        </Col>
      </Row>
    </Fragment>
    )
}