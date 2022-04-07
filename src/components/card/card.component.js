import Card from "emerald-ui/lib/Card";
import React, { Fragment, useContext, useEffect, useState } from "react";
import StoreManagerContext from "../../context/storeManager.context";
import storeManagerHoc from "../../hoc/storeManager.hoc";
import Button from "emerald-ui/lib/Button";
import { isEmpty } from "lodash";
import AlertShowError from "../alert/alert.component";

const CardComponent = ({
  name,
  code,
  price,
  category,
  _id: id,
  shippingId,
  handlerEmmiterStoreShopping,
  handlerShowModal,
  handlerDataModal,
}) => {
  const context = useContext(StoreManagerContext);
  const { handlerStore, addProductToShoppingData } = context;
  const [quantity, setQuantity] = useState(0);

  const handlerSetInformationModal = (data) => {
    handlerShowModal("open");
    handlerDataModal(data);
  };

  useEffect(()=>{
    if(!isEmpty(addProductToShoppingData)){
      handlerEmmiterStoreShopping(true)
    }
  },[addProductToShoppingData])

  return (
    <Fragment>
      <Card className="cardGrid__card">
        <div className="cardGrid__card__header">
          <h1 className="cardGrid__card__title">{name}</h1>
          <Button
            color="info"
            onClick={() =>
              handlerSetInformationModal({ name, code, price, category, id })
            }
          >
            Editar
          </Button>
        </div>
        <h2 className="cardGrid__card__subtitle">{category}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
          Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
          Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
        </p>
        <div className="cardGrid__card__information">
          <span>Code: {code}</span>
          <span>${price}</span>
        </div>
        <div className="cardGrid__card__actions">
          <div className="cardGrid__card__actions__store">
            <Button
              color="info"
              onClick={() => handlerStore(shippingId, id, parseInt(quantity))}
              disabled={quantity == 0 || quantity == ""}
            >
              <span>anadir</span>
            </Button>
            <input
              type="text"
              placeholder="Cantidad"
              value={quantity}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default storeManagerHoc(CardComponent);
