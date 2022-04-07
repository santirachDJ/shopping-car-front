import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import StoreManagerContext from '../context/storeManager.context'
import { useMutation } from '@apollo/client'
import ADD_PRODUCT_TO_SHOPPING_CAR from '../graphql/mutation/addProductToShoppingCar.mutation'


export default WrappedComponent => {
    const storeManagerHoc = ({...props}) => {
        const [
            addProductToShopping,
            { loading: addProductToShoppingLoading, error: addProductToShoppingError, data: addProductToShoppingData },
          ] = useMutation(ADD_PRODUCT_TO_SHOPPING_CAR);
        const handlerStore =(shoppingId,productId,quantity)=>{
            console.log("guardar",shoppingId)
            addProductToShopping({
                variables: {
                  id: shoppingId,
                  product:{productId,quantity}
                },
              })
        }

        return (
            <StoreManagerContext.Provider
                value={{
                    handlerStore,
                    addProductToShoppingData
                }}
            >
                <WrappedComponent {...props}></WrappedComponent>
            </StoreManagerContext.Provider>
        )
    }

    storeManagerHoc.propTypes = {}
    return storeManagerHoc
}
