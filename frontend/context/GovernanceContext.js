import React,{createContext,useEffect,useState} from 'react'
import {ADDRESS,ABI} from '../constants/index'
import {ethers} from 'ethers'

const GOVERNANCE_CONTEXT = createContext()

let connect
if(typeof window !=='undefined'){
    connect = window.ethereum
}
const Government_provider =({children})=>{
    const [account,setAccount] = useState()
    const [amount,setAmount] = useState()
    const [disability,setDisability] = useState(false)
    const [totalBalance, setTotalBalance] = useState(0)
    const [myBalance, setMyBalance] = useState(0)

    const connectWallet =async function(){
        // console.log(ethers);
        if(connect){
            const connector = await connect.request({method : 'eth_requestAccounts'})
            setAccount(connector[0])
        }
    }

    const Contribute =async()=>{
        if (amount && connect) {
            setDisability(true)
            const provider = new ethers.providers.Web3Provider(connect)            
            const signer = provider.getSigner()
            const contract = new ethers.Contract(ADDRESS,ABI,signer)
            const parsedAmount = new ethers.utils.parseEther(amount)
            const tx = await contract.contribute({value : parsedAmount})
            await tx.wait(1)
            setDisability(false)
        }
        else{
            setDisability(false)
        }
        
    }

    const getTotalBalance =async()=>{
        const provider = new ethers.providers.Web3Provider(connect)            
        const signer = provider.getSigner()
        const contract = new ethers.Contract(ADDRESS,ABI,signer)
        const tx = await contract.getTotalBalance()
        let balance = await tx.toString()
        balance =  ethers.utils.formatUnits(balance,'ether')
        setTotalBalance(balance)
        // console.log(balance);
    }

    const getMyContribution =async()=>{
        const provider = new ethers.providers.Web3Provider(connect)            
        const signer = provider.getSigner()
        const contract = new ethers.Contract(ADDRESS,ABI,signer)
        const tx = await contract.getStakeholdersBalances()
        let balance = await tx.toString()
        balance =  ethers.utils.formatUnits(balance,'ether')
        setMyBalance(balance)
    }

    return(
        <GOVERNANCE_CONTEXT.Provider
        
        value={
           { 
            connectWallet,
            account,
            setAmount,
            Contribute,
            disability,
            getTotalBalance,
            totalBalance,
            getMyContribution,
            myBalance
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