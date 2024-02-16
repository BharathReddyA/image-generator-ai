import React from "react";
import OpenAIComponent from "../components/OpenAIComponent";
import { Card, Col, Container, Row } from "react-bootstrap";

const Main = () => {
  return (
    <Container>
      <Row>
        <Col lg={1}></Col>
        <Col lg={8}>
          <div className="mt-5">
            <Card className="pt-5">
              <div className="p-5">
                <OpenAIComponent />
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
