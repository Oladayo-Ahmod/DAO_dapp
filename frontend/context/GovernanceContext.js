import React,{createContext,useEffect,useState} from 'react'
import {ADDRESS,ABI} from '../constants/index'
import {ethers} from 'ethers'
import Router from 'next/router'
import {useRouter }from 'next/navigation'

const GOVERNANCE_CONTEXT = createContext()

let connect
if(typeof window !=='undefined'){
    connect = window.ethereum
}
const Government_provider =({children})=>{

    useEffect(()=>{
       if (connect) {
            connect.on('accountsChanged',()=>{
                Router.push('/')
            })
       }
    })

    const [account,setAccount] = useState()
    const [amount,setAmount] = useState()
    const [disability,setDisability] = useState(false)
    const [totalBalance, setTotalBalance] = useState(0)
    const [stakeholderBalance, setStakeholderBalance] = useState(0)
    const [contributorBalance, setContributorBalance] = useState(0)
    const [stakeholderStatus , setStakeholderStatus] = useState(false)
    const [contributorStatus , setContributorStatus] = useState(false)
    const [proposalsData, setProposalsData] = useState()
    const [formData, setFormData] = useState({
        title :'',
        description : '',
        beneficiary : '',
        amount : ''
    })

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

    const Contribute =async(modalRef)=>{
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
                const modalElement = modalRef.current ? modalRef.current : ''
                modalElement.classList.remove('show')
                modalElement.style.display = 'none'
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
       
    }

    const getStakeholderBalance =async()=>{
        if (stakeholderStatus) {
            try {
                const provider = new ethers.providers.Web3Provider(connect)            
                const signer = provider.getSigner()
                const contract = new ethers.Contract(ADDRESS,ABI,signer)
                const tx = await contract.getStakeholdersBalances()
                let balance = await tx.toString()
                balance =  ethers.utils.formatUnits(balance,'ether')
                setStakeholderBalance(balance)
               } catch (error) {
                console.log(error);
               }
        }
       
    }

    const getContributorBalance =async()=>{
            if (contributorStatus) {
                try {
                    const provider = new ethers.providers.Web3Provider(connect)            
                    const signer = provider.getSigner()
                    const contract = new ethers.Contract(ADDRESS,ABI,signer)
                    const tx = await contract.getContributorsBalance()
                    let balance = await tx.toString()
                    balance =  ethers.utils.formatUnits(balance,'ether')
                    setContributorBalance(balance)
                   } catch (error) {
                    console.log(error);
                   }    
            }
            
       
    }

    const getStakeholderStatus =async() => {
            try {
                const provider = new ethers.providers.Web3Provider(connect)            
                const signer = provider.getSigner()
                const contract = new ethers.Contract(ADDRESS,ABI,signer)
                const tx = await contract.stakeholderStatus()
                setStakeholderStatus(tx)
            } catch (error) {
                console.log(error);
            }    
        
    }

    const getContributorStatus =async() => {
            try {
                const provider = new ethers.providers.Web3Provider(connect)            
                const signer = provider.getSigner()
                const contract = new ethers.Contract(ADDRESS,ABI,signer)
                const tx = await contract.isContributor()
                setContributorStatus(tx)
            } catch (error) {
                console.log(error);
            }    
        
    }

    const propose =async(modalRef)=>{
        if (stakeholderStatus) {
            try {
                const {title,description,beneficiary,amount} = formData
                let parsedAmount = new ethers.utils.parseEther(amount);
                const provider = new ethers.providers.Web3Provider(connect)            
                const signer = provider.getSigner()
                const contract = new ethers.Contract(ADDRESS,ABI,signer)
                const propose = await contract.createProposal(title,description,beneficiary.trim(),parsedAmount)
                await propose.wait(1)
                const modalElement = modalRef.current ? modalRef.current : ''
                modalElement.classList.remove('show')
                modalElement.style.display = 'none'
    
            } catch (error) {
                console.log(error);
            }   
        }
       
    }

    const proposals =async()=>{
        try {
            const provider = new ethers.providers.Web3Provider(connect)            
            const signer = provider.getSigner()
            const contract = new ethers.Contract(ADDRESS,ABI,signer)
            const proposals = await contract.getAllProposals()
            const data = await Promise.all(await proposals.map( e =>{
                let info = {
                    id : e.id.toString(),
                    title : e.title,
                    description : e.description,
                    amount : ethers.utils.formatEther(e.amount.toString(),'ether'),
                    beneficiary : e.beneficiary,
                    upVote : e.upVote.toString(),
                    downVote : e.downVotes.toString(),

                }

                return info
            }))

            setProposalsData(data)

        } catch (error) {
            console.log(error);
        }
    }

    const voting =async(proposalId,vote)=>{
        try {
            const provider = new ethers.providers.Web3Provider(connect)            
            const signer = provider.getSigner()
            const contract = new ethers.Contract(ADDRESS,ABI,signer)
            const tx = await contract.performVote(proposalId,vote)
            // console.log(tx);


        } catch (error) {
            if(error.message.includes('Time has already passed')){
                console.log('time passed');
            }
            else if (error.message.includes('double voting is not allowed')) {
                console.log('double voting is not allowed');
            }
            else{
                console.log(error);
            }
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
            getStakeholderBalance,
            stakeholderBalance,
            getContributorBalance,
            contributorBalance,
            getContributorStatus,
            getStakeholderStatus,
            contributorStatus,
            stakeholderStatus,
            setFormData,
            propose,
            formData,
            proposals,
            proposalsData,
            voting
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