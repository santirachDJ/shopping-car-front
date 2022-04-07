import React, { Fragment, useContext, useState } from "react";
import CardGrid from "emerald-ui/lib/CardGrid";
import SkeletonLoader from "emerald-ui/lib/SkeletonLoader";
import CardComponent from "../../components/card/card.component";
import SearchComponent from "../../components/search/search.component";
import Pagination from "../../components/pagination/pagination.component";
import Button from "emerald-ui/lib/Button";
import ModalProduct from "../../components/modalProduct/modalProduct.component";
import HandlerActionContext from "../../context/handlerAction.context";
import handlerActionHoc from "../../hoc/handlerAction.hoc";
import { useLocation } from "react-router-dom";
import AlertShowError from "../../components/alert/alert.component";
import { isEmpty } from "lodash";
const Home = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const [isOpenModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [alertData,setAlertData] = useState({show:false,color:""})
  const shippingId = query.get("shopping");
  const context = useContext(HandlerActionContext);
  const {
    loadingProducts,
    dataProducts,
    createProduct,
    updateProduct,
    filters,
    setFilters,
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
    if (!isEdit) {
      createProduct({
        variables: {
          input: data,
        },
      });
    } else {
      const { id, ...dataInput } = data;
      updateProduct({
        variables: {
          id: id,
          input: dataInput,
        },
      });
    }
  };

  const handlerEmmiterPagination = (offset) => {
    setFilters({ ...filters, pagination: { ...filters.pagination, offset } });
  };

  const handlerEmmiterSearch = (search) => {
    setFilters({ ...filters, search: { ...filters.search, name: search } });
  };

  const handlerEmmiterStoreShopping = (isStore) => {
    if(isStore){
      setAlertData({show:true,color:"info"})
      setTimeout(()=>{
        setAlertData({show:false,color:""})
      },1000)
    }
  };

  console.log(dataProducts);

  return (
    <Fragment>
      <SkeletonLoader loading={loadingProducts}>
      {alertData.show && (
        <AlertShowError message="Producto agregado" color={alertData.color} />
      )}
        <div className="search__container">
          <SearchComponent eventEmmiter={handlerEmmiterSearch} />
          <Button color="info" onClick={() => handlerShowModal("open")}>
            agregar producto
          </Button>
        </div>

        <CardGrid className="cardGrid__container">
          {dataProducts &&
            dataProducts.getProducts &&
            dataProducts.getProducts.items.map((product, i) => (
              <CardComponent
                key={i}
                {...product}
                shippingId={shippingId}
                handlerEmmiterStoreShopping={handlerEmmiterStoreShopping}
                handlerShowModal={handlerShowModal}
                handlerDataModal={handlerDataModal}
              />
            ))}
        </CardGrid>

        {dataProducts && dataProducts.getProducts && (
          <Pagination
            limit={filters.pagination.limit}
            offset={filters.pagination.offset}
            eventEmmiter={handlerEmmiterPagination}
            total={dataProducts.getProducts.size}
          />
        )}

        <ModalProduct
          isOpen={isOpenModal}
          handlerShowModal={handlerShowModal}
          handlerDataModal={handlerDataModal}
          handlerEmmiterModal={handlerEmmiterModal}
          data={dataModal}
        />
      </SkeletonLoader>
    </Fragment>
  );
};

export default handlerActionHoc(Home);
