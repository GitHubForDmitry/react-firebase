import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./Containers/Admin";
import Catalog from "./Containers/Catalog";
import SignIn from "./Containers/SignIn";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '100%',
        margin: 'auto',
        position: 'relative',
        background: 'rgba(244, 245, 249, 0.7)',
        minHeight: '100vh',
    }
}));
const RouterComponent = () => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Catalog />
                </Route>
                <Route path="/admin">
                    <Admin />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
            </Switch>
        </Router>
        </div>
    );
};

export default RouterComponent;
