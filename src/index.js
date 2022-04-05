import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./stylesheets/main.scss";
import { ApolloProvider } from "@apollo/react-hooks";
import clientGraphql from "./connection";
import 'emerald-ui/lib/styles.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={clientGraphql}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
