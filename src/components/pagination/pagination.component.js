import Pager from "emerald-ui/lib/Pager";
import React from "react";
import Container from "emerald-ui/lib/Container";
import Row from "emerald-ui/lib/Row";
import Col from "emerald-ui/lib/Col";

const Pagination = () => {
  // You can use here an arrow function instead to avoind using binding in the constructor:
  // handleLimitChange = limit => {}
  const handleLimitChange = (limit) => {
    console.log("limit changing:", limit);
  };

  // You can use here an arrow function instead to avoind using binding in the constructor:
  // handlePageChange = (action, offset) => {}
  const handlePageChange = (action, offset) => {
    console.log(action);
    console.log(offset);
  };

  return (
    <Container className="pagination">
      <Row>
        <Col xs={12}>
          <Pager
            offset={5}
            limit={10}
            onPageChange={(action, offset) => handlePageChange(action, offset)}
            onLimitChange={(limit) => handleLimitChange(limit)}
            total={100}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Pagination;
