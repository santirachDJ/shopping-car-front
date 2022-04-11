import React from "react";
import PageHeader from "emerald-ui/lib/PageHeader";
import Avatar from "emerald-ui/lib/Avatar";
import Nav from "emerald-ui/lib/Nav";
import routes from "../../routes/routes";
import { useLocation,useHistory } from 'react-router-dom';


const NavHeader = () => {
  const location = useLocation();
  const history = useHistory();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const shippingId = query.get("shopping");
  return (
    <PageHeader className="layout__pageHeader">
      <h1 className="clearfix">
        <Avatar title="John Doe" size="md" className="pull-left" />
        <span className="h2">Jorge sanes</span>
      </h1>
      <Nav>
       {routes.map((route,index)=>{
         return (
          <a
          key={index}
          href={`/${route.path}`}
          className={ location.pathname ==route.path? "active":"" }
          onClick={() => history.push({
            pathname: route.path,
            search: `${shippingId ? `?shopping=${shippingId}`:""}`,
            state: { shoppingId: shippingId },
          })}
        >
          {route.name}
        </a>
         )
       })}
      </Nav>
    </PageHeader>
  );
};

export default NavHeader;
