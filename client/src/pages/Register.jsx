import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

export default function Register() {
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  
  const submitRegister = e => {
    e.preventDefault()
    console.log(data)
  }
  
  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1>Register</h1>
        <Form onSubmit={submitRegister}>
          <Form.Group controlId="formRegisterEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={data.email}
              onChange={({target: {value}}) => setData({
                ...data,
                email: value
              })}
            />
          </Form.Group>
        
          <Form.Group controlId="formRegisterUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={data.username}
              onChange={({target: {value}}) => setData({
                ...data,
                username: value
              })}
            />
          </Form.Group>
        
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={data.password}
              onChange={({target: {value}}) => setData({
                ...data,
                password: value
              })}
            />
          </Form.Group>
        
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={data.confirmPassword}
              onChange={({target: {value}}) => setData({
                ...data,
                confirmPassword: value
              })}
            />
          </Form.Group>
          <div className="text-center mt-3">
            <Button variant="success" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  )
}