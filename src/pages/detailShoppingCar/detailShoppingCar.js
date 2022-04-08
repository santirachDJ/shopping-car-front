import React  from "react";
import Panel from "emerald-ui/lib/Panel";
import GET_SHOPPING_CAR from "../../graphql/query/GetShoppingCar.query";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import SkeletonLoader from "emerald-ui/lib/SkeletonLoader";
import CardGrid from "emerald-ui/lib/CardGrid";
import CardComponent from "../../components/card/card.component";
import DELETE_PRODUCT_TO_SHOPPING_CAR from "../../graphql/mutation/deleteProductToShoppingCar.mutation";
const DetailShoppingCar = () => {
  const useQueryParams = () => new URLSearchParams(useLocation().search);
  const query = useQueryParams();
  const shippingId = query.get("shopping");
  const {
    loading: loadingShopping,
    data: dataShopping,
    refetch: refetchGetShopping,
  } = useQuery(GET_SHOPPING_CAR, {
    variables: { id: shippingId },
  });
  const [
    deleteProductToShopping,
  ] = useMutation(DELETE_PRODUCT_TO_SHOPPING_CAR);
  
  const { getShoppingCar } = dataShopping || {};
  console.log("data", dataShopping);
  const handlerEmmiterDelete =(shoppingId, productId)=>{
    deleteProductToShopping({
        variables: {
          id: shoppingId,
          productId
        },
      }).then(()=>{
        refetchGetShopping()
      })
  }
  
  return (
    <SkeletonLoader loading={loadingShopping}>
      {getShoppingCar && (
        <Panel>
          <Panel.Body>
            <h1>Codigo: {getShoppingCar.code}</h1>
            <p>Total: ${getShoppingCar.totalPrice}</p>
          </Panel.Body>
        </Panel>
      )}
      <CardGrid className="cardGrid__container">
        {getShoppingCar &&
          getShoppingCar.products.map((product, i) => (
            <CardComponent key={i} {...product} shippingId={shippingId} type="details" handlerEmmiterDelete={handlerEmmiterDelete}/>
          ))}
      </CardGrid>
    </SkeletonLoader>
  );
};

export default DetailShoppingCar;
