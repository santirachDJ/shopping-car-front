import Card from "emerald-ui/lib/Card";
import React from "react";

const CardComponent = ({ name, code, price, category }) => {
  return (
    <Card className="cardGrid__card">
      <h1 className="eui-card-title">{name}</h1>
      <h2 className="eui-card-subtitle">{category}</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
        Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
        Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
      </p>
      <span>Code: {code}</span>
      <span>${price}</span>
    </Card>
  );
};

export default CardComponent;
