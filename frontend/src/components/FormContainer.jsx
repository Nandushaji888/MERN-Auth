import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "../../config/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../actions";
import { toast, ToastContainer } from "react-toastify";

const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function FormContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    if (!regEx.test(email)) {
      toast.error("Enter valid Email address");
    } else if (password == "") toast.error("Password cannot be empty");
    else {
      axios.post(`${baseUrl}/login`, formData).then((response) => {
        console.log("response", response.data.failed);
        if (response.data.failed == true) {
          toast.error("Invalid Email or Password");
        } else if (response.data.failed1) {
          toast.error("You have been blocked by the admin");
        } else {
          dispatch(login(response.data.user, response.data.token));
          navigate("/");
        }
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} className="card p-5">
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
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

              <Button type="submit" variant="primary" className="mt-3">
                Sign In
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                New Customer? <Link to={`/register`}>Register</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FormContainer;
