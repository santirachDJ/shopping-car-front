import React, { useContext, useState } from "react";
import CardGrid from "emerald-ui/lib/CardGrid";
import SkeletonLoader from "emerald-ui/lib/SkeletonLoader";
import CardComponent from "../../components/card/card.component";
import SearchComponent from "../../components/search/search.component";
import Pagination from "../../components/pagination/pagination.component";
import Button from "emerald-ui/lib/Button";
import ModalProduct from "../../components/modalProduct/modalProduct.component";
import HandlerActionContext from "../../context/handlerAction.context";
import handlerActionHoc from "../../hoc/handlerAction.hoc";

const Home = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const context = useContext(HandlerActionContext);
  const {
    loadingProducts,
    dataProducts,
    createProduct,
    updateProduct,
          
  } = context;

  const handlerShowModal = (type) => {
    if (type == "close") {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };

  const handlerDataModal = (data) => {
    setDataModal(data);
  };

  const handlerEmmiterModal = (data, isEdit) => {
    console.log("handlerEmmiterModal", data);
    console.log("isEdit", isEdit);
    if (!isEdit) {
      createProduct({ variables: {
        input:data  
      }});
    }else{
      const {id,...dataInput} = data
      updateProduct({ 
        variables: {
        id:id,
        input:dataInput
      }})
    }
  };

  console.log(dataProducts);

  return (
    <SkeletonLoader loading={loadingProducts}>
      <div className="search__container">
        <SearchComponent />
        <Button color="info" onClick={() => handlerShowModal("open")}>
          agregar producto
        </Button>
      </div>

      <CardGrid className="cardGrid__container">
        {dataProducts &&
          dataProducts.getProducts &&
          dataProducts.getProducts.map((product, i) => (
            <CardComponent
              key={i}
              {...product}
              handlerShowModal={handlerShowModal}
              handlerDataModal={handlerDataModal}
            />
          ))}
      </CardGrid>

      <Pagination />

      <ModalProduct
        isOpen={isOpenModal}
        handlerShowModal={handlerShowModal}
        handlerDataModal={handlerDataModal}
        handlerEmmiterModal={handlerEmmiterModal}
        data={dataModal}
      />
    </SkeletonLoader>
  );
};

export default handlerActionHoc(Home);
