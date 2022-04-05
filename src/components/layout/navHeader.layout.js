import React from "react";
import PageHeader from "emerald-ui/lib/PageHeader";
import Avatar from "emerald-ui/lib/Avatar";
import Nav from "emerald-ui/lib/Nav";
const NavHeader = ({setPage,page}) => {
  return (
    <PageHeader className="layout__pageHeader">
      <h1 className="clearfix">
        <Avatar title="John Doe" size="md" className="pull-left" />
        <span className="h2">John Doe</span>
      </h1>
      <Nav>
        <a href="/" 
        className={page==1?'active':''}
        onClick={()=>setPage(1)}
        >
          Ver productos
        </a>
        <a href="/"
        className={page==2?'active':''}
        onClick={()=>setPage(2)}
        >Ver mi carrito</a>
      </Nav>
    </PageHeader>
  );
};

export default NavHeader;
