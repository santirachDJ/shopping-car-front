import React, { useState } from "react";
import Container from "emerald-ui/lib/Container";
import Row from "emerald-ui/lib/Row";
import Col from "emerald-ui/lib/Col";
import NavHeader from "./navHeader.layout";

const Layout = ({ children }) => {
  return (
    <Container fluid={true} className="layout__container">
      <Row center={true}>
        <Col xs={12}>
          <NavHeader/>
        </Col>
      </Row>

      <Row center={true}>
        <Col xs={12}>{children}</Col>
      </Row>
    </Container>
  );
};

export default Layout;
