import React from "react";
import SearchForm from "emerald-ui/lib/SearchForm";
import Container from "emerald-ui/lib/Container";
import Row from "emerald-ui/lib/Row";
import Col from "emerald-ui/lib/Col";

const SearchComponent = ()=>{
return(
    <Container>
        <Row>
          <Col xs={12}>
            <SearchForm
              placeholder=""
              inputId="query"
              onSubmit={(e) => e.preventDefault()}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Container>
)
}

export default SearchComponent