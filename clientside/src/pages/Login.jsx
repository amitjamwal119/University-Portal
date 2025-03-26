import { Form, Button, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  const handleSubmit = (event) => {
    event.perventDefault();
    if (!email || !password) {
      alert("All fields are required!");
    }

     // Enter Api
     axios.post('http://localhost:9003/students/login', {email, password})
     .then((result) => {console.log(result);
      localStorage.setItem('token', result.data.token)
      alert("Login Successful")
      Navigate
     })
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="p-4 shadow-lg"
        style={{ width: "700px", borderRadius: "10px" }}
      >
        <Card.Body>
          <Card.Title className="text-center mb-4">Student Login</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="FormEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter Email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          <div className="para">
            <p>
              Are you a new user? <Link to="/register">Register Now</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
