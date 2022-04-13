import Pager from "emerald-ui/lib/Pager";
import React, { useEffect, useState } from "react";
import Container from "emerald-ui/lib/Container";
import Row from "emerald-ui/lib/Row";
import Col from "emerald-ui/lib/Col";

const Pagination = ({eventEmmiter, total, offset, limit}) => {

  const handleLimitChange = (limit) => {
    console.log("limit changing:", limit);
  };

 
  const handlePageChange = (action, offset) => {
    eventEmmiter(offset,action)
  };


  return (
    <Container className="pagination">
      <Row>
        <Col xs={12}>
          <Pager
            offset={offset}
            limit={limit}
            limits={[limit]}
            onPageChange={(action, offset) => handlePageChange(action, offset)}
            onLimitChange={(limit) => handleLimitChange(limit)}
            total={total}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Pagination;
