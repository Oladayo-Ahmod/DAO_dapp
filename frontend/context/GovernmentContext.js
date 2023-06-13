import React,{createContext,useEffect,useState} from 'react'

const GOVERNMENT_CONTEXT = createContext()

let connect
if(typeof window !=='undefined'){
    connect = window.ethereum
}
const GOVERNANCE_PROVIDER =({children})=>{
    const [account,setAccount] = useState()

    const connectWallet =async(wallet = connect)=>{
        try {
            const connector = await connect.requestAccount({method : 'eth_requestAccounts'})
            setAccount(connector)
        } catch (error) {
            console.log(error);
        }
    }
}