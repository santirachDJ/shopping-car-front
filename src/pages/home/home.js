import React from "react";
import CardGrid from "emerald-ui/lib/CardGrid";
import SkeletonLoader from "emerald-ui/lib/SkeletonLoader";
import { useQuery } from "@apollo/client";
import GET_PRODUCTS from "../../graphql/query/getProducts.query";
import CardComponent from "../../components/card/card.component";
import SearchComponent from "../../components/search/search.component";
import Pagination from "../../components/pagination/pagination.component";


const Home = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {},
  });
  console.log(data);
  return (
    <SkeletonLoader loading={loading}>
       <SearchComponent/>
      <CardGrid className="cardGrid__container">
        {data &&
          data.getProducts &&
          data.getProducts.map((product, i) => (
            <CardComponent key={i} {...product} />
          ))}
      </CardGrid>
      <Pagination/>
    </SkeletonLoader>
  );
};

export default Home;
