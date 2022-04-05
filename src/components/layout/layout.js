import React, { useState } from "react";
import Container from "emerald-ui/lib/Container";
import Row from "emerald-ui/lib/Row";
import Col from "emerald-ui/lib/Col";
import NavHeader from "./navHeader.layout";
import Home from "../../pages/home/home";

const Layout = () => {
  const [page,setPage]=useState(1)
  return (
    <Container fluid={true} className="layout__container">
      <Row center={true}>
        <Col xs={12}>
          <NavHeader 
          setPage={setPage}
          page={page}
          />
        </Col>
      </Row>

      <Row center={true}>
        <Col xs={12}>
          {page==1 && <Home />}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
