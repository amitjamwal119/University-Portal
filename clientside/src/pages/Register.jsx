import { Form, Button, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:9004/api/register",
        data
      );
      console.log(response);
      alert("New user created successfully!");
      navigate("/login");
    } catch (err) {
      console.log("Error registering user", err);
      alert("User may already exist or there is a server error");
    }
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
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3" controlId="FormName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message:
                      "Name should not contain numbers or special characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormSemester">
              <Form.Label>Semester</Form.Label>
              <Form.Control
                type="number"
                step="1"
                placeholder="Enter Semester"
                {...register("semester", {
                  required: "Semester is required",
                  min: { value: 1, message: "Semester must be at least 1" },
                  max: {
                    value: 8,
                    message: "Semester must not be more than 8",
                  },
                })}
              />
              {errors.semester && (
                <p className="text-danger">{errors.semester.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormRollNo">
              <Form.Label>Roll No.</Form.Label>
              <Form.Control
                type="number"
                step="1"
                placeholder="Enter Roll No."
                {...register("rollno", {
                  required: "Roll number is required",
                  min: { value: 1, message: "Roll number must be at least 1" },
                  max: {
                    value: 999,
                    message: "Roll number must be less than 1000",
                  },
                })}
              />
              {errors.rollno && (
                <p className="text-danger">{errors.rollno.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                {...register("phoneno", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
              />
              {errors.phoneno && (
                <p className="text-danger">{errors.phoneno.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
          <div className="para">
            <p>
              Already a user? <Link to="/login">Login</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
