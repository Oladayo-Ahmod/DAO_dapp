import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import { Inter } from 'next/font/google'
import { useContext, useEffect, useRef, useState } from 'react'
import { GOVERNANCE_CONTEXT } from "@/context/GovernanceContext";
import {useRouter }from 'next/navigation'

// import iso
// import styles from '@/styles/Home.module.css'
// const 
const inter = Inter({ subsets: ['latin'] })
let Isotope;
let connect
if(typeof window !=='undefined'){
    connect = window.ethereum
}
  

const Home =()=> {
  const {
        connectWallet,
        account,
        setAmount,
        Contribute,
        disability,
        getTotalBalance,
        totalBalance,
        stakeholderBalance,
        getStakeholderBalance,
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
      } = useContext(GOVERNANCE_CONTEXT)

  const modalRef = useRef(null) // boostrap modal
  const modalRef2 = useRef(null) // boostrap modal
  // state for storing the isotope object, with an initial value of null
  const isotope = useRef();
  // store the filter keyword in a state
  const [filterKey, setFilterKey] = useState('*')
  // initialize an Isotope object with configs
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle')
    if(typeof window === 'undefined') return;
    const loadIsotope  =()=> require('isotope-layout')
    Isotope = loadIsotope()
    isotope.current = new Isotope('.filter-container', {
      itemSelector: '.filter-item',
      layoutMode: 'fitRows',
    })
    // cleanup
    return () => isotope.current.destroy()
  }, [])

  // handling filter key change
  useEffect(() => {
    // console.log(totalBalance);
    filterKey === '*'
      ? isotope.current.arrange({filter: `*`})
      : isotope.current.arrange({filter: `.${filterKey}`})
  }, [filterKey])
  useEffect(()=>{
    connectWallet()
  },[account])

  useEffect(()=>{
    getContributorStatus()
    getStakeholderStatus()
  },[getContributorStatus,getStakeholderStatus])

  useEffect(()=>{
    getTotalBalance()
    getStakeholderBalance()
    getContributorBalance()
    proposals()
    // console.log(proposalsData)
  },[getTotalBalance,getStakeholderBalance,getContributorBalance,proposals])


  const handleFilterKeyChange = key => () => setFilterKey(key)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <style jsx>
        {
          `
            .title{
              color : #2c4964;
              font-weight : 600;
            }
            .col-container{
              width :200px;
              height : 200px;
              text-align : center;
              margin :20px 20px;
              padding : 20px 5px 0 5px;
            }
            .voting-span{
              cursor : pointer;
            }
          `
        }
        </style>
        <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-white shadow-sm">
              <a className="navbar-brand" href="#">Navbar</a>
              <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                  aria-expanded="false" aria-label="Toggle navigation"></button>
              <div className="collapse navbar-collapse" id="collapsibleNavId">
                  <ul className="navbar-nav me-auto mt-2 mt-lg-0 text-secondary">
                      <li className="nav-item">
                          <a className="nav-link active fw-bold text-secondary" href="#" aria-current="page">DAO <span className="visually-hidden">(current)</span></a>
                      </li>
                  </ul>
                  <form className="d-flex my-2 my-lg-0 px-2">
                      <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={connectWallet} >  {account ? `${account.slice(0,6)}...${account.slice(account.length -4)}` : 'connect wallet'}
</button>
                  </form>
              </div>
          </nav>
          <div className='container my-5'>
              <div className='d-flex justify-content-around'>
                <div>
                  <button type='button' data-bs-toggle="modal" data-bs-target="#modalId" className='btn btn-primary'>Contribute</button>
                  
                  {/* <!-- Modal Body --> */}
                  <div className="modal fade" ref={modalRef} id="modalId" tabindex="-1" data-bs-backdrop="false" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="modalTitleId">Contribute</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <input className='form-control' onChange={e=> setAmount( e.target.value)} placeholder='1ETH and above to be a stakeholder'/>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-primary" disabled={disability} onClick={()=>Contribute(modalRef)}>Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal fade" id="modalId2" ref={modalRef2} tabindex="-1" data-bs-backdrop="false" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="modalTitleId">Create proposal</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <input className='form-control mb-2' onChange={e => setFormData({...formData, title : e.target.value})} placeholder='Title'/>
                          <input className='form-control mb-2'  onChange={e => setFormData({...formData,amount : e.target.value})} type='number' placeholder='Amount'/>
                          <input className='form-control mb-2'  onChange={e => setFormData({...formData,beneficiary : e.target.value})}  placeholder='Beneficiary'/>
                          <input className='form-control mb-2'  onChange={e => setFormData({...formData, description : e.target.value})}  placeholder='Description'/>
                        </div>
                        <div className="modal-footer">
                          <button type="button" onClick={()=> propose(modalRef2)} className="btn btn-primary">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  
               
                </div>
                      <button className='btn btn-warning'  type='button' data-bs-toggle="modal" data-bs-target="#modalId2">Propose</button>
              </div>
          </div>     
          <div className='container mt-5'>
            <div className='row justify-content-center align-items-center'>
              <div className='col col-md-3 bg-primary col-container rounded'>
                  <h5 className='title' >Total Proposals  </h5>
                  <h4 className='text-white fw-bolder m-auto mt-5'>{proposalsData? proposalsData.length : '0'}</h4>
              </div>
              <div className='col col-md-3 col-container bg-info rounded'>
                  <h5 className='title '> DAO Balance  </h5>
                  <h4 className='text-white fw-bolder m-auto mt-5'>{`${totalBalance} ETH`}</h4>
              </div>
              <div className='col col-md-3 col-container bg-success rounded'>
                 <h5 className='title'> My Contributions </h5>
                 <h4 className='text-white fw-bolder m-auto mt-5'>{`${stakeholderBalance > 0 ? stakeholderBalance :  contributorBalance} ETH`}</h4>
              </div>
              <div className='col col-md-3 col-container bg-warning rounded'>
               <h5 className='title'>  Status</h5>
               <h4 className='text-white fw-bolder m-auto mt-5'>{ stakeholderStatus ? 'Stakeholder' : contributorStatus ? 'Contributor' : 'New User'}</h4>
              </div>
            </div>
          </div>
        </div>

        <section id="products" className="departments">
      <div className="container">

        <div className="section-title" data-aos="zoom-in-up" data-aos-duration="800" data-aos-easing="linear">
          <h2>Proposals State</h2>
          <p> Below shows different states of proposals.</p>
        </div>

        <div className="row">
          <div className="col-lg-3">
            <ul className="nav nav-tabs flex-column">
              <li className="nav-item">
                <a className="nav-link active show" onClick={handleFilterKeyChange('*')} href="#">All</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleFilterKeyChange('opened')} href="#">Opened</a>
              </li>
              <li className="nav-item">
                <a className="nav-link"onClick={handleFilterKeyChange('closed')} href="#">Closed</a>
              </li>
        
            </ul>
          </div>
          <div className="col-lg-9 mt-4 mt-lg-0">
            <div className="tab-content filter-container" >
              
              <div className='row' >
              { proposalsData? proposalsData.map(i=>(
                 <div className="col tab-pane active filter-item opened" >
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3 className='title'>{i.title.charAt(0).toUpperCase() + i.title.slice(1)}</h3>
                    <p className="font-italic description">
                      {i.description}
                    </p>
                    <button className="btn btn-success m-2 btn-sm position-relative" onClick={()=>voting(i.id,true)}>
                      upVote 
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                       {i.upVote}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                     </button>

                     <button className="btn btn-danger btn-sm position-relative" type='buttton' onClick={()=>voting(i.id,false)}>
                      downVote 
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        {i.downVote}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                     </button>
                  </div>
                  <div className="col-lg-4 d-flex voting-span justify-content-between order-1 order-lg-2 mb-5">
                    <p className='title'> Amount : <span>{i.amount}</span></p>
                  </div>
                </div>
              </div>
                
              )) : <h3>Loading ...</h3> }
             </div>
          
            </div>
          </div>
        </div>

      </div>
    </section>
    <footer className='mt-5'>
      <h3>copyright 2023</h3>
    </footer>
      </main>
     
    </>
  )
}

export default Home