import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchStudents } from "../redux/slices/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Update = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.student); //here student is in redux studentslice
  // console.log(state)
  const [loading, setLoading] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchStudents(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => setValue(key, user[key]));
    }
  }, [user, setValue]);

  if (status === "loading" || loading) return <h2>Loading...</h2>;
  if (status === "failed") return <h2>Failed to Login: {error}</h2>;
  if (!user)
    return (
      <h2>
        Please Login First
      </h2>
    );

  const onSubmit = async (data) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not Authenticated, Please Login First");
      navigate("/login");
      return;
    }
    try {
      const result = await axios.put(
        "http://localhost:9004/api/edituser",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("User's data Updated response", result);
      alert("User's Details Updated Successfully!");
      navigate("/Dashboard");
    } catch (error) {
      console.log("Error Updating User Data:", error);
      alert("Error Updating User Details!");
    } finally {
      setLoading(false);
    }
  };
  // //Handle Input Changes
  // const onSubmit = async (data) => {
  //   try {
  //     const response = await axios.put(`http://localhost:9004/api/edituser/${id}`, data);
  //     console.log("Updated response", response);
  //     alert("User's Details Updated Successfully!");
  //     navigate("/Dashboard");
  //   }
  //   catch (error) {
  //     console.log("Error Updating User Data:", error);
  //     alert("Error Updating User Details!")
  //   }
  // }

  return (
    <>
      <Navbar />
      <Container className="d-flex justify-content-center align-items-center vh-700">
        <Card
          className="p-4 shadow-lg"
          style={{ width: "700px", borderRadius: "10px", backgroundColor: "" }}
        >
          <Card.Body>
            <Card.Title className="text-center mb-4">
              Update Student details
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
                    min: {
                      value: 1,
                      message: "Roll number must be at least 1",
                    },
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
                Update Details
              </Button>
            </Form>
            {/* <div className="para">
            <p>
              Already a user? <Link to="/login">Login</Link>
            </p>
          </div> */}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Update;
