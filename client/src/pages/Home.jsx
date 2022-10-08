import React, { Fragment} from "react";
import {Row, Col, Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuthDispatch} from "../context/auth";
import {gql, useQuery} from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
      createdAt
    }
  }
`


export const Home = () => {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate();
  const logOut = () => {
    dispatch({type: 'LOGOUT'})
    navigate('/login')
  }
  
  const { loading, data, error } = useQuery(GET_USERS)
  const usersData = data?.getUsers ?? []
  const usersMessage = !data || loading ? 'loading...' : 'No user have joined yet'
  console.log(data)
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
        <Col sx={4}>
          {usersData.map(({username}) => (
            <div key={username}>
              <p>{username}</p>
            </div>
          ))}
        </Col>
        <Col sx={8}>
          Messages
        </Col>
      </Row>
    </Fragment>
    )
}