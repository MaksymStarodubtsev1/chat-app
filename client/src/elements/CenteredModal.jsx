import {Button, Modal} from "react-bootstrap";

export function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      size="md"
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {
        props?.content?.header &&
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props?.content?.header}
          </Modal.Title>
        </Modal.Header>
      }
      <Modal.Body>
        {props?.children}
      </Modal.Body>
      <Modal.Footer>
        {
          props.onHide && <Button onClick={props.onHide}>Confirm</Button>
        }
      </Modal.Footer>
    </Modal>
  );
}