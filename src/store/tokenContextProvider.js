import { useState } from "react"
import TokenContext from "./tokenContext"

const TokenContextProvider = (props) => {
    const [enteredTokens,setEnteredTokens] = useState(null)

    const userIsLoggedIn = !!enteredTokens;

    const addTokenHandler = (token) =>{
        setEnteredTokens(token)
    }

    const removeTokenHandler = () =>{
        setEnteredTokens (null)
    }

    const tokenContext = {
        token: enteredTokens,
        isLoggedIn : userIsLoggedIn,
        addToken: addTokenHandler,
        removeToken: removeTokenHandler
    }
    return (
        <>
        {console.log(enteredTokens)}
        <TokenContext.Provider value={tokenContext}>{props.children}</TokenContext.Provider>
        </>
    )
}

export default TokenContextProvider;