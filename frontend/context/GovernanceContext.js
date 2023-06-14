import React,{createContext,useEffect,useState} from 'react'
import {ADDRESS,ABI} from '../constants/index'
import ethers from 'ethers'

const GOVERNANCE_CONTEXT = createContext()

let connect
if(typeof window !=='undefined'){
    connect = window.ethereum
}
const Government_provider =({children})=>{
    const [account,setAccount] = useState()
    const [price,setPrice] = useState(null)
    

    const connectWallet =async function(){
        // console.log(ethers);
        if(connect){
            const connector = await connect.request({method : 'eth_requestAccounts'})
            setAccount(connector[0])
        }
    }

    const Contribute =async()=>{
        if (price) {
            const provider = new ethers.providers.Web3Provider(connect)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(ADDRESS,ABI,signer)
            const parsedPrice = new ethers.utils.parseEther(price)
            const tx = await contract.contribute({value : parsedPrice})
            await tx.wait(1)
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