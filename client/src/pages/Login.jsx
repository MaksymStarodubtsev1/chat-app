import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import { gql, useLazyQuery } from '@apollo/client';
import {Link, useNavigate} from "react-router-dom";

import { useAuthDispatch } from '../context/auth'

const LOGIN_USER = gql`
  query login( $username: String! $password: String!) {
    login(username: $username password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;

export const Login = (props) => {
  const [registerValues, setRegValues] = useState({
    username: '',
    password: '',
  })
  let navigate = useNavigate();
  const dispatch = useAuthDispatch()
  const [errors, setErrors] = useState({})
  
  const [loginUser, {loading}] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      dispatch({type: 'LOGIN', payload: data.login})
      navigate("/")
    },
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors)
  });
  
  const submitLogin = e => {
    e.preventDefault()
    loginUser({variables: registerValues})
  }
  
  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1>Login</h1>
        <Form onSubmit={submitLogin}>
          
          <Form.Group controlId="formRegisterUserName">
            <Form.Label className={errors.username && 'text-danger'}>
              {errors.username ?? 'Username'}
            </Form.Label>
            <Form.Control
              type="text"
              value={registerValues.username}
              onChange={({target: {value}}) => setRegValues({
                ...registerValues,
                username: value
              })}
            />
          </Form.Group>
          
          <Form.Group controlId="formBasicPassword">
            <Form.Label className={errors.username && 'text-danger'}>
              { errors.password ?? 'Password'}
            </Form.Label>
            <Form.Control
              type="password"
              value={registerValues.password}
              onChange={({target: {value}}) => setRegValues({
                ...registerValues,
                password: value
              })}
            />
          </Form.Group>
          
          <div className="text-center mt-3">
            <Button variant="success" type="submit" disabled={loading}>
              { loading ? 'loading...' : 'Login'}
            </Button>
            <br/>
            <small>
              Don't have an account? <Link to='/register'>Register</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  )
}