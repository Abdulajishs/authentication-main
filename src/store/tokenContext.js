import React from "react";

const TokenContext = React.createContext({
    token: "",
    isLoggedIn : false,
    addToken: () => { },
    removeToken: () => { }
})

export default TokenContext;