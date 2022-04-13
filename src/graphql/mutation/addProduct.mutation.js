
import { gql } from "@apollo/client";

const ADD_PRODUCT = gql`
mutation addProduct($input:ProductInput){
    addProduct(input:$input) {
      name,
      code,
      price,
      category,
      _id
    }
  }
  `;

  export default ADD_PRODUCT