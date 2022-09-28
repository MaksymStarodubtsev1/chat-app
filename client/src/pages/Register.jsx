import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const REGISTER_USER = gql`
  mutation register( $username: String! $email: String! $password: String! $confirmPassword: String!) {
    register(username: $username email: $email password: $password confirmPassword: $confirmPassword) {
      username
      email
    }
  }
`;

export default function Register(props) {
  const [regValues, setRegValues] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  
  const [errors, setErrors] = useState({})
  
  const [register, {loading}] = useMutation(REGISTER_USER, {
    update: (_, __) => props.history.push('/login'),
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors)
  });
  
  const submitRegister = e => {
    e.preventDefault()
    register({variables: regValues})
  }
  
  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1>Register</h1>
        <Form onSubmit={submitRegister}>
          <Form.Group controlId="formRegisterEmail">
            <Form.Label className={errors.email && 'text-danger'}>
              {errors.email ?? 'Email address'}
            </Form.Label>
            <Form.Control
              type="email"
              value={regValues.email}
              onChange={({target: {value}}) => setRegValues({
                ...regValues,
                email: value
              })}
            />
          </Form.Group>
        
          <Form.Group controlId="formRegisterUserName">
            <Form.Label className={errors.username && 'text-danger'}>
              {errors.username ?? 'Username'}
            </Form.Label>
            <Form.Control
              type="text"
              value={regValues.username}
              onChange={({target: {value}}) => setRegValues({
                ...regValues,
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
              value={regValues.password}
              onChange={({target: {value}}) => setRegValues({
                ...regValues,
                password: value
              })}
            />
          </Form.Group>
        
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label className={errors.confirmPassword && 'text-danger'}>
              {errors.confirmPassword ?? 'Confirm Password'}
            </Form.Label>
            <Form.Control
              type="password"
              value={regValues.confirmPassword}
              onChange={({target: {value}}) => setRegValues({
                ...regValues,
                confirmPassword: value
              })}
            />
          </Form.Group>
          <div className="text-center mt-3">
            <Button variant="success" type="submit" disabled={loading}>
              { loading ? 'loading...' : 'Register'}
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  )
}