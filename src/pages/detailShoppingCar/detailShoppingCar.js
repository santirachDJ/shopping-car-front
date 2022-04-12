import React, { Fragment, useEffect } from "react";
import Panel from "emerald-ui/lib/Panel";
import GET_SHOPPING_CAR from "../../graphql/query/GetShoppingCar.query";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import SkeletonLoader from "emerald-ui/lib/SkeletonLoader";
import CardGrid from "emerald-ui/lib/CardGrid";
import CardComponent from "../../components/card/card.component";
import DELETE_PRODUCT_TO_SHOPPING_CAR from "../../graphql/mutation/deleteProductToShoppingCar.mutation";
import { useHistory } from "react-router-dom";
const DetailShoppingCar = () => {
  const useQueryParams = () => new URLSearchParams(useLocation().search);
  const history = useHistory();
  const query = useQueryParams();
  const shippingId = query.get("shopping");
  const {
    loading: loadingShopping,
    data: dataShopping,
    refetch: refetchGetShopping,
  } = useQuery(GET_SHOPPING_CAR, {
    variables: { id: shippingId },
  });
  const [deleteProductToShopping] = useMutation(DELETE_PRODUCT_TO_SHOPPING_CAR);

  const { getShoppingCar } = dataShopping || {};
  console.log("data", dataShopping);
  const handlerEmmiterDelete = (shoppingId, productId) => {
    deleteProductToShopping({
      variables: {
        id: shoppingId,
        productId,
      },
    }).then(() => {
      refetchGetShopping({ variables: { id: shippingId } });
    });
  };

  useEffect(() => {
    refetchGetShopping({ variables: { id: shippingId } });
  }, []);

  useEffect(() => {
    if (shippingId == undefined) {
      history.push({
        pathname: "/",
      });
    }
  }, [history]);

  return (
    <Fragment>
    {loadingShopping && dataShopping==undefined && <h1>No hay productos agregados a este carrito</h1>}
    <SkeletonLoader loading={loadingShopping}>
      <Panel>
        <Panel.Body>
        
          {getShoppingCar && (
            <Fragment>
              <h1>Codigo: {getShoppingCar.code}</h1>
              <p>Total: ${getShoppingCar.totalPrice}</p>
            </Fragment>
          )}
        </Panel.Body>
      </Panel>

      

      <CardGrid className="cardGrid__container">
        {getShoppingCar &&
          getShoppingCar.products.map((product, i) => (
            <CardComponent
              key={i}
              {...product}
              shippingId={shippingId}
              type="details"
              handlerEmmiterDelete={handlerEmmiterDelete}
            />
          ))}
      </CardGrid>
    </SkeletonLoader>
    </Fragment>
  );
};

export default DetailShoppingCar;
