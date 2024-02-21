import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Col, Form, Button, Row } from "react-bootstrap";
import FloatingSidebar from "./FloatingSidebar"; // Import your FloatingSidebar component

const withNavbar = (Component) => () => (
  <>
    <Navbar />
    <Container fluid>
      <Row>
        <Col sm={2} className="p-0 d-none d-md-block">
          {/* Hide the FloatingSidebar on screens less than md (medium) */}
          <FloatingSidebar />
        </Col>
        <Col>
          <Component />
        </Col>
      </Row>
    </Container>
  </>
);

export default withNavbar;
