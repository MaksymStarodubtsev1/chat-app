import React, {Fragment, useEffect, useState} from "react";
import {Row, Col, Button, Image} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuthDispatch} from "../../context/auth";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import {Users} from "./Users";
import {Messages} from "./Messages";

export const Home = () => {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate();
  
  const [selectedUser, addSelectedUser] = useState(null)
  
  const logOut = () => {
    dispatch({type: 'LOGOUT'})
    window.location.href =  '/login'
  }
  
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
          <Users addSelectedUser={addSelectedUser} selectedUser={selectedUser}/>
        </Col>
        <Col sx={8}>
          <Messages selectedUser={selectedUser}/>
        </Col>
      </Row>
    </Fragment>
    )
}