import React from "react";
import SearchForm from "emerald-ui/lib/SearchForm";
import Container from "emerald-ui/lib/Container";
import Row from "emerald-ui/lib/Row";
import Col from "emerald-ui/lib/Col";

const SearchComponent = ({eventEmmiter})=>{
return(
    <Container>
        <Row>
          <Col xs={12}>
            <SearchForm
              placeholder=""
              inputId="query"
              onSubmit={(e) => e.preventDefault()}
              onChange={(e) => {
                setTimeout(() => {
                  eventEmmiter(e.target.value);
                }, 600);
                
              }}
            />
          </Col>
        </Row>
      </Container>
)
}

export default SearchComponent