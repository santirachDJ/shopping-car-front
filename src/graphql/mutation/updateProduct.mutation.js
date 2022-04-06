
import { gql } from "@apollo/client";

const UPDATE_PRODUCT = gql`
mutation updateProduct($id: String, $input: ProductUpdateInput){
    updateProduct(id: $id, input: $input)
  }
  `;

  export default UPDATE_PRODUCT