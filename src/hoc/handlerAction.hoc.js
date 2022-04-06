import React, { useEffect, useState } from "react";
import HandlerActionContext from "../context/handlerAction.context";
import { useMutation, useQuery } from "@apollo/client";
import GET_PRODUCTS from "../graphql/query/getProducts.query";
import ADD_PRODUCT from "../graphql/mutation/addProduct.mutation";
import UPDATE_PRODUCT from "../graphql/mutation/updateProduct.mutation";

export default (WrappedComponent) => {
  const handlerActionHoc = ({ ...props }) => {
    const [filters, setFilters] = useState({
        pagination: { offset: 0, limit: 8 },
        search: {name:""},
      });

    const {
      loading: loadingProducts,
      error: errorProducts,
      data: dataProducts,
      refetch: refetchGetProducts,
    } = useQuery(GET_PRODUCTS, {
      variables: { pagination: { limit: 8, offset: 0 }, sort: "-createdAt" },
    });
    const [
      createProduct,
      { loading: createLoading, error: createError, data: dataProduct },
    ] = useMutation(ADD_PRODUCT);
    const [
      updateProduct,
      { loading: updateLoading, error: updateError, data: dataUpdate },
    ] = useMutation(UPDATE_PRODUCT);

   

    useEffect(() => {
      if (dataUpdate || dataProduct) {
        refetchGetProducts({
          pagination: { limit: 8, offset: 0 },
          sort: "-createdAt",
        }).then(()=>setFilters({
            pagination: { offset: 0, limit: 8 },
            search: {},
          }))
      }

    }, [dataUpdate, dataProduct]);


    useEffect(()=>{
        if(filters){
            refetchGetProducts({
                pagination: filters.pagination,
                sort: "-createdAt",
                search:filters.search.name?{name:`${filters.search.name}*`}:{}
              })
        }
    },[filters])

    return (
      <HandlerActionContext.Provider
        value={{
          loadingProducts,
          errorProducts,
          dataProducts,
          refetchGetProducts,
          createProduct,
          createLoading,
          createError,
          updateProduct,
          updateLoading,
          updateError,
          filters, 
          setFilters
        }}
      >
        <WrappedComponent {...props}></WrappedComponent>
      </HandlerActionContext.Provider>
    );
  };

  handlerActionHoc.propTypes = {};
  return handlerActionHoc;
};
