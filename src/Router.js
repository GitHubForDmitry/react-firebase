import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./Containers/Admin";
import Catalog from "./Containers/Catalog";

const RouterComponent = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Catalog />
                </Route>
                <Route path="/admin">
                    <Admin />
                </Route>
            </Switch>
        </Router>
    );
};

export default RouterComponent;
