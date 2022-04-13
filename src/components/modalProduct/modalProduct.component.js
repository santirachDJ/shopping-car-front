import Modal from "emerald-ui/lib/Modal";
import React, { Fragment, useEffect, useState } from "react";
import Button from "emerald-ui/lib/Button";
import TextField from "emerald-ui/lib/TextField";
import { isEmpty } from "lodash";
const ModalProduct = ({ handlerShowModal, handlerDataModal, handlerEmmiterModal, isOpen, data }) => {
  const [dataModal, setDataModal] = useState({
    name: "",
    code: "",
    price: "",
    category: "",
  });

  const [isDisabled,setIsDisabled] = useState(false)

  const isEdit = !isEmpty(data) ? true : false;

  const handlerModalViewClose = () => {
    handlerShowModal("close");
    handlerDataModal({});
    setResetDataModal()
  };

  const handlerModalSave = () => {   
    handlerEmmiterModal({...dataModal, id:data.id},isEdit);
    handlerModalViewClose()
  };

  const handlerData = (data, key) => {
    setDataModal({ ...dataModal, [key]: data });
  };

  const setResetDataModal =()=>{
    setDataModal({
      name: "",
      code: "",
      price: "",
      category: "",
    })
  }

  

  useEffect(()=>{
    const disable = Object.keys(dataModal).every((objectKey, index) => {
      if (dataModal[objectKey] && dataModal[objectKey] != "") {
        return true;
      }
      return false;
    });
    setIsDisabled(disable)
  },[dataModal])


  useEffect(()=>{
    if(!isEmpty(data)){
      setDataModal({...data})
    }
  },[data])

  
  return (
    <Fragment>
      <Modal onHide={() => handlerModalViewClose()} show={isOpen}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <TextField
                label="Codigo"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(change) => handlerData(change.target.value, "code")}
                value={dataModal.code}
              />
            </div>
            <div>
              <TextField
                label="Nombre"
                onChange={(change) => handlerData(change.target.value, "name")}
                value={dataModal.name}
              />
            </div>
            <div>
              <TextField
                label="Precio"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(change) => handlerData(parseInt(change.target.value), "price")}
                value={dataModal.price}
              />
            </div>
            <div>
              <select
                onChange={(data) => {
                  handlerData(data.target.value, "category");
                }}
                value={dataModal.category}
                placeholder="Categoria"
              >
                <option value=""></option>
                <option value="FOOD">Food</option>
                <option value="TECH">Tech</option>
                <option value="TOYS">Toys</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => handlerModalViewClose()}
            shape="flat"
            color="info"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handlerModalSave()}
            color="info"
            disabled={!isDisabled}
          >
            {isEdit ? "Editar" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ModalProduct;
