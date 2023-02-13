import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarMenu from "../components/layout/NavbarMenu";

const About = () => {
  return (
    <>
      <Row className="mt-5" style={{ marginRight: 0 }}>
        <Col className="text-center">
          <Button
            variant="primary"
            href="https://www.facebook.com/tuyngoc990"
            size="lg"
          >
            Visit my facebook for more information
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default About;
