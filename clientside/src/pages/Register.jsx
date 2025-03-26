import { Form, Button, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [rollno, setRollNo] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const Navigate = useNavigate();
  const handleSubmit = async(event) => {
    //handlesubmitt is passed to onsubmit in form tag after submittion it will check the conditions which we have given
    event.preventDefault(); //preventDefault(); stops bydefault reloading of page after submittion
    if (!name || !semester || !rollno || !phoneno || !email || !password) {
      alert("All Fields are Required!");
      return;
    }

  await  axios
      .post("http://localhost:9003/students/register", {
        name,
        semester,
        rollno,
        phoneno,
        email,
        password,
      })
      .then((user) => {
        console.log(user);
        alert("New user Created Successfully!");
        Navigate("/login");
      })
      .catch((err) => {
        console.log("Error registring User", err)
        alert("User may be already existed or server error");
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="p-4 shadow-lg"
        style={{ width: "700px", borderRadius: "10px" }}
      >
        <Card.Body>
          <Card.Title className="text-center mb-4">
            Student Registration
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="FormName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter Name"
              />
              {/* event.target refers to the input field that triggered the event. , .value retrieves the current text inside the input field. */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormSemester">
              <Form.Label>Semester</Form.Label>
              <Form.Control
                type="text"
                value={semester}
                onChange={(event) => setSemester(event.target.value)}
                placeholder="Enter Semester"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormRollNo">
              <Form.Label>Roll No.</Form.Label>
              <Form.Control
                type="text"
                value={rollno}
                onChange={(event) => setRollNo(event.target.value)}
                placeholder="Enter Roll No."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={phoneno}
                onChange={(event) => setPhoneNo(event.target.value)}
                placeholder="Enter Phone Number"
              />
            </Form.Group>

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
                onChange={(event) => setpassword(event.target.value)}
                placeholder="Enter Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
          <div className="para">
            <p>
              Are you already a user? <Link to="/login">Login</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
