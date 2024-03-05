import { useCallback, useEffect, useState } from "react"
import TokenContext from "./tokenContext"

const TokenContextProvider = (props) => {
    const initialToken = localStorage.getItem("token");
    const [enteredTokens, setEnteredTokens] = useState(initialToken)

    
    const userIsLoggedIn = !!enteredTokens;
    
    const addTokenHandler = (token) => {
        setEnteredTokens(token)
        localStorage.setItem("token", token)
    }
    
    const removeTokenHandler = useCallback(() => {
        setEnteredTokens(null)
        localStorage.removeItem("token")
    },[])
    
    useEffect(()=>{
        let timer;
        if (userIsLoggedIn) {
            timer  = setTimeout(() => {
                removeTokenHandler()
            }, 300000);
        }
        return () => clearTimeout(timer)
    },[userIsLoggedIn,removeTokenHandler])

    const tokenContext = {
        token: enteredTokens,
        isLoggedIn: userIsLoggedIn,
        addToken: addTokenHandler,
        removeToken: removeTokenHandler
    }
    return (
        <>
            {/* {console.log(enteredTokens)} */}
            <TokenContext.Provider value={tokenContext}>{props.children}</TokenContext.Provider>
        </>
    )
}

export default TokenContextProvider;