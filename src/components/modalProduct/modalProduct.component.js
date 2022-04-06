import Modal from "emerald-ui/lib/Modal";
import React, { Fragment } from "react";
import Button from "emerald-ui/lib/Button";
import SingleSelect from "emerald-ui/lib/SingleSelect";
import TextField from "emerald-ui/lib/TextField";
import { isEmpty } from "lodash";
const ModalProduct = ({ handlerShowModal, handlerDataModal, isOpen, data }) => {
  
  const handlerModalView = () => {
    handlerShowModal("close");
    handlerDataModal({});
  };

  const isEdit = !isEmpty(data) ? true :false

  console.log("data", data);
  return (
    <Fragment>
      <Modal onHide={() => handlerModalView()} show={isOpen}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <TextField label="Codigo" />
            </div>
            <div>
              <TextField label="Nombre" />
            </div>
            <div>
              <TextField label="Precio" />
            </div>
            <div>
              <SingleSelect label="Categoria" id="s1">
                <option value="FOOD">Food</option>
                <option value="TECH">Tech</option>
                <option value="TOYS">Toys</option>
              </SingleSelect>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handlerModalView()} shape="flat" color="info">
            Cancel
          </Button>
          <Button color="info">{isEdit?"Editar":"Guardar"}</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ModalProduct;
