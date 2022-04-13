import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts(
    $pagination: PaginationOptions
    $search: ProductByQuery
    $sort: String
  ) {
    getProducts(pagination: $pagination, search: $search, sort: $sort) {
      items {
        category
        name
        code
        price
        _id
        createdAt
      }
      size
    }
  }
`;

export default GET_PRODUCTS;
