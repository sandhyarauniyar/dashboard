import React, { Children } from "react";
import { useState } from "react";

const AuthContext = React.createContext(
    {
        token: '',
        isLoggedIn: false,
        login: (token) => { },
        logout: () => { }
    }
);

export const AuthContextProvider = (props) => {

    const initialValue = localStorage.getItem('token');
    const [token, setToken] = useState(initialValue);

    const userisLoggedIn = !!token;

    const loggedInHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }


    const contextValue = {
        token: token,
        isLoggedIn: userisLoggedIn,
        login: loggedInHandler,
        logout: logoutHandler
    }

    return (<AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>)
}
export default AuthContext;