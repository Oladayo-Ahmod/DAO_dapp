const {ethers} = require('hardhat')
const {assert,expect, AssertionError} = require('chai')

describe("DAO",()=>{
    let provider,dao
    beforeEach(async ()=>{
        provider = await ethers.getContractFactory("Dao")
        dao = await provider.deploy()
    })

    it("deploys contract", async()=>{
        let contract =  await dao.deployed()
        assert.notEqual(contract,'')
        assert.notEqual(contract,null)
        assert.notEqual(contract,undefined)
        assert.notEqual(contract,0x0)
        console.log(contract.address)
    })

    it("stakeholder contributes", async()=>{
        let price = new ethers.utils.parseEther('2');
        await dao.contribute({value:price})
        let balance = await dao.getStakeholdersBalances();
        assert.equal(balance,price.toString())
    })

     it("collaborator contributes", async()=>{
        let price = new ethers.utils.parseEther('0.5');
        await dao.contribute({value:price})
        let balance = await dao.getContributorsBalance();
       assert.equal(balance,price.toString())
    })
})