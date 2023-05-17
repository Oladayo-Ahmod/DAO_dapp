/** @type import('hardhat/config').HardhatUserConfig */
require('@nomicfoundation/hardhat-toolbox')
require('@nomiclabs/hardhat-ethers')
require('@nomicfoundation/hardhat-chai-matchers')

module.exports = {
  solidity: {
    compilers : [
      {
        version : "0.8.7"
      },
      {
        version : '0.8.9'
      }
    ]
  },
};
