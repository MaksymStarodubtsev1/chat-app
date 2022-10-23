import React, {Fragment} from "react";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useMessageDispatch, useMessageState} from "../../context/message";
import {gql, useQuery} from "@apollo/client";


const GET_USERS = gql`
  query getUsers($getAll: Boolean) {
    getUsers(getAll: $getAll) {
      username imageUrl createdAt
      latestMessage {
        content
        from
        to
      }
    }
  }
`

const Contacts = () => {
  const dispatch = useMessageDispatch()
  
  
  const { users } = useMessageState()
  const { loading } = useQuery(GET_USERS,{
    variables: {getAll: true},
    onCompleted: data => dispatch({type: 'SET_USERS', payload: data.getUsers})
  })
  const usersData = users ?? []
  const usersMessage = loading ? 'loading...' : 'No user have joined yet'
  
  return (
    <Fragment>
        <Row className="bg-white justify-content-center align-items-center">
          <Col xs={1}>
            <Link to="/">
              <Button variant="link" className="btn ms-1 text-decoration-none">
                <span className="icon-arrow-left" />
              </Button>
            </Link>
          </Col>
          <Col xs={11}>Input</Col>
        </Row>
        <Row className="bg-white">
          <Col sx={12} className="contacts-box">
            {usersData.length < 1 ? usersMessage : usersData.map(({username, imageUrl, latestMessage, selected}) => (
              <div
                className={`user-div d-flex p-3 ${selected && 'bg-white'}`}
                key={username}
                // onClick={() => dispatch({type: 'SET_SELECTED_USER', payload: username})}
                role="button"
              >
                { imageUrl
                   ? <Image
                      src={imageUrl}
                      className="mr-2 user-image"
          
                    />
                  : <span className="icon-user user-image text-center flex align-items-center" />
                }
                <div className="ps-3 d-none d-md-block">
                  <p className="text-success">{username}</p>
                </div>
              </div>
            ))}
          </Col>
        </Row>
    </Fragment>
  )
}

export default Contacts