import {Button, Image} from "react-bootstrap";
import {MyVerticallyCenteredModal} from "./CenteredModal";
import React from "react";

export const ContactList = ({ contacts, handleRequest, templateInfo }) => {
  const {
    handleAdd,
    requestLoading,
    modalOpen,
    setModalOpen
  } = handleRequest

  const {requestLabel, modalHeader} = templateInfo

  return contacts.map(({username, imageUrl, selected}) => (
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
      <div className="ps-3 d-md-block">
        <p className="text-success">{username}</p>
        <Button
          className="rounded-5"
          size="sm"
          variant="outline-primary"
          data-toggle="addFriendModal"
          onClick={() => setModalOpen(true)}
        >
          {requestLabel ?? ''}
        </Button>

        <MyVerticallyCenteredModal
          show={modalOpen}
          onHide={() => handleAdd(username, setModalOpen)}
        >
          {modalHeader ?? ''}
        </MyVerticallyCenteredModal>

        <MyVerticallyCenteredModal
          show={requestLoading}
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
  ))
}