import { gql } from "@apollo/client";

const ADD_SHOPPING_CAR = gql`
  mutation addShoppingCar($input: ShoppingCarInput) {
    addShoppingCar(input: $input) {
      code
      totalPrice
      _id
      products {
        productId
        quantity
      }
    }
  }
`;

export default ADD_SHOPPING_CAR;
