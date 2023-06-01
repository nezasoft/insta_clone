import React, {useEffect,useContext} from "react";
import {Route, Switch, BrowserRouter, Redirect} from "react-router-dom";
import AuthenticationContext from "../contexts/auth/auth_context";
import ProtectedRoute from "./ProtectedRoute";

//Different routes
import Home from "../screens/Home";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import CreatePost from "../screens/CreatePost";
import Profile from "../screens/Profile";
import UserProfile from "../screens/UserProfile";
import SubscribePost from "../screens/SubscribePost";
import ResetPassword from "../screens/ResetPassword";
import NewPass from "../screens/NewPassword";

const Routing = () =>{
    const {state} = useContext(AuthenticationContext);
    //check if we are already authenticated
    useEffect(()=>{
        state.isAuthenticated ? <Redirect to="/" /> : <Redirect to="/login" />;
    });

    return(
        <BrowserRouter>
            <Switch>
                {/*Public Routes*/}
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/reset" component={ResetPassword} />
                <Route exact path="/reset/:token" component={NewPass} />

                { /*Separate Protected routes from public ones */ }

                <ProtectedRoute exact path="/" component={SubscribePost} />
                <ProtectedRoute exact path="/explore" component={Home} />
                <ProtectedRoute exact path="/create" component={CreatePost} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <ProtectedRoute exact path="/profile/:user-id" component={UserProfile} />

                {/* Incase we want to handle that 404 page not found*/}
                {/* <Route component={NotFound}*/}


            </Switch>
        
        </BrowserRouter>
    );
};
export default Routing;