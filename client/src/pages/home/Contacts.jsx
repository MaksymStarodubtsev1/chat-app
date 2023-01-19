import React, {Fragment} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useMessageDispatch, useMessageState} from "../../context/message";
import {gql, useQuery} from "@apollo/client";
import {ContactList} from "../../elements/ContactList";
import {useRequests} from "../../hooks/useRequests";


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

  const handleRequest = useRequests()

  const templateInfo = {
    requestLabel: 'Add friend request',
    modalHeader: 'Send friend request to this user?'
  }
  
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

export default Contacts