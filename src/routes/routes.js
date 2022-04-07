import home from "../pages/home/home";
import ShoppingCar from "../pages/shoppingCar/shoppingCar";

const routes = [
  {
    path: "/shopping",
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
    component: home,
    exact: true,
    name: "Ver shopping car",
  },
  
  
];

export default routes;
