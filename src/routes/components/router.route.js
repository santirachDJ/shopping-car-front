import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "../../components/layout/layout";
import routes from "../routes";

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {routes.map((route, i) => (
            <Route
              exact={route.exact}
              key={i}
              path={route.path}
              render={(props) => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} />
              )}
            />
          ))}
          <Route path="*">
            <div>NO MATCH</div>
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
