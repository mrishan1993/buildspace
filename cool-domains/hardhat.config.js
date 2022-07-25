require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/ireOASn1CRF1oUY2BGy6TNZoNOGTF4V8",
      accounts: ["ecb0a5bacdcc2db25a663f897e63a3ab5e9ea86f6164a470794bd11a7562e920"]
    }
  }
};
