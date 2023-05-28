import React, {useReducer} from "react" ;
import AuthContext from "./auth_context";
import AuthReducer from "./auth_reducer";

const AuthState = (props) => {
    let initialState = {};
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    return <AuthContext.Provider value={{state, dispatch}}> {props.children} </AuthContext.Provider>

};
export default AuthState;