import { gql } from "@apollo/client";

const ADD_PRODUCT_TO_SHOPPING_CAR = gql`
  mutation addProductToShoppingCar(
    $id: String
    $product: ProductShoppingInput
  ) {
    addProductToShoppingCar(id: $id, product: $product) {
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

export default ADD_PRODUCT_TO_SHOPPING_CAR;
