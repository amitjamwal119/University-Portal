import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/slices/studentSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {

  const dispatch = useDispatch();     //Sends actions to the Redux store.

  const { user, status, error } = useSelector((state) => state.student); // UseSelector selects data from Redux store
  console.log(user);

  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));  //Retrieves the authentication token from localStorage (browser storage) when the component loads.

  useEffect(() => {
    if (token) {
      dispatch(fetchStudents(token));  //fetchStudents(token): A Redux action that fetches student data using a token. Runs when token changes. If a token exists, it fetches student details.

      
    }
  }, [dispatch, token]);


  //logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clears token from browser storage
    setToken(null);                   // Updates useState to reflect logout
    navigate("/login");
  };

  if (status === "loading") return <h2>Loading...</h2>;
  if (status === "failed") return <h2>Failed to Login: {error} </h2>;
  if (!user) return <h2>Please Signup first</h2>;

  return (
    <Container fluid>
      <Row>
        {/* Left Side - Navigation Menu */}
        <Col xs={12} md={3} className="p-0" style={{ background: "" }}>
          {/* minHeight: "100vh"  */}
          <h5 className="text-center p-3 bg-primary text-white">Dashboard</h5>
          <ListGroup
            variant="flush"
            className="bg-primary d-flex flex-row flex-md-column text-center border"
          >
            <ListGroup.Item action href="#examinations">
              Examinations
            </ListGroup.Item>

            <ListGroup.Item action href="#exam-form">
              Examination Form
            </ListGroup.Item>

            <ListGroup.Item action href="#updates">
              New Updates
            </ListGroup.Item>

            <ListGroup.Item action href="#about">
              About University
            </ListGroup.Item>

            <ListGroup.Item as={Link} to={`/edituser/${user._id}`} action>
              Update Profile
            </ListGroup.Item>

            <ListGroup.Item
              onClick={handleLogout}
              // action
              // href="#logout"
              className="text-danger"
            >
              Logout
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Right Side - Content Area */}
        <Col xs={12} md={9} className="p-4">
          <h1>Welcome, {user.name} to your Dashboard</h1>
          <hr />
          <h2>Roll Number : {user.rollno}</h2>
          <hr />
          <h2>Phone Number : {user.phoneno}</h2>
          <hr />
          <h2>Email : {user.email} </h2>

          <p>
            Welcome to your dashboard. Select an option from the left panel.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
