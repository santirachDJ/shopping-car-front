import React from "react";
import HandlerActionContext from "../context/handlerAction.context";
import { useMutation, useQuery } from "@apollo/client";
import GET_PRODUCTS from "../graphql/query/getProducts.query";
import ADD_PRODUCT from "../graphql/mutation/addProduct.mutation";
import UPDATE_PRODUCT from "../graphql/mutation/updateProduct.mutation";

export default (WrappedComponent) => {
  const handlerActionHoc = ({ ...props }) => {
    const {
      loading: loadingProducts,
      error: errorProducts,
      data: dataProducts,
    } = useQuery(GET_PRODUCTS, {
      variables: {pagination:{limit:10}},
    });
    const [createProduct, { loading: createLoading, error: createError }] =
      useMutation(ADD_PRODUCT, {
        refetchQueries: () => [{ query: GET_PRODUCTS }],
      });
    const [updateProduct, { loading: updateLoading, error: updateError }] =
      useMutation(UPDATE_PRODUCT,{
        refetchQueries: () => [{ query: GET_PRODUCTS }],
      });

    return (
      <HandlerActionContext.Provider
        value={{
          loadingProducts,
          errorProducts,
          dataProducts,
          createProduct,
          createLoading,
          createError,
          updateProduct,
          updateLoading,
          updateError,
        }}
      >
        <WrappedComponent {...props}></WrappedComponent>
      </HandlerActionContext.Provider>
    );
  };

  handlerActionHoc.propTypes = {};
  return handlerActionHoc;
};
