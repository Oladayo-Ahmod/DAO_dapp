import React,{createContext,useEffect,useState} from 'react'

const GOVERNANCE_CONTEXT = createContext()

let connect
if(typeof window !=='undefined'){
    connect = window.ethereum
}
const Government_provider =({children})=>{
    const [account,setAccount] = useState()
    const connectWallet =async function(){
        if(connect){
            const connector = await connect.request({method : 'eth_requestAccounts'})
            setAccount(connector[0])
        }
    }

    return(
        <GOVERNANCE_CONTEXT.Provider
        
        value={
           { 
            connectWallet,
            account
        }
        }
        >
        {children}
        </GOVERNANCE_CONTEXT.Provider>
    )
}

module.exports = {
    GOVERNANCE_CONTEXT,
    Government_provider
}