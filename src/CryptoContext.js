import React, { createContext, useContext, useEffect, useState } from 'react'
const Crypto= createContext()
const CryptoContext = ({children}) => {
    const [Currency, setCurrency] = useState("INR")
    const [Symbol, setSymbol] = useState("₹") //Alt+Ctrl+4 
    useEffect(()=>{
        Currency==="INR"? setSymbol("₹"):setSymbol("$")
    },[Currency])
  return (
    <Crypto.Provider value={{Currency,Symbol,setCurrency}}>
    {children}
    </Crypto.Provider>
  )
}

export default CryptoContext
export const CryptoState=()=>{
   return useContext(Crypto)
}