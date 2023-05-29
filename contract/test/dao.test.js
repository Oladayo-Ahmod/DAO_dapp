const {ethers} = require('hardhat')
const {assert,expect} = require('chai')

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

    it("contributes", async()=>{
        let price = new ethers.utils.parseEther('0.5');
        let contrbutor2 = await ethers.getSigner(2)
        //  await dao.contribute({value:price})
        // console.log(test);
        await dao.connect(contrbutor2).contribute({value:price})
        // await dao.connect(contrbutor3).contribute({value:price})
        let balance = await dao.connect(contrbutor2).getContributorsBalance();
        console.log(balance);
    })
})