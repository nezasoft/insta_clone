import React from 'react';
import AuthenticationState from "./contexts/auth/auth_state";
import Routing from  "./routes/Routing";
import "./App.css";

const App = () =>{
    return (
        <AuthenticationState>
            <Routing />
        </AuthenticationState>
    )

};
export default App;
