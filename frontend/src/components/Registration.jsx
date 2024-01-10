import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "../../config/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user=useSelector(state=>state.user.user)
  useEffect(()=> {
    if(user){
      navigate('/')
    }
  },[navigate,user])
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (name == "") {
      toast.error("Name cannot be Empty");
      setClientError(true);
    } else if (!regEx.test(email)) toast.error("enter valid email address");
    else if (password == "") toast.error("Password cannot be empty");
    else if (password !== confirmPassword)
      toast.error("password should be same");
    else {
      const formData = { name, email, password };
      console.log(formData);
      axios.post(`${baseUrl}/register`, formData).then((respose) => {
        console.log('respose');
        console.log(respose)
        if (respose.data.exist == true) {
          toast.error("Email already exists");
        } else {
          dispatch(login(respose.data.user, respose.data.token));
          navigate("/");
        }
      });
      console.log("submit");
    }
  };

  return (
    <>
    <ToastContainer/>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} className="card p-5">
            <h1>Register</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className="my-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="my-2" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-3">
                Register
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                Already have an account? <Link to={`/login`}>Login</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Registration;
