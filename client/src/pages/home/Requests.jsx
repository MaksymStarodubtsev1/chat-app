import React, {Fragment, useState} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useMessageDispatch, useMessageState} from "../../context/message";
import {gql, useMutation, useQuery} from "@apollo/client";
import {MyVerticallyCenteredModal} from "../../elements/CenteredModal";
import {toast} from "react-toastify";
import {ContactList} from "../../elements/ContactList";
import {useConfirmation} from "../../hooks/useConfirmation";
import {useRequests} from "../../hooks/useRequests";

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

const Requests = () => {
  const dispatch = useMessageDispatch()
  const { users } = useMessageState()
  const { loading } = useQuery(GET_USERS,{
    onCompleted: data => dispatch({type: 'SET_USERS', payload: data.getUsers})
  })

  const handleRequest = useConfirmation()

  const templateInfo = {
    requestLabel: 'Confirm friend request',
    modalHeader: 'Confirm friend request from this user?'
  }

  const usersData = users ?? []
  const usersMessage = loading ? 'loading...' : 'No user have joined yet'
  
  return (
    <Fragment>
      <Row className="bg-white justify-content-center align-items-center">
        <Col xs={12}>
          <Link to="/">
            <Button variant="link" className="btn ms-1 text-decoration-none">
              <span className="icon-arrow-left" />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="bg-white">
        <Col sx={12} className="contacts-box">
          {usersData.length < 1
            ? usersMessage
            : <ContactList
                contacts={usersData}
                handleRequest={handleRequest}
                templateInfo={templateInfo}
              />
          }
        </Col>
      </Row>
    </Fragment>
  )
}

export default Requests