import React,{useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import AuthenticationContext from "../contexts/auth/auth_context";

const ProtectedRoute = ({component: Component, ...restOfProps}) =>{
    const {state} = useContext(AuthenticationContext);
    return(
        <Route 
            {...restOfProps}
            render={(props) =>
            state.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default ProtectedRoute;