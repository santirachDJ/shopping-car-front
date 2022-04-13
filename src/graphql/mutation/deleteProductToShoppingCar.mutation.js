import { gql } from "@apollo/client";

const DELETE_PRODUCT_TO_SHOPPING_CAR = gql`
  mutation deleteProductToShoppingCar($id: String, $productId: String) {
    deleteProductToShoppingCar(id: $id, productId: $productId) {
      code
      totalPrice
      _id
      products {
        productId
      }
    }
  }
`;

export default DELETE_PRODUCT_TO_SHOPPING_CAR;
