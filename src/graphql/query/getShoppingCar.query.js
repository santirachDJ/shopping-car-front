import { gql } from "@apollo/client";

const GET_SHOPPING_CAR = gql`
  query GetShoppingCar($id: String) {
    getShoppingCar(id: $id) {
      _id
      code
      totalPrice
      products {
        _id
        category
        name
        price
        quantity
        total,
        code
      }
    }
  }
`;

export default GET_SHOPPING_CAR;
