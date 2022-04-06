import React, { useState } from "react";
import CardGrid from "emerald-ui/lib/CardGrid";
import SkeletonLoader from "emerald-ui/lib/SkeletonLoader";
import { useQuery } from "@apollo/client";
import GET_PRODUCTS from "../../graphql/query/getProducts.query";
import CardComponent from "../../components/card/card.component";
import SearchComponent from "../../components/search/search.component";
import Pagination from "../../components/pagination/pagination.component";
import Button from "emerald-ui/lib/Button";
import ModalProduct from "../../components/modalProduct/modalProduct.component";

const Home = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {},
  });

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

  console.log(data);

  return (
    <SkeletonLoader loading={loading}>
      <div className="search__container">
        <SearchComponent />
        <Button color="info" onClick={() => handlerShowModal("open")}>
          agregar producto
        </Button>
      </div>

      <CardGrid className="cardGrid__container">
        {data &&
          data.getProducts &&
          data.getProducts.map((product, i) => (
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
        data={dataModal}
      />
    </SkeletonLoader>
  );
};

export default Home;
