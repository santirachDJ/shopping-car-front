import React, { Fragment, useEffect, useState } from "react";
import Panel from "emerald-ui/lib/Panel";
import Button from "emerald-ui/lib/Button";
import { useMutation } from "@apollo/client";
import ADD_SHOPPING_CAR from "../../graphql/mutation/addShoppingCar.mutation";
import SkeletonLoader from "emerald-ui/lib/SkeletonLoader";
import { isEmpty } from "lodash";
import { useHistory } from "react-router-dom";
import AlertShowError from "../../components/alert/alert.component";


const ShoppingCar = () => {
  const history = useHistory();
  const [code, setCode] = useState("");
  const [
    createShopping,
    {
      loading: createShoppingLoading,
      error: createShoppingError,
      data: createShoppingData,
    },
  ] = useMutation(ADD_SHOPPING_CAR);

  const handlerCreateShopping = () => {
    console.log(code);
    createShopping({
      variables: {
        input: { code },
      },
    });
  };

  useEffect(() => {
    if (!isEmpty(createShoppingData)) {
      console.log("createShoppingData", createShoppingData);
      const response = createShoppingData.addShoppingCar;
      console.log(response);
      history.push({
        pathname: "/shopping/product",
        search: `?shopping=${response._id}`,
        state: { shoppingId: response._id },
      });
    }
  }, [createShoppingData]);

  
  return (
    <Fragment>
      {createShoppingError && <AlertShowError message={createShoppingError.message.slice(31)} color='danger' />}
      <SkeletonLoader loading={createShoppingLoading}>
        <Panel>
          <Panel.Body>
            <h1>Bienvenido a shopping car</h1>
            <p>para iniciar cree un codigo para tu tienda</p>
            <div className="shoppingCar__content">
              <label>Codigo: </label>
              <input
                type="text"
                placeholder=""
                value={code}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(event) => setCode(event.target.value)}
              />
            </div>
            <Button color="info" onClick={() => handlerCreateShopping()}>
              <span>Crear</span>
            </Button>
          </Panel.Body>
        </Panel>
      </SkeletonLoader>
    </Fragment>
  );
};

export default ShoppingCar;
