import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import StoreManagerContext from '../context/storeManager.context'


export default WrappedComponent => {
    const storeManagerHoc = ({...props}) => {
        const handlerStore =()=>{
            console.log("guardar")
        }

        return (
            <StoreManagerContext.Provider
                value={{
                    handlerStore
                }}
            >
                <WrappedComponent {...props}></WrappedComponent>
            </StoreManagerContext.Provider>
        )
    }

    storeManagerHoc.propTypes = {}
    return storeManagerHoc
}
