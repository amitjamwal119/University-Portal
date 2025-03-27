import { Container, Row, Col, ListGroup } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        {/* Left Side - Navigation Menu */}
        <Col xs={12} md={3} className="p-0" style={{ background: "", minHeight: "100vh" }}>
          <h5 className="text-center p-3 bg-primary text-white">Dashboard</h5>
          <ListGroup variant="flush" className="bg-primary">
            <ListGroup.Item action href="#examinations">Examinations</ListGroup.Item>
            <ListGroup.Item action href="#exam-form">Examination Form</ListGroup.Item>
            <ListGroup.Item action href="#updates">New Updates</ListGroup.Item>
            <ListGroup.Item action href="#about">About University</ListGroup.Item>
            <ListGroup.Item action href="#update-profile">Update Profile</ListGroup.Item>
            <ListGroup.Item action href="#logout" className="text-danger">Logout</ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Right Side - Content Area */}
        <Col xs={12} md={9} className="p-4">
          <h3>Dashboard Content</h3>
          <p>Welcome to your dashboard. Select an option from the left panel.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
