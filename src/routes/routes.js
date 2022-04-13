import home from "../pages/home/home";
import ShoppingCar from "../pages/shoppingCar/shoppingCar";
import DetailShoppingCar from "../pages/detailShoppingCar/detailShoppingCar"
const routes = [
  {
    path: "/",
    component: ShoppingCar,
    exact: true,
    name: "Crear shopping",
  },
  {
    path: "/shopping/product",
    component: home,
    exact: true,
    name: "Ver productos",
  },
  {
    path: "/shopping/details",
    component: DetailShoppingCar,
    exact: true,
    name: "Ver shopping car",
  },
  
  
];

export default routes;
