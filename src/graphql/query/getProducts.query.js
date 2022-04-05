import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts($pagination:PaginationOptions,$search:ProductByQuery) {
    getProducts(pagination: $pagination, search:$search) {
      category
      name
      code
      price
      _id
    }
  }
`;

export default GET_PRODUCTS;
