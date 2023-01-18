import React, {Fragment, useState} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useMessageDispatch, useMessageState} from "../../context/message";
import {gql, useMutation, useQuery} from "@apollo/client";
import {MyVerticallyCenteredModal} from "../../elements/CenteredModal";
import {toast} from "react-toastify";


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

const ADD_REQUEST = gql`
  mutation addNewRequest($username: String!) {
    addNewRequest(username: $username) {
      from
      to
      type
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
  const [ mutation, {loading: friendRequestLoading} ] = useMutation(ADD_REQUEST)
  const usersData = users ?? []
  const [modalOpen, setModalOpen] = useState(false)
  const usersMessage = loading ? 'loading...' : 'No user have joined yet'

  function handleAddFriend(username, setModalOpen) {
      mutation({variables: {username}})
        .then(res => {
          if(res.data?.addNewRequest?.from) {
            toast.success("Success friend adding");
          }
        })
        .catch(err => {
          toast.error("adding failed");
        })

    setModalOpen(false)
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
              : usersData.map(({username, imageUrl, selected}) => (
                <div
                  className={`user-div d-flex p-3 ${selected && 'bg-white'}`}
                  key={username}
                  role="button"
                >
                    { imageUrl
                       ? <Image
                          src={imageUrl}
                          className="user-image img-fluid"
                        />
                      : <span className="icon-user user-image text-center flex align-items-center" />
                    }
                  <div className="ps-3 d-none d-md-block">
                    <p className="text-success">{username}</p>
                    <Button
                      className="rounded-5"
                      size="sm"
                      variant="outline-primary"
                      data-toggle="addFriendModal"
                      onClick={() => setModalOpen(true)}
                    >
                      Add friend request
                    </Button>
                    <MyVerticallyCenteredModal
                      show={modalOpen}
                      onHide={() => handleAddFriend(username, setModalOpen)}
                    >
                      Send friend request to this user?
                    </MyVerticallyCenteredModal>
                    <MyVerticallyCenteredModal
                      show={friendRequestLoading}
                      size="small"
                    >
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only" />
                        </div>
                      </div>
                    </MyVerticallyCenteredModal>
                  </div>
                </div>
            ))}
          </Col>
        </Row>
    </Fragment>
  )
}

export default Contacts