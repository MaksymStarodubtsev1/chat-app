import {Row, Col, Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuthDispatch} from "../context/auth";

export const Home = ({history}) => {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate();
  const logOut = () => {
    dispatch({type: 'LOGOUT'})
    navigate('/login')
  }
  return (
    <Row>
      <Link to="/login">
        <Button variant="link">Login</Button>
      </Link>
      <Link to="/register">
        <Button variant="link">Register</Button>
      </Link>
        <Button variant="link" onClick={logOut}>Log out</Button>
    </Row>
    )
}