import Card from "emerald-ui/lib/Card";
import React, { useContext } from "react";
import StoreManagerContext from "../../context/storeManager.context";
import storeManagerHoc from "../../hoc/storeManager.hoc";
import Button from "emerald-ui/lib/Button";

const CardComponent = ({
  name,
  code,
  price,
  category,
  _id:id,
  handlerShowModal,
  handlerDataModal,
}) => {
  const context = useContext(StoreManagerContext);
  const { handlerStore } = context;

  const handlerSetInformationModal = (data) => {
    handlerShowModal("open");
    handlerDataModal(data);
  };
  return (
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
          <Button color="info" onClick={() => handlerStore()}>
            <span>anadir</span>
          </Button>
          <input
            type="text"
            placeholder="Cantidad"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default storeManagerHoc(CardComponent);
