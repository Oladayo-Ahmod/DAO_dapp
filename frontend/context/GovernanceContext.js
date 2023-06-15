import React,{createContext,useEffect,useState} from 'react'
import {ADDRESS,ABI} from '../constants/index'
import {ethers} from 'ethers'
import Router, { useRouter } from 'next/router'

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
    const [myContribution, setMyContribution] = useState(0)
    const [status , setStatus] = useState(false)

    const connectWallet =async function(){
        try {
            if(connect){
                const connector = await connect.request({method : 'eth_requestAccounts'})
                setAccount(connector[0])
                Router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const Contribute =async()=>{
        try {
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
        } catch (error) {
            console.log(error);
        }
        
    }

    const getTotalBalance =async()=>{
        try {
            const provider = new ethers.providers.Web3Provider(connect)            
            const signer = provider.getSigner()
            const contract = new ethers.Contract(ADDRESS,ABI,signer)
            const tx = await contract.getTotalBalance()
            let balance = await tx.toString()
            balance =  ethers.utils.formatUnits(balance,'ether')
            setTotalBalance(balance)
        } catch (error) {
            console.log(error);
        }
       
        // console.log(balance);
    }

    const getMyContribution =async()=>{
       try {
        const provider = new ethers.providers.Web3Provider(connect)            
        const signer = provider.getSigner()
        const contract = new ethers.Contract(ADDRESS,ABI,signer)
        const tx = await contract.getStakeholdersBalances()
        let balance = await tx.toString()
        balance =  ethers.utils.formatUnits(balance,'ether')
        setMyContribution(balance)
       } catch (error) {
        console.log(error);
       }
    }

    const getStatus =async() => {
        try {
            const provider = new ethers.providers.Web3Provider(connect)            
            const signer = provider.getSigner()
            const contract = new ethers.Contract(ADDRESS,ABI,signer)
            const tx = await contract.stakeholderStatus()
            setStatus(tx)
        } catch (error) {
            console.log(error);
        }
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
            myContribution,
            getStatus,
            status
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