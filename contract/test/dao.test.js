const {ethers} = require('hardhat')
const {assert,expect, AssertionError} = require('chai')

describe("DAO",()=>{
    let provider,DAO
    beforeEach(async ()=>{
        provider = await ethers.getContractFactory("Dao")
        DAO = await provider.deploy()
    })

    it("deploys contract", async()=>{
        let contract =  await DAO.deployed()
        assert.notEqual(contract,'')
        assert.notEqual(contract,null)
        assert.notEqual(contract,undefined)
        assert.notEqual(contract,0x0)
        console.log(contract.address)
    })

    it("stakeholder contributes", async()=>{
        let price = new ethers.utils.parseEther('2');
        await DAO.contribute({value:price})
        let balance = await DAO.getStakeholdersBalances();
        assert.equal(balance,price.toString())
    })

     it("collaborator contributes", async()=>{
        let price = new ethers.utils.parseEther('0.5');
        await DAO.contribute({value:price})
        let balance = await DAO.getContributorsBalance();
       assert.equal(balance,price.toString())
    })

    it("creates proposal", async()=>{
        let [,beneficiary] = await ethers.getSigners()
        let price = new ethers.utils.parseEther('2');
        let amount = new ethers.utils.parseEther('10');
        await DAO.contribute({value:price})
        let proposal = await DAO.createProposal('title','desc',beneficiary.address,amount)
        const event = await proposal.wait().then((result) =>{
           return result.events.find((event) => event.event == 'ProposalAction')
        })

        assert.equal(event.args[2],'Proposal Raised')
        assert.equal(event.args[3],beneficiary.address)
        assert.equal(event.args[4],amount.toString())
    })

    describe("voting",()=>{
        it("performs upvote", async()=>{
            let [,beneficiary] = await ethers.getSigners()
            let price = new ethers.utils.parseEther('2');
            let amount = new ethers.utils.parseEther('10');
            await DAO.contribute({value:price})
            await DAO.createProposal('title','desc',beneficiary.address,amount)
            let vote = await DAO.performVote(0,true)
            const events = await vote.wait().then((result)=>{
                return result.events.find((event)=> event.event == 'VoteAction')
            })
    
            expect(events.args[5]).to.equal(true)
            expect(events.args[4]).to.equal(amount)
            expect(events.args[3]).to.equal(beneficiary.address)
        })

        it("performs downvote", async()=>{
            let [,beneficiary] = await ethers.getSigners()
            let price = new ethers.utils.parseEther('2');
            let amount = new ethers.utils.parseEther('10');
            await DAO.contribute({value:price})
            await DAO.createProposal('title','desc',beneficiary.address,amount)
            let vote = await DAO.performVote(0,false)
            const events = await vote.wait().then((result)=>{
                return result.events.find((event)=> event.event == 'VoteAction')
            })
    
            expect(events.args[5]).to.equal(false)
        })
    })
    
})